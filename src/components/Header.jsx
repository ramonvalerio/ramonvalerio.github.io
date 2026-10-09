import { useEffect, useState } from "react";
import { useLanguage } from "../i18n/LanguageContext";
import LanguageSwitcher from "./LanguageSwitcher";

const SECTIONS = ["top", "portfolio"];

export default function Header() {
  const { t } = useLanguage();
  const [active, setActive] = useState("top");

  useEffect(() => {
    const elements = SECTIONS.map((id) => document.getElementById(id)).filter(
      Boolean,
    );

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { threshold: 0.6 },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const links = [
    { id: "top", href: "#top", index: "01", label: t.navProfile },
    { id: "portfolio", href: "#portfolio", index: "02", label: t.navProjects },
  ];

  return (
    <header className="glass fixed inset-x-0 top-0 z-40 border-b border-white/10 px-6 py-3 sm:px-10 lg:px-16">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
        <nav className="flex items-center gap-6 sm:gap-8">
          {links.map((link) => {
            const isActive = active === link.id;
            return (
              <a
                key={link.id}
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                className={`group relative flex items-center gap-1.5 py-1 font-mono text-xs tracking-[0.15em] uppercase transition-colors sm:text-sm ${
                  isActive
                    ? "text-[var(--color-accent)]"
                    : "text-white/50 hover:text-white/80"
                }`}
              >
                <span
                  className={`text-[10px] transition-colors ${
                    isActive ? "text-[var(--color-accent)]/60" : "text-white/25"
                  }`}
                >
                  {link.index}
                </span>
                {link.label}
                <span
                  className={`absolute -bottom-0.5 left-0 h-px bg-[var(--color-accent)] transition-all duration-300 ${
                    isActive ? "w-full" : "w-0 group-hover:w-full group-hover:bg-white/40"
                  }`}
                />
              </a>
            );
          })}
        </nav>

        <LanguageSwitcher />
      </div>
    </header>
  );
}
