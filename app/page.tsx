"use client"
import { useIsMobile } from "@/hooks/useIsMobile"
import { DesktopSection } from "@/components/desktop/Section"
import { MobileSection } from "@/components/mobile/Section"
import { useState } from "react"
import { TimeZoneName } from "@/components/desktop/TimeZoneName"
import { Project } from "@/components/desktop/Project"
import { ArrowRightIcon, ArrowUpRight, CornerDownRight } from "lucide-react"
import { ComponentCarousel } from "@/components/ComponentCarousel"
import { Article } from "@/components/Article"
import { MaterialSymbolsArrowRightAlt } from "@/components/icons/arrowRight"
import { AnimatePresence, motion } from "motion/react"
import { ExtraButton } from "@/components/ExtraButton"
import HomeTitle from "@/components/mobile/HomeTitle"
import { MobileComponentCarousel } from "@/components/mobile/ComponentCarousel"

export default function Home() {
  const isMobile = useIsMobile()
  type Project = {
    title: string
    mobileTitle?: string
    description: string
    sourceURL?: string
    demoURL?: string
    chips?: string[]
    year?: number
  }
  const projects: Project[] = [
    {
      title: "Shifts",
      description: "Full stack rota and shift management system with auth",
      sourceURL: "https://github.com/nocdn/shiftsauth",
      chips: ["react", "supabase", "nextjs", "betterAuth"],
      year: 2025,
    },
    {
      title: "Vanish",
      description: "Temporary emails through Cloudflare, with frontend and API",
      sourceURL: "https://github.com/nocdn/vanish",
      chips: ["react", "flask"],
      year: 2025,
    },
    {
      title: "Books",
      mobileTitle: "Books (r)",
      description:
        "Recreation of (Basic) Bookmarks in Next.js with extra features",
      sourceURL: "https://github.com/nocdn/booksr",
      chips: ["react", "postgres", "nextjs"],
      year: 2025,
    },
    {
      title: "MCQs",
      description:
        "Interactive psychology practice questions built for my friends",
      demoURL: "https://mcqs.bartoszbak.org/",
      chips: ["react", "supabase", "lambda"],
      year: 2024,
    },
    {
      title: "Quiet Watch",
      description: "Intelligent ad segment remover powered by LLMs",
      sourceURL: "https://github.com/nocdn/ad-segment-trimmer",
      chips: ["python"],
      year: 2024,
    },
    {
      title: "Echoes",
      description: "Full stack, self-hostable video/audio transcription app",
      demoURL: "https://whisper.bartoszbak.org/",
      chips: ["python"],
      year: 2023,
    },
    {
      title: "Votes",
      description:
        "Voting platform for university society elections, in SvelteKit",
      sourceURL: "https://github.com/nocdn/votes",
      chips: ["sveltekit", "tailwindcss", "supabase"],
      year: 2025,
    },
  ]

  const projectsElements = projects.map((project, index) => (
    <Project key={index} {...project} />
  ))

  // this will be used to tick the component card carousel
  const [componentCardTick, setComponentCardTick] = useState(0)

  const [hoveringTwitter, setHoveringTwitter] = useState(false)
  const [showingCopied, setShowCopied] = useState(false)

  const onClickMobileIndex = (index: number) => {
    setActiveMobileIndex(index)
  }

  const [activeMobileIndex, setActiveMobileIndex] = useState(0)

  return (
    <div>
      {isMobile ? (
        <div
          className="flex flex-col h-[100svh] w-screen overflow-y-scroll snap-y snap-mandatory *:flex-none *:snap-start *:h-[100svh] *:w-screen"
          style={{
            scrollbarWidth: "none",
          }}
        >
          <div className="flex flex-col w-screen overflow-y-scroll snap-y snap-mandatory">
            <div className="flex flex-col gap-6 mt-auto p-8 text-[28px] font-sans font-medium">
              <HomeTitle
                index={1}
                onClick={onClickMobileIndex}
                title="About"
                motionDelay={200}
              />
              <HomeTitle
                index={2}
                onClick={onClickMobileIndex}
                title="Projects"
                count={7}
                motionDelay={150}
              />
              <HomeTitle
                index={3}
                onClick={onClickMobileIndex}
                title="Components"
                count={2}
                motionDelay={100}
              />
              <HomeTitle
                index={4}
                onClick={onClickMobileIndex}
                title="Writing"
                count={2}
                motionDelay={50}
              />
              <HomeTitle
                index={5}
                onClick={onClickMobileIndex}
                title="Contact"
                motionDelay={0}
              />
            </div>
          </div>
          <MobileSection title="ABOUT">
            <p className="leading-relaxed text-[18.5px]">
              Hey there, I'm Bartek. I am a front-end developer based in the UK,
              studying computer science at the University of York. I'm currently
              exploring typography, web animations and crafting interactions. I
              love to build with Next.js, TypeScript and Motion.
            </p>
          </MobileSection>
          <MobileSection title="PROJECTS">
            <div className="flex flex-col gap-4">
              {projects.map((project, index) => {
                return (
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
                )
              })}
            </div>
          </MobileSection>
          <MobileSection
            title="COMPONENTS"
            secondaryChildren={
              <div className="rounded-full bg-gray-100/75 flex items-center gap-1.5 p-1.5 px-2">
                <div className="rounded-full bg-gray-400 size-1.5"></div>
                <div className="rounded-full bg-gray-200 size-1.5"></div>
                <div className="rounded-full bg-gray-200 size-1.5"></div>
              </div>
            }
          >
            <MobileComponentCarousel />
          </MobileSection>
          <MobileSection title="WRITING">
            <div className="flex flex-col gap-3">
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
          </MobileSection>
        </div>
      ) : (
        <main className="w-[565px] mb-24 mx-auto pt-26 flex flex-col gap-12">
          <DesktopSection
            title="ABOUT"
            className="motion-blur-in-[2px] motion-opacity-in-0 motion-translate-y-in-[7%] group"
          >
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
          <ExtraButton />
        </main>
      )}
    </div>
  )
}
