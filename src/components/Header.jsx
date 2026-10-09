import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useLanguage } from "../i18n/LanguageContext";
import LanguageSwitcher from "./LanguageSwitcher";

const SECTIONS = ["perfil", "portfolio", "expertise", "contact"];

export default function Header() {
  const { t } = useLanguage();
  const headerRef = useRef(null);
  const [active, setActive] = useState("perfil");

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

  useEffect(() => {
    const root = document.getElementById("scroll-root");
    const elements = SECTIONS.map((id) => document.getElementById(id)).filter(
      Boolean,
    );
    if (!root || !elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { root, threshold: 0.4 },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const links = [
    { id: "perfil", href: "#perfil", label: t.navProfile },
    { id: "portfolio", href: "#portfolio", label: t.navWork },
    { id: "expertise", href: "#expertise", label: t.navExpertise },
    { id: "contact", href: "#contact", label: t.navContact },
  ];

  return (
    <header
      ref={headerRef}
      className="fixed inset-x-0 top-0 z-40 border-b border-white/10 bg-[var(--color-ink)]/95 backdrop-blur-xl"
    >
      <div className="mx-auto flex h-[70px] max-w-7xl items-center justify-between gap-5 px-5 sm:px-8 lg:px-12">
        <a href="#perfil" className="flex min-w-0 items-center gap-4">
          <span className="block h-10 w-10 shrink-0 overflow-hidden rounded-xl border border-white/10">
            <img
              src="/images/profile/ramon_linkedin4.png"
              alt={t.heroName}
              className="h-full w-full object-cover"
            />
          </span>
          <span className="hidden min-w-0 sm:block">
            <span className="block truncate text-sm font-semibold tracking-tight text-white">
              {t.heroName}
            </span>
            <span className="block truncate text-[11px] text-white/40">
              {t.headerRole}
            </span>
          </span>
        </a>

        <div className="flex items-center gap-5 lg:gap-8">
          <nav className="hidden items-center gap-7 md:flex" aria-label={t.mainNavigation}>
            {links.map((link) => {
              const isActive = active === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`group relative flex items-center gap-1 py-1 text-[11px] font-semibold tracking-[0.14em] uppercase transition ${
                    isActive
                      ? "text-[var(--color-accent)] drop-shadow-[0_0_8px_rgba(124,242,214,0.65)]"
                      : "text-white/60 hover:text-[var(--color-accent)]"
                  }`}
                >
                  <span
                    aria-hidden
                    className={`font-mono transition-opacity ${
                      isActive ? "opacity-100" : "opacity-0 group-hover:opacity-50"
                    }`}
                  >
                    [
                  </span>
                  {link.label}
                  <span
                    aria-hidden
                    className={`font-mono transition-opacity ${
                      isActive ? "opacity-100" : "opacity-0 group-hover:opacity-50"
                    }`}
                  >
                    ]
                  </span>
                  <span
                    aria-hidden
                    className={`absolute -bottom-0.5 left-0 h-px bg-[var(--color-accent)] shadow-[0_0_6px_rgba(124,242,214,0.8)] transition-all duration-300 ${
                      isActive ? "w-full" : "w-0 group-hover:w-full group-hover:shadow-none group-hover:bg-white/40"
                    }`}
                  />
                </a>
              );
            })}
          </nav>
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
}
