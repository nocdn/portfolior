"use client"

import { useState } from "react"
import { MobileSection } from "@/components/mobile/Section"
import { MobileComponentCarousel } from "@/components/mobile/ComponentCarousel"

export function MobileComponentsSection() {
  const [mobileComponentsIndex, setMobileComponentsIndex] = useState(0)

  return (
    <MobileSection
      id="components"
      title="COMPONENTS"
      secondaryChildren={
        <div className="rounded-full bg-gray-100/75 flex items-center gap-1.5 p-1.5 px-2">
          {[0, 1, 2].map((i) => (
            <button
              key={i}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => setMobileComponentsIndex(i)}
              className={
                `rounded-full size-1.5 transition-colors ` +
                (mobileComponentsIndex === i ? "bg-gray-500" : "bg-gray-200")
              }
            />
          ))}
        </div>
      }
    >
      <MobileComponentCarousel
        activeIndex={mobileComponentsIndex}
        onActiveIndexChange={setMobileComponentsIndex}
      />
    </MobileSection>
  )
}
