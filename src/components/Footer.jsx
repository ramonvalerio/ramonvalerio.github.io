import { useLayoutEffect, useRef } from "react";
import { useLanguage } from "../i18n/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();
  const footerRef = useRef(null);

  useLayoutEffect(() => {
    const el = footerRef.current;
    if (!el) return;
    const setHeight = () =>
      document.documentElement.style.setProperty(
        "--footer-h",
        `${el.offsetHeight}px`,
      );
    setHeight();
    const observer = new ResizeObserver(setHeight);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-[var(--color-ink)]/95 px-6 py-4 backdrop-blur-xl sm:px-10 lg:px-16"
      style={{
        paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 1rem)",
      }}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <a
            href="https://www.linkedin.com/in/ramonvalerio"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/12 bg-white/5 text-[#D1D5DB] backdrop-blur transition-all duration-150 hover:border-cyan-300/50 hover:text-cyan-300 focus-visible:border-cyan-300/50 focus-visible:text-cyan-300 focus-visible:ring-2 focus-visible:ring-cyan-300/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-ink)] focus-visible:outline-none"
          >
            <svg className="h-[22px] w-[22px] sm:h-6 sm:w-6">
              <use href="/icons.svg#linkedin-icon" />
            </svg>
          </a>
          <a
            href="https://github.com/ramonvalerio"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/12 bg-white/5 text-[#D1D5DB] backdrop-blur transition-all duration-150 hover:border-cyan-300/50 hover:text-cyan-300 focus-visible:border-cyan-300/50 focus-visible:text-cyan-300 focus-visible:ring-2 focus-visible:ring-cyan-300/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-ink)] focus-visible:outline-none"
          >
            <svg className="h-[22px] w-[22px] sm:h-6 sm:w-6">
              <use href="/icons.svg#github-icon" />
            </svg>
          </a>
        </div>

        <p className="text-right text-[10px] text-white/30 sm:text-left sm:text-[11px]">
          © {new Date().getFullYear()} Ramon Valerio. {t.footerRights}
        </p>
      </div>
    </footer>
  );
}
