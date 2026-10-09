import { useRef, useState } from "react";
import { useLanguage } from "../i18n/LanguageContext";

export default function Hero() {
  const { t } = useLanguage();
  const videoRef = useRef(null);
  const [objectPosition, setObjectPosition] = useState("object-top");

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video || !video.duration) return;
    const isLastThird = video.currentTime >= (video.duration * 2) / 3;
    setObjectPosition(isLastThird ? "object-bottom" : "object-top");
  };

  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden border-b border-white/5 px-6 pt-20 pb-16 sm:min-h-[92vh] sm:px-10 sm:pt-24 lg:px-16">
      <video
        ref={videoRef}
        onTimeUpdate={handleTimeUpdate}
        className={`absolute inset-0 h-full w-full object-cover transition-[object-position] duration-700 ${objectPosition}`}
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

      <div className="relative mx-auto flex w-full max-w-6xl flex-col items-center text-center">
        <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium tracking-wide text-white/70 uppercase backdrop-blur">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
          {t.badge}
        </p>

        <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-7">
          <div className="relative h-16 w-16 flex-shrink-0 xs:h-20 xs:w-20 sm:h-28 sm:w-28 lg:h-32 lg:w-32">
            <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-[var(--color-accent)]/40 via-[var(--color-accent-2)]/30 to-[var(--color-accent-3)]/30 blur-md" />
            <div className="glass relative h-full w-full overflow-hidden rounded-full border border-white/15">
              <img
                src="/images/profile/ramon_linkedin4.png"
                alt={t.heroName}
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          <h1 className="text-3xl leading-[1.05] font-normal tracking-tight text-white xs:text-4xl sm:text-6xl lg:text-7xl">
            {t.heroName}
          </h1>
        </div>

        <p className="mt-6 max-w-2xl text-base leading-snug text-white/70 sm:text-xl lg:text-2xl">
          {t.heroP1Pre}
          <span className="text-gradient font-medium">{t.heroP1Strong}</span>
          {t.heroP1Post}
        </p>

        <p className="mt-4 max-w-2xl text-base leading-snug text-white/70 sm:text-xl lg:text-2xl">
          {t.heroP2Pre}
          <span className="text-gradient font-medium">{t.heroP2Strong}</span>
          {t.heroP2Post}
        </p>
      </div>
    </section>
  );
}
