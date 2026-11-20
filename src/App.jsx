import { useEffect } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import PortfolioGrid from "./components/PortfolioGrid";
import Expertise from "./components/Expertise";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import { LanguageProvider } from "./i18n/LanguageContext";

const SECTION_IDS = ["perfil", "portfolio", "expertise", "contact"];
const GESTURE_GAP_MS = 180; // wheel silence that marks the end of one gesture
const WHEEL_THRESHOLD = 12; // accumulated deltaY needed to trigger a jump
const SCROLL_END_FALLBACK_MS = 1000; // for browsers without the scrollend event

export default function App() {
  useEffect(() => {
    const root = document.getElementById("scroll-root");
    if (!root) return;

    let navigating = false;
    let gestureConsumed = false; // a jump already happened in the current gesture
    let accum = 0;
    let lastWheelAt = 0;
    let fallbackTimer = 0;

    const finishNavigation = () => {
      navigating = false;
      clearTimeout(fallbackTimer);
    };

    // same rule the header uses to highlight the active menu item
    const activeIndex = (sections) => {
      const triggerLine = root.scrollTop + root.clientHeight * 0.35;
      let current = 0;
      sections.forEach((el, i) => {
        if (el.offsetTop <= triggerLine) current = i;
      });
      return current;
    };

    // exactly what clicking the menu link does: a smooth anchor jump
    const goToSection = (el) => {
      navigating = true;
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      history.replaceState(null, "", `#${el.id}`);
      clearTimeout(fallbackTimer);
      fallbackTimer = setTimeout(finishNavigation, SCROLL_END_FALLBACK_MS);
    };

    const onWheel = (event) => {
      if (event.ctrlKey) return; // pinch-zoom on trackpads
      if (event.target.closest("[data-scrollable]")) return;
      if (Math.abs(event.deltaY) < 2) return;
      event.preventDefault();

      const now = performance.now();
      if (now - lastWheelAt > GESTURE_GAP_MS) {
        gestureConsumed = false;
        accum = 0;
      }
      lastWheelAt = now;

      // one gesture (including trackpad inertia) moves exactly one section
      if (navigating || gestureConsumed) return;
      accum += event.deltaY;
      if (Math.abs(accum) < WHEEL_THRESHOLD) return;

      const sections = SECTION_IDS.map((id) => document.getElementById(id)).filter(Boolean);
      const target = sections[activeIndex(sections) + (accum > 0 ? 1 : -1)];
      accum = 0;
      gestureConsumed = true;
      if (target) goToSection(target);
    };

    root.addEventListener("wheel", onWheel, { passive: false });
    root.addEventListener("scrollend", finishNavigation);
    return () => {
      root.removeEventListener("wheel", onWheel);
      root.removeEventListener("scrollend", finishNavigation);
      clearTimeout(fallbackTimer);
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
        <Contact />
        <div aria-hidden style={{ height: "var(--footer-h, 0px)" }} />
        <Footer />
      </div>
    </LanguageProvider>
  );
}
