"use client"

import type { ContributionDay, ContributionLevel } from "@/lib/github"
import { motion, type Variants } from "motion/react"

type GithubContributionGraphProps = {
  weeks: (ContributionDay | null)[][]
}

// Follow the same intensity scale GitHub uses on their profile graph so this
// reads as a 1:1 recreation in both light and dark mode.
const LEVEL_CLASSES: Record<ContributionLevel, string> = {
  0: "bg-[#ebedf0] dark:bg-[#161b22]",
  1: "bg-[#9be9a8] dark:bg-[#0e4429]",
  2: "bg-[#40c463] dark:bg-[#006d32]",
  3: "bg-[#30a14e] dark:bg-[#26a641]",
  4: "bg-[#216e39] dark:bg-[#39d353]",
}

const CELL_SIZE_PX = 11
const CELL_GAP_PX = 3

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      delayChildren: 0.05,
      staggerChildren: 0.015,
    },
  },
}

// The column itself has no animation — it exists purely to group the cells so
// `staggerChildren` on the container staggers per-column. The "show" state
// still propagates to the cells inside.
const columnVariants: Variants = {
  hidden: {},
  show: {},
}

const cellVariants: Variants = {
  hidden: { opacity: 0, filter: "blur(1px)", scale: 0.7 },
  show: {
    opacity: 1,
    filter: "blur(0px)",
    scale: 1,
    transition: { duration: 0.24, ease: [0.165, 0.84, 0.2, 1] },
  },
}

export function GithubContributionGraph({ weeks }: GithubContributionGraphProps) {
  return (
    <motion.div
      className="flex"
      style={{ gap: `${CELL_GAP_PX}px` }}
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      {weeks.map((week, weekIdx) => (
        <motion.div
          key={weekIdx}
          className="flex flex-col"
          style={{ gap: `${CELL_GAP_PX}px` }}
          variants={columnVariants}
        >
          {week.map((day, dayIdx) => {
            const key = `${weekIdx}-${dayIdx}`
            const dimensions = { width: CELL_SIZE_PX, height: CELL_SIZE_PX }
            if (!day) {
              return (
                <div
                  key={key}
                  className="pointer-events-none"
                  style={dimensions}
                  aria-hidden="true"
                />
              )
            }
            return (
              <motion.div
                key={key}
                className={`${LEVEL_CLASSES[day.level]} rounded-[2.5px]`}
                style={{ ...dimensions, willChange: "opacity, filter, transform" }}
                variants={cellVariants}
                title={`${day.count} contributions on ${day.date}`}
              />
            )
          })}
        </motion.div>
      ))}
    </motion.div>
  )
}
