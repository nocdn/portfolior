"use client"

import { useRef, useEffect, useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { ArrowUpRight } from "lucide-react"

export function Project({
  className,
  title,
  description,
  demoURL,
  sourceURL,
  chips = [],
}: {
  className?: string
  title: string
  description?: string
  demoURL?: string
  sourceURL?: string
  chips?: string[]
}) {
  const chipsDetails = {
    svelte: {
      bgColor: "#FEEEEE",
      textColor: "#EC6A5B",
      label: "Svelte",
    },
    sveltekit: {
      bgColor: "#FEEEEE",
      textColor: "#EC6A5B",
      label: "SvelteKit",
    },
    tailwindcss: {
      bgColor: "#F8F8F8",
      textColor: "#008DFF",
      label: "Tailwind",
    },
    react: {
      bgColor: "#E5F3FE",
      textColor: "#008DFF",
      label: "React",
    },
    flask: {
      bgColor: "#F1F1F1",
      textColor: "#787878",
      label: "Flask",
    },
    nextjs: {
      bgColor: "#F5F5F5",
      textColor: "#222222",
      label: "Next.js",
    },
    supabase: {
      bgColor: "#E1FAE8",
      textColor: "#38C25D",
      label: "Supabase",
    },
    postgres: {
      bgColor: "#E5F3FE",
      textColor: "#008DFF",
      label: "PostgreSQL",
    },
    lambda: {
      bgColor: "#FFF4EE",
      textColor: "#E68F37",
      label: "Lambda",
    },
    python: {
      bgColor: "#FDF4DC",
      textColor: "#E6961F",
      label: "Python",
    },
    betterAuth: {
      bgColor: "#E0E0E0",
      textColor: "black",
      label: "Better-Auth",
    },
  }

  const [showingBackground, setShowingBackground] = useState(false)
  const [showingChips, setShowingChips] = useState(false)
  const [showDescription, setShowDescription] = useState(true)

  const chipsElements = chips.map((chip, index) => (
    <div
      key={index}
      className="rounded-lg px-2.5 text-[14px] leading-4 py-1.5 inline-flex items-center font-open-runde tracking-tighter"
      style={{
        backgroundColor:
          chipsDetails[chip as keyof typeof chipsDetails].bgColor,
        color: chipsDetails[chip as keyof typeof chipsDetails].textColor,
        letterSpacing: "0.02em",
      }}
    >
      {chipsDetails[chip as keyof typeof chipsDetails].label}
    </div>
  ))

  return (
    <div
      className="flex flex-col"
      onMouseEnter={() => {
        setShowingBackground(true)
        setShowingChips(true)
      }}
      onMouseLeave={() => {
        setShowingBackground(false)
        setShowingChips(false)
      }}
    >
      <a
        href={demoURL ? demoURL : sourceURL}
        target="_blank"
        className={`${className} relative inline-block`}
      >
        <motion.div
          className="absolute inset-0 w-full h-full rounded-lg -translate-x-2.5"
          initial={{ width: 0 }}
          animate={{ width: showingBackground ? "100%" : 0 }}
          transition={{
            duration: 0.2,
            ease: "easeOut",
          }}
        />
        <div
          className="relative z-10 text-[15px] flex items-center gap-3 motion-blur-in-[2px] motion-opacity-in-0"
          style={{
            fontFamily: "PP Neue Montreal, Inter, sans-serif",
            fontWeight: 500,
            lineHeight: "32px",
            fontSize: "17px",
          }}
        >
          <p>{title}</p>
          {description && (
            <div className="grid">
              <div
                style={{
                  filter: showingChips ? "blur(1px)" : "",
                  gridArea: "1/1",
                  opacity: showingChips ? 0.05 : 1,
                  scale: showingChips ? 0.98 : 1,
                  transformOrigin: "left",
                  transition: "all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1)",
                }}
              >
                <p
                  className={"text-gray-500/90"}
                  style={{
                    fontFamily: "Switzer",
                    fontSize: "17px",
                    fontWeight: 500,
                  }}
                >
                  {description}
                </p>
              </div>
              <AnimatePresence>
                {showingChips && (
                  <motion.div
                    className="flex items-center gap-1"
                    initial={{ opacity: 0, y: -7, filter: "blur(2px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0)" }}
                    exit={{ opacity: 0, y: 5, filter: "blur(2px)" }}
                    style={{ gridArea: "1/1" }}
                  >
                    {chipsElements}{" "}
                    <p className="text-gray-600 text-[15px] font-sf-pro-rounded ml-1 -motion-translate-x-in-25 flex items-center gap-1 motion-delay-75">
                      <ArrowUpRight
                        className="w-4.5 h-4.5"
                        strokeWidth={2.25}
                      />
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>
      </a>
    </div>
  )
}
