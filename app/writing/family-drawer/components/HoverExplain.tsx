import { AnimatePresence, motion } from "motion/react"
import { useState } from "react"

export function HoverExplain({
  children,
  description,
}: {
  children: React.ReactNode
  description: string
}) {
  const [showingDescription, setShowingDescription] = useState(false)

  return (
    <div
      className="hover-explain inline-block leading-[1.2] relative"
      onMouseEnter={() => setShowingDescription(true)}
      onMouseLeave={() => setShowingDescription(false)}
    >
      {children}
      <AnimatePresence>
        {showingDescription && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, filter: "blur(2px)", y: 10 }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0)", y: 0 }}
            exit={{ opacity: 0, scale: 0.9, filter: "blur(4px)", y: 7 }}
            transition={{ type: "spring", duration: 0.4, bounce: 0.3 }}
            className="fixed top-4 left-1/2 transform -translate-x-1/2 w-[calc(100vw-2rem)] md:absolute md:bottom-full md:top-auto md:mb-2 md:left-1/2 md:right-auto md:transform md:-translate-x-1/2 md:w-auto md:min-w-[40rem] md:max-w-[60rem] bg-[#171717] text-white text-sm rounded-md px-3 py-2 shadow-2xl z-10"
          >
            {description}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
