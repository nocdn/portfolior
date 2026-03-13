import { Suspense } from "react"
import { AboutDesktop, AboutMobile } from "./About"
import { ComponentsDesktop, ComponentsMobile } from "./Components"
import { ContactMobile } from "./Contact"
import { ComponentsDesktopFallback } from "./fallbacks/ComponentsDesktopFallback"
import { ProjectsDesktopFallback } from "./fallbacks/ProjectsDesktopFallback"
import { MobileNavigation } from "./MobileNavigation"
import { ProjectsDesktop, ProjectsMobile } from "./Projects"
import { WritingDesktop, WritingMobile } from "./Writing"

export const HomeDesktop = () => {
  return (
    <div>
      <main className="mx-auto mb-24 flex w-141.25 translate-x-3 flex-col gap-12 pt-26">
        <AboutDesktop />
        <Suspense fallback={<ProjectsDesktopFallback />}>
          <ProjectsDesktop />
        </Suspense>
        <Suspense fallback={<ComponentsDesktopFallback />}>
          <ComponentsDesktop />
        </Suspense>
        <WritingDesktop />
      </main>
      <div className="bottom-scroll-mask pointer-events-none" aria-hidden="true" />
      <div className="top-scroll-mask pointer-events-none" aria-hidden="true" />
    </div>
  )
}

export const HomeMobile = () => {
  return (
    <div className="flex h-svh w-screen snap-y snap-mandatory flex-col overflow-y-scroll *:h-svh *:w-screen *:flex-none *:snap-start">
      <MobileNavigation />
      <AboutMobile />
      <ProjectsMobile />
      <ComponentsMobile />
      <WritingMobile />
      <ContactMobile />
    </div>
  )
}
