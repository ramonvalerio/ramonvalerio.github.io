import { useEffect, useRef, useState } from "react";
import { getProjects } from "../data/projects";
import { useLanguage } from "../i18n/LanguageContext";
import ProjectModal from "./ProjectModal";
import TechButton from "./TechButton";

const AUTO_ROTATE_MS = 5000;
const DEG_PER_PX = 0.25;
const MAX_CUBE_SIZE = 560;

export default function PortfolioGrid() {
  const [showModal, setShowModal] = useState(false);
  const [pos, setPos] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [cubeSize, setCubeSize] = useState(MAX_CUBE_SIZE);
  const dragInfo = useRef({ startX: 0, startPos: 0 });
  const mouseHandlers = useRef({ onMove: null, onUp: null });
  const wrapperRef = useRef(null);
  const { lang, t } = useLanguage();
  const projects = getProjects(lang);
  const hasMultiple = projects.length > 1;

  const faceProjects = [0, 1, 2, 3].map((i) => projects[i % projects.length]);
  const faceIndex = (((Math.round(-pos / 90) % 4) + 4) % 4);
  const project = faceProjects[faceIndex];
  const logicalIndex = faceIndex % projects.length;
  const isLightProject = project.pageTheme === "light";

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const setSize = () =>
      setCubeSize(Math.min(MAX_CUBE_SIZE, el.offsetWidth));
    setSize();
    const observer = new ResizeObserver(setSize);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!hasMultiple || isPaused || isDragging) return;
    const id = setInterval(() => {
      setPos((p) => p - 90);
    }, AUTO_ROTATE_MS);
    return () => clearInterval(id);
  }, [hasMultiple, isPaused, isDragging]);

  const nextStep = () => setPos((p) => p - 90);
  const prevStep = () => setPos((p) => p + 90);

  const endDrag = (finalPos) => {
    if (mouseHandlers.current.onMove) {
      window.removeEventListener("mousemove", mouseHandlers.current.onMove);
      window.removeEventListener("mouseup", mouseHandlers.current.onUp);
      mouseHandlers.current = { onMove: null, onUp: null };
    }
    const snapped = Math.round(finalPos / 90) * 90;
    setPos(snapped);
    setIsDragging(false);
  };

  const handleMouseDown = (event) => {
    if (!hasMultiple || mouseHandlers.current.onMove) return;
    dragInfo.current = { startX: event.clientX, startPos: pos };
    setIsDragging(true);

    const onMove = (moveEvent) => {
      const deltaDeg = (moveEvent.clientX - dragInfo.current.startX) * DEG_PER_PX;
      setPos(dragInfo.current.startPos + deltaDeg);
    };
    const onUp = (upEvent) => {
      const deltaDeg = (upEvent.clientX - dragInfo.current.startX) * DEG_PER_PX;
      endDrag(dragInfo.current.startPos + deltaDeg);
    };
    mouseHandlers.current = { onMove, onUp };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
  };

  useEffect(
    () => () => {
      if (mouseHandlers.current.onMove) {
        window.removeEventListener("mousemove", mouseHandlers.current.onMove);
        window.removeEventListener("mouseup", mouseHandlers.current.onUp);
      }
    },
    [],
  );

  const handleTouchStart = (event) => {
    if (!hasMultiple) return;
    const touch = event.touches[0];
    dragInfo.current = { startX: touch.clientX, startPos: pos };
    setIsDragging(true);
  };

  const handleTouchMove = (event) => {
    if (!isDragging) return;
    const touch = event.touches[0];
    const deltaDeg = (touch.clientX - dragInfo.current.startX) * DEG_PER_PX;
    if (Math.abs(deltaDeg) > 3) event.preventDefault();
    setPos(dragInfo.current.startPos + deltaDeg);
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    endDrag(pos);
  };

  const renderCardBody = (p) => (
    <div className="relative">
      {p.image && (
        <div className="mb-6 flex h-24 w-full items-center justify-center px-5 py-3">
          <img
            src={p.image}
            alt={p.title}
            className="h-full max-w-[70%] object-contain"
            draggable={false}
          />
        </div>
      )}

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

      <div className="mt-7 flex justify-end">
        <TechButton type="button" onClick={() => setShowModal(true)}>
          {t.viewDetails}
        </TechButton>
      </div>
    </div>
  );

  const faceClass = () =>
    "absolute inset-0 overflow-y-auto rounded-2xl border border-white/10 bg-[var(--color-surface)]/80 p-6 shadow-[0_24px_70px_rgba(0,0,0,0.5)] backdrop-blur-md sm:p-8";

  const half = cubeSize / 2;

  const faceTransforms = [
    `translateZ(${half}px)`, // front
    `rotateY(-90deg) translateZ(${half}px)`, // right
    `rotateY(-180deg) translateZ(${half}px)`, // back
    `rotateY(-270deg) translateZ(${half}px)`, // left
  ];

  return (
    <section
      id="portfolio"
      className={`relative z-10 flex min-h-[100dvh] items-center overflow-hidden px-6 pb-24 transition-colors duration-500 sm:px-10 lg:px-16 ${
        isLightProject ? "bg-[#f4f7fb]" : "bg-[var(--color-ink)]"
      }`}
      style={{
        paddingTop:
          "calc(var(--header-h, 0px) + var(--subheader-h, 0px) + 1.5rem)",
      }}
    >
      {project.background && (
        <div
          key={project.id}
          aria-hidden
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${project.background})` }}
        />
      )}
      <div
        aria-hidden
        className={`absolute inset-0 ${
          isLightProject
            ? "bg-gradient-to-b from-transparent via-transparent to-[#e9eef7]"
            : "bg-gradient-to-b from-black/80 via-black/70 to-[var(--color-ink)]"
        }`}
      />
      <div
        aria-hidden
        className={`absolute inset-0 ${
          isLightProject
            ? "bg-[radial-gradient(circle_at_18%_20%,rgba(0,170,255,0.10),transparent_32%),radial-gradient(circle_at_82%_15%,rgba(117,62,255,0.09),transparent_34%)]"
            : "noise-grid"
        }`}
      />

      <div className="relative mx-auto flex w-full max-w-6xl flex-col items-center text-center">
        <div
          className="relative flex w-full max-w-3xl items-center justify-center px-20 sm:px-28"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {hasMultiple && (
            <button
              type="button"
              aria-label="Projeto anterior"
              onClick={prevStep}
              className="group absolute top-1/2 left-0 z-20 h-16 w-16 -translate-y-1/2 -translate-x-1/4"
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

          <div ref={wrapperRef} className="relative w-full max-w-xl">
          <div
            className="relative mx-auto select-none"
            style={{
              width: cubeSize,
              height: cubeSize,
              perspective: Math.max(900, cubeSize * 2.2),
              perspectiveOrigin: "50% 50%",
              touchAction: "pan-y",
            }}
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            aria-live="polite"
            aria-label={`${project.title}, ${logicalIndex + 1} de ${projects.length}`}
          >
            <div
              className={isDragging ? "cursor-grabbing" : "cursor-grab"}
              style={{
                position: "relative",
                width: "100%",
                height: "100%",
                transformStyle: "preserve-3d",
                transform: `rotateY(${pos}deg)`,
                transition: isDragging
                  ? "none"
                  : "transform 0.8s cubic-bezier(0.65, 0, 0.35, 1)",
              }}
            >
              {faceProjects.map((p, i) => (
                <div
                  key={`${p.id}-${i}`}
                  className={faceClass(p)}
                  data-scrollable
                  style={{
                    width: cubeSize,
                    height: cubeSize,
                    transform: faceTransforms[i],
                    backfaceVisibility: "hidden",
                  }}
                >
                  {renderCardBody(p)}
                </div>
              ))}
            </div>
          </div>
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
                  onClick={() => setPos(-i * 90)}
                  className={`h-1.5 rounded-full transition-all ${
                    i === logicalIndex
                      ? isLightProject
                        ? "w-6 bg-blue-600"
                        : "w-6 bg-[var(--color-accent)]"
                      : isLightProject
                        ? "w-1.5 bg-slate-300 hover:bg-slate-400"
                        : "w-1.5 bg-white/20 hover:bg-white/40"
                  }`}
                />
              ))}
            </div>

            <span className={`min-w-10 text-xs tabular-nums ${isLightProject ? "text-slate-500" : "text-white/40"}`}>
              {String(logicalIndex + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
            </span>
          </div>
        )}
      </div>

      <ProjectModal project={showModal ? project : null} onClose={() => setShowModal(false)} />
    </section>
  );
}
