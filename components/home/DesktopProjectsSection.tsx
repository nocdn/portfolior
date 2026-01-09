import { DesktopSection } from "@/components/desktop/Section"
import { projects } from "@/lib/data"
import { Project } from "@/components/desktop/Project"

export function DesktopProjectsSection() {
  return (
    <DesktopSection
      title="PROJECTS"
      className="motion-blur-in-[2px] motion-opacity-in-0 motion-translate-y-in-[2.5%] motion-delay-100"
    >
      <div className="flex flex-col gap-1">
        {projects.map((project, index) => (
          <Project key={index} {...project} />
        ))}
      </div>
    </DesktopSection>
  )
}
