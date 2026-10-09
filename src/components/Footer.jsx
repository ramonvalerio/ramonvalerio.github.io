import { useLanguage } from "../i18n/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer
      id="contact"
      className="glass fixed inset-x-0 bottom-0 z-40 border-t border-white/10 px-6 py-4 sm:px-10 sm:py-5 lg:px-16"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <a
            href="https://www.linkedin.com/in/ramonvalerio"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-[0_0_24px_-4px_var(--color-accent)] transition hover:scale-110 hover:bg-[var(--color-accent)] sm:h-14 sm:w-14"
          >
            <svg className="h-6 w-6 sm:h-7 sm:w-7">
              <use href="/icons.svg#linkedin-icon" />
            </svg>
          </a>
          <a
            href="https://github.com/ramonvalerio"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-[0_0_24px_-4px_var(--color-accent-2)] transition hover:scale-110 hover:bg-[var(--color-accent-2)] sm:h-14 sm:w-14"
          >
            <svg className="h-6 w-6 sm:h-7 sm:w-7">
              <use href="/icons.svg#github-icon" />
            </svg>
          </a>
        </div>

        <div className="flex items-center gap-4">
          <a
            href="#portfolio"
            className="rounded-full bg-white px-5 py-2.5 text-xs font-semibold text-black transition hover:scale-[1.03] hover:bg-white/90 sm:text-sm"
          >
            {t.ctaProjects}
          </a>

          <p className="hidden text-[11px] text-white/30 sm:block">
            © {new Date().getFullYear()} Ramon Valerio. {t.footerRights}
          </p>
        </div>
      </div>
    </footer>
  );
}
