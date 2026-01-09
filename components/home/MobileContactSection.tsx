"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { Copy, Check } from "lucide-react"
import { MobileSection } from "@/components/mobile/Section"
import { MaterialSymbolsArrowRightAlt } from "@/components/icons/arrowRight"

export function MobileContactSection() {
  const [showingCopied, setShowCopied] = useState(false)

  return (
    <MobileSection id="contact" title="CONTACT">
      <div className="flex flex-col gap-3 mt-3">
        <a
          href="https://twitter.com/nocdns"
          target="_blank"
          className="flex items-center gap-3 text-[23px]"
        >
          <p>Twitter</p>
          <MaterialSymbolsArrowRightAlt
            className="size-7 text-blue-700"
            strokeWidth={2.85}
          />
          <p className="text-gray-500 text-[21px]">@nocdns</p>
        </a>
        <a
          href="https://github.com/nocdn"
          target="_blank"
          className="flex items-center gap-3 text-[23px]"
        >
          <p>Github</p>
          <MaterialSymbolsArrowRightAlt
            className="size-7 text-gray-500"
            strokeWidth={2.85}
          />
          <p className="text-gray-500 text-[21px]">@nocdn</p>
        </a>
        <a
          href="mailto:contact@bartoszbak.org"
          target="_blank"
          className="flex items-center gap-3 text-[23px]"
          onClick={(e) => {
            e.preventDefault()
            navigator.clipboard.writeText("contact@bartoszbak.org")
            setShowCopied(true)
            setTimeout(() => setShowCopied(false), 900)
          }}
        >
          <p>Email</p>
          <MaterialSymbolsArrowRightAlt
            className="size-7 text-pink-800"
            strokeWidth={2.85}
          />
          <div className="text-gray-500 text-[21px]">
            <AnimatePresence mode="wait">
              <motion.span
                key={showingCopied ? "copied" : "copy"}
                initial={{ opacity: 0.5, y: -1, filter: "blur(1px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: 1, filter: "blur(1px)" }}
                transition={{ duration: 0.12, ease: "easeInOut" }}
                className="inline-flex items-center gap-1"
              >
                {showingCopied ? (
                  <>
                    <Check
                      className="size-4.5 translate-y-0.5 mx-1"
                      strokeWidth={2.55}
                    />
                    copied
                  </>
                ) : (
                  <>
                    <Copy className="size-4 mt-0.5 mx-1" strokeWidth={2.55} />
                    copy
                  </>
                )}
              </motion.span>
            </AnimatePresence>
          </div>
        </a>
      </div>
    </MobileSection>
  )
}
