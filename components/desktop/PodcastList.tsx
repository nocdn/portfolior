import darknet from "@/public/images/podcasts/darknet.webp"
import factually from "@/public/images/podcasts/factually.webp"
import giants from "@/public/images/podcasts/giants.webp"
import jordan from "@/public/images/podcasts/jordan.webp"
import nudge from "@/public/images/podcasts/nudge.webp"
import offline from "@/public/images/podcasts/offline.webp"
import reply from "@/public/images/podcasts/reply.webp"
import science from "@/public/images/podcasts/science.webp"
import search from "@/public/images/podcasts/search.webp"
import { StaticImageData } from "next/image"
import Image from "next/image"
import { useState } from "react"
import PodcastEpisode from "./PodcastEpisode"

import { ArrowRight, ArrowLeft } from "lucide-react"

type PodcastItem = {
  name: string
  cover: StaticImageData
  artist?: string
  link?: string
  description?: string
  best?: [number | null, string, string][]
}

export default function PodcastList() {
  const podcastList: PodcastItem[] = [
    {
      name: "Darknet Diaries",
      cover: darknet,
      artist: "Jack Rhysider",
      link: "https://darknetdiaries.com/",
      description:
        "Real-life tales of hackers, data breaches, malware, botnets, cryptography, cryptocurrency, etc. From famous heists to people's personal stories.",
      best: [
        [
          102,
          "Money Maker",
          "https://podyssey.fm/podcast/itunes1296350485/episode23988614-Money-Maker-Darknet-Diaries",
        ],
        [
          111,
          "ZeuS",
          "https://podyssey.fm/podcast/itunes1296350485/episode24505826--Darknet-Diaries",
        ],
        [
          27,
          "Chartbreakers",
          "https://podyssey.fm/podcast/itunes1296350485/episode2711135-Chartbreakers-Darknet-Diaries",
        ],
        [
          116,
          "Mad Dog",
          "https://podyssey.fm/podcast/itunes1296350485/episode24827468--Darknet-Diaries",
        ],
        [
          90,
          "Jenny",
          "https://podyssey.fm/podcast/itunes1296350485/episode23247807-Jenny-Darknet-Diaries",
        ],
        [
          92,
          "Pirate Bay",
          "https://podyssey.fm/podcast/itunes1296350485/episode23463431-Pirate-Darknet-Diaries",
        ],
      ],
    },
    { name: "Factually", cover: factually, artist: "Adam Conover" },
    {
      name: "Land of Giants",
      cover: giants,
      artist: "The Land of Giants",
    },
    {
      name: "Jordan Harbinger Show",
      cover: jordan,
      description:
        "Interesting conversations with very interesting people. That's pretty much it. Lots of episodes, lots of topics and guests.",
      best: [
        [
          1,
          "Frank Abagnale",
          "https://podyssey.fm/podcast/itunes1344999619/episode1015225-Frank-Abagnale-The-Jordan-Harbinger-Show",
        ],
        [
          488,
          "Frank Bourassa (pt. 1)",
          "https://podyssey.fm/podcast/itunes1344999619/episode23130505-Frank-Bourassa-Worlds-Greatest-Counterfeiter-The-Jordan-Harbinger-Show",
        ],
        [
          489,
          "Frank Bourassa (pt. 2)",
          "https://podyssey.fm/podcast/itunes1344999619/episode23154351-Frank-Bourassa-Worlds-Greatest-Counterfeiter-The-Jordan-Harbinger-Show",
        ],
      ],
    },
    {
      name: "Nudge",
      cover: nudge,
      artist: "Phill Agnew",
      description: "",
      best: [
        [
          null,
          "17½ persuasion tactics in 28 minutes",
          "https://podyssey.fm/podcast/itunes1457621005/episode258186781-persuasion-tactics-minutes-Nudge",
        ],
        [
          null,
          "FBI hostage negotiator shares his worst mistakes",
          "https://podyssey.fm/podcast/itunes1457621005/episode206989916-hostage-negotiator-shares-worst-mistakes-Nudge",
        ],
        [
          null,
          "Steve Jobs: The master of persuasion (pt 1)",
          "https://podyssey.fm/podcast/itunes1457621005/episode113282400-Steve-master-persuasion-Nudge",
        ],
        [
          null,
          "Steve Jobs: How he persuaded the world (pt 2)",
          "https://podyssey.fm/podcast/itunes1457621005/episode114984446-Steve-persuaded-world-Nudge",
        ],
      ],
    },
    {
      name: "Better Offline",
      cover: offline,
      artist: "Ed Zitron",
      description:
        "Emotion-filled and raw, looking at the tech world through a critical lens, often touching on the “growth-at-all-costs” mentality of tech elites.",
      best: [
        [
          null,
          "The Shareholder Supremacy",
          "https://podyssey.fm/podcast/itunes1730587238/episode221850697-Shareholder-Supremacy-Better-Offline",
        ],
      ],
    },
    {
      name: "Reply All",
      cover: reply,
      artist: "Gimlet Media",
    },
    { name: "Science Vs", cover: science, artist: "Wendy Zukerman" },
    { name: "Search Engine", cover: search, artist: "PJ Vogt" },
  ]

  const [currentPodcast, setCurrentPodcast] = useState(0)

  return (
    <div className="h-48">
      <div className="flex items-start gap-3 font-geist">
        <Image
          src={podcastList[currentPodcast].cover}
          alt={podcastList[currentPodcast].name}
          width={170}
          height={170}
          className="rounded-md"
        />
        <div className="flex flex-col gap-0.5">
          <div className="flex items-center gap-2 font-sans text-[18px]">
            <p>{podcastList[currentPodcast].name}</p>
            {podcastList[currentPodcast].artist && (
              <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
            )}
            <p className="text-gray-600 text-[16.5px]">
              {podcastList[currentPodcast].artist}
            </p>
            <div className="ml-auto mr-0.5">
              <div className="flex items-center gap-1">
                <div
                  className="hover:bg-gray-200 rounded-full p-1 cursor-pointer opacity-30 hover:opacity-100"
                  onMouseDown={() => {
                    if (currentPodcast > 0) {
                      setCurrentPodcast((prev) => prev - 1)
                    }
                  }}
                >
                  <ArrowLeft size={18} />
                </div>
                <div
                  className="hover:bg-gray-200 rounded-full p-1 cursor-pointer opacity-30 hover:opacity-100"
                  onMouseDown={() => {
                    setCurrentPodcast((prev) => prev + 1)
                  }}
                >
                  <ArrowRight size={18} />
                </div>
              </div>
            </div>
          </div>
          <div>
            <p className="font-sans text-sm font-[450] text-gray-600">
              {podcastList[currentPodcast].description}
            </p>
          </div>
          <div className="mt-1">
            <p className="text-sm font-semibold font-mono text-gray-500/90 mb-1">
              BEST EPISODES:
            </p>
            <div className="flex flex-wrap" style={{ columnGap: "14px" }}>
              {podcastList[currentPodcast].best?.map((episode, index) => {
                return (
                  <PodcastEpisode
                    key={index}
                    number={episode[0]}
                    title={episode[1]}
                    url={episode[2]}
                  />
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
