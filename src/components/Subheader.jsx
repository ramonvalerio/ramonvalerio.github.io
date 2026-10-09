import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useLanguage } from "../i18n/LanguageContext";

export default function Subheader() {
  const { t } = useLanguage();
  const [active, setActive] = useState("perfil");
  const subheaderRef = useRef(null);

  useLayoutEffect(() => {
    const el = subheaderRef.current;
    if (!el) return;
    const setHeight = () =>
      document.documentElement.style.setProperty(
        "--subheader-h",
        `${el.offsetHeight}px`,
      );
    setHeight();
    const observer = new ResizeObserver(setHeight);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const scrollRoot = document.getElementById("scroll-root");
    const portfolio = document.getElementById("portfolio");
    if (!scrollRoot || !portfolio) return;

    const updateActive = () => {
      const triggerPoint = scrollRoot.scrollTop + scrollRoot.clientHeight / 2;
      setActive(portfolio.offsetTop <= triggerPoint ? "portfolio" : "perfil");
    };

    updateActive();
    scrollRoot.addEventListener("scroll", updateActive, { passive: true });
    return () => scrollRoot.removeEventListener("scroll", updateActive);
  }, []);

  const links = [
    { id: "perfil", href: "/#perfil", index: "01", label: t.navProfile },
    { id: "portfolio", href: "#portfolio", index: "02", label: t.navProjects },
  ];

  const handleNavClick = (id) => (event) => {
    event.preventDefault();
    const scrollRoot = document.getElementById("scroll-root");
    if (!scrollRoot) return;
    if (id === "perfil") {
      scrollRoot.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
      ref={subheaderRef}
      className="fixed inset-x-0 z-30 px-4 py-2 sm:px-10 lg:px-16"
      style={{ top: "var(--header-h, 0px)" }}
    >
      <nav className="mx-auto flex max-w-[min(100dvh,100vw)] items-center gap-4 sm:gap-8">
        {links.map((link) => {
          const isActive = active === link.id;
          return (
            <a
              key={link.id}
              href={link.href}
              onClick={handleNavClick(link.id)}
              aria-current={isActive ? "page" : undefined}
              className={`group relative flex items-center gap-1.5 py-1 text-sm font-medium tracking-wide uppercase transition-colors sm:text-base ${
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
    </div>
  );
}
