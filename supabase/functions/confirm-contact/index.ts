import { createClient } from "jsr:@supabase/supabase-js@2";

const FROM_EMAIL = "Ramon Valerio <contato@ramonvalerio.com>";
const OWNER_EMAIL = "ramonvalerios@gmail.com";
const SITE_URL = "https://ramonvalerio.com";

async function sendEmail(to: string, subject: string, html: string, replyTo?: string) {
  const apiKey = Deno.env.get("RESEND_API_KEY");
  if (!apiKey) throw new Error("RESEND_API_KEY not configured");

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: FROM_EMAIL,
      to,
      subject,
      html,
      ...(replyTo ? { reply_to: replyTo } : {}),
    }),
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

function htmlPage(title: string, body: string) {
  return `<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8" />
  <title>${title}</title>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <style>
    body { font-family: system-ui, sans-serif; background: #09090b; color: #fff; display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; padding: 24px; text-align: center; }
    main { max-width: 420px; }
    a { color: #7cf2d6; }
  </style>
</head>
<body><main>${body}</main></body>
</html>`;
}

Deno.serve(async (req) => {
  const url = new URL(req.url);
  const token = url.searchParams.get("token");

  if (!token) {
    return new Response(htmlPage("Link inválido", "<h1>Link inválido</h1>"), {
      status: 400,
      headers: { "Content-Type": "text/html; charset=utf-8" },
    });
  }

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    const { data: pending, error: fetchError } = await supabase
      .from("pending_messages")
      .select("*")
      .eq("token", token)
      .maybeSingle();

    if (fetchError) throw fetchError;

    if (!pending) {
      return new Response(
        htmlPage(
          "Link inválido",
          "<h1>Link inválido ou já utilizado</h1><p>Esse link de confirmação não existe mais.</p>",
        ),
        { status: 404, headers: { "Content-Type": "text/html; charset=utf-8" } },
      );
    }

    if (pending.status === "confirmed") {
      return new Response(
        htmlPage(
          "Já confirmado",
          `<h1>Mensagem já confirmada</h1><p>Essa mensagem já havia sido confirmada anteriormente. Obrigado!</p><p><a href="${SITE_URL}">Voltar ao site</a></p>`,
        ),
        { headers: { "Content-Type": "text/html; charset=utf-8" } },
      );
    }

    const createdAt = new Date(pending.created_at).getTime();
    const expired = Date.now() - createdAt > 1000 * 60 * 60 * 24; // 24h

    if (expired) {
      await supabase
        .from("pending_messages")
        .update({ status: "expired" })
        .eq("id", pending.id);

      return new Response(
        htmlPage(
          "Link expirado",
          "<h1>Link expirado</h1><p>Esse link de confirmação expirou. Envie a mensagem novamente pelo site.</p>",
        ),
        { status: 410, headers: { "Content-Type": "text/html; charset=utf-8" } },
      );
    }

    await supabase
      .from("pending_messages")
      .update({ status: "confirmed", confirmed_at: new Date().toISOString() })
      .eq("id", pending.id);

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

    return new Response(
      htmlPage(
        "Mensagem confirmada",
        `<h1>Mensagem confirmada ✅</h1><p>Obrigado! Sua mensagem foi enviada para o Ramon.</p><p><a href="${SITE_URL}">Voltar ao site</a></p>`,
      ),
      { headers: { "Content-Type": "text/html; charset=utf-8" } },
    );
  } catch (err) {
    console.error(err);
    return new Response(
      htmlPage(
        "Erro",
        "<h1>Algo deu errado</h1><p>Não foi possível confirmar sua mensagem agora. Tente novamente mais tarde.</p>",
      ),
      { status: 500, headers: { "Content-Type": "text/html; charset=utf-8" } },
    );
  }
});
