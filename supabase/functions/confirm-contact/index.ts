import { createClient } from "jsr:@supabase/supabase-js@2";

const FROM_EMAIL = "Ramon Valerio <contato@ramonvalerio.com>";
const OWNER_EMAIL = "ramonvalerios@gmail.com";
const SITE_URL = "https://ramonvalerio.com";
const LINK_TTL_MS = 1000 * 60 * 60 * 24; // 24h
const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

const ALLOWED_ORIGINS = new Set([
  "https://ramonvalerio.com",
  "https://www.ramonvalerio.com",
  "http://localhost:5173",
  "http://localhost:4173",
]);

// Supabase serves Edge Function HTML as sandboxed text/plain on its domain, so
// the confirmation page lives on the site (ramonvalerio.com/?confirm=<token>).
// This function only:
//   GET  ?token=… → redirects to that page (links opened directly / old emails)
//   POST {token}  → confirms, called by the site's "Confirmar envio" button.
// Requiring the POST keeps email security scanners, which open links
// automatically, from confirming messages on the sender's behalf.

function corsHeaders(origin: string | null) {
  return {
    "Access-Control-Allow-Origin": origin && ALLOWED_ORIGINS.has(origin) ? origin : SITE_URL,
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    Vary: "Origin",
  };
}

function json(origin: string | null, status: number, body: Record<string, unknown>) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders(origin), "Content-Type": "application/json", "Cache-Control": "no-store" },
  });
}

async function sendEmail(to: string, subject: string, html: string, replyTo?: string) {
  const apiKey = Deno.env.get("RESEND_API_KEY");
  if (!apiKey) throw new Error("RESEND_API_KEY not configured");

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from: FROM_EMAIL, to, subject, html, ...(replyTo ? { reply_to: replyTo } : {}) }),
  });

  if (!res.ok) {
    throw new Error(`Resend error: ${res.status} ${await res.text()}`);
  }
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

Deno.serve(async (req) => {
  const origin = req.headers.get("origin");

  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders(origin) });
  }

  if (req.method === "GET") {
    const token = new URL(req.url).searchParams.get("token") ?? "";
    const target = UUID_PATTERN.test(token) ? `${SITE_URL}/?confirm=${token}` : SITE_URL;
    return new Response(null, { status: 302, headers: { Location: target, "Cache-Control": "no-store" } });
  }

  if (req.method !== "POST") return json(origin, 405, { status: "error" });
  if (!origin || !ALLOWED_ORIGINS.has(origin)) return json(origin, 403, { status: "error" });

  const body = await req.json().catch(() => null);
  const token = typeof body?.token === "string" ? body.token : "";
  if (!UUID_PATTERN.test(token)) return json(origin, 404, { status: "invalid" });

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    const { data: pending, error: fetchError } = await supabase
      .from("pending_messages")
      .select("id, name, email, message, status, created_at")
      .eq("token", token)
      .maybeSingle();
    if (fetchError) throw fetchError;

    if (!pending || pending.status === "expired") return json(origin, 404, { status: "invalid" });
    if (pending.status === "confirmed" || pending.status === "confirming") {
      return json(origin, 200, { status: "already" });
    }

    if (Date.now() - new Date(pending.created_at).getTime() > LINK_TTL_MS) {
      await supabase.from("pending_messages").update({ status: "expired" }).eq("id", pending.id);
      return json(origin, 410, { status: "expired" });
    }

    // atomic claim: only one request can move the row out of "pending"
    const { data: claimed, error: claimError } = await supabase
      .from("pending_messages")
      .update({ status: "confirming" })
      .eq("id", pending.id)
      .eq("status", "pending")
      .select("id");
    if (claimError) throw claimError;
    if (!claimed?.length) return json(origin, 200, { status: "already" });

    try {
      await sendEmail(
        OWNER_EMAIL,
        `Nova mensagem confirmada — ${pending.name}`,
        `<div style="font-family: sans-serif;">
          <p><strong>Nome:</strong> ${escapeHtml(pending.name)}</p>
          <p><strong>E-mail:</strong> ${escapeHtml(pending.email)}</p>
          <p><strong>Mensagem:</strong></p>
          <p>${escapeHtml(pending.message).replace(/\n/g, "<br/>")}</p>
        </div>`,
        pending.email,
      );
    } catch (sendError) {
      // give the sender a chance to retry with the same link
      await supabase.from("pending_messages").update({ status: "pending" }).eq("id", pending.id);
      throw sendError;
    }

    await supabase
      .from("pending_messages")
      .update({ status: "confirmed", confirmed_at: new Date().toISOString() })
      .eq("id", pending.id);

    return json(origin, 200, { status: "confirmed" });
  } catch (err) {
    console.error(err);
    return json(origin, 500, { status: "error" });
  }
});
