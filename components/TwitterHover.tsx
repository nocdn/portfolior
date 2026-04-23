"use client"

import type { TwitterProfile } from "@/lib/twitter"
import { formatCount } from "@/lib/twitter"
import { Activity } from "react"
import { HoverPopover } from "./HoverPopover"
import { TextShimmer } from "./motion-primitives/text-shimmer"

export function TwitterHover({ profile }: { profile: TwitterProfile }) {
  return (
    <HoverPopover
      href="https://x.com/nocdns"
      trigger={
        <TextShimmer
          as="span"
          duration={1}
          delay={1.5}
          repeat={Infinity}
          repeatDelay={12.5}
          className="about-underline [--base-color:#2563eb] [--base-gradient-color:#93c5fd] dark:[--base-color:#60a5fa] dark:[--base-gradient-color:#dbeafe]"
        >
          Twitter
        </TextShimmer>
      }
      triggerClassName="relative text-[18.5px] text-blue-600 dark:text-blue-400"
      popupClassName="w-72"
      preloadImageSrc={profile.avatarUrl}
    >
      <div className="flex flex-col gap-2.5">
        <Activity mode="visible">
          <img
            src={profile.avatarUrl}
            alt="Profile picture"
            width={56}
            height={56}
            className="h-14 w-14 rounded-full border border-gray-200/80 bg-white dark:border-white/10"
          />
        </Activity>
        <div className="flex items-baseline gap-1.5">
          <p className="text-[15px] font-semibold text-gray-900 dark:text-gray-100">
            {profile.name}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">@{profile.username}</p>
        </div>
        <p className="text-sm leading-snug text-gray-700 dark:text-gray-200">
          {profile.description}
        </p>
        <div className="flex gap-4 text-sm">
          <p>
            <span className="font-semibold text-gray-900 dark:text-gray-100">
              {formatCount(profile.following)}
            </span>{" "}
            <span className="text-gray-500 dark:text-gray-400">Following</span>
          </p>
          <p>
            <span className="font-semibold text-gray-900 dark:text-gray-100">
              {formatCount(profile.followers)}
            </span>{" "}
            <span className="text-gray-500 dark:text-gray-400">Followers</span>
          </p>
        </div>
      </div>
    </HoverPopover>
  )
}
