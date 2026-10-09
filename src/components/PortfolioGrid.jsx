import { useState } from "react";
import { projects } from "../data/projects";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";

export default function PortfolioGrid() {
  const [activeProject, setActiveProject] = useState(null);

  return (
    <section id="portfolio" className="px-6 py-24 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <div className="mb-14 max-w-2xl">
          <p className="mb-3 text-xs font-medium tracking-wide text-[var(--color-accent)] uppercase">
            Portfólio
          </p>
          <h2 className="text-3xl font-semibold text-white sm:text-4xl">
            Projetos selecionados
          </h2>
          <p className="mt-4 text-white/60">
            Uma seleção de produtos que combinam engenharia robusta e
            experiência de uso cuidadosa.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onOpen={setActiveProject}
            />
          ))}
        </div>
      </div>

      <ProjectModal
        project={activeProject}
        onClose={() => setActiveProject(null)}
      />
    </section>
  );
}
