import Hero from "./components/Hero";
import PortfolioGrid from "./components/PortfolioGrid";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen bg-[var(--color-ink)]">
      <Hero />
      <PortfolioGrid />
      <Footer />
    </div>
  );
}
