import React, { useEffect, useState } from "react"

import astroworld from "@/public/images/covers/astroworld.webp"
import era47 from "@/public/images/covers/era47.webp"
import heroes_villains from "@/public/images/covers/heroes_villains.webp"
import random_access_memories from "@/public/images/covers/random_access_memories.webp"
import rodeo from "@/public/images/covers/rodeo.webp"
import victory_lap from "@/public/images/covers/victory_lap.webp"
import we_dont_trust_you from "@/public/images/covers/we_dont_trust_you.webp"
import so_much_fun from "@/public/images/covers/so_much_fun.webp"
import { StaticImageData } from "next/image"
import Image from "next/image"

type MusicItem = {
  name: string
  cover: StaticImageData
  artist: string
}

const musicList: MusicItem[] = [
  { name: "ASTROWORLD", cover: astroworld, artist: "Travis Scott" },
  { name: "ERA47", cover: era47, artist: "Oki" },
  {
    name: "Heroes & Villains",
    cover: heroes_villains,
    artist: "Metro Boomin",
  },
  {
    name: "Random Access Memories",
    cover: random_access_memories,
    artist: "Daft Punk",
  },
  { name: "Rodeo", cover: rodeo, artist: "Travis Scott" },
  { name: "Victory Lap", cover: victory_lap, artist: "Fred again.." },
  {
    name: "WE DON'T TRUST YOU",
    cover: we_dont_trust_you,
    artist: "Metro Boomin",
  },
  { name: "So Much Fun", cover: so_much_fun, artist: "Young Thug" },
]

const Music: React.FC = () => {
  // indicates whether any album cover (or its tooltip) is being hovered
  const [isHovering, setIsHovering] = useState(false)

  // index of the album whose vinyl is popped-out & spinning; null means none
  const [activeVinyl, setActiveVinyl] = useState<number | null>(null)

  // same default as svelte version
  const enableVinyl = false

  // toggle vinyl for a given index
  const toggleVinyl = (idx: number) =>
    setActiveVinyl((prev) => (prev === idx ? null : idx))

  useEffect(() => {
    console.log(musicList)
  }, [])

  return (
    <div
      className="flex flex-col gap-3 mt-2 ml-0.5"
      style={{ perspective: 500 }}
    >
      <div className="rounded-lg flex items-center gap-2 w-fit">
        {musicList.map((music, index) => (
          <div
            key={music.name}
            role="button"
            tabIndex={0}
            aria-pressed={activeVinyl === index}
            className="relative w-28 h-28 rounded-lg transition-all duration-300 group cursor-pointer"
            style={{
              transform: `translateX(-${index * 57}px)`,
              zIndex: musicList.length - index,
            }}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            onClick={() => toggleVinyl(index)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault()
                toggleVinyl(index)
              }
            }}
          >
            <Image
              src={music.cover.src}
              alt={music.name}
              width={112}
              height={112}
              className="rounded-lg peer hover:translate-y-[-14px] transition-all duration-300 border border-gray-500 cursor-pointer hover:shadow-xl"
            />

            <div className="font-jetbrains-mono text-sm absolute -top-16 border border-gray-300 left-1/2 -translate-x-1/2 opacity-0 peer-hover:opacity-100 hover:opacity-100 transition-all duration-300 bg-white rounded-lg p-2 whitespace-nowrap pointer-events-none peer-hover:pointer-events-auto hover:pointer-events-auto peer-hover:translate-y-[-10px] hover:translate-y-[-10px] peer-hover:shadow-[0_10px_20px_-5px_rgba(0,0,0,0.3),0_10px_10px_-5px_rgba(0,0,0,0.2)] hover:shadow-[0_10px_20px_-5px_rgba(0,0,0,0.3),0_10px_10px_-5px_rgba(0,0,0,0.2)] blur-[2px] peer-hover:blur-[0px] hover:blur-[0px]">
              <p className="text-xs font-sans text-gray-500 whitespace-nowrap">
                {music.artist}
              </p>
              <p className="font-geist whitespace-nowrap">{music.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Music
