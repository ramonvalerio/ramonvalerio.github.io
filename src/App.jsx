import Header from "./components/Header";
import Subheader from "./components/Subheader";
import Hero from "./components/Hero";
import PortfolioGrid from "./components/PortfolioGrid";
import Footer from "./components/Footer";
import { LanguageProvider } from "./i18n/LanguageContext";

export default function App() {
  return (
    <LanguageProvider>
      <div
        id="scroll-root"
        className="h-[100dvh] overflow-y-scroll scroll-smooth bg-[var(--color-ink)]"
      >
        <Header />
        <Subheader />
        <Hero />
        <PortfolioGrid />
        <Footer />
      </div>
    </LanguageProvider>
  );
}
