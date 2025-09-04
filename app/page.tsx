"use client"
import { useIsMobile } from "@/hooks/useIsMobile"
import { DesktopSection } from "@/components/desktop/Section"
import { useState } from "react"
import { TimeZoneName } from "@/components/desktop/TimeZoneName"
import { Project } from "@/components/desktop/Project"
import Star from "@/components/icons/star"
import Signature from "@/components/Signature"
import {
  ArrowDownRight,
  ArrowRightIcon,
  ArrowUpRight,
  ArrowUpRightFromCircle,
  CornerDownRight,
  ExternalLink,
  LinkIcon,
} from "lucide-react"
import { ComponentCarousel } from "@/components/ComponentCarousel"
import { Article } from "@/components/Article"
import { Twitter } from "@/components/icons/twitter"
import { MaterialSymbolsArrowRightAlt } from "@/components/icons/arrowRight"
import { MaterialSymbolsArrowLeftAlt } from "@/components/icons/arrowLeft"
import { AnimatePresence, motion } from "motion/react"
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
      description: "Full stack rota and shift management system with auth",
      sourceURL: "https://github.com/nocdn/shiftsauth",
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
    {
      title: "Votes",
      description:
        "Voting platform for university society elections, in SvelteKit",
      sourceURL: "https://github.com/nocdn/votes",
      chips: ["sveltekit", "tailwindcss", "supabase"],
    },
  ]

  const projectsElements = projects.map((project, index) => (
    <Project key={index} {...project} />
  ))

  // this will be used to tick the component card carousel
  const [componentCardTick, setComponentCardTick] = useState(0)

  const [hoveringTwitter, setHoveringTwitter] = useState(false)
  const [showingCopied, setShowCopied] = useState(false)

  return (
    <div className="">
      {isMobile ? (
        <p>Mobile</p>
      ) : (
        <main className="w-[565px] mb-24 mx-auto pt-26 flex flex-col gap-12">
          <DesktopSection
            title="ABOUT"
            className="motion-blur-in-[2px] motion-opacity-in-0 motion-translate-y-in-[7%]"
          >
            {/* <div>
              Hey there, I'm <TimeZoneName />. I am a front-end developer based
              in the UK, studying computer science at the University of York. I
              love to craft tools and experiences for myself and other
              developers.
            </div> */}
            <div>
              Hey there, I'm <TimeZoneName />. I am a front-end developer based
              in the UK, studying computer science at the University of York.
              I'm currently exploring typography, web animations and crafting
              interactions.
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
            subtitleChildren={
              <div className="flex items-center gap-1">
                SHADCN REGISTRY{" "}
                <ArrowUpRight
                  size={16}
                  strokeWidth={2.75}
                  className="mr-0.5 text-blue-700 opacity-40 group-hover:opacity-60 transition-all duration-200"
                />
              </div>
            }
            subtitleURL="https://ui.bartoszbak.org/docs/components"
            secondaryChildren={
              <div className="flex items-center gap-2 mr-2">
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
            <div className="grid grid-cols-2 gap-2 mr-2">
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
          <DesktopSection
            title="CONTACT"
            className="motion-blur-in-[2px] motion-opacity-in-0 motion-translate-y-in-[3.75%] motion-delay-400"
          >
            <div className="flex gap-8">
              <div
                style={{
                  fontFamily: "PP, Inter, sans-serif",
                  fontWeight: 500,
                  fontSize: "18px",
                }}
              >
                <div className="flex items-center gap-2.5">
                  <p>Twitter</p>
                  <MaterialSymbolsArrowRightAlt
                    className="size-5"
                    strokeWidth={2.85}
                  />
                  <a
                    href="https://twitter.com/nocdns"
                    className="text-gray-500 hover:text-blue-800 transition-colors relative mb-0.5"
                    onMouseEnter={() => {
                      setHoveringTwitter(true)
                      setTimeout(() => setHoveringTwitter(false), 300)
                    }}
                  >
                    <p style={{ fontFamily: "OpenRunde, sans-serif" }}>
                      <span className="mr-[1px] text-[16.5px]">@</span>
                      <span
                        style={{
                          letterSpacing: "-0.5px",
                          fontWeight: 500,
                          fontSize: "17.5px",
                        }}
                      >
                        nocdns
                      </span>
                    </p>
                    <AnimatePresence>
                      {hoveringTwitter && (
                        <motion.div
                          initial={{ opacity: 0, y: 0, scale: 0.8 }}
                          animate={{
                            opacity: 1,
                            y: -32,
                            x: 27,
                            rotate: 8.5,
                            scale: 1,
                          }}
                          exit={{
                            opacity: 0,
                            filter: "blur(1px)",
                          }}
                          transition={{
                            duration: 0.5,
                            ease: [0.215, 0.61, 0.355, 1],
                          }}
                          className="absolute left-[calc(50%-1px)] top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none font-semibold text-[16px] text-blue-600/50 whitespace-nowrap"
                        >
                          building in public
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </a>
                </div>
                <div className="flex items-center gap-2.5">
                  <p>Github</p>
                  <MaterialSymbolsArrowRightAlt
                    className="size-5"
                    strokeWidth={2.85}
                  />
                  <a
                    href="https://github.com/nocdn"
                    className="text-gray-500 hover:text-blue-800 transition-colors relative mb-0.5"
                  >
                    <p style={{ fontFamily: "OpenRunde, sans-serif" }}>
                      <span className="mr-[1px] text-[16.5px]">@</span>
                      <span
                        style={{
                          letterSpacing: "-0.5px",
                          fontWeight: 500,
                          fontSize: "17.5px",
                        }}
                      >
                        nocdn
                      </span>
                    </p>
                  </a>
                </div>
              </div>
              <div className="mb-auto flex flex-col">
                <div className="flex items-center gap-2.5">
                  <p className="text-[18px]">Email</p>
                  <MaterialSymbolsArrowRightAlt
                    className="size-5"
                    strokeWidth={2.85}
                  />
                  <a
                    onClick={(e) => {
                      e.preventDefault()
                      navigator.clipboard.writeText("contact@bartoszbak.org")
                      setShowCopied(true)
                      setTimeout(() => setShowCopied(false), 1000)
                    }}
                    href="mailto:contact@bartoszbak.org"
                    className="font-open-runde text-gray-500 hover:text-pink-800 transition-colors text-[16.5px] mb-0.5"
                  >
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={showingCopied ? "copied" : "copy"}
                        initial={{ opacity: 0.5, filter: "blur(1px)", y: -2 }}
                        animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                        exit={{ opacity: 0, filter: "blur(1px)", y: 2 }}
                        transition={{ duration: 0.1, ease: "easeInOut" }}
                        className="inline-block cursor-pointer"
                      >
                        {showingCopied ? (
                          <>
                            <span className="text-blue-600/90">[ copied ]</span>
                          </>
                        ) : (
                          <p className="flex">
                            <span className="mr-1">[</span>
                            <span>copy</span>
                            <span className="ml-1">]</span>
                          </p>
                        )}
                      </motion.div>
                    </AnimatePresence>
                  </a>
                </div>
                <div className="flex items-center gap-1.5">
                  <CornerDownRight
                    className="size-3.5 text-gray-500 opacity-70"
                    strokeWidth={2.65}
                  />
                  <p
                    className="text-[16.5px] font-mono text-gray-500 opacity-70"
                    style={{ lineHeight: "1.4" }}
                  >
                    contact@bartoszbak.org
                  </p>
                </div>
              </div>
            </div>
          </DesktopSection>
        </main>
      )}
    </div>
  )
}
