"use client"

import { AnimatedButton } from "@/components/ui/animated-button"
import { CorneredButton } from "@/components/ui/cornered-button"
import { Ticker } from "@/components/ui/ticker"
import { componentCards, type ComponentCard } from "@/data/components"
import { ExternalLink, Globe, MoveRight } from "lucide-react"
import { animate, AnimatePresence, motion, useMotionValue } from "motion/react"
import { useEffect, useRef, useState } from "react"

const DESKTOP_CARD_ANIMATION = {
  initial: { opacity: 0, x: -40 },
  animate: { opacity: 1, x: 0 },
  exit: {
    opacity: 0,
    x: 40,
    filter: "blur(2px)",
    transition: {
      opacity: { duration: 0.19, ease: [0.26, 0.08, 0.25, 1] },
      default: { duration: 0.27, ease: [0.26, 0.08, 0.25, 1] },
    },
  },
  transition: {
    duration: 0.27,
    ease: [0.26, 0.08, 0.25, 1],
  },
} as const

const SWIPE_THRESHOLD = 50
const SWIPE_VELOCITY_THRESHOLD = 300

const MOBILE_SPRING_CONFIG = {
  type: "spring" as const,
  stiffness: 400,
  damping: 35,
}

const FILM_TICKER_ENTRIES = [
  "Snowden (2016)",
  "In the Heights (2021)",
  "The Martian (2015)",
  "Fight Club (1999)",
  "About Time (2013)",
  "Hijack (2023)",
] as const

const TICKER_INTERVAL_MS = 1300

function CorneredButtonPreview({ preventSwipeConflicts }: { preventSwipeConflicts: boolean }) {
  return (
    <div
      className="flex items-center gap-4"
      onPointerDownCapture={preventSwipeConflicts ? (event) => event.stopPropagation() : undefined}
    >
      <CorneredButton
        className="h-10 w-10 border-[#E5E7EA] bg-[#FCFCFC] p-1 text-black dark:border-[#3D4451] dark:bg-[#1C1C1C] dark:text-gray-100"
        cornerSize={8}
        cornerColor="#DA297A"
        borderWidth={2}
      >
        <Globe className="size-5" />
      </CorneredButton>
      <CorneredButton
        className="h-10 border-[#E5E7EA] bg-[#FCFCFC] px-4 text-[12px] font-[650] tracking-[0.05em] text-black dark:border-[#3D4451] dark:bg-[#1C1C1C] dark:text-gray-100"
        cornerSize={8}
        cornerColor="#607385"
        borderWidth={2}
      >
        <span className="font-ioskeley-mono text-[17px] font-semibold text-black dark:text-gray-100">
          COPY
        </span>
      </CorneredButton>
    </div>
  )
}

function TickerPreview() {
  const [filmIndex, setFilmIndex] = useState(0)

  useEffect(() => {
    const tickerIntervalId = window.setInterval(() => {
      setFilmIndex((prev) => (prev + 1) % FILM_TICKER_ENTRIES.length)
    }, TICKER_INTERVAL_MS)

    return () => {
      window.clearInterval(tickerIntervalId)
    }
  }, [])

  return (
    <div className="max-w-full scale-90 overflow-hidden [&>*]:!my-0">
      <Ticker text={FILM_TICKER_ENTRIES[filmIndex]} />
    </div>
  )
}

function CopyButtonPreview({ preventSwipeConflicts }: { preventSwipeConflicts: boolean }) {
  return (
    <div
      className="flex h-full w-full items-center justify-center gap-3"
      onPointerDownCapture={preventSwipeConflicts ? (event) => event.stopPropagation() : undefined}
    >
      <span className="mr-1 flex items-center gap-1.5 font-sans text-[12px] whitespace-nowrap text-gray-500 dark:text-gray-400">
        Click to try
        <MoveRight className="size-3.5" />
      </span>
      <AnimatedButton
        className="border-shadow size-[38px] rounded-md bg-[#FCFCFC] p-[6px] text-black dark:bg-[#1F1F1F] dark:text-gray-100"
        secondaryChildren={
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="size-[18px]">
            <path
              className="fill-[#3257D1] dark:fill-[#7B95FF]"
              d="M17 3.34a10 10 0 1 1-14.995 8.984L2 12l.005-.324A10 10 0 0 1 17 3.34m-1.293 5.953a1 1 0 0 0-1.32-.083l-.094.083L11 12.585l-1.293-1.292l-.094-.083a1 1 0 0 0-1.403 1.403l.083.094l2 2l.094.083a1 1 0 0 0 1.226 0l.094-.083l4-4l.083-.094a1 1 0 0 0-.083-1.32"
            />
          </svg>
        }
        ariaLabel="Copy"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="size-[18px]">
          <path
            className="fill-black dark:fill-gray-100"
            d="M4 5.4C4 4.622 4.622 4 5.4 4h7.2c.778 0 1.4.622 1.4 1.4V6a1 1 0 1 0 2 0v-.6C16 3.518 14.482 2 12.6 2H5.4A3.394 3.394 0 0 0 2 5.4v7.2C2 14.482 3.518 16 5.4 16H6a1 1 0 1 0 0-2h-.6c-.778 0-1.4-.622-1.4-1.4z"
          />
          <path
            className="fill-[#3257D1] dark:fill-[#7B95FF]"
            d="M9 11.4A2.4 2.4 0 0 1 11.4 9h7.2a2.4 2.4 0 0 1 2.4 2.4v7.2a2.4 2.4 0 0 1-2.4 2.4h-7.2A2.4 2.4 0 0 1 9 18.6z"
          />
        </svg>
      </AnimatedButton>
    </div>
  )
}

function CardPreview({
  card,
  isMobile,
  preventSwipeConflicts,
}: {
  card: ComponentCard
  isMobile: boolean
  preventSwipeConflicts: boolean
}) {
  return (
    <div
      className={`flex size-full items-center justify-center px-3 ${
        isMobile ? "scale-[1.28]" : ""
      }`}
    >
      {card.previewKind === "cornered-button" && (
        <CorneredButtonPreview preventSwipeConflicts={preventSwipeConflicts} />
      )}
      {card.previewKind === "ticker" && <TickerPreview />}
      {card.previewKind === "copy-button" && (
        <CopyButtonPreview preventSwipeConflicts={preventSwipeConflicts} />
      )}
    </div>
  )
}

function DesktopCardPreview({ card }: { card: ComponentCard }) {
  return (
    <div className="h-[100px] w-[200px] shrink-0 overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/10 dark:bg-[#1c1c1c]">
      <CardPreview card={card} isMobile={false} preventSwipeConflicts={false} />
    </div>
  )
}

function DesktopCardContent({ card }: { card: ComponentCard }) {
  return (
    <div className="mb-auto flex flex-col gap-1">
      <a
        href={card.href}
        target="_blank"
        rel="noopener noreferrer"
        className="group font-inter self-start text-[16.5px] antialiased"
      >
        <span className="inline-flex items-center gap-2">
          {card.title}
          <ExternalLink
            size={16}
            strokeWidth={2.75}
            className="text-blue-700 opacity-0 transition-opacity duration-200 group-hover:opacity-60 dark:text-blue-400/60"
          />
        </span>
      </a>
      <p className="font-inter mb-auto text-[15.5px] leading-normal font-[450] text-gray-700 dark:text-gray-300">
        {card.description}
      </p>
    </div>
  )
}

export function DesktopComponentCarousel({ cardTick }: { cardTick: number }) {
  const [currentCard, setCurrentCard] = useState(0)
  const isInitialRender = useRef(true)

  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false
      return
    }
    setCurrentCard((prev) => (prev + 1) % componentCards.length)
  }, [cardTick])

  const card = componentCards[currentCard]

  return (
    <div>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.div
          key={currentCard}
          className="mr-6 flex items-center gap-3 rounded-xl"
          {...DESKTOP_CARD_ANIMATION}
        >
          <DesktopCardPreview card={card} />
          <DesktopCardContent card={card} />
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

function MobileCardPreview({ card }: { card: ComponentCard }) {
  return (
    <div className="w-full overflow-hidden rounded-xl border-[1.5px] border-gray-200 bg-white dark:border-white/10 dark:bg-[#1c1c1c]">
      <div className="aspect-[2/1]">
        <CardPreview card={card} isMobile={true} preventSwipeConflicts={false} />
      </div>
    </div>
  )
}

function MobileCardContent({ card }: { card: ComponentCard }) {
  return (
    <div className="flex flex-col gap-1 pt-3">
      <a
        href={card.href}
        target="_blank"
        rel="noopener noreferrer"
        className="font-inter text-[16.5px]"
      >
        {card.title}
      </a>
      <p className="font-inter text-[15.5px] leading-normal font-[450] text-gray-700 dark:text-gray-300">
        {card.description}
      </p>
    </div>
  )
}

export function MobileComponentCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const x = useMotionValue(0)

  const paginate = (newDirection: number) => {
    const nextIndex = currentIndex + newDirection
    if (nextIndex < 0 || nextIndex >= componentCards.length) {
      animate(x, 0, MOBILE_SPRING_CONFIG)
      return
    }
    setDirection(newDirection)
    setCurrentIndex(nextIndex)
  }

  const handleDragEnd = (
    _: PointerEvent | MouseEvent | TouchEvent,
    info: { offset: { x: number }; velocity: { x: number } }
  ) => {
    const offsetX = info.offset.x
    const velocityX = info.velocity.x

    if (offsetX < -SWIPE_THRESHOLD || velocityX < -SWIPE_VELOCITY_THRESHOLD) {
      paginate(1)
    } else if (offsetX > SWIPE_THRESHOLD || velocityX > SWIPE_VELOCITY_THRESHOLD) {
      paginate(-1)
    }
  }

  const jumpToIndex = (nextIndex: number) => {
    if (nextIndex === currentIndex) return

    setDirection(nextIndex > currentIndex ? 1 : -1)
    setCurrentIndex(nextIndex)
  }

  const card = componentCards[currentIndex]

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 200 : -200,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -200 : 200,
      opacity: 0,
    }),
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="relative overflow-hidden">
        <AnimatePresence mode="popLayout" initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={MOBILE_SPRING_CONFIG}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.15}
            dragMomentum={false}
            onDragEnd={handleDragEnd}
            className="w-full touch-pan-y"
          >
            <MobileCardPreview card={card} />
            <MobileCardContent card={card} />
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="flex items-center justify-center gap-2 pt-1">
        {componentCards.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Go to component ${i + 1}`}
            onClick={() => jumpToIndex(i)}
            className={`h-1.5 rounded-full transition-all duration-200 ${
              i === currentIndex
                ? "w-4 bg-gray-500 dark:bg-gray-400"
                : "w-1.5 bg-gray-300 dark:bg-gray-600"
            }`}
          />
        ))}
      </div>
    </div>
  )
}
