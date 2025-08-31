"use client"
import { useIsMobile } from "@/hooks/useIsMobile"
import { DesktopSection } from "@/components/desktop/Section"
import { AnimatePresence } from "motion/react"
import { useRef, useState } from "react"
import { TimeZoneName } from "@/components/desktop/TimeZoneName"
import { Project } from "@/components/desktop/Project"
import { Component } from "@/components/Component"
import { ArrowLeftIcon } from "@/components/ui/arrow-left"
import { ArrowRightIcon } from "lucide-react"

export default function Home() {
  const isMobile = useIsMobile()

  type Project = {
    title: string
    description: string
    sourceURL?: string
    demoURL?: string
    chips?: string[]
  }
  const projects: Project[] = [
    {
      title: "Shifts",
      description:
        "Full stack rota and shift management system with authentication",
      demoURL: "https://github.com/nocdn/shifts",
      chips: ["react", "supabase", "nextjs", "betterAuth"],
    },
    {
      title: "Vanish",
      description: "Temporary emails through Cloudflare, with frontend and API",
      sourceURL: "https://github.com/nocdn/vanish",
      chips: ["react", "flask"],
    },
    {
      title: "Books",
      description:
        "Recreation of (Basic) Bookmarks in Next.js with extra features",
      sourceURL: "https://github.com/nocdn/booksr",
      chips: ["react", "postgres", "nextjs"],
    },
    {
      title: "MCQs",
      description:
        "Interactive psychology practice questions built for my friends",
      demoURL: "https://mcqs.bartoszbak.org/",
      chips: ["react", "supabase", "lambda"],
    },
    {
      title: "Quiet Watch",
      description: "Intelligent ad segment remover powered by LLMs",
      sourceURL: "https://github.com/nocdn/ad-segment-trimmer",
      chips: ["python"],
    },
    {
      title: "Echoes",
      description: "Full stack, self-hostable video/audio transcription app",
      demoURL: "https://whisper.bartoszbak.org/",
      chips: ["python"],
    },
  ]

  const projectsElements = projects.map((project, index) => (
    <Project key={index} {...project} />
  ))

  const componentCards = [
    <Component
      title="Animated spinners"
      description="A library for working with oklch colors"
      imgURL="https://oiszjiwtfc65cwa2.public.blob.vercel-storage.com/work-previews/oklch-colors-new.png"
    />,
    <Component
      title="Corner bordered buttons"
      description="Inspired by Tailwind CSS documentation page, I loved the look of it."
      imgURL="https://oiszjiwtfc65cwa2.public.blob.vercel-storage.com/work-previews/oklch-colors-new.png"
    />,
  ]

  const [currentCard, setCurrentCard] = useState(0)

  return (
    <div className="">
      {isMobile ? (
        <p>Mobile</p>
      ) : (
        <main className="w-[546px] mb-24 mx-auto pt-26 flex flex-col gap-12">
          <DesktopSection
            title="ABOUT"
            className="motion-blur-in-[2px] motion-opacity-in-0 motion-translate-y-in-[7%]"
          >
            <div>
              Good morning, I'm <TimeZoneName />. I am a front-end developer
              based in England, studying computer science at the University of
              York. I love to craft tools and experiences for other developers.
            </div>
          </DesktopSection>
          <DesktopSection
            title="PROJECTS"
            className="motion-blur-in-[2px] motion-opacity-in-0 motion-translate-y-in-[2.5%] motion-delay-100"
          >
            <div className="flex flex-col gap-1">{projectsElements}</div>
          </DesktopSection>
          <DesktopSection
            title="COMPONENTS"
            subtitle="shadcn registry"
            subtitleURL="/registry"
            secondaryChildren={
              <div className="flex items-center gap-2">
                <button onClick={() => setCurrentCard(currentCard + 1)}>
                  <ArrowRightIcon className="opacity-100" size={18} />
                </button>
              </div>
            }
            className="motion-blur-in-[2px] motion-opacity-in-0 motion-translate-y-in-[3.75%] motion-delay-200"
          >
            <AnimatePresence mode="popLayout" initial={false}>
              {componentCards[currentCard]}
            </AnimatePresence>
          </DesktopSection>
        </main>
      )}
    </div>
  )
}
