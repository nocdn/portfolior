"use client"
import { useIsMobile } from "@/hooks/useIsMobile"
import { DesktopSection } from "@/components/desktop/Section"
import { motion } from "motion/react"
import { useRef, useState } from "react"
import { TimeZoneName } from "@/components/desktop/TimeZoneName"

export default function Home() {
  const isMobile = useIsMobile()

  return (
    <div className="">
      {isMobile ? (
        <p>Mobile</p>
      ) : (
        <main className="w-[546px] mb-24 mx-auto pt-26">
          <DesktopSection title="ABOUT">
            <div>
              Good morning, I'm <TimeZoneName />. I am a front-end developer
              based in England, studying computer science at the University of
              York. I love to craft tools and experiences for other developers.
            </div>
          </DesktopSection>
          <DesktopSection title="PROJECTS">
            <p>
              Good morning, I'm Bartek. I am a front-end developer based in
              England, studying computer science at the University of York. I
              love to craft tools and experiences for other developers.
            </p>
          </DesktopSection>
        </main>
      )}
    </div>
  )
}
