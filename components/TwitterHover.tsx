"use client"

import type { TwitterProfile } from "@/lib/twitter"
import { formatCount } from "@/lib/twitter"
import { Popover } from "@base-ui/react/popover"
import { AnimatePresence, motion } from "motion/react"
import { Activity, useState } from "react"

export function TwitterHover({ profile }: { profile: TwitterProfile }) {
  const [open, setOpen] = useState(false)

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger
        className="relative text-[18.5px] text-blue-600 underline decoration-blue-600/0 decoration-[1.5px] underline-offset-2 hover:decoration-blue-600 dark:text-blue-400 dark:hover:decoration-blue-400"
        openOnHover
        delay={15}
        nativeButton={false}
        render={<a href="https://x.com/nocdns" target="_blank" rel="noopener noreferrer" />}
      >
        Twitter
      </Popover.Trigger>
      <AnimatePresence>
        {open && (
          <Popover.Portal>
            <Popover.Positioner side="top" sideOffset={8} collisionPadding={16} sticky>
              <Popover.Popup
                className="w-72 rounded-2xl border border-gray-200 bg-white px-4 py-3.5 shadow-lg [corner-shape:squircle] data-[side=bottom]:origin-top data-[side=left]:origin-right data-[side=right]:origin-left data-[side=top]:origin-bottom dark:border-white/8 dark:bg-[#1c1c1e] dark:shadow-[0_8px_30px_rgba(0,0,0,0.5)]"
                render={
                  <motion.div
                    style={{ willChange: "transform, opacity, filter" }}
                    initial={{ opacity: 0.2, scale: 0.82, filter: "blur(2px)" }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                      filter: "blur(0px)",
                      transition: {
                        ease: [0.165, 0.84, 0.2, 1],
                        opacity: { duration: 0.13, ease: [0.165, 0.84, 0.2, 1] },
                      },
                    }}
                    exit={{
                      opacity: 0,
                      scale: 0.86,
                      filter: "blur(2px)",
                      transition: {
                        ease: [0.19, 1, 0.22, 1],
                        opacity: { duration: 0.25, ease: [0.19, 1, 0.22, 1] },
                      },
                    }}
                  />
                }
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
              </Popover.Popup>
            </Popover.Positioner>
          </Popover.Portal>
        )}
      </AnimatePresence>
    </Popover.Root>
  )
}
