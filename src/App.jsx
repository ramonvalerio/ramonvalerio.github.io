import Header from "./components/Header";
import Hero from "./components/Hero";
import PortfolioGrid from "./components/PortfolioGrid";
import Footer from "./components/Footer";
import { LanguageProvider } from "./i18n/LanguageContext";

export default function App() {
  return (
    <LanguageProvider>
      <div
        id="top"
        className="min-h-screen bg-[var(--color-ink)] pb-20 sm:pb-24"
      >
        <Header />
        <Hero />
        <PortfolioGrid />
        <Footer />
      </div>
    </LanguageProvider>
  );
}
