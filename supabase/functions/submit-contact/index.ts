import { createClient } from "jsr:@supabase/supabase-js@2";

const FROM_EMAIL = "Ramon Valerio <contato@ramonvalerio.com>";

// Only the site itself (and local dev) may call this function from a browser.
const ALLOWED_ORIGINS = new Set([
  "https://ramonvalerio.com",
  "https://www.ramonvalerio.com",
  "http://localhost:5173",
  "http://localhost:4173",
]);
const ALLOWED_TURNSTILE_HOSTS = new Set(["ramonvalerio.com", "www.ramonvalerio.com", "localhost"]);

// Abuse limits: they protect third-party inboxes (someone typing another
// person's address) and keep usage well under the Resend quota.
const MAX_PER_EMAIL_PER_HOUR = 2;
const MAX_PER_IP_PER_HOUR = 5;
const MAX_GLOBAL_PER_DAY = 50;
const CLEANUP_AFTER_DAYS = 7; // unconfirmed rows older than this are deleted

const LIMITS = { name: 100, email: 254, message: 5000 };
const EMAIL_PATTERN = /^[^\s@<>"']+@[^\s@<>"']+\.[^\s@<>"']{2,}$/;

const HOUR_MS = 60 * 60 * 1000;

function corsHeaders(origin: string | null) {
  return {
    "Access-Control-Allow-Origin": origin && ALLOWED_ORIGINS.has(origin) ? origin : "https://ramonvalerio.com",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    Vary: "Origin",
  };
}

function json(origin: string | null, status: number, body: Record<string, unknown>) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders(origin), "Content-Type": "application/json" },
  });
}

function clientIp(req: Request) {
  const forwarded = req.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0].trim() || req.headers.get("cf-connecting-ip") || null;
}

async function verifyTurnstile(token: string, remoteIp: string | null) {
  const secret = Deno.env.get("TURNSTILE_SECRET_KEY");
  // fail closed: without the secret there is no bot protection, so refuse
  if (!secret) {
    console.error("TURNSTILE_SECRET_KEY is not configured; rejecting submission");
    return false;
  }
  if (!token) return false;

  const body = new URLSearchParams();
  body.set("secret", secret);
  body.set("response", token);
  if (remoteIp) body.set("remoteip", remoteIp);

  const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    body,
  });
  const data = await res.json();
  return Boolean(data.success) && (!data.hostname || ALLOWED_TURNSTILE_HOSTS.has(data.hostname));
}

async function sendEmail(to: string, subject: string, html: string) {
  const apiKey = Deno.env.get("RESEND_API_KEY");
  if (!apiKey) throw new Error("RESEND_API_KEY not configured");

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from: FROM_EMAIL, to, subject, html }),
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

function validate(input: unknown) {
  if (!input || typeof input !== "object") return null;
  const { name, email, message, turnstileToken } = input as Record<string, unknown>;
  if (typeof name !== "string" || typeof email !== "string" || typeof message !== "string") return null;

  // single-line name: it is shown in an email sent from this domain
  const cleanName = name.replace(/[\r\n\t]+/g, " ").trim();
  const cleanEmail = email.trim().toLowerCase();
  const cleanMessage = message.trim();

  if (!cleanName || cleanName.length > LIMITS.name) return null;
  if (cleanEmail.length > LIMITS.email || !EMAIL_PATTERN.test(cleanEmail)) return null;
  if (!cleanMessage || cleanMessage.length > LIMITS.message) return null;

  return {
    name: cleanName,
    email: cleanEmail,
    message: cleanMessage,
    turnstileToken: typeof turnstileToken === "string" ? turnstileToken : "",
  };
}

Deno.serve(async (req) => {
  const origin = req.headers.get("origin");

  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders(origin) });
  }
  if (req.method !== "POST") {
    return json(origin, 405, { error: "method_not_allowed" });
  }
  if (!origin || !ALLOWED_ORIGINS.has(origin)) {
    return json(origin, 403, { error: "forbidden" });
  }

  try {
    const input = validate(await req.json().catch(() => null));
    if (!input) return json(origin, 400, { error: "invalid_input" });

    const ip = clientIp(req);
    if (!(await verifyTurnstile(input.turnstileToken, ip))) {
      return json(origin, 400, { error: "verification_failed" });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    const since = (ms: number) => new Date(Date.now() - ms).toISOString();
    const count = async (column: string | null, value: string | null, windowMs: number) => {
      let query = supabase
        .from("pending_messages")
        .select("id", { count: "exact", head: true })
        .gte("created_at", since(windowMs));
      if (column) query = query.eq(column, value);
      const { count: total, error } = await query;
      if (error) throw error;
      return total ?? 0;
    };

    const [perEmail, perIp, global] = await Promise.all([
      count("email", input.email, HOUR_MS),
      ip ? count("ip", ip, HOUR_MS) : Promise.resolve(0),
      count(null, null, 24 * HOUR_MS),
    ]);
    if (perEmail >= MAX_PER_EMAIL_PER_HOUR || perIp >= MAX_PER_IP_PER_HOUR || global >= MAX_GLOBAL_PER_DAY) {
      console.warn("contact rate limit hit", { perEmail, perIp, global });
      return json(origin, 429, { error: "rate_limited" });
    }

    const { data, error } = await supabase
      .from("pending_messages")
      .insert({ name: input.name, email: input.email, message: input.message, ip })
      .select("token")
      .single();
    if (error) throw error;

    // the confirmation page lives on the site; see confirm-contact for why
    const confirmUrl = `https://ramonvalerio.com/?confirm=${data.token}`;

    await sendEmail(
      input.email,
      "Confirme sua mensagem para Ramon Valerio",
      `<div style="font-family: sans-serif; max-width: 480px;">
        <p>Olá, ${escapeHtml(input.name)}!</p>
        <p>Recebemos sua mensagem para Ramon Valerio. Para confirmar que você enviou isso e garantir que ela chegue até ele, clique no botão abaixo:</p>
        <p><a href="${confirmUrl}" style="display:inline-block;padding:12px 24px;background:#111;color:#fff;text-decoration:none;border-radius:8px;">Confirmar envio</a></p>
        <p style="color:#666;font-size:13px;">Se você não enviou essa mensagem, pode ignorar este e-mail com segurança — nada será enviado.</p>
      </div>`,
    );

    // housekeeping: drop old unconfirmed messages (best effort, never blocks the reply)
    supabase
      .from("pending_messages")
      .delete()
      .neq("status", "confirmed")
      .lt("created_at", since(CLEANUP_AFTER_DAYS * 24 * HOUR_MS))
      .then(({ error: cleanupError }) => cleanupError && console.error("cleanup failed", cleanupError));

    return json(origin, 200, { success: true });
  } catch (err) {
    console.error(err);
    return json(origin, 500, { error: "server_error" });
  }
});
