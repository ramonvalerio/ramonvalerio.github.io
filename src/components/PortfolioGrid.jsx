import { useEffect, useRef, useState } from "react";
import { getProjects } from "../data/projects";
import { useLanguage } from "../i18n/LanguageContext";
import ProjectModal from "./ProjectModal";
import TechButton from "./TechButton";

const SWIPE_THRESHOLD_PX = 60;
const BOUNCE_EASING = "cubic-bezier(0.17, 0.67, 0.55, 1.43)";

function relativeOffset(i, index, length) {
  let diff = i - index;
  if (diff > length / 2) diff -= length;
  if (diff < -length / 2) diff += length;
  return diff;
}

export default function PortfolioGrid() {
  const [index, setIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const dragInfo = useRef({ startX: 0, dragging: false });
  const { lang, t } = useLanguage();
  const projects = getProjects(lang);
  const project = projects[index];
  const hasMultiple = projects.length > 1;

  const go = (dir) =>
    setIndex((i) => (i + dir + projects.length) % projects.length);
  const nextStep = () => go(1);
  const prevStep = () => go(-1);

  const handlePointerDown = (clientX) => {
    if (!hasMultiple) return;
    dragInfo.current = { startX: clientX, dragging: true };
  };

  const handlePointerUp = (clientX) => {
    if (!dragInfo.current.dragging) return;
    dragInfo.current.dragging = false;
    const delta = clientX - dragInfo.current.startX;
    if (delta <= -SWIPE_THRESHOLD_PX) nextStep();
    else if (delta >= SWIPE_THRESHOLD_PX) prevStep();
  };

  const handleMouseDown = (event) => handlePointerDown(event.clientX);

  useEffect(() => {
    const onUp = (event) => handlePointerUp(event.clientX);
    window.addEventListener("mouseup", onUp);
    return () => window.removeEventListener("mouseup", onUp);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const touchStartXRef = useRef(0);
  const handleTouchStart = (event) => {
    touchStartXRef.current = event.touches[0].clientX;
    handlePointerDown(event.touches[0].clientX);
  };
  const handleTouchEnd = (event) => {
    const touch = event.changedTouches[0];
    handlePointerUp(touch ? touch.clientX : touchStartXRef.current);
  };

  const renderCardHeader = (p) => (
    <div className="flex h-28 w-full shrink-0 items-center justify-center border-b border-white/10 bg-black/30 px-6 sm:h-32">
      {p.image ? (
        <img
          src={p.image}
          alt={p.title}
          className="h-full max-h-20 max-w-[70%] object-contain sm:max-h-24"
          draggable={false}
        />
      ) : (
        <span className="text-sm font-semibold tracking-wide text-white/30 uppercase">
          {p.title}
        </span>
      )}
    </div>
  );

  const renderCardBody = (p) => (
    <div className="relative flex h-full flex-col p-6 sm:p-8">
      <h3 className="text-left text-xl font-semibold text-white">{p.title}</h3>
      {p.role && (
        <p className="mt-1 text-left text-xs font-medium tracking-wide text-[var(--color-accent)]">
          {p.role}
        </p>
      )}
      <p className="mt-3 text-left text-sm leading-relaxed font-medium text-white/70">
        {p.tagline}
      </p>

      <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-1 text-left text-xs text-white/50">
        {p.startDateLabel && (
          <span>
            <span className="text-white/30">{t.projectStart}:</span>{" "}
            {p.startDateLabel}
          </span>
        )}
        {p.statusLabel && (
          <span className="inline-flex items-center gap-1.5">
            <span className="text-white/30">{t.projectStatus}:</span>
            <span className="inline-flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
              {p.statusLabel}
            </span>
          </span>
        )}
      </div>

      <div className="mt-5 flex flex-wrap justify-start gap-2">
        {p.tech.map((tech) => (
          <span
            key={tech}
            className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/60"
          >
            {tech}
          </span>
        ))}
      </div>

      <div className="mt-auto flex justify-end pt-6">
        <TechButton
          type="button"
          onClick={() => setShowModal(true)}
          style={{ padding: "0.4rem 0.9rem", fontSize: "0.7rem" }}
        >
          {t.viewDetails}
        </TechButton>
      </div>
    </div>
  );

  const cardStyle = (offset) => {
    const base = {
      position: "absolute",
      inset: 0,
      transition: `transform 500ms ${BOUNCE_EASING}, opacity 450ms ease-in-out`,
    };
    if (offset === 0) {
      return { ...base, transform: "translateX(0%) scale(1)", opacity: 1, zIndex: 3 };
    }
    if (offset === -1) {
      return {
        ...base,
        transform: "translateX(-28%) scale(0.82)",
        opacity: 0.35,
        zIndex: 2,
      };
    }
    if (offset === 1) {
      return {
        ...base,
        transform: "translateX(28%) scale(0.82)",
        opacity: 0.35,
        zIndex: 2,
      };
    }
    return {
      ...base,
      transform: `translateX(${offset < 0 ? "-55%" : "55%"}) scale(0)`,
      opacity: 0,
      zIndex: 1,
      pointerEvents: "none",
    };
  };

  return (
    <section
      id="portfolio"
      className="relative z-10 flex min-h-[100dvh] items-center overflow-hidden bg-[var(--color-ink)] px-6 pb-24 sm:px-10 lg:px-16"
      style={{
        paddingTop:
          "calc(var(--header-h, 0px) + var(--subheader-h, 0px) + 1.5rem)",
      }}
    >
      {projects.map(
        (p) =>
          p.background && (
            <div
              key={p.id}
              aria-hidden
              className="absolute inset-0 bg-cover bg-center transition-opacity duration-[450ms] ease-in-out"
              style={{
                backgroundImage: `url(${p.background})`,
                opacity: p.id === project.id ? 1 : 0,
              }}
            />
          ),
      )}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-[var(--color-ink)]"
      />
      <div aria-hidden className="noise-grid absolute inset-0" />

      <div className="relative mx-auto flex w-full max-w-6xl flex-col items-center text-center">
        <div className="relative flex w-full max-w-3xl items-center justify-center px-20 sm:px-28">
          {hasMultiple && (
            <button
              type="button"
              aria-label="Projeto anterior"
              onClick={prevStep}
              className="group absolute top-1/2 left-0 z-20 h-16 w-16 -translate-x-1/4 -translate-y-1/2"
            >
              <span
                className="absolute inset-0 border border-[var(--color-accent)]/50 bg-black/50 backdrop-blur-sm transition-all duration-300 group-hover:border-[var(--color-accent)] group-hover:bg-[var(--color-accent)]/15 group-hover:shadow-[0_0_30px_-4px_rgba(124,242,214,0.9)]"
                style={{
                  clipPath:
                    "polygon(100% 0%, 35% 0%, 0% 50%, 35% 100%, 100% 100%, 65% 50%)",
                }}
              />
              <span
                className="absolute top-1/2 left-[22%] h-6 w-6 border-t-2 border-l-2 border-[var(--color-accent)]"
                style={{ transform: "translateY(-50%) rotate(-45deg)" }}
              />
              <span className="absolute top-2 left-2 h-2 w-2 border-t border-l border-[var(--color-accent)]/60" />
              <span className="absolute bottom-2 left-2 h-2 w-2 border-b border-l border-[var(--color-accent)]/60" />
            </button>
          )}

          <div
            className="relative h-[560px] w-full max-w-xl select-none sm:h-[600px]"
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            aria-live="polite"
            aria-label={`${project.title}, ${index + 1} de ${projects.length}`}
          >
            {projects.map((p, i) => {
              const offset = relativeOffset(i, index, projects.length);
              if (Math.abs(offset) > 1) return null;
              return (
                <div
                  key={p.id}
                  onClick={() => offset !== 0 && setIndex(i)}
                  className={`flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-[var(--color-surface)]/80 shadow-[0_24px_70px_rgba(0,0,0,0.5)] backdrop-blur-md ${
                    offset !== 0 ? "cursor-pointer" : ""
                  }`}
                  style={cardStyle(offset)}
                >
                  {renderCardHeader(p)}
                  <div data-scrollable className="flex-1 overflow-y-auto">
                    {renderCardBody(p)}
                  </div>
                </div>
              );
            })}
          </div>

          {hasMultiple && (
            <button
              type="button"
              aria-label="Próximo projeto"
              onClick={nextStep}
              className="group absolute top-1/2 right-0 z-20 h-16 w-16 translate-x-1/4 -translate-y-1/2"
            >
              <span
                className="absolute inset-0 border border-[var(--color-accent)]/50 bg-black/50 backdrop-blur-sm transition-all duration-300 group-hover:border-[var(--color-accent)] group-hover:bg-[var(--color-accent)]/15 group-hover:shadow-[0_0_30px_-4px_rgba(124,242,214,0.9)]"
                style={{
                  clipPath:
                    "polygon(0% 0%, 65% 0%, 100% 50%, 65% 100%, 0% 100%, 35% 50%)",
                }}
              />
              <span
                className="absolute top-1/2 right-[22%] h-6 w-6 border-t-2 border-r-2 border-[var(--color-accent)]"
                style={{ transform: "translateY(-50%) rotate(45deg)" }}
              />
              <span className="absolute top-2 right-2 h-2 w-2 border-t border-r border-[var(--color-accent)]/60" />
              <span className="absolute right-2 bottom-2 h-2 w-2 border-r border-b border-[var(--color-accent)]/60" />
            </button>
          )}
        </div>

        {hasMultiple && (
          <div
            className="mt-8 flex items-center gap-5"
            role="group"
            aria-label="Navegação dos projetos"
          >
            <div className="flex items-center gap-2">
              {projects.map((p, i) => (
                <button
                  key={p.id}
                  type="button"
                  aria-label={p.title}
                  onClick={() => setIndex(i)}
                  className={`h-1.5 rounded-full transition-all ${
                    i === index
                      ? "w-6 bg-[var(--color-accent)]"
                      : "w-1.5 bg-white/20 hover:bg-white/40"
                  }`}
                />
              ))}
            </div>

            <span className="min-w-10 text-xs tabular-nums text-white/40">
              {String(index + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
            </span>
          </div>
        )}
      </div>

      <ProjectModal project={showModal ? project : null} onClose={() => setShowModal(false)} />
    </section>
  );
}
