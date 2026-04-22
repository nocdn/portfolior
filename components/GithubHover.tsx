"use client"

import type { GithubContributionsGrid } from "@/lib/github"
import { SOCIAL_PROFILE_IMAGE_URL } from "@/lib/social"
import { Activity } from "react"
import { GithubContributionGraph } from "./GithubContributionGraph"
import { HoverPopover } from "./HoverPopover"

type GithubHoverProps = {
  contributions: GithubContributionsGrid
}

export function GithubHover({ contributions }: GithubHoverProps) {
  return (
    <HoverPopover
      href="https://github.com/nocdn"
      trigger="GitHub"
      triggerClassName="text-lg text-blue-600 dark:text-blue-400"
      popupClassName="w-[267px]"
      preloadImageSrc={SOCIAL_PROFILE_IMAGE_URL}
    >
      <div className="flex flex-col gap-3.5">
        <GithubContributionGraph weeks={contributions.weeks} />
        <div className="flex items-start gap-2.5">
          <Activity mode="visible">
            <img
              src={SOCIAL_PROFILE_IMAGE_URL}
              alt="Profile picture"
              width={40}
              height={40}
              className="mt-0.5 h-10 w-10 shrink-0 rounded-full border border-gray-200/80 bg-white dark:border-white/10"
            />
          </Activity>
          <div className="flex min-w-0 flex-col gap-0.5">
            <div className="flex flex-col leading-tight mt-0.5">
              <p className="text-[15px] font-semibold text-gray-900 dark:text-gray-100">
                Bartek Bak
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">nocdn</p>
            </div>
          </div>
        </div>
      </div>
    </HoverPopover>
  )
}
