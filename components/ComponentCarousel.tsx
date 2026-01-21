"use client"

import { AnimatePresence, motion } from "motion/react"
import { useEffect, useState, useRef } from "react"
import Image from "next/image"
import cornerComponentImage from "../public/images/corner-buttons.png"
import animatedTickerImage from "../public/images/ticker.gif"
import animatedCopyButtonImage from "../public/images/copy.gif"

export function ComponentCarousel({ cardTick }: { cardTick: number }) {
  const componentCards = [
    <motion.div
      key={0}
      className="flex items-center gap-3 mr-6 cursor-pointer rounded-xl"
      initial={{ opacity: 0, x: -40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ type: "spring", stiffness: 220, damping: 20 }}
      exit={{ opacity: 0, x: 40, filter: "blur(3px)" }}
      onClick={() =>
        window.open("https://ui.bartoszbak.org/?item=cornered-button", "_blank")
      }
    >
      <Image
        src={cornerComponentImage.src}
        alt="Corner bordered buttons"
        width={200}
        height={100}
        className="w-[200px] h-[100px] rounded-xl border border-gray-200 px-8 py-4 object-contain"
        loading="lazy"
        priority={false}
      />
      <div className="flex flex-col gap-1 mb-auto">
        <p className="self-start font-inter text-[16.5px]">
          Corner bordered buttons
        </p>
        <p className="mb-auto text-[15.5px] font-inter font-[450] text-gray-700 leading-normal">
          Inspired by <span className="text-blue-700">@aliszu</span> and
          Tailwind CSS docs page. Heavily customizeable with props.
        </p>
      </div>
    </motion.div>,
    <motion.a
      key={1}
      className="flex items-center gap-3 mr-6 cursor-pointer rounded-xl"
      initial={{ opacity: 0, x: -40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ type: "spring", stiffness: 220, damping: 20 }}
      exit={{ opacity: 0, x: 40, filter: "blur(3px)" }}
      href="https://ui.bartoszbak.org/?item=ticker"
      target="_blank"
    >
      <img
        src={animatedTickerImage.src}
        alt="Animated ticker"
        className="w-[200px] h-[100px] rounded-xl border border-gray-200"
        loading="lazy"
      />
      <div className="flex flex-col gap-1 mb-auto">
        <p className="self-start font-inter text-[16.5px]">Animated ticker</p>
        <p className="mb-auto text-[15.5px] font-inter font-[450] text-gray-700 leading-normal">
          Ticker component which smoothly animates when it's text content
          changes.
        </p>
      </div>
    </motion.a>,
    <motion.a
      key={2}
      className="flex items-center gap-3 mr-6 cursor-pointer rounded-xl"
      initial={{ opacity: 0, x: -40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ type: "spring", stiffness: 220, damping: 20 }}
      exit={{ opacity: 0, x: 40, filter: "blur(3px)" }}
      href="https://ui.bartoszbak.org/?item=copy-button"
      target="_blank"
    >
      <img
        src={animatedCopyButtonImage.src}
        alt="Animated copy button"
        className="w-[200px] h-[100px] rounded-xl border border-gray-200"
        loading="lazy"
      />
      <div className="flex flex-col gap-1 mb-auto">
        <p className="self-start font-inter text-[16.5px]">
          Animated copy button
        </p>
        <p className="mb-auto text-[15.5px] font-inter font-[450] text-gray-700 leading-normal">
          A button that very smoothly transitions between it's two children.
        </p>
      </div>
    </motion.a>,
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
