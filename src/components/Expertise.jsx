import { useLanguage } from "../i18n/LanguageContext";

export default function Expertise() {
  const { t } = useLanguage();

  return (
    <section id="expertise" className="border-t border-white/10 bg-[var(--color-surface)] px-6 py-24 pb-32 sm:px-10 lg:px-16 lg:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <p className="text-xs font-semibold tracking-[0.14em] text-[var(--color-accent)] uppercase">02 — {t.navExpertise}</p>
          <h2 className="mt-5 text-3xl leading-tight font-semibold tracking-tight text-white sm:text-4xl">{t.expertiseTitle}</h2>
        </div>
        <div className="grid border-t border-white/10 sm:grid-cols-2 lg:col-span-8">
          {t.expertiseItems.map((item, index) => (
            <article key={item.title} className={`border-b border-white/10 py-7 sm:px-8 ${index % 2 === 0 ? "sm:border-r" : ""}`}>
              <span className="text-xs font-semibold text-[var(--color-accent)]">0{index + 1}</span>
              <h3 className="mt-4 text-lg font-semibold text-white">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/50">{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
