"use client"

import { AnimatePresence, motion } from "motion/react"
import { useEffect, useState, useRef } from "react"
import Image from "next/image"
import cornerComponentImage from "../public/images/corner-buttons.png"

export function ComponentCarousel({ cardTick }: { cardTick: number }) {
  const componentCards = [
    <motion.a
      key={0}
      className="flex items-center gap-3 mr-6 cursor-pointer rounded-xl"
      initial={{ opacity: 0, x: -40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ type: "spring", stiffness: 220, damping: 20 }}
      exit={{ opacity: 0, x: 40, filter: "blur(3px)" }}
      href="https://ui.shadcn.com/docs/components/animated-spinner"
      target="_blank"
    >
      <img
        src="https://oiszjiwtfc65cwa2.public.blob.vercel-storage.com/work-previews/oklch-colors-new.png"
        alt="OKLCH colors"
        className="w-[200px] h-[100px] rounded-xl border border-gray-200"
      />
      <div className="flex flex-col gap-1 mb-auto">
        <p className="self-start font-inter text-[16.5px]">Animated spinners</p>
        <p className="mb-auto text-[15.5px] font-inter font-[450] text-gray-700 leading-normal">
          Custom recreation of the default iOS spinner, built for Svelte and
          React.
        </p>
      </div>
    </motion.a>,
    <motion.div
      key={1}
      className="flex items-center gap-3 mr-6 cursor-pointer rounded-xl"
      initial={{ opacity: 0, x: -40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ type: "spring", stiffness: 220, damping: 20 }}
      exit={{ opacity: 0, x: 40, filter: "blur(3px)" }}
      onClick={() =>
        window.open("https://ui.bartoszbak.org/docs/cornered-button", "_blank")
      }
    >
      <Image
        src={cornerComponentImage.src}
        alt="Corner bordered buttons"
        width={200}
        height={100}
        className="w-[200px] h-[100px] rounded-xl border border-gray-200 px-8 py-4 object-contain"
      />
      <div className="flex flex-col gap-1 mb-auto">
        <p className="self-start font-inter text-[16.5px]">
          Corner bordered buttons
        </p>
        <p className="mb-auto text-[15.5px] font-inter font-[450] text-gray-700 leading-normal">
          Inspired by{" "}
          <a
            href="https://www.twitter.com/aliszu"
            target="_blank"
            className="text-blue-700"
          >
            @aliszu
          </a>{" "}
          and Tailwind CSS docs page. Heavily customizeable with props.
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
