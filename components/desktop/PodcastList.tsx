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
    {
      name: "Factually",
      cover: factually,
      artist: "Adam Conover",
      description:
        "Adam interviews experts to unpack the truth behind misconceptions in science, politics, economics, and culture with humor and gentle curiosity.",
      best: [
        [
          null,
          "The Real Problem with A.I. with Emily Bender",
          "https://podyssey.fm/podcast/itunes1463460577/episode45573031-Problem-Emily-Bender-Factually-with-Adam-Conover",
        ],
        [
          null,
          "The Gig Economy In the Time of COVID-19",
          "https://podyssey.fm/podcast/itunes1463460577/episode8556638-Economy-COVID-Johana-Bhuiyan-Factually-with-Adam-Conover",
        ],
      ],
    },
    {
      name: "Land of Giants",
      cover: giants,
      artist: "The Land of Giants",
      description:
        "Each season focuses on one company (Amazon, Google, Netflix, Meta, Disney, etc.) exploring how they gained power and what they're doing with it.",
      best: [
        [
          33,
          "The Cost of Convenience",
          "https://podyssey.fm/podcast/itunes1465767420/episode23601300-Convenience-Land-of-the-Giants",
        ],
        [
          25,
          "The Netflix Effect",
          "https://podyssey.fm/podcast/itunes1465767420/episode9027844-Netflix-Effect-Land-of-the-Giants",
        ],
        [
          66,
          "The Disney Dilemma",
          "https://podyssey.fm/podcast/itunes1465767420/episode219096623-Disney-Dilemma-Land-of-the-Giants",
        ],
      ],
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
      description:
        "One of the finest on the internet. Internet mysteries, rabbit holes, bizarre tech support cases, and stories about online culture.",
      best: [
        [
          102,
          "Long Distance",
          "https://podyssey.fm/podcast/itunes941907967/episode540483-Distance-Reply-All",
        ],
        [
          103,
          "Long Distance, Part II",
          "https://podyssey.fm/podcast/itunes941907967/episode468607-Distance-Reply-All",
        ],
        [
          164,
          "Long Distance: The Real Alex Martin",
          "https://podyssey.fm/podcast/itunes941907967/episode9208683-Distance-Martin-Reply-All",
        ],
      ],
    },
    {
      name: "Science Vs",
      cover: science,
      artist: "Wendy Zukerman",
      description:
        "Myth-busting podcast that cuts through blogs, strong opinions, and viral claims with actual scientific evidence.",
      best: [
        [
          null,
          "Magic Mushrooms: Trip Through the Science",
          "https://podyssey.fm/podcast/itunes1051557000/episode21193623-Magic-Mushrooms-Through-Science-Science-Vs",
        ],
        [
          null,
          "Adderall: What's It Doing to Your Brain?",
          "https://podyssey.fm/podcast/itunes1051557000/episode107327515-Adderall-Whats-Doing-Brain-Science-Vs",
        ],
      ],
    },
    {
      name: "Search Engine",
      cover: search,
      artist: "PJ Vogt",
      description:
        "The spiritual successor to Reply All. A human-powered search engine for questions the internet can't answer.",
      best: [
        [
          null,
          "Why didn’t Chris and Dan get into Berghain? (Pt 1)",
          "https://podyssey.fm/podcast/itunes1614253637/episode218146391-didnt-Chris-Berghain-Search-Engine",
        ],
        [
          null,
          "Why didn’t Chris and Dan get into Berghain? (Pt 2)",
          "https://podyssey.fm/podcast/itunes1614253637/episode219321161-didnt-Chris-Berghain-Search-Engine",
        ],
        [
          null,
          "Why are drug dealers putting fentanyl in everything?",
          "https://podyssey.fm/podcast/itunes1614253637/episode157353681-dealers-putting-fentanyl-everything-Search-Engine",
        ],
      ],
    },
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
          loading="lazy"
          priority={false}
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
                    if (currentPodcast < podcastList.length - 1) {
                      setCurrentPodcast((prev) => prev + 1)
                    }
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
