import { projects } from "@/data/projects"
import { ArrowUpRight } from "lucide-react"
import { SectionDesktop } from "../Section"

export function ProjectsDesktopFallback() {
  return (
    <SectionDesktop
      title="PROJECTS"
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
          <div
            key={project.title}
            className="group/item relative py-0.5 transition-opacity duration-150 group-hover:opacity-30 hover:opacity-100! hover:duration-0"
          >
            <div className="w-full text-left">
              <div className="font-pp-neue-montreal relative z-10 flex items-center gap-3 text-[17px] leading-8 font-medium">
                <p className="text-gray-800/90 group-hover/item:text-blue-600 group-hover/item:drop-shadow-[0_0_0.5px_rgba(59,130,246,0.2)] dark:text-gray-200/95 dark:antialiased dark:group-hover/item:text-blue-400 dark:group-hover/item:drop-shadow-[0_0_0.5px_rgba(96,165,250,0.2)]">
                  {project.title}
                </p>
                <p className="font-switzer min-w-0 text-[17px] font-medium text-gray-500/90 antialiased group-hover:text-gray-700 dark:text-gray-400/90 dark:group-hover:text-gray-300">
                  {project.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </SectionDesktop>
  )
}
