import { useLanguage } from "../i18n/LanguageContext";
import TechButton from "./TechButton";

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section
      id="perfil"
      className="editorial-grid relative min-h-[100dvh] overflow-hidden border-b border-white/5 bg-[var(--color-ink)]"
    >
      <div
        className="relative mx-auto grid min-h-[100dvh] w-full max-w-7xl grid-cols-1 items-center gap-14 px-5 pt-28 pb-28 sm:px-8 lg:grid-cols-12 lg:gap-12 lg:px-12 lg:pt-32"
      >
        <div className="lg:col-span-7">
          <p className="mb-8 flex items-center gap-3 text-xs font-semibold tracking-[0.14em] text-[var(--color-accent)] uppercase">
            <span className="h-px w-10 bg-[var(--color-accent)]" />
            {t.badge}
          </p>

          <h1 className="max-w-4xl text-[clamp(3rem,6vw,5.6rem)] leading-[0.96] font-semibold tracking-[-0.055em] text-white">
            {t.heroTitleLead}{" "}
            <span className="text-gradient">{t.heroTitleAccent}</span>{" "}
            {t.heroTitleTail}
          </h1>

          <p className="mt-8 max-w-2xl text-base leading-[1.65] font-medium text-white/68 sm:text-lg">
            {t.heroIntro}
          </p>

          <div className="mt-10 flex flex-col gap-3 xs:flex-row">
            <TechButton as="a" href="#portfolio" className="inline-flex min-h-12 items-center gap-3">
              {t.ctaProjects} <span aria-hidden>↘</span>
            </TechButton>
            <a href="#contact" className="inline-flex min-h-12 items-center justify-center gap-3 rounded-xl border border-white/15 bg-[var(--color-surface)] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[var(--color-surface-3)]">
              {t.ctaContact} <span aria-hidden>↗</span>
            </a>
          </div>
        </div>

        <div className="lg:col-span-5 lg:pl-5">
          <div className="relative mx-auto aspect-square w-full max-w-[500px] overflow-hidden border border-[var(--color-accent)]/25 bg-[var(--color-surface)] shadow-[0_30px_90px_rgba(0,0,0,0.45),0_0_40px_rgba(124,242,214,0.06)]">
            <video className="absolute inset-0 h-full w-full object-cover object-top" src="/videos/ramonvalerio_video.mp4" aria-label={t.heroVideoLabel} autoPlay muted loop playsInline />
            <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/35" />
            <div aria-hidden className="absolute inset-0 bg-[linear-gradient(rgba(124,242,214,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(124,242,214,0.06)_1px,transparent_1px)] bg-[size:52px_52px] opacity-55" />
            <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--color-accent)]/80 to-transparent" />

            <div className="absolute inset-x-6 top-5 flex items-center justify-between font-mono text-[10px] tracking-[0.16em] text-white/65 uppercase">
              <span>CAM_01 // 4K</span>
              <span className="inline-flex items-center gap-2 font-semibold text-red-400"><span className="h-2.5 w-2.5 animate-pulse rounded-full bg-red-500 shadow-[0_0_12px_rgba(239,68,68,0.95)]" />REC</span>
            </div>

            <span aria-hidden className="absolute top-4 left-4 h-8 w-8 border-t border-l border-[var(--color-accent)]/75" />
            <span aria-hidden className="absolute top-4 right-4 h-8 w-8 border-t border-r border-[var(--color-accent)]/75" />
            <span aria-hidden className="absolute bottom-4 left-4 h-8 w-8 border-b border-l border-[var(--color-accent)]/75" />
            <span aria-hidden className="absolute right-4 bottom-4 h-8 w-8 border-r border-b border-[var(--color-accent)]/75" />

            <div aria-hidden className="absolute top-1/2 left-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2 border border-white/20">
              <span className="absolute top-1/2 -left-3 h-px w-3 bg-white/30" />
              <span className="absolute top-1/2 -right-3 h-px w-3 bg-white/30" />
              <span className="absolute -top-3 left-1/2 h-3 w-px bg-white/30" />
              <span className="absolute -bottom-3 left-1/2 h-3 w-px bg-white/30" />
            </div>

            <span className="absolute right-8 bottom-24 font-mono text-[10px] tracking-[0.12em] text-white/45">00:16:24:08</span>

            <div className="absolute inset-x-8 bottom-8 flex items-end justify-between gap-5 border-t border-white/20 pt-5 text-[11px] font-semibold tracking-[0.12em] text-white/65 uppercase">
              <span>{t.heroMediaExpertise}</span>
              <span className="inline-flex items-center gap-2 text-right"><span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />{t.heroName}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
