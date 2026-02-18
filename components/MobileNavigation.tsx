"use client"

import { HomeTitle } from "@/components/HomeTitle"
import { articles } from "@/data/articles"
import { componentCards } from "@/data/components"
import { projects } from "@/data/projects"

export function MobileNavigation() {
  const onClickMobileIndex = (index: number) => {
    const mapping: Record<number, string> = {
      1: "about",
      2: "projects",
      3: "components",
      4: "writing",
      5: "contact",
    }
    const id = mapping[index]
    if (!id) return
    const el = typeof document !== "undefined" ? document.getElementById(id) : null
    el?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  return (
    <div className="flex w-screen snap-y snap-mandatory flex-col overflow-y-scroll">
      <div className="mt-auto flex flex-col gap-6 p-8 font-sans text-[28px] font-medium">
        <HomeTitle index={1} onClick={onClickMobileIndex} title="About" motionDelay={200} />
        <HomeTitle
          index={2}
          onClick={onClickMobileIndex}
          title="Projects"
          count={projects.length}
          motionDelay={150}
        />
        <HomeTitle
          index={3}
          onClick={onClickMobileIndex}
          title="Components"
          count={componentCards.length}
          motionDelay={100}
        />
        <HomeTitle
          index={4}
          onClick={onClickMobileIndex}
          title="Writing"
          count={articles.length}
          motionDelay={50}
        />
        <HomeTitle index={5} onClick={onClickMobileIndex} title="Contact" motionDelay={0} />
      </div>
    </div>
  )
}
