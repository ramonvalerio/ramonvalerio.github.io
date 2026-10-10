import { useEffect, useRef, useState } from "react";
import { useLanguage } from "../i18n/LanguageContext";
import TechButton from "./TechButton";

const WEB3FORMS_ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;
const TURNSTILE_SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY;
const TURNSTILE_SCRIPT_SRC =
  "https://challenges.cloudflare.com/turnstile/v0/api.js";
const COOLDOWN_MS = 60_000;
const COOLDOWN_STORAGE_KEY = "contact_last_sent_at";

function readCooldownRemaining() {
  try {
    const lastSentAt = Number(localStorage.getItem(COOLDOWN_STORAGE_KEY) || 0);
    return Math.max(0, COOLDOWN_MS - (Date.now() - lastSentAt));
  } catch {
    return 0;
  }
}

function useSendCooldown() {
  const [remainingMs, setRemainingMs] = useState(readCooldownRemaining);

  useEffect(() => {
    if (remainingMs <= 0) return;
    const id = setInterval(() => {
      setRemainingMs(readCooldownRemaining());
    }, 1000);
    return () => clearInterval(id);
  }, [remainingMs]);

  const start = () => {
    try {
      localStorage.setItem(COOLDOWN_STORAGE_KEY, String(Date.now()));
    } catch {
      // ignore (private browsing / storage disabled)
    }
    setRemainingMs(COOLDOWN_MS);
  };

  return { remainingMs, start };
}

function useTurnstile(siteKey) {
  const containerRef = useRef(null);
  const widgetIdRef = useRef(null);
  const [token, setToken] = useState("");

  useEffect(() => {
    if (!siteKey) return;

    const render = () => {
      if (!window.turnstile || !containerRef.current || widgetIdRef.current)
        return;
      widgetIdRef.current = window.turnstile.render(containerRef.current, {
        sitekey: siteKey,
        theme: "dark",
        callback: (t) => setToken(t),
        "expired-callback": () => setToken(""),
        "error-callback": () => setToken(""),
      });
    };

    if (window.turnstile) {
      render();
      return;
    }

    const existing = document.querySelector(
      `script[src="${TURNSTILE_SCRIPT_SRC}"]`,
    );
    if (existing) {
      existing.addEventListener("load", render);
      return () => existing.removeEventListener("load", render);
    }

    const script = document.createElement("script");
    script.src = TURNSTILE_SCRIPT_SRC;
    script.async = true;
    script.defer = true;
    script.addEventListener("load", render);
    document.head.appendChild(script);
    return () => script.removeEventListener("load", render);
  }, [siteKey]);

  const reset = () => {
    if (window.turnstile && widgetIdRef.current) {
      window.turnstile.reset(widgetIdRef.current);
    }
    setToken("");
  };

  return { containerRef, token, reset };
}

export default function Contact() {
  const { t } = useLanguage();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [errorDetail, setErrorDetail] = useState("");
  const { containerRef: turnstileRef, token, reset: resetTurnstile } =
    useTurnstile(TURNSTILE_SITE_KEY);
  const { remainingMs: cooldownMs, start: startCooldown } = useSendCooldown();

  const configured = Boolean(WEB3FORMS_ACCESS_KEY);
  const needsHuman = Boolean(TURNSTILE_SITE_KEY);

  const handleChange = (field) => (event) =>
    setForm((prev) => ({ ...prev, [field]: event.target.value }));

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!configured || status === "sending") return;
    if (needsHuman && !token) return;
    if (cooldownMs > 0) return;

    setStatus("sending");
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `${t.contactFormSubjectDefault} — ${form.name}`,
          name: form.name,
          email: form.email,
          message: form.message,
        }),
      });
      const result = await response.json();
      if (result.success) {
        setStatus("sent");
        setForm({ name: "", email: "", message: "" });
        resetTurnstile();
        startCooldown();
      } else {
        console.error("Web3Forms error:", result);
        setErrorDetail(result.message || "");
        setStatus("error");
        resetTurnstile();
      }
    } catch (err) {
      console.error("Web3Forms request failed:", err);
      setErrorDetail(err.message || "");
      setStatus("error");
      resetTurnstile();
    }
  };

  const canSubmit =
    configured &&
    status !== "sending" &&
    cooldownMs <= 0 &&
    (!needsHuman || Boolean(token));

  return (
    <section
      id="contact"
      className="border-t border-white/10 bg-[var(--color-ink)] px-6 py-24 pb-32 sm:px-10 lg:px-16 lg:py-32"
    >
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <p className="text-xs font-semibold tracking-[0.14em] text-[var(--color-accent)] uppercase">
            03 — {t.navContact}
          </p>
          <h2 className="mt-5 text-3xl leading-tight font-semibold tracking-tight text-white sm:text-4xl">
            {t.footerTitlePre}
            <span className="text-gradient">{t.footerTitleStrong}</span>
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-white/50">
            {t.footerSubtitle}
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid gap-5 rounded-2xl border border-white/10 bg-[var(--color-surface)]/70 p-6 backdrop-blur-md sm:p-8 lg:col-span-8"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="flex flex-col gap-2 text-left">
              <span className="text-xs font-medium tracking-wide text-white/50 uppercase">
                {t.contactFormName}
              </span>
              <input
                type="text"
                required
                value={form.name}
                onChange={handleChange("name")}
                placeholder={t.contactFormNamePlaceholder}
                className="rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-white/30 outline-none transition focus:border-[var(--color-accent)]/60 focus:bg-white/10"
              />
            </label>

            <label className="flex flex-col gap-2 text-left">
              <span className="text-xs font-medium tracking-wide text-white/50 uppercase">
                {t.contactFormEmail}
              </span>
              <input
                type="email"
                required
                value={form.email}
                onChange={handleChange("email")}
                placeholder={t.contactFormEmailPlaceholder}
                className="rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-white/30 outline-none transition focus:border-[var(--color-accent)]/60 focus:bg-white/10"
              />
            </label>
          </div>

          <label className="flex flex-col gap-2 text-left">
            <span className="text-xs font-medium tracking-wide text-white/50 uppercase">
              {t.contactFormMessage}
            </span>
            <textarea
              required
              rows={5}
              value={form.message}
              onChange={handleChange("message")}
              placeholder={t.contactFormMessagePlaceholder}
              className="resize-none rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-white/30 outline-none transition focus:border-[var(--color-accent)]/60 focus:bg-white/10"
            />
          </label>

          {needsHuman && <div ref={turnstileRef} />}

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-white/35">
              {cooldownMs > 0
                ? `${t.contactFormCooldown} (${Math.ceil(cooldownMs / 1000)}s)`
                : status === "sent"
                  ? t.contactFormSuccess
                  : status === "error"
                    ? `${t.contactFormError}${errorDetail ? ` (${errorDetail})` : ""}`
                    : t.contactFormHint}
            </p>
            <TechButton type="submit" className="shrink-0" disabled={!canSubmit}>
              {status === "sending" ? t.contactFormSending : t.contactFormSubmit}
            </TechButton>
          </div>

          {!configured && (
            <p className="text-xs text-amber-400/80">
              Configure VITE_WEB3FORMS_ACCESS_KEY in .env.local to enable this
              form.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
