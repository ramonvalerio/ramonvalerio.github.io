import { useEffect } from "react";
import MediaCarousel from "./MediaCarousel";
import TechButton from "./TechButton";
import { useLanguage } from "../i18n/LanguageContext";

export default function ProjectModal({ project, onClose }) {
  const { t } = useLanguage();
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm sm:p-6"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
    >
      <div
        className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto bg-cover bg-center"
        style={
          project.logoBackground
            ? { backgroundImage: `url(${project.logoBackground})` }
            : undefined
        }
        onClick={(e) => e.stopPropagation()}
      >
        {project.logoBackground && (
          <div
            aria-hidden
            className="absolute inset-0 bg-[var(--color-surface)]/90"
          />
        )}

        <button
          type="button"
          onClick={onClose}
          aria-label={t.close}
          className="absolute top-5 right-5 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 transition hover:bg-white/10"
        >
          ✕
        </button>

        <div className="relative p-6 sm:p-8">
          {project.image ? (
            <div className="flex h-20 w-full items-center justify-center">
              <img
                src={project.image}
                alt={project.title}
                className="h-full max-w-[70%] object-contain"
              />
            </div>
          ) : (
            project.media && <MediaCarousel media={project.media} />
          )}

          <div className="mt-7">
          <h2
            id="project-modal-title"
            className="text-[1.75rem] font-semibold text-white sm:text-3xl"
          >
            {project.title}
          </h2>
          {project.role && (
            <p className="mt-1 text-sm font-medium text-[var(--color-accent)]">
              {project.role}
            </p>
          )}
          <p className="mt-2 text-sm text-white/60">{project.tagline}</p>

          <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1 text-xs text-white/50">
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

          <p className="mt-5 text-base leading-[1.6] text-white/70 sm:text-lg">
            {project.description}
          </p>

          <div className="mt-6">
            <p className="mb-2 text-xs font-medium tracking-wide text-white/40 uppercase">
              {t.technologies}
            </p>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <TechButton as="a" href={project.links.live}>
              {t.viewProject}
            </TechButton>
            <TechButton as="a" href={project.links.repo}>
              {t.sourceCode}
            </TechButton>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}
