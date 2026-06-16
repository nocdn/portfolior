"use client"

import { TextShimmer } from "./motion-primitives/text-shimmer"

type AboutShimmerTextProps = {
  children: string
  delay?: number
}

export function AboutShimmerText({ children, delay = 0 }: AboutShimmerTextProps) {
  return (
    <TextShimmer
      as="span"
      duration={1}
      delay={delay}
      repeat={Infinity}
      repeatDelay={12.5}
      className="about-underline [--base-color:#2563eb] [--base-gradient-color:#93c5fd] dark:[--base-color:#60a5fa] dark:[--base-gradient-color:#dbeafe]"
    >
      {children}
    </TextShimmer>
  )
}
