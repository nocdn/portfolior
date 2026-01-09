"use client"

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
      <line
        x1="12"
        y1="13"
        x2="12"
        y2="9.5"
        transform={`rotate(${hourAngle} 12 13)`}
      />

      {/* minute hand */}
      <line
        x1="12"
        y1="13"
        x2="12"
        y2="8"
        transform={`rotate(${minuteAngle} 12 13)`}
      />
    </svg>
  )
}

export default AlarmClockIcon
