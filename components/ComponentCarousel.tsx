"use client"

import { AnimatePresence, motion } from "motion/react"
import { useEffect, useState, useRef } from "react"

export function ComponentCarousel({ cardTick }: { cardTick: number }) {
  const componentCards = [
    <motion.div
      key={0}
      className="flex items-center gap-3 mr-6"
      initial={{ opacity: 0, x: -40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ type: "spring", stiffness: 220, damping: 20 }}
      exit={{ opacity: 0, x: 40, filter: "blur(3px)" }}
    >
      <img
        src="https://oiszjiwtfc65cwa2.public.blob.vercel-storage.com/work-previews/oklch-colors-new.png"
        alt="Animated spinners"
        className="max-w-[200px] max-h-[300px] rounded-xl border border-gray-200"
      />
      <div className="flex flex-col gap-1 mb-auto">
        <p className="self-start font-inter text-[16.5px]">Animated spinners</p>
        <p className="mb-auto text-[15.5px] font-inter font-[450] text-gray-700 leading-normal">
          Custom recreation of the default iOS spinner, built for Svelte and
          React.
        </p>
      </div>
    </motion.div>,
    <motion.div
      key={1}
      className="flex items-center gap-3 mr-6"
      initial={{ opacity: 0, x: -40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ type: "spring", stiffness: 220, damping: 20 }}
      exit={{ opacity: 0, x: 40, filter: "blur(3px)" }}
    >
      <img
        src="https://oiszjiwtfc65cwa2.public.blob.vercel-storage.com/work-previews/oklch-colors-new.png"
        alt="Animated spinners"
        className="max-w-[200px] max-h-[300px] rounded-xl border border-gray-200"
      />
      <div className="flex flex-col gap-1 mb-auto">
        <p className="self-start font-inter text-[16.5px]">
          Corner bordered buttons
        </p>
        <p className="mb-auto text-[15.5px] font-inter font-[450] text-gray-700 leading-normal">
          Inspired by Tailwind CSS documentation page, I loved the look of it.
        </p>
      </div>
    </motion.div>,
  ]

  const [currentCard, setCurrentCard] = useState(0)
  const isInitialRender = useRef(true)
  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false
      return
    }

    setCurrentCard((prev) => (prev + 1) % componentCards.length)
  }, [cardTick, componentCards.length])

  return (
    <div>
      <AnimatePresence mode="popLayout" initial={false}>
        {componentCards[currentCard]}
      </AnimatePresence>
    </div>
  )
}
