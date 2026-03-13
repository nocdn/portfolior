"use client"

import { projects } from "@/data/projects"
import { ArrowUpRight } from "lucide-react"
import { useState } from "react"
import { ProjectDesktop } from "./Project"
import { SectionDesktop, SectionMobile } from "./Section"

export const ProjectsDesktop = () => {
  const [openProjectTitle, setOpenProjectTitle] = useState<string | null>(null)

  return (
    <SectionDesktop
      title="PROJECTS"
      className=""
      onMouseLeave={() => setOpenProjectTitle(null)}
      subtitleChildren={
        <span className="flex items-center gap-1">
          REPOS{" "}
          <ArrowUpRight
            size={16}
            strokeWidth={2.75}
            className="mr-0.5 text-blue-700 opacity-40 transition-all duration-200 group-hover:opacity-60 dark:text-blue-400"
          />
        </span>
      }
      subtitleURL="https://github.com/nocdn?tab=repositories"
    >
      <div className="group flex flex-col">
        {projects.map((project) => (
          <ProjectDesktop
            key={project.title}
            {...project}
            isOpen={openProjectTitle === project.title}
            onToggle={() =>
              setOpenProjectTitle((currentTitle) =>
                currentTitle === project.title ? null : project.title
              )
            }
          />
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
            <div className="h-px w-full bg-gray-200 dark:bg-white/10"></div>
            <p className="text-sm text-gray-500/90 dark:text-gray-400/90">{project.year}</p>
          </a>
        ))}
      </div>
    </SectionMobile>
  )
}
