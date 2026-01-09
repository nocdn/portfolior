"use client"

import HomeTitle from "@/components/mobile/HomeTitle"

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
    const el =
      typeof document !== "undefined" ? document.getElementById(id) : null
    el?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  return (
    <div className="flex flex-col w-screen overflow-y-scroll snap-y snap-mandatory">
      <div className="flex flex-col gap-6 mt-auto p-8 text-[28px] font-sans font-medium">
        <HomeTitle
          index={1}
          onClick={onClickMobileIndex}
          title="About"
          motionDelay={200}
        />
        <HomeTitle
          index={2}
          onClick={onClickMobileIndex}
          title="Projects"
          count={7}
          motionDelay={150}
        />
        <HomeTitle
          index={3}
          onClick={onClickMobileIndex}
          title="Components"
          count={3}
          motionDelay={100}
        />
        <HomeTitle
          index={4}
          onClick={onClickMobileIndex}
          title="Writing"
          count={2}
          motionDelay={50}
        />
        <HomeTitle
          index={5}
          onClick={onClickMobileIndex}
          title="Contact"
          motionDelay={0}
        />
      </div>
    </div>
  )
}
