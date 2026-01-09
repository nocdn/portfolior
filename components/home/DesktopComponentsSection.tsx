"use client"

import { useState } from "react"
import { ArrowRightIcon, ArrowUpRight } from "lucide-react"
import { DesktopSection } from "@/components/desktop/Section"
import { ComponentCarousel } from "@/components/ComponentCarousel"

export function DesktopComponentsSection() {
  const [componentCardTick, setComponentCardTick] = useState(0)

  return (
    <DesktopSection
      title="COMPONENTS"
      className="motion-blur-in-[2px] motion-opacity-in-0 motion-translate-y-in-[3.75%] motion-delay-200"
      subtitleChildren={
        <span className="flex items-center gap-1">
          SHADCN REGISTRY{" "}
          <ArrowUpRight
            size={16}
            strokeWidth={2.75}
            className="mr-0.5 text-blue-700 opacity-40 group-hover:opacity-60 transition-all duration-200"
          />
        </span>
      }
      subtitleURL="https://ui.bartoszbak.org/"
      secondaryChildren={
        <div className="flex items-center gap-2 mr-2">
          <button onClick={() => setComponentCardTick((prev) => prev + 1)}>
            <ArrowRightIcon className="opacity-100 cursor-pointer" size={18} />
          </button>
        </div>
      }
    >
      <ComponentCarousel cardTick={componentCardTick} />
    </DesktopSection>
  )
}
