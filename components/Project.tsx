"use client"

import { motion } from "motion/react"
import type { KeyboardEvent, MouseEvent, ReactNode } from "react"
import { useEffect, useId, useRef } from "react"
import useMeasure from "react-use-measure"

const projectExpandTransition = {
  type: "tween" as const,
  ease: [0.26, 1, 0.5, 1] as const,
  bounce: 0,
  duration: 0.27,
}

export const ProjectDesktop = ({
  className,
  title,
  description,
  extendedDescription,
  isOpen,
  showOpenCta,
  onToggle,
  onClose,
  onHoverStart,
  onHoverEnd,
}: {
  className?: string
  title: string
  description?: string
  extendedDescription?: ReactNode
  isOpen: boolean
  showOpenCta?: boolean
  onToggle: () => void
  onClose: () => void
  onHoverStart?: () => void
  onHoverEnd?: () => void
}) => {
  const panelId = useId()
  const [contentRef, bounds] = useMeasure()
  const handleMouseDown = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    event.currentTarget.blur()
    onToggle()
  }
  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key !== "Enter" && event.key !== " ") {
      return
    }

    event.preventDefault()
    onToggle()
  }

  return (
    <div
      className={`${className} group/item relative py-0.5 transition-opacity duration-150 group-hover:opacity-30 focus-within:opacity-100 hover:opacity-100! hover:duration-0 ${isOpen ? "opacity-100" : ""}`}
      onMouseEnter={onHoverStart}
      onMouseLeave={() => {
        onHoverEnd?.()
        onClose()
      }}
    >
      <button
        type="button"
        className="w-full cursor-pointer text-left focus:outline-none"
        onMouseDown={handleMouseDown}
        onKeyDown={handleKeyDown}
        aria-expanded={isOpen}
        aria-controls={panelId}
      >
        <div className="font-pp-neue-montreal relative z-10 w-full text-[17px] leading-8 font-medium">
          <div className="relative inline-flex items-center gap-3 whitespace-nowrap">
            <p className="shrink-0 whitespace-nowrap text-gray-800/90 group-hover/item:text-blue-600 group-hover/item:drop-shadow-[0_0_0.5px_rgba(59,130,246,0.2)] dark:text-gray-200/95 dark:antialiased dark:group-hover/item:text-blue-400 dark:group-hover/item:drop-shadow-[0_0_0.5px_rgba(96,165,250,0.2)]">
              {title}
            </p>
            {description && (
              <p className="font-switzer text-[17px] font-medium whitespace-nowrap text-gray-500/90 antialiased group-hover:text-gray-700 dark:text-gray-400/90 dark:group-hover:text-gray-300">
                {description}
              </p>
            )}
            <span
              aria-hidden="true"
              className={`font-inter pointer-events-none absolute top-1/2 left-full z-30 -translate-y-1/2 text-[16px] leading-8 font-medium whitespace-nowrap text-gray-500 transition-opacity duration-150 dark:text-gray-400 ${
                showOpenCta
                  ? "pointer-events-auto ml-3 opacity-45 hover:opacity-75"
                  : "ml-3 opacity-0"
              }`}
            >
              <span className="font-mono">[</span>
              <span className="font-mono text-[16px] opacity-85">OPEN</span>
              <span className="font-mono">]</span>
            </span>
          </div>
        </div>
      </button>
      <motion.div
        id={panelId}
        initial={false}
        animate={{
          height: isOpen ? bounds.height : 0,
          opacity: isOpen ? 1 : 0,
        }}
        transition={projectExpandTransition}
        className="overflow-hidden"
        aria-hidden={!isOpen}
      >
        <div ref={contentRef} className="pt-1 pb-2" inert={!isOpen}>
          <div className="font-inter max-w-[60ch] pr-8 text-[15px] leading-6 font-medium text-pretty text-gray-600 antialiased dark:text-gray-400">
            {extendedDescription}
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export const ProjectMobile = ({
  title,
  year,
  extendedDescription,
  isOpen,
  onToggle,
  onClose,
}: {
  title: string
  year?: number
  extendedDescription?: ReactNode
  isOpen: boolean
  onToggle: () => void
  onClose: () => void
}) => {
  const panelId = useId()
  const [contentRef, bounds] = useMeasure()
  const containerRef = useRef<HTMLDivElement | null>(null)
  const handleMouseDown = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    event.currentTarget.blur()
    onToggle()
  }
  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key !== "Enter" && event.key !== " ") {
      return
    }

    event.preventDefault()
    onToggle()
  }

  useEffect(() => {
    if (!isOpen) {
      return
    }

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target

      if (!(target instanceof Node) || containerRef.current?.contains(target)) {
        return
      }

      onClose()
    }

    document.addEventListener("pointerdown", handlePointerDown, true)

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown, true)
    }
  }, [isOpen, onClose])

  return (
    <div ref={containerRef} className="flex flex-col">
      <button
        type="button"
        className="w-full cursor-pointer text-left focus:outline-none"
        onMouseDown={handleMouseDown}
        onKeyDown={handleKeyDown}
        aria-expanded={isOpen}
        aria-controls={panelId}
      >
        <div className="flex items-center justify-between gap-4">
          <p
            className={`flex-nowrap text-[17px] whitespace-nowrap transition-colors duration-150 ${
              isOpen ? "text-blue-600 dark:text-blue-400" : ""
            }`}
          >
            {title}
          </p>
          <div
            className={`h-px w-full transition-colors duration-150 ${
              isOpen ? "bg-blue-200 dark:bg-blue-400/20" : "bg-gray-200 dark:bg-white/10"
            }`}
          ></div>
          {year ? <p className="text-sm text-gray-500/90 dark:text-gray-400/90">{year}</p> : null}
        </div>
      </button>
      <motion.div
        id={panelId}
        initial={false}
        animate={{
          height: isOpen ? bounds.height : 0,
          opacity: isOpen ? 1 : 0,
        }}
        transition={projectExpandTransition}
        className="overflow-hidden"
        aria-hidden={!isOpen}
      >
        <div ref={contentRef} className="pt-2 pb-1" inert={!isOpen}>
          <div className="font-inter pr-2 text-[15px] leading-6 font-medium text-pretty text-gray-600 antialiased dark:text-gray-400">
            {extendedDescription}
          </div>
        </div>
      </motion.div>
    </div>
  )
}
