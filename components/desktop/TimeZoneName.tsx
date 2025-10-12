import AlarmClockIcon from "@/components/icons/clock"
import { AnimatePresence, motion } from "motion/react"
import { useState } from "react"

export function TimeZoneName() {
  // calculate BST time (no matter where the user is)
  const bstTime = new Date()
  const bstTimeString = bstTime.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "Europe/London",
  })

  const [hoveringName, setHoveringName] = useState<boolean>(false)

  return (
    <div className="inline-block relative">
      <motion.span
        className="group-hover:text-blue-600 transition-colors duration-200"
        onMouseEnter={() => setHoveringName(true)}
        onMouseLeave={() => setHoveringName(false)}
        style={{
          opacity: hoveringName ? 0 : 1,
          pointerEvents: "auto",
        }}
        animate={{
          opacity: hoveringName ? 0 : 1,
          y: hoveringName ? -5 : 0,
          filter: hoveringName ? "blur(1px)" : "blur(0px)",
          transition: {
            opacity: { duration: hoveringName ? 0 : 0.35 },
            y: { duration: 0.35 },
            filter: { duration: 0.35 },
          },
        }}
        transition={{
          opacity: { duration: hoveringName ? 0 : 0.35 },
          y: { duration: 0.35 },
          filter: { duration: 0.35 },
        }}
      >
        Bartek
      </motion.span>
      <AnimatePresence>
        {hoveringName && (
          <motion.div
            initial={{ opacity: 0, y: -5, filter: "blur(3px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: 3, filter: "blur(2px)" }}
            transition={{
              ease: [0.23, 1, 0.32, 1],
            }}
            className="absolute left-[calc(50%-1px)] top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none text-[18px]"
            style={{ opacity: 0.1 }}
          >
            {bstTimeString}
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {hoveringName && (
          <motion.div
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 1, y: -28, x: 20, rotate: 8.5 }}
            exit={{
              opacity: 0,
              y: 0,
              x: 10,
              filter: "blur(1px)",
              transition: { duration: 0.15 },
            }}
            className="absolute left-[calc(50%-1px)] top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none font-open-runde font-semibold text-[16px] text-blue-600/75"
            style={{ opacity: 0.1 }}
          >
            BST
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {hoveringName && (
          <motion.div
            initial={{ opacity: 0, y: 0, scale: 0.9 }}
            animate={{
              opacity: 0.75,
              y: -30,
              x: -22,
              rotate: -13,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: 0,
              x: -13,
              filter: "blur(1px)",
              scale: 0.7,
              transition: { duration: 0.15 },
            }}
            className="absolute left-[calc(50%-1px)] top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none font-open-runde font-semibold text-[16px] text-blue-600"
            style={{ opacity: 0.1 }}
          >
            <AlarmClockIcon
              hours={parseInt(bstTimeString.split(":")[0])}
              minutes={parseInt(bstTimeString.split(":")[1])}
              size={23}
              showBellArms={true}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
