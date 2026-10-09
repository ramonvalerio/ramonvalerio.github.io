import { useEffect, useRef } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import PortfolioGrid from "./components/PortfolioGrid";
import Expertise from "./components/Expertise";
import Footer from "./components/Footer";
import { LanguageProvider } from "./i18n/LanguageContext";

const SECTION_IDS = ["perfil", "portfolio", "expertise", "contact"];
const WHEEL_LOCK_MS = 900;
const WHEEL_IDLE_RESET_MS = 150;

export default function App() {
  const lockRef = useRef(false);
  const accumRef = useRef(0);
  const idleTimerRef = useRef(null);

  useEffect(() => {
    const root = document.getElementById("scroll-root");
    if (!root) return;

    const onWheel = (event) => {
      if (event.target.closest("[data-scrollable]")) return;
      if (Math.abs(event.deltaY) < 2) return;
      event.preventDefault();

      accumRef.current += event.deltaY;
      clearTimeout(idleTimerRef.current);
      idleTimerRef.current = setTimeout(() => {
        accumRef.current = 0;
      }, WHEEL_IDLE_RESET_MS);

      if (lockRef.current) return;
      if (Math.abs(accumRef.current) < 12) return;

      const dir = accumRef.current > 0 ? 1 : -1;
      accumRef.current = 0;

      const sections = SECTION_IDS.map((id) => document.getElementById(id)).filter(
        Boolean,
      );
      const scrollTop = root.scrollTop;
      const currentIndex = sections.reduce((closest, el, i) => {
        return Math.abs(el.offsetTop - scrollTop) <
          Math.abs(sections[closest].offsetTop - scrollTop)
          ? i
          : closest;
      }, 0);

      const targetIndex = Math.min(
        Math.max(currentIndex + dir, 0),
        sections.length - 1,
      );
      const target = sections[targetIndex];
      if (!target) return;

      lockRef.current = true;
      root.scrollTo({ top: target.offsetTop, behavior: "smooth" });
      setTimeout(() => {
        lockRef.current = false;
      }, WHEEL_LOCK_MS);
    };

    root.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      root.removeEventListener("wheel", onWheel);
      clearTimeout(idleTimerRef.current);
    };
  }, []);

  return (
    <LanguageProvider>
      <div
        id="scroll-root"
        className="h-[100dvh] overflow-y-scroll scroll-smooth bg-[var(--color-ink)]"
      >
        <Header />
        <Hero />
        <PortfolioGrid />
        <Expertise />
        <div
          id="contact"
          aria-hidden
          style={{ height: "var(--footer-h, 0px)" }}
        />
        <Footer />
      </div>
    </LanguageProvider>
  );
}
