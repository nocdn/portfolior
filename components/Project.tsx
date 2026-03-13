"use client"

import { motion } from "motion/react"
import type { ReactNode } from "react"
import { useId } from "react"
import useMeasure from "react-use-measure"

export const ProjectDesktop = ({
  className,
  title,
  description,
  extendedDescription,
  isOpen,
  onToggle,
}: {
  className?: string
  title: string
  description?: string
  extendedDescription?: ReactNode
  isOpen: boolean
  onToggle: () => void
}) => {
  const panelId = useId()
  const [contentRef, bounds] = useMeasure()
  const transition = {
    type: "tween" as const,
    ease: [0.26, 1, 0.5, 1] as const,
    bounce: 0,
    duration: 0.27,
  }

  return (
    <div
      className={`${className} group/item relative py-0.5 transition-opacity duration-150 group-hover:opacity-30 focus-within:opacity-100 hover:opacity-100! hover:duration-0 ${isOpen ? "opacity-100" : ""}`}
    >
      <button
        type="button"
        className="w-full cursor-pointer text-left focus:outline-none"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={panelId}
      >
        <div className="font-pp-neue-montreal relative z-10 flex items-center gap-3 text-[17px] leading-8 font-medium">
          <p className="text-gray-800/90 group-hover/item:text-blue-600 group-hover/item:drop-shadow-[0_0_0.5px_rgba(59,130,246,0.2)] dark:text-gray-200/95 dark:antialiased dark:group-hover/item:text-blue-400 dark:group-hover/item:drop-shadow-[0_0_0.5px_rgba(96,165,250,0.2)]">
            {title}
          </p>
          {description && (
            <p className="font-switzer min-w-0 text-[17px] font-medium text-gray-500/90 antialiased group-hover:text-gray-700 dark:text-gray-400/90 dark:group-hover:text-gray-300">
              {description}
            </p>
          )}
        </div>
      </button>
      <motion.div
        id={panelId}
        initial={false}
        animate={{
          height: isOpen ? bounds.height : 0,
          opacity: isOpen ? 1 : 0,
        }}
        transition={transition}
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

export const ProjectMobile = () => {
  return <div>ProjectsMobile</div>
}
