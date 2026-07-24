import { experiences } from "@/data/experience"
import type { CSSProperties } from "react"
import { SectionDesktop, SectionMobile } from "./Section"

function ExperienceList() {
  return (
    <div className="group mt-1 flex flex-col">
      {experiences.map((experience, index) => {
        const isLast = index === experiences.length - 1

        return (
          <article
            key={experience.company}
            className="group/item relative flex gap-4 transition-opacity duration-150 group-hover:opacity-30 focus-within:opacity-100 hover:opacity-100! hover:duration-0"
          >
            <div className="relative flex w-3 shrink-0 translate-y-px flex-col items-center">
              <div className="flex h-7 w-full shrink-0 items-center justify-center">
                <span
                  aria-hidden="true"
                  className="h-2.5 w-2.5 shrink-0 rounded-full border-[1.5px] border-gray-800/80 bg-background dark:border-gray-200/80"
                />
              </div>
              {!isLast && (
                <span aria-hidden="true" className="w-px flex-1 bg-gray-300 dark:bg-white/15" />
              )}
            </div>
            <div
              className={`flex min-w-0 flex-1 items-start justify-between gap-6 ${isLast ? "pb-0" : "pb-6"}`}
            >
              <div className="min-w-0">
                <a
                  href={experience.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-pp-neue-montreal inline-block text-[17px] leading-7 font-medium tracking-[0.01em] text-gray-800/90 transition-colors duration-150 hover:[color:var(--experience-hover)] group-hover/item:[color:var(--experience-hover)] dark:text-gray-200/95 dark:antialiased dark:hover:[color:var(--experience-hover)] dark:group-hover/item:[color:var(--experience-hover)]"
                  style={{ "--experience-hover": experience.hoverColor } as CSSProperties}
                >
                  {experience.company}
                </a>
                <p className="font-switzer text-[15.5px] leading-6 font-medium text-gray-500/90 antialiased dark:text-gray-400/90">
                  {experience.role}
                </p>
              </div>
              <p className="font-pp-neue-montreal mr-8 shrink-0 text-[15px] leading-7 font-medium whitespace-nowrap text-gray-500/90 antialiased dark:text-gray-400/90">
                {experience.period}
              </p>
            </div>
          </article>
        )
      })}
    </div>
  )
}

export const ExperienceDesktop = () => {
  return (
    <SectionDesktop title="EXPERIENCE">
      <ExperienceList />
    </SectionDesktop>
  )
}

export const ExperienceMobile = () => {
  return (
    <SectionMobile id="experience" title="EXPERIENCE">
      <ExperienceList />
    </SectionMobile>
  )
}
