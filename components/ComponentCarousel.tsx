"use client"

import { componentCards, type ComponentCard } from "@/data/components"
import { animate, AnimatePresence, motion, useMotionValue } from "motion/react"
import Image from "next/image"
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

function DesktopCardImage({ card }: { card: ComponentCard }) {
  const className =
    "w-[200px] h-[100px] rounded-xl border border-gray-200 dark:border-white/10 object-contain bg-white"

  if (card.useNextImage) {
    return (
      <a
        href={card.href}
        target="_blank"
        rel="noopener noreferrer"
        className="h-[100px] w-[200px] shrink-0"
      >
        <Image
          src={card.image}
          alt={card.alt}
          width={200}
          height={100}
          className={`${className} px-8 py-4`}
          loading="lazy"
          priority={false}
        />
      </a>
    )
  }

  return (
    <a
      href={card.href}
      target="_blank"
      rel="noopener noreferrer"
      className="h-[100px] w-[200px] shrink-0"
    >
      <img src={card.image} alt={card.alt} className={className} loading="lazy" />
    </a>
  )
}

function DesktopCardContent({ card }: { card: ComponentCard }) {
  return (
    <div className="mb-auto flex flex-col gap-1">
      <a
        href={card.href}
        target="_blank"
        rel="noopener noreferrer"
        className="font-inter self-start text-[16.5px] antialiased"
      >
        {card.title}
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
    componentCards.forEach((card) => {
      const img = new window.Image()
      img.src = card.image
    })
  }, [])

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
          <DesktopCardImage card={card} />
          <DesktopCardContent card={card} />
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

const SWIPE_THRESHOLD = 50
const SWIPE_VELOCITY_THRESHOLD = 300

const MOBILE_SPRING_CONFIG = {
  type: "spring" as const,
  stiffness: 400,
  damping: 35,
}

function MobileCardImage({ card }: { card: ComponentCard }) {
  const className =
    "w-full aspect-[2/1] rounded-xl border-[1.5px] border-gray-200 dark:border-white/10 object-contain bg-white"

  if (card.useNextImage) {
    return (
      <Image
        src={card.image}
        alt={card.alt}
        width={400}
        height={200}
        className={`${className} bg-white px-8 py-4`}
        draggable={false}
        loading="lazy"
        priority={false}
      />
    )
  }

  return (
    <img src={card.image} alt={card.alt} className={className} draggable={false} loading="lazy" />
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
            <MobileCardImage card={card} />
            <MobileCardContent card={card} />
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="flex items-center justify-center gap-2 pt-1">
        {componentCards.map((_, i) => (
          <div
            key={i}
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
