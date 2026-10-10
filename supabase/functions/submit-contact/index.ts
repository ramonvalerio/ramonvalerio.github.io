import { createClient } from "jsr:@supabase/supabase-js@2";

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const SITE_URL = "https://ramonvalerio.com";
const FROM_EMAIL = "Ramon Valerio <contato@ramonvalerio.com>";
const OWNER_EMAIL = "ramonvalerios@gmail.com";

async function verifyTurnstile(token: string, remoteIp: string | null) {
  const secret = Deno.env.get("TURNSTILE_SECRET_KEY");
  if (!secret) return true; // not configured, skip check

  const body = new URLSearchParams();
  body.set("secret", secret);
  body.set("response", token);
  if (remoteIp) body.set("remoteip", remoteIp);

  const res = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    { method: "POST", body },
  );
  const data = await res.json();
  return Boolean(data.success);
}

async function sendEmail(to: string, subject: string, html: string) {
  const apiKey = Deno.env.get("RESEND_API_KEY");
  if (!apiKey) throw new Error("RESEND_API_KEY not configured");

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ from: FROM_EMAIL, to, subject, html }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Resend error: ${res.status} ${text}`);
  }
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: CORS_HEADERS });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
    });
  }

  try {
    const { name, email, message, turnstileToken } = await req.json();

    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        {
          status: 400,
          headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
        },
      );
    }

    const remoteIp = req.headers.get("x-forwarded-for");
    const humanVerified = await verifyTurnstile(turnstileToken ?? "", remoteIp);
    if (!humanVerified) {
      return new Response(
        JSON.stringify({ error: "Human verification failed" }),
        {
          status: 400,
          headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
        },
      );
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    const { data, error } = await supabase
      .from("pending_messages")
      .insert({ name, email, message })
      .select("token")
      .single();

    if (error) throw error;

    const confirmUrl = `${Deno.env.get("SUPABASE_URL")}/functions/v1/confirm-contact?token=${data.token}`;

    await sendEmail(
      email,
      "Confirme sua mensagem para Ramon Valerio",
      `<div style="font-family: sans-serif; max-width: 480px;">
        <p>Olá, ${escapeHtml(name)}!</p>
        <p>Recebemos sua mensagem para Ramon Valerio. Para confirmar que você enviou isso e garantir que ela chegue até ele, clique no botão abaixo:</p>
        <p><a href="${confirmUrl}" style="display:inline-block;padding:12px 24px;background:#111;color:#fff;text-decoration:none;border-radius:8px;">Confirmar envio</a></p>
        <p style="color:#666;font-size:13px;">Se você não enviou essa mensagem, pode ignorar este e-mail com segurança — nada será enviado.</p>
      </div>`,
    );

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error(err);
    return new Response(
      JSON.stringify({ error: err instanceof Error ? err.message : "Unknown error" }),
      {
        status: 500,
        headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
      },
    );
  }
});
