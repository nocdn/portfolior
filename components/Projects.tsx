import { projects } from "@/data/projects"
import { ProjectDesktop } from "./Project"
import { SectionDesktop, SectionMobile } from "./Section"

export const ProjectsDesktop = () => {
  return (
    <SectionDesktop
      title="PROJECTS"
      className="motion-blur-in-[2px] motion-opacity-in-0 motion-translate-y-in-[2.5%] motion-delay-100"
    >
      <div className="group flex flex-col">
        {projects.map((project, index) => (
          <ProjectDesktop key={index} {...project} />
        ))}
      </div>
    </SectionDesktop>
  )
}

export const ProjectsMobile = () => {
  return (
    <SectionMobile id="projects" title="PROJECTS">
      <div className="group flex flex-col gap-4">
        {projects.map((project) => (
          <a
            className="flex items-center justify-between gap-4"
            key={project.title}
            href={project.demoURL || project.sourceURL || ""}
            target="_blank"
            rel="noopener noreferrer"
          >
            <p className="flex-nowrap text-[17px] whitespace-nowrap">
              {project.mobileTitle || project.title}
            </p>
            <div className="h-0.25 w-full bg-gray-200 dark:bg-white/10"></div>
            <p className="text-sm text-gray-500/90 dark:text-gray-400/90">{project.year}</p>
          </a>
        ))}
      </div>
    </SectionMobile>
  )
}
