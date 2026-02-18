"use client"
import { AnimatePresence, motion } from "motion/react"
import React, { useEffect, useState } from "react"
// based on the lucide clock icon

type AlarmClockIconProps = {
  date?: Date
  hours?: number
  minutes?: number
  seconds?: number
  size?: number
  color?: string
  strokeWidth?: number
  showFeet?: boolean
  showBellArms?: boolean
} & React.SVGProps<SVGSVGElement>

const AlarmClockIcon: React.FC<AlarmClockIconProps> = ({
  date,
  hours = null,
  minutes = null,
  seconds = 0,
  size = 24,
  color = "currentColor",
  strokeWidth = 2,
  showFeet = false,
  showBellArms = false,
  ...rest
}) => {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    // if specific time props are provided, don't need to update the time.
    if (date || (hours !== null && minutes !== null)) {
      // if date was previously being used but isn't anymore, need to make sure to set the time to the current time.
      if (date) {
        setTime(date)
      }
      return
    }

    const timerId = setInterval(() => {
      setTime(new Date())
    }, 1000)

    return () => {
      clearInterval(timerId)
    }
  }, [date, hours, minutes])

  // derive h m s
  let h: number
  let m: number
  let s: number

  if (date instanceof Date) {
    h = date.getHours()
    m = date.getMinutes()
    s = date.getSeconds()
  } else if (hours !== null && minutes !== null) {
    h = hours
    m = minutes
    s = seconds
  } else {
    h = time.getHours()
    m = time.getMinutes()
    s = time.getSeconds()
  }

  // getting the angles to move the hands
  const minuteAngle = m * 6 + s * 0.1
  const hourAngle = (h % 12) * 30 + m * 0.5

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...rest}
    >
      {/* bell arms */}
      {showBellArms && (
        <>
          <path d="M5 3 2 6" />
          <path d="m22 6-3-3" />
        </>
      )}

      {/* feet */}
      {showFeet && (
        <>
          <path d="M6.38 18.7 4 21" />
          <path d="M17.64 18.67 20 21" />
        </>
      )}

      {/* dial */}
      <circle cx="12" cy="13" r="8" strokeWidth={strokeWidth + 0.25} />

      {/* hour hand */}
      <line x1="12" y1="13" x2="12" y2="9.5" transform={`rotate(${hourAngle} 12 13)`} />

      {/* minute hand */}
      <line x1="12" y1="13" x2="12" y2="8" transform={`rotate(${minuteAngle} 12 13)`} />
    </svg>
  )
}

export function TimeZoneName() {
  const bstTime = new Date()
  const bstTimeString = bstTime.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "Europe/London",
  })

  const [hoveringName, setHoveringName] = useState<boolean>(false)

  return (
    <div className="relative inline-block">
      <motion.span
        className="text-blue-600 dark:text-blue-400"
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
            className="pointer-events-none absolute top-1/2 left-[calc(50%-1px)] -translate-x-1/2 -translate-y-1/2 text-[18px] select-none"
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
            className="font-inter pointer-events-none absolute top-1/2 left-[calc(50%-1px)] -translate-x-1/2 -translate-y-1/2 text-[16px] font-semibold text-blue-600/75 dark:text-blue-400/75 select-none"
            style={{ opacity: 0.1 }}
          >
            UTC
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
            className="font-inter pointer-events-none absolute top-1/2 left-[calc(50%-1px)] -translate-x-1/2 -translate-y-1/2 text-[16px] font-semibold text-blue-600 dark:text-blue-400 select-none"
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
