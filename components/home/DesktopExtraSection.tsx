"use client"

import { useState } from "react"
import dynamic from "next/dynamic"
import { DesktopSection } from "@/components/desktop/Section"

const MusicList = dynamic(() => import("@/components/desktop/MusicList"), {
  loading: () => (
    <div className="h-28 w-full animate-pulse bg-gray-100 rounded-lg" />
  ),
})

const PodcastList = dynamic(() => import("@/components/desktop/PodcastList"), {
  loading: () => (
    <div className="h-48 w-full animate-pulse bg-gray-100 rounded-lg" />
  ),
})

export function DesktopExtraSection() {
  const [showingExtra, setShowingExtra] = useState(false)

  if (!showingExtra) {
    return (
      <div
        className="w-full flex justify-center items-center"
        onMouseDown={() => setShowingExtra(true)}
      >
        <p className="text-gray-500/30 hover:text-gray-500/50 cursor-pointer active:scale-[0.96] font-jetbrains-mono text-[16px] font-semibold transition-opacity duration-300 ease-in-out">
          <span className="mr-0.5">[</span>
          <span>EXTRA</span>
          <span className="ml-0.5">]</span>
        </p>
      </div>
    )
  }

  return (
    <>
      <DesktopSection
        title="MUSIC"
        subtitleChildren="CURRENTLY LISTENING"
        className="motion-blur-in-[2px] motion-opacity-in-0 motion-translate-y-in-[3.75%]"
      >
        <MusicList />
      </DesktopSection>
      <DesktopSection
        title="PODCASTS"
        subtitleChildren="BEST EPISODES"
        className="motion-blur-in-[2px] motion-opacity-in-0 motion-translate-y-in-[3.75%]"
      >
        <PodcastList />
      </DesktopSection>
    </>
  )
}
