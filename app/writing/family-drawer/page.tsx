"use client"

import { Metadata } from "next"
import { Sandpack } from "@codesandbox/sandpack-react"
import dynamic from "next/dynamic"
import { CodeInline } from "@/components/CodeBlock"

const DrawerSandpack0 = dynamic(() => import("./components/DrawerSandpack0"), {
  ssr: false,
})

export default function FamilyDrawer() {
  return (
    <div className="flex flex-col gap-4 *:leading-relaxed *:text-gray-800 *:text-[17px]">
      <h1
        className="w-full text-lg font-medium font-inter max-w-2xl mx-auto"
        id="recreating-the-family-drawer"
      >
        Recreating the Family Drawer
      </h1>
      <p className="max-w-2xl mx-auto">
        It feels like whenever the topic of animations (whether that is web or
        otherwise) comes up, the{" "}
        <a href="https://family.co/" target="_blank" className="article-link">
          Family App
        </a>{" "}
        is front and center of all the examples. And for good reason.
      </p>
      <p className="max-w-2xl mx-auto">
        It represents incredible attention to detail and a deep understanding of
        animation principles. And for this very reason, when I originally
        started learning motion design, I had set aspects of this app as my goal
        to recreate.
      </p>
      <p className="max-w-2xl mx-auto">
        Naturally, the app is filled with lots of great interactions, but here,
        I will focus on just one of them, a wallet options drawer:
      </p>
      <div className="flex gap-4 my-4 max-w-2xl mx-auto">
        <video
          autoPlay
          muted
          playsInline
          loop
          preload="metadata"
          className="w-1/2 h-auto rounded-lg"
          poster="/videos/articles/family-drawer/poster.jpg"
        >
          <source
            src="/videos/articles/family-drawer/family-drawer.mp4"
            type="video/mp4"
          />
        </video>
        <p className="text-[16px] text-gray-500/60 md:block hidden">
          The drawer itself, straight from the app (2025). Choosing the "Remove
          Wallet" option closes the drawer and opens another confirmation
          dialog, so I did not include that in the video.
        </p>
      </div>
      <p className="max-w-2xl mx-auto">
        The most important aspect of this whole component is the motion, no
        doubt about that, so with my first attempt, I ignored the icons, colours
        and typography and ended up with this:{" "}
      </p>
      <div className="w-9/10 mx-auto my-6">
        <DrawerSandpack0 />
      </div>
      <p className="max-w-2xl mx-auto">
        Now, let's break down each part of this initial component, starting with
        all of those imports, and why they are needed.
      </p>
      <CodeInline
        code={`import { AnimatePresence, motion } from "motion/react"
import { useMemo, useState } from "react"
import useMeasure from "react-use-measure"
`}
        className="max-w-2xl mx-auto md:w-2xl overflow-x-scroll text-xs"
      />
    </div>
  )
}
