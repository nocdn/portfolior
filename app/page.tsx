"use client"
import { useIsMobile } from "@/hooks/useIsMobile"
import { DesktopSection } from "@/components/desktop/Section"
import { useState } from "react"
import { TimeZoneName } from "@/components/desktop/TimeZoneName"
import { Project } from "@/components/desktop/Project"
import { ArrowRightIcon } from "lucide-react"
import { ComponentCarousel } from "@/components/ComponentCarousel"
import { Article } from "@/components/Article"

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

  // this will be used to tick the component card carousel
  const [componentCardTick, setComponentCardTick] = useState(0)

  return (
    <div className="">
      {isMobile ? (
        <p>Mobile</p>
      ) : (
        <main className="w-[566px] mb-24 mx-auto pt-26 flex flex-col gap-12">
          <DesktopSection
            title="ABOUT"
            className="motion-blur-in-[2px] motion-opacity-in-0 motion-translate-y-in-[7%]"
          >
            <div>
              Hey there, I'm <TimeZoneName />. I am a front-end developer based
              in the UK, studying computer science at the University of York. I
              love to craft tools and experiences for myself and other
              developers.
            </div>
          </DesktopSection>
          {/* <p
            style={{
              fontFamily: "PP",
              fontWeight: 500,
              lineHeight: "30px",
              fontSize: "19px",
            }}
          >
            Hey there, I'm{" "}
            <span
              style={{
                fontFamily: "PP",
                fontWeight: 500,
                lineHeight: "30px",
                fontSize: "19px",
              }}
            >
              Bartek
            </span>
            . I am a front-end developer based in the UK, studying computer
            science at the University of York. I love to craft tools and
            experiences for myself and other developers.
          </p> */}
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
                <button
                  onClick={() =>
                    setComponentCardTick(
                      (componentCardTick) => componentCardTick + 1
                    )
                  }
                >
                  <ArrowRightIcon
                    className="opacity-100 cursor-pointer"
                    size={18}
                  />
                </button>
              </div>
            }
            className="motion-blur-in-[2px] motion-opacity-in-0 motion-translate-y-in-[3.75%] motion-delay-200"
          >
            <ComponentCarousel cardTick={componentCardTick} />
          </DesktopSection>
          <DesktopSection
            title="WRITING"
            className="motion-blur-in-[2px] motion-opacity-in-0 motion-translate-y-in-[3.75%] motion-delay-300"
          >
            <div className="grid grid-cols-2 gap-2 mr-6">
              <Article
                title="My take on the Family Drawer"
                date="August 2025"
                href="/writing/family-drawer"
              />
              <Article
                title="Coming soon....."
                date="September 2025"
                disabled={true}
                href="/writing/"
              />
            </div>
          </DesktopSection>
        </main>
      )}
    </div>
  )
}
