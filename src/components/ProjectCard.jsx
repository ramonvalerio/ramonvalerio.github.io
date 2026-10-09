export default function ProjectCard({ project, onOpen }) {
  return (
    <button
      type="button"
      onClick={() => onOpen(project)}
      className="group glass relative flex flex-col overflow-hidden rounded-2xl p-6 text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_40px_-10px_var(--color-accent)]"
    >
      <div className="relative mb-5 flex aspect-video w-full items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-[var(--color-surface-2)] to-[var(--color-surface-3)] transition-transform duration-300 group-hover:scale-[1.02]">
        <span className="text-3xl opacity-50">🖼️</span>
      </div>

      <h3 className="text-xl font-semibold text-white">{project.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-white/60">
        {project.tagline}
      </p>

      <div className="mt-5 flex flex-wrap gap-2">
        {project.tech.slice(0, 3).map((t) => (
          <span
            key={t}
            className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/60"
          >
            {t}
          </span>
        ))}
        {project.tech.length > 3 && (
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/40">
            +{project.tech.length - 3}
          </span>
        )}
      </div>

      <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-[var(--color-accent)] opacity-0 transition-opacity group-hover:opacity-100">
        Ver detalhes →
      </span>
    </button>
  );
}
