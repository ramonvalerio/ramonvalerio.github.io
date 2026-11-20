import { useEffect, useState } from "react";
import { useLanguage } from "../i18n/LanguageContext";
import { EMAIL, LINKEDIN_URL, RESUME_URL } from "../data/profile";
import TechButton from "./TechButton";

// Direct contact options instead of a form: recruiters reach out on LinkedIn or by
// email, and a form needed a backend (Supabase, Resend, Turnstile) that could be
// abused to send mail to third parties. See ADR 0005.
export default function Contact() {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(timer);
  }, [copied]);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
    } catch {
      // clipboard blocked (insecure context / permissions): the address stays visible to copy by hand
    }
  };

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
          <p className="mt-4 text-sm leading-relaxed text-white/50">{t.footerSubtitle}</p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[var(--color-surface)]/70 p-6 backdrop-blur-md sm:p-8 lg:col-span-8">
          <p className="inline-flex items-center gap-2 text-sm font-medium text-[var(--color-accent)]">
            <span className="h-2 w-2 rounded-full bg-[var(--color-accent)] shadow-[0_0_10px_var(--color-accent)]" />
            {t.contactAvailability}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2">
            <a
              href={`mailto:${EMAIL}`}
              className="text-xl font-semibold tracking-tight text-white transition hover:text-[var(--color-accent)] sm:text-2xl"
            >
              {EMAIL}
            </a>
            <button
              type="button"
              onClick={copyEmail}
              className="rounded-lg border border-white/15 px-3 py-1.5 text-xs font-medium text-white/70 transition hover:bg-white/10 hover:text-white"
              aria-live="polite"
            >
              {copied ? t.contactCopied : t.contactCopy}
            </button>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <TechButton
              as="a"
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center justify-center gap-3"
            >
              {t.contactLinkedIn} <span aria-hidden>↗</span>
            </TechButton>
            <TechButton
              as="a"
              href={`mailto:${EMAIL}`}
              tone="blue"
              className="inline-flex min-h-12 items-center justify-center gap-3"
            >
              {t.contactEmail} <span aria-hidden>✉</span>
            </TechButton>
            <a
              href={RESUME_URL}
              download
              className="inline-flex min-h-12 items-center justify-center gap-3 rounded-xl border border-white/15 bg-[var(--color-surface)] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[var(--color-surface-3)]"
            >
              {t.ctaResume} <span aria-hidden>↓</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
