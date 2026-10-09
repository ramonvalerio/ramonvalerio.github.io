import { useLayoutEffect, useRef } from "react";
import { useLanguage } from "../i18n/LanguageContext";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Header() {
  const { t } = useLanguage();
  const headerRef = useRef(null);

  useLayoutEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const setHeight = () =>
      document.documentElement.style.setProperty(
        "--header-h",
        `${el.offsetHeight}px`,
      );
    setHeight();
    const observer = new ResizeObserver(setHeight);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <header
      ref={headerRef}
      className="glass fixed inset-x-0 top-0 z-40 border-b border-white/10 px-3 py-1.5 sm:px-6 sm:py-2 lg:px-10"
    >
      <div className="mx-auto flex max-w-[min(100dvh,100vw)] items-center justify-between gap-3 sm:gap-4">
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="relative h-14 w-14 flex-shrink-0 xs:h-16 xs:w-16 sm:h-20 sm:w-20">
            <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-[var(--color-accent)]/40 via-[var(--color-accent-2)]/30 to-[var(--color-accent-3)]/30 blur-md" />
            <div className="glass relative h-full w-full overflow-hidden rounded-full border-2! border-cyan-400/80!">
              <img
                src="/images/profile/ramon_linkedin4.png"
                alt={t.heroName}
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          <div className="flex flex-col">
            <span className="text-xl font-medium tracking-tight text-white sm:text-2xl lg:text-3xl">
              {t.heroName}
            </span>
            <span className="text-xs font-semibold text-white/50 sm:text-sm">
              AI Engineer
            </span>
          </div>
        </div>

        <LanguageSwitcher />
      </div>
    </header>
  );
}
