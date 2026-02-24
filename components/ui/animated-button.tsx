"use client"

import { cn } from "@/lib/utils"
import { AnimatePresence, motion } from "motion/react"
import { useEffect, useRef, useState } from "react"

export function AnimatedButton({
  children,
  secondaryChildren,
  className,
  onClick,
  ariaLabel,
  showingSecondary,
  timeout = 1000,
}: {
  children: React.ReactNode
  secondaryChildren?: React.ReactNode
  className?: string
  onClick?: () => void
  ariaLabel: string
  showingSecondary?: boolean
  timeout?: number
}) {
  const [isShowingSecondary, setIsShowingSecondary] = useState(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const isControlled = showingSecondary !== undefined

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  const shouldShowSecondary =
    Boolean(secondaryChildren) && (isControlled ? Boolean(showingSecondary) : isShowingSecondary)

  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      tabIndex={0}
      aria-label={ariaLabel}
      className={cn("group flex shrink-0 cursor-pointer items-center justify-center", className)}
      onClick={() => {
        if (shouldShowSecondary) return

        onClick?.()

        if (secondaryChildren && !isControlled) {
          if (timeoutRef.current) {
            clearTimeout(timeoutRef.current)
          }
          setIsShowingSecondary(true)
          timeoutRef.current = setTimeout(() => {
            setIsShowingSecondary(false)
          }, timeout)
        }
      }}
    >
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.div
          key={shouldShowSecondary ? "secondary" : "primary"}
          initial={{ opacity: 0, scale: 0.25, filter: "blur(4px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, scale: 0.25, filter: "blur(4px)" }}
          transition={{
            type: "spring",
            duration: 0.3,
            bounce: 0,
          }}
          className="grid place-content-center"
        >
          {shouldShowSecondary ? secondaryChildren : children}
        </motion.div>
      </AnimatePresence>
    </motion.button>
  )
}
