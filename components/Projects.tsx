"use client"

import { projects } from "@/data/projects"
import { ArrowUpRight } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { ProjectDesktop, ProjectMobile } from "./Project"
import { SectionDesktop, SectionMobile } from "./Section"

const HOVER_EXPAND_DELAY_MS = 600

export const ProjectsDesktop = () => {
  const [openProjectTitle, setOpenProjectTitle] = useState<string | null>(null)
  const [openCtaProjectTitle, setOpenCtaProjectTitle] = useState<string | null>(null)
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const clearHoverTimeout = () => {
    if (hoverTimeoutRef.current === null) {
      return
    }

    clearTimeout(hoverTimeoutRef.current)
    hoverTimeoutRef.current = null
  }

  const scheduleHoverExpand = (projectTitle: string) => {
    if (openProjectTitle === projectTitle) {
      return
    }

    setOpenCtaProjectTitle(null)
    clearHoverTimeout()
    hoverTimeoutRef.current = setTimeout(() => {
      hoverTimeoutRef.current = null
      setOpenCtaProjectTitle(projectTitle)
    }, HOVER_EXPAND_DELAY_MS)
  }

  const handleHoverEnd = (projectTitle: string) => {
    clearHoverTimeout()
    setOpenCtaProjectTitle((currentTitle) => (currentTitle === projectTitle ? null : currentTitle))
  }

  const toggleProject = (projectTitle: string) => {
    clearHoverTimeout()
    setOpenCtaProjectTitle(null)
    setOpenProjectTitle((currentTitle) => (currentTitle === projectTitle ? null : projectTitle))
  }

  useEffect(() => clearHoverTimeout, [])

  return (
    <SectionDesktop
      title="PROJECTS"
      className=""
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
            showOpenCta={
              openCtaProjectTitle === project.title && openProjectTitle !== project.title
            }
            onHoverStart={() => scheduleHoverExpand(project.title)}
            onHoverEnd={() => handleHoverEnd(project.title)}
            onToggle={() => toggleProject(project.title)}
            onClose={() =>
              setOpenProjectTitle((currentTitle) =>
                currentTitle === project.title ? null : currentTitle
              )
            }
          />
        ))}
      </div>
    </SectionDesktop>
  )
}

export const ProjectsMobile = () => {
  const [openProjectTitle, setOpenProjectTitle] = useState<string | null>(null)

  return (
    <SectionMobile
      id="projects"
      title="PROJECTS"
      secondaryChildren={
        <span className="-translate-y-[0.95px] font-mono text-[15.5px] font-semibold tracking-[0.005em] text-gray-400/60 dark:text-gray-500/60">
          [CLICK EACH TO EXPAND]
        </span>
      }
    >
      <div className="group flex flex-col gap-4">
        {projects.map((project) => (
          <ProjectMobile
            key={project.title}
            title={project.mobileTitle || project.title}
            year={project.year}
            extendedDescription={project.extendedDescription}
            isOpen={openProjectTitle === project.title}
            onToggle={() =>
              setOpenProjectTitle((currentTitle) =>
                currentTitle === project.title ? null : project.title
              )
            }
            onClose={() =>
              setOpenProjectTitle((currentTitle) =>
                currentTitle === project.title ? null : currentTitle
              )
            }
          />
        ))}
      </div>
    </SectionMobile>
  )
}
