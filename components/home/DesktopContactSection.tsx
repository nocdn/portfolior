"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { CornerDownRight } from "lucide-react"
import { DesktopSection } from "@/components/desktop/Section"
import { MaterialSymbolsArrowRightAlt } from "@/components/icons/arrowRight"

export function DesktopContactSection() {
  const [hoveringTwitter, setHoveringTwitter] = useState(false)
  const [showingCopied, setShowCopied] = useState(false)

  return (
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
                    <span className="text-blue-600/90">[ copied ]</span>
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
  )
}
