import { useLanguage } from "../i18n/LanguageContext";

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section
      id="perfil"
      className="sticky top-0 z-0 h-[100dvh] overflow-hidden border-b border-white/5 bg-[var(--color-ink)]"
    >
      <video
        className="absolute inset-0 h-full w-full object-cover object-top"
        src="/videos/ramonvalerio_video.mp4"
        autoPlay
        muted
        loop
        playsInline
      />

      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-[var(--color-ink)]"
      />
      <div aria-hidden className="noise-grid absolute inset-0" />

      <div
        className="absolute inset-0 mx-auto flex w-full max-w-6xl flex-col items-center justify-center px-6 pb-16 text-center sm:px-10 lg:px-16"
        style={{
          paddingTop: "calc(var(--header-h, 0px) + var(--subheader-h, 0px))",
        }}
      >
        <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium tracking-wide text-white/70 uppercase backdrop-blur">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
          {t.badge}
        </p>

        <div className="relative mt-8 max-w-3xl rounded-2xl border border-white/10 bg-black/30 px-6 py-5 backdrop-blur-sm sm:px-8 sm:py-6">
          <p className="text-sm leading-[1.6] font-normal text-white/80 sm:text-base lg:text-lg">
            {t.heroP1Pre}
            <span className="text-gradient font-medium">
              {t.heroP1Strong1}
            </span>
            {t.heroP1Mid}
            <span className="text-gradient font-medium">
              {t.heroP1Strong2}
            </span>
            {t.heroP1Post}
          </p>

          <p className="mt-5 text-sm leading-[1.6] font-normal text-white/80 sm:text-base lg:text-lg">
            {t.heroP2Pre}
            <span className="text-gradient font-medium">{t.heroP2Strong}</span>
            {t.heroP2Post}
          </p>
        </div>
      </div>
    </section>
  );
}
