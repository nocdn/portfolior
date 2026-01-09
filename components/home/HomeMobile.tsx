// Server Component - no "use client" directive
// Only interactive parts are client components

import { projects, articles } from "@/lib/data"
import { MobileSection } from "@/components/mobile/Section"
import { Article } from "@/components/Article"
import { MobileNavigation } from "./MobileNavigation"
import { MobileComponentsSection } from "./MobileComponentsSection"
import { MobileContactSection } from "./MobileContactSection"

export default function HomeMobile() {
  return (
    <div>
      <div
        className="flex flex-col h-[100svh] w-screen overflow-y-scroll snap-y snap-mandatory *:flex-none *:snap-start *:h-[100svh] *:w-screen"
        style={{
          scrollbarWidth: "none",
        }}
      >
        {/* Client component for scroll navigation */}
        <MobileNavigation />

        {/* Server-rendered static sections */}
        <MobileSection id="about" title="ABOUT">
          <p className="leading-relaxed text-[18.5px]">
            Hey there, I'm Bartek. I am a front-end developer based in the UK,
            studying computer science at the University of York. I'm currently
            exploring typography, web animations and crafting interactions. I
            love to build with Next.js, TypeScript and Motion.
          </p>
        </MobileSection>

        <MobileSection id="projects" title="PROJECTS">
          <div className="flex flex-col gap-4">
            {projects.map((project, index) => (
              <a
                className="flex justify-between items-center gap-4"
                key={index}
                href={project.demoURL || project.sourceURL || ""}
                target="_blank"
              >
                <p className="text-[17px] flex-nowrap whitespace-nowrap">
                  {project.mobileTitle || project.title}
                </p>
                <div className="w-full h-0.25 bg-gray-200"></div>
                <p className="text-gray-500/90 text-sm">{project.year}</p>
              </a>
            ))}
          </div>
        </MobileSection>

        {/* Client component for carousel state */}
        <MobileComponentsSection />

        <MobileSection id="writing" title="WRITING">
          <div className="flex flex-col gap-3">
            {articles.map((article, index) => (
              <Article key={index} {...article} />
            ))}
          </div>
        </MobileSection>

        {/* Client component for copy functionality */}
        <MobileContactSection />
      </div>
      <div
        className="bottom-scroll-mask pointer-events-none"
        aria-hidden="true"
      />
      <div className="top-scroll-mask pointer-events-none" aria-hidden="true" />
    </div>
  )
}
