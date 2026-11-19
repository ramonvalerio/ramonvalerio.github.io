import { useEffect, useMemo, useRef, useState } from "react";
import { getProjects } from "../data/projects";
import { useLanguage } from "../i18n/LanguageContext";
import ProjectModal from "./ProjectModal";
import TechButton from "./TechButton";

const AUTOPLAY_MS = 5000;
const COMPACT_QUERY = "(max-width: 910px)";
const REDUCE_QUERY = "(prefers-reduced-motion: reduce)";

function fill(template, vars) {
  return Object.entries(vars).reduce(
    (text, [key, value]) => text.replaceAll(`{${key}}`, value),
    template,
  );
}

function ProjectCard({ item, t, onDetails }) {
  return (
    <div className="portfolio-card">
      <div className="portfolio-visual bg-black">
        <div className="relative aspect-[616/353]">
          <img
            src={item.background}
            alt=""
            draggable={false}
            className="absolute inset-0 h-full w-full object-cover"
          />
          {item.image && (
            <div className="portfolio-mark">
              <img
                src={item.image}
                alt=""
                draggable={false}
                className={`max-h-14 max-w-[240px] object-contain object-left ${
                  item.logoSurface === "light" ? "rounded bg-white px-2 py-1" : ""
                }`}
              />
            </div>
          )}
        </div>
      </div>
      <div className="portfolio-info relative border-t border-white/10 min-[911px]:border-t-0 min-[911px]:border-l min-[911px]:border-white/10">
        <div className="portfolio-info-body">
          <div className="portfolio-info-scroll" data-scrollable={onDetails ? "" : undefined}>
            <h3 className="text-left text-lg leading-tight font-semibold text-white">{item.title}</h3>
            <p className="mt-1 text-left text-xs text-white/60">
              {item.statusLabel && (
                <span className="inline-flex items-center gap-1.5 text-[var(--color-accent)]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
                  {item.statusLabel}
                </span>
              )}
              {item.statusLabel && item.startDateLabel && <span className="text-white/30"> · </span>}
              {item.startDateLabel && <span>{item.startDateLabel}</span>}
            </p>
            <p className="mt-3 line-clamp-4 text-left text-sm leading-relaxed text-white/75">{item.tagline}</p>
            <div className="portfolio-tech mt-3 flex flex-wrap gap-1.5">
              {item.tech.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-white/60"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
          <div className="portfolio-info-action">
            <TechButton
              type="button"
              tabIndex={onDetails ? 0 : -1}
              onClick={onDetails}
              style={{ padding: "0.4rem 0.9rem", fontSize: "0.7rem" }}
            >
              {t.viewDetails}
            </TechButton>
          </div>
        </div>
      </div>
    </div>
  );
}

function carouselInView(element) {
  if (!element) return false;
  const rect = element.getBoundingClientRect();
  return rect.bottom > 0 && rect.top < window.innerHeight;
}

export default function PortfolioGrid() {
  const { lang, t } = useLanguage();
  const projects = useMemo(() => getProjects(lang), [lang]);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [isCompact, setIsCompact] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [arrowHover, setArrowHover] = useState(null);
  const [modalId, setModalId] = useState(null);

  const rootRef = useRef(null);
  const scrollerRef = useRef(null);
  const indexSource = useRef("init");
  const pauseReasons = useRef({ pointer: false, focus: false });
  const scrollingFromCode = useRef(false);

  const count = projects.length;
  const safeIndex = count ? ((index % count) + count) % count : 0;
  const project = projects[safeIndex];
  const hasMultiple = count > 1;
  const prevProject = projects[(safeIndex - 1 + count) % count];
  const nextProject = projects[(safeIndex + 1) % count];
  const modalProject = projects.find((item) => item.id === modalId) ?? null;

  const syncPause = () => {
    setPaused(pauseReasons.current.pointer || pauseReasons.current.focus);
  };

  const setPauseReason = (reason, value) => {
    pauseReasons.current[reason] = value;
    syncPause();
  };

  const goTo = (next, source) => {
    if (!count) return;
    const normalized = (next + count) % count;
    if (normalized === safeIndex) return;
    indexSource.current = source;
    setIndex(normalized);
  };

  useEffect(() => {
    const compact = window.matchMedia(COMPACT_QUERY);
    const reduce = window.matchMedia(REDUCE_QUERY);
    const apply = () => {
      setIsCompact(compact.matches);
      setReducedMotion(reduce.matches);
    };
    apply();
    compact.addEventListener("change", apply);
    reduce.addEventListener("change", apply);
    return () => {
      compact.removeEventListener("change", apply);
      reduce.removeEventListener("change", apply);
    };
  }, []);

  useEffect(() => {
    if (paused || reducedMotion || isCompact || modalId || count < 2) return;
    const timer = window.setInterval(() => {
      if (!carouselInView(rootRef.current)) return;
      indexSource.current = "auto";
      setIndex((current) => (current + 1) % count);
    }, AUTOPLAY_MS);
    return () => window.clearInterval(timer);
  }, [paused, reducedMotion, isCompact, modalId, count]);

  useEffect(() => {
    if (!isCompact) return;
    if (indexSource.current === "scroll") return;
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const slide = scroller.querySelector(`[data-slide="${safeIndex}"]`);
    if (!slide) return;
    const left = slide.offsetLeft - (scroller.clientWidth - slide.offsetWidth) / 2;
    scrollingFromCode.current = true;
    scroller.scrollTo({
      left: Math.max(0, left),
      behavior: reducedMotion ? "auto" : "smooth",
    });
    const unlock = () => {
      scrollingFromCode.current = false;
    };
    scroller.addEventListener("scrollend", unlock, { once: true });
    const fallback = window.setTimeout(unlock, reducedMotion ? 40 : 700);
    return () => {
      window.clearTimeout(fallback);
      scroller.removeEventListener("scrollend", unlock);
    };
  }, [safeIndex, isCompact, reducedMotion]);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    let frame = 0;
    const onScroll = () => {
      if (!isCompact || scrollingFromCode.current) return;
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        const mid = scroller.scrollLeft + scroller.clientWidth / 2;
        let best = 0;
        let bestDist = Infinity;
        scroller.querySelectorAll("[data-slide]").forEach((slide) => {
          const slideMid = slide.offsetLeft + slide.offsetWidth / 2;
          const dist = Math.abs(slideMid - mid);
          const slideIndex = Number(slide.getAttribute("data-slide"));
          if (dist < bestDist) {
            bestDist = dist;
            best = slideIndex;
          }
        });
        setIndex((current) => {
          if (current === best) return current;
          indexSource.current = "scroll";
          return best;
        });
      });
    };
    scroller.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      scroller.removeEventListener("scroll", onScroll);
      window.cancelAnimationFrame(frame);
    };
  }, [isCompact, count]);

  const onKeyDown = (event) => {
    if (!hasMultiple) return;
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    if (event.target.closest("input, textarea, select")) return;
    event.preventDefault();
    const direction = event.key === "ArrowRight" ? 1 : -1;
    const next = (safeIndex + direction + count) % count;
    goTo(next, "key");
    if (event.target?.dataset?.dot !== undefined) {
      rootRef.current?.querySelector(`[data-dot="${next}"]`)?.focus();
    }
  };

  if (!project) return null;

  return (
    <section
      id="portfolio"
      className="relative z-10 flex min-h-[100dvh] items-center overflow-hidden bg-[var(--color-ink)] px-4 pb-24 sm:px-8 lg:px-12"
      style={{
        paddingTop: "calc(var(--header-h, 0px) + var(--subheader-h, 0px) + 1.5rem)",
      }}
    >
      {projects.map(
        (item) =>
          item.background && (
            <div
              key={item.id}
              aria-hidden
              className="portfolio-bg absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url(${item.background})`,
                opacity: item.id === project.id ? 1 : 0,
              }}
            />
          ),
      )}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/75 to-[var(--color-ink)]"
      />
      <div aria-hidden className="noise-grid absolute inset-0" />

      <div
        ref={rootRef}
        className="portfolio-stage relative z-10 w-full"
        role="region"
        aria-roledescription="carousel"
        aria-label={t.carouselLabel}
        onMouseEnter={() => setPauseReason("pointer", true)}
        onMouseLeave={() => {
          setPauseReason("pointer", false);
          setArrowHover(null);
        }}
        onFocus={() => setPauseReason("focus", true)}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) {
            setPauseReason("focus", false);
          }
        }}
        onKeyDown={onKeyDown}
      >
        <h2
          id="portfolio-heading"
          className="portfolio-heading mb-4 flex items-center gap-3 text-xs font-semibold tracking-[0.14em] text-[var(--color-accent)] uppercase"
        >
          <span className="h-px w-10 bg-[var(--color-accent)]" />
          {t.navWork}
        </h2>

        <div className="portfolio-band">
          <div className="portfolio-row">
          {hasMultiple && (
            <div
              role="button"
              tabIndex={0}
              className={`portfolio-peek portfolio-peek-prev ${arrowHover === "prev" ? "is-hot" : ""}`}
              aria-label={fill(t.carouselGoTo, { title: prevProject.title })}
              onClick={() => goTo(safeIndex - 1, "peek")}
              onKeyDown={(event) => {
                if (event.key !== "Enter" && event.key !== " ") return;
                event.preventDefault();
                goTo(safeIndex - 1, "peek");
              }}
            >
              <ProjectCard item={prevProject} t={t} />
            </div>
          )}

          <div className="portfolio-center">
            <p className="sr-only" aria-live="polite">
              {fill(t.carouselPosition, {
                current: String(safeIndex + 1),
                total: String(count),
                title: project.title,
              })}
            </p>
            <div ref={scrollerRef} className="portfolio-scroller">
              {projects.map((item, i) => {
                const active = i === safeIndex;
                return (
                  <article
                    key={item.id}
                    data-slide={i}
                    className={`portfolio-slide ${active ? "is-active" : ""}`}
                    aria-label={item.title}
                    aria-hidden={!isCompact && !active ? true : undefined}
                    inert={!isCompact && !active ? true : undefined}
                  >
                    <ProjectCard item={item} t={t} onDetails={() => setModalId(item.id)} />
                  </article>
                );
              })}
            </div>
          </div>

          {hasMultiple && (
            <div
              role="button"
              tabIndex={0}
              className={`portfolio-peek portfolio-peek-next ${arrowHover === "next" ? "is-hot" : ""}`}
              aria-label={fill(t.carouselGoTo, { title: nextProject.title })}
              onClick={() => goTo(safeIndex + 1, "peek")}
              onKeyDown={(event) => {
                if (event.key !== "Enter" && event.key !== " ") return;
                event.preventDefault();
                goTo(safeIndex + 1, "peek");
              }}
            >
              <ProjectCard item={nextProject} t={t} />
            </div>
          )}

          {hasMultiple && (
            <button
              type="button"
              className="portfolio-arrow portfolio-arrow-prev"
              aria-label={t.carouselPrev}
              onClick={() => goTo(safeIndex - 1, "arrow")}
              onMouseEnter={() => setArrowHover("prev")}
              onMouseLeave={() => setArrowHover(null)}
              onFocus={() => setArrowHover("prev")}
              onBlur={() => setArrowHover(null)}
            >
              <span aria-hidden className="portfolio-chevron portfolio-chevron-prev" />
            </button>
          )}
          {hasMultiple && (
            <button
              type="button"
              className="portfolio-arrow portfolio-arrow-next"
              aria-label={t.carouselNext}
              onClick={() => goTo(safeIndex + 1, "arrow")}
              onMouseEnter={() => setArrowHover("next")}
              onMouseLeave={() => setArrowHover(null)}
              onFocus={() => setArrowHover("next")}
              onBlur={() => setArrowHover(null)}
            >
              <span aria-hidden className="portfolio-chevron portfolio-chevron-next" />
            </button>
          )}
          </div>

          {hasMultiple && (
              <div
                className="portfolio-dots mt-3 flex items-center justify-center gap-4"
                role="group"
                aria-label={t.carouselPagination}
              >
                <div className="flex items-center">
                  {projects.map((item, i) => (
                    <button
                      key={item.id}
                      type="button"
                      data-dot={i}
                      aria-label={fill(t.carouselGoTo, { title: item.title })}
                      aria-current={i === safeIndex ? "true" : undefined}
                      onClick={() => goTo(i, "dot")}
                      className="portfolio-dot group"
                    >
                      <span
                        aria-hidden
                        className={`block h-[9px] w-[15px] rounded-[2px] transition-colors ${
                          i === safeIndex
                            ? "bg-[var(--color-accent)]"
                            : "bg-white/25 group-hover:bg-white/50"
                        }`}
                      />
                    </button>
                  ))}
                </div>
                <span className="min-w-12 text-xs tabular-nums text-white/40">
                  {String(safeIndex + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
                </span>
              </div>
            )}
        </div>
      </div>

      <ProjectModal project={modalProject} onClose={() => setModalId(null)} />
    </section>
  );
}
