import Header from "./components/Header";
import Hero from "./components/Hero";
import PortfolioGrid from "./components/PortfolioGrid";
import Footer from "./components/Footer";
import { LanguageProvider } from "./i18n/LanguageContext";

export default function App() {
  return (
    <LanguageProvider>
      <div className="h-[100dvh] snap-y snap-mandatory overflow-y-scroll scroll-smooth bg-[var(--color-ink)]">
        <Header />
        <Hero />
        <PortfolioGrid />
        <Footer />
      </div>
    </LanguageProvider>
  );
}
