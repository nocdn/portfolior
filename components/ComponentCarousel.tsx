"use client"

import { AnimatePresence, motion } from "motion/react"
import { useEffect, useState, useRef } from "react"
import Image from "next/image"
import cornerComponentImage from "../public/images/corner-buttons.png"
import animatedTickerImage from "../public/images/ticker.gif"
import animatedCopyButtonImage from "../public/images/copy.gif"

type ComponentCard = {
  image: string
  alt: string
  title: string
  description: React.ReactNode
  href: string
  useNextImage?: boolean
}

const COMPONENT_CARDS: ComponentCard[] = [
  {
    image: cornerComponentImage.src,
    alt: "Corner bordered buttons",
    title: "Corner bordered buttons",
    description: (
      <>
        Inspired by <span className="text-blue-700">@aliszu</span> and Tailwind
        CSS docs page. Heavily customizeable with props.
      </>
    ),
    href: "https://ui.bartoszbak.org/?item=cornered-button",
    useNextImage: true,
  },
  {
    image: animatedTickerImage.src,
    alt: "Animated ticker",
    title: "Animated ticker",
    description:
      "Ticker component which smoothly animates when it's text content changes.",
    href: "https://ui.bartoszbak.org/?item=ticker",
  },
  {
    image: animatedCopyButtonImage.src,
    alt: "Animated copy button",
    title: "Animated copy button",
    description:
      "A button that very smoothly transitions between it's two children.",
    href: "https://ui.bartoszbak.org/?item=copy-button",
  },
]

const CARD_ANIMATION = {
  initial: { opacity: 0, x: -40 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 40, filter: "blur(3px)" },
  transition: { type: "spring", stiffness: 220, damping: 20 },
} as const

function CardImage({ card }: { card: ComponentCard }) {
  const className =
    "w-[200px] h-[100px] rounded-xl border border-gray-200 object-contain"

  if (card.useNextImage) {
    return (
      <Image
        src={card.image}
        alt={card.alt}
        width={200}
        height={100}
        className={`${className} px-8 py-4`}
        loading="lazy"
        priority={false}
      />
    )
  }

  return (
    <img src={card.image} alt={card.alt} className={className} loading="lazy" />
  )
}

function CardContent({ card }: { card: ComponentCard }) {
  return (
    <div className="flex flex-col gap-1 mb-auto">
      <p className="self-start font-inter text-[16.5px]">{card.title}</p>
      <p className="mb-auto text-[15.5px] font-inter font-[450] text-gray-700 leading-normal">
        {card.description}
      </p>
    </div>
  )
}

export function ComponentCarousel({ cardTick }: { cardTick: number }) {
  const [currentCard, setCurrentCard] = useState(0)
  const isInitialRender = useRef(true)

  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false
      return
    }
    setCurrentCard((prev) => (prev + 1) % COMPONENT_CARDS.length)
  }, [cardTick])

  const card = COMPONENT_CARDS[currentCard]

  return (
    <div>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.a
          key={currentCard}
          href={card.href}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 mr-6 cursor-pointer rounded-xl"
          {...CARD_ANIMATION}
        >
          <CardImage card={card} />
          <CardContent card={card} />
        </motion.a>
      </AnimatePresence>
    </div>
  )
}
