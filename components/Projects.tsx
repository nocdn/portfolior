"use client"

import { projects } from "@/data/projects"
import { ArrowUpRight } from "lucide-react"
import { AnimatePresence, motion } from "motion/react"
import { useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"
import { ProjectDesktop } from "./Project"
import { SectionDesktop, SectionMobile } from "./Section"

const PROJECTS_HINT_DELAY_MS = 600

export const ProjectsDesktop = () => {
  const [openProjectTitle, setOpenProjectTitle] = useState<string | null>(null)
  const [isHintVisible, setIsHintVisible] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const hasShownHintRef = useRef(false)
  const hasExpandedProjectRef = useRef(false)
  const hintProjectTitleRef = useRef<string | null>(null)

  const clearHoverHintTimeout = () => {
    if (hoverTimeoutRef.current === null) {
      return
    }

    clearTimeout(hoverTimeoutRef.current)
    hoverTimeoutRef.current = null
  }

  const dismissHoverHint = () => {
    clearHoverHintTimeout()
    hintProjectTitleRef.current = null
    setIsHintVisible(false)
  }

  const scheduleHoverHint = (projectTitle: string) => {
    if (
      hasShownHintRef.current ||
      hasExpandedProjectRef.current ||
      openProjectTitle !== null ||
      isHintVisible
    ) {
      return
    }

    clearHoverHintTimeout()
    hoverTimeoutRef.current = setTimeout(() => {
      hoverTimeoutRef.current = null
      hintProjectTitleRef.current = projectTitle
      hasShownHintRef.current = true
      setIsHintVisible(true)
    }, PROJECTS_HINT_DELAY_MS)
  }

  const handleHoverEnd = (projectTitle: string) => {
    clearHoverHintTimeout()

    if (hintProjectTitleRef.current === projectTitle) {
      dismissHoverHint()
    }
  }

  useEffect(() => {
    setIsMounted(true)

    return () => {
      clearHoverHintTimeout()
    }
  }, [])

  return (
    <>
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
              onHoverStart={() => scheduleHoverHint(project.title)}
              onHoverEnd={() => handleHoverEnd(project.title)}
              onToggle={() => {
                setOpenProjectTitle((currentTitle) => {
                  const nextTitle = currentTitle === project.title ? null : project.title

                  if (nextTitle === project.title) {
                    hasExpandedProjectRef.current = true
                    dismissHoverHint()
                  }

                  return nextTitle
                })
              }}
              onClose={() =>
                setOpenProjectTitle((currentTitle) =>
                  currentTitle === project.title ? null : currentTitle
                )
              }
            />
          ))}
        </div>
      </SectionDesktop>
      {isMounted
        ? createPortal(
            <AnimatePresence initial={false}>
              {isHintVisible ? (
                <motion.div
                  key="projects-hover-hint"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.15, ease: [0.26, 1, 0.5, 1] }}
                  className="border-shadow pointer-events-none fixed bottom-4 left-4 z-[100] origin-bottom-left rounded-full bg-gray-100 px-3 py-1.5 text-[13px] leading-none font-medium text-gray-600 antialiased dark:bg-[#1c1c1e] dark:text-gray-300"
                >
                  Click a project to expand it.
                </motion.div>
              ) : null}
            </AnimatePresence>,
            document.body
          )
        : null}
    </>
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
