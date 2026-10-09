import { useState } from "react";
import { getProjects } from "../data/projects";
import { useLanguage } from "../i18n/LanguageContext";
import ProjectModal from "./ProjectModal";
import TechButton from "./TechButton";

export default function PortfolioGrid() {
  const [index, setIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const { lang, t } = useLanguage();
  const projects = getProjects(lang);
  const project = projects[index];

  const go = (dir) =>
    setIndex((i) => (i + dir + projects.length) % projects.length);

  return (
    <section
      id="portfolio"
      className="relative z-10 flex min-h-[100dvh] items-center overflow-hidden bg-[var(--color-ink)] px-6 pb-24 sm:px-10 lg:px-16"
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
        className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-[var(--color-ink)]"
      />
      <div aria-hidden className="noise-grid absolute inset-0" />

      <div className="relative mx-auto flex w-full max-w-6xl flex-col items-center text-center">

        <div className="relative w-full max-w-xl rounded-2xl border border-white/10 bg-[var(--color-surface)]/50 p-8 backdrop-blur-sm sm:p-10">
          <div className="relative">
            {project.image && (
              <div className="mb-6 flex h-20 w-full items-center justify-center">
                <img
                  src={project.image}
                  alt={project.title}
                  className="h-full max-w-[70%] object-contain"
                />
              </div>
            )}

            <h3 className="text-left text-xl font-semibold text-white">
              {project.title}
            </h3>
            {project.role && (
              <p className="mt-1 text-left text-xs font-medium tracking-wide text-[var(--color-accent)]">
                {project.role}
              </p>
            )}
            <p className="mt-3 text-left text-sm leading-relaxed font-medium text-white/70">
              {project.tagline}
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-1 text-left text-xs text-white/50">
              {project.startDateLabel && (
                <span>
                  <span className="text-white/30">{t.projectStart}:</span>{" "}
                  {project.startDateLabel}
                </span>
              )}
              {project.statusLabel && (
                <span className="inline-flex items-center gap-1.5">
                  <span className="text-white/30">{t.projectStatus}:</span>
                  <span className="inline-flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
                    {project.statusLabel}
                  </span>
                </span>
              )}
            </div>

            <div className="mt-5 flex flex-wrap justify-start gap-2">
              {project.tech.map((tech) => (
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
        </div>

        {projects.length > 1 && (
          <div className="mt-8 flex items-center gap-5">
            <button
              type="button"
              aria-label="Previous project"
              onClick={() => go(-1)}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/80 transition hover:bg-white/10"
            >
              ‹
            </button>

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

            <button
              type="button"
              aria-label="Next project"
              onClick={() => go(1)}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/80 transition hover:bg-white/10"
            >
              ›
            </button>
          </div>
        )}
      </div>

      <ProjectModal project={showModal ? project : null} onClose={() => setShowModal(false)} />
    </section>
  );
}
