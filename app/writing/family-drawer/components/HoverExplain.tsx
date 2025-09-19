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
          <motion.div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 w-auto min-w-[40rem] max-w-[60rem] bg-[#171717] text-white text-sm rounded-md px-3 py-2 shadow-2xl z-10">
            {description}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
