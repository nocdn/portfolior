"use client"

import { AnimatePresence, motion } from "motion/react"
import { useState } from "react"

export function DesktopSection({
  children,
  className,
  title,
  subtitleChildren,
  secondaryChildren,
  subtitleURL,
}: {
  children: React.ReactNode
  className?: string
  title: string
  subtitleChildren?: React.ReactNode
  secondaryChildren?: React.ReactNode
  subtitleURL?: string
}) {
  const [isHovering, setIsHovering] = useState(false)

  return (
    <div
      style={{
        fontFamily: "var(--font-pp-neue-montreal), Inter, sans-serif",
        fontWeight: 500,
        lineHeight: "30px",
        fontSize: "19px",
      }}
      className={`${className}`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div
        className="font-mono text-gray-500/60 text-[16px] font-semibold relative mb-1 flex items-center"
        style={{
          transform: isHovering ? "translateX(3px)" : "translateX(0px)",
          transition: "transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1)",
          fontWeight: isHovering ? 650 : 600,
        }}
      >
        {title}
        <AnimatePresence>
          {subtitleChildren && isHovering && (
            <motion.div
              tabIndex={0}
              className="text-[16px] font-semibold font-mono ml-2 text-blue-700/40 hover:text-blue-700/60 transition-colors duration-200 group cursor-pointer flex items-center"
              initial={{ opacity: 0, filter: "blur(2px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, filter: "blur(1.5px)" }}
              transition={{
                opacity: { duration: 0.2 },
              }}
              onClick={() => {
                window.open(subtitleURL, "_blank")
              }}
            >
              [{subtitleChildren}]
            </motion.div>
          )}
        </AnimatePresence>
        <div
          className="text-gray-500 hover:text-gray-700 cursor-pointer transition-colors duration-200 ml-auto"
          style={{
            transform: isHovering ? "translateX(-3px)" : "translateX(0px)",
            transition: "transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1)",
          }}
        >
          {secondaryChildren}
        </div>
      </div>
      {children}
    </div>
  )
}
