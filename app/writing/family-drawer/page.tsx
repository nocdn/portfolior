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
      <p className="max-w-2xl mx-auto">
        <span className="code-font">motion/react</span> is the library that
        provides the motion primitives, like{" "}
        <span className="code-font">motion.div</span> which allows us to animate
        pretty much every property of that element.
      </p>{" "}
      <p className="max-w-2xl mx-auto">
        In the code above, we define the{" "}
        <span className="code-font">initial</span>,{" "}
        <span className="code-font">animate</span>, and{" "}
        <span className="code-font">exit</span> properties of the element in the
        drawer. The <span className="code-font">initial</span> property is the
        state that the element will be in when it is first added to the{" "}
        <span className="hover-explain">DOM</span>. The{" "}
        <span className="code-font">animate</span> property describes the
        animation that occurs as soon as the element is mounted, while{" "}
        <span className="code-font">exit</span> defines how the element animates
        out when it's removed.
      </p>
      <p className="max-w-2xl mx-auto">
        <span className="code-font">AnimatePresence</span> is crucial here—it
        allows components to animate out before being removed from the DOM,
        rather than disappearing instantly. Without it, the{" "}
        <span className="code-font">exit</span> animation would never play.
      </p>
      <p className="max-w-2xl mx-auto">
        <span className="code-font">react-use-measure</span> provides the{" "}
        <span className="code-font">useMeasure</span>{" "}
        <span className="hover-explain">hook</span>, which tracks the dimensions
        of DOM elements in real-time. This is essential for creating smooth
        height transitions as the drawer content changes—we can animate to the
        actual measured height rather than guessing or using fixed values.
      </p>
      <CodeInline
        code={`const [view, setView] = useState(0);
const [elementRef, bounds] = useMeasure();`}
        className="max-w-2xl mx-auto md:w-2xl overflow-x-scroll text-xs"
      />
      <p className="max-w-2xl mx-auto">
        The <span className="code-font">view</span>{" "}
        <span className="hover-explain">state</span> tracks which content is
        currently displayed, starting at index 0. The{" "}
        <span className="code-font">useMeasure</span> hook returns two things:{" "}
        <span className="code-font">elementRef</span> (a{" "}
        <span className="hover-explain">ref</span> to attach to the element we
        want to measure) and <span className="code-font">bounds</span> (an
        object containing the element's dimensions, including height, width, and
        position).
      </p>
      <p className="max-w-2xl mx-auto">
        The <span className="code-font">options</span> array contains the
        different <span className="hover-explain">views</span> that can be
        displayed in the drawer, in this case, just some{" "}
        <span className="code-font">lorem ipsum</span> text for each, which I
        will later replace with actual recreations of the private key and
        recovery phrase screens taken from the app. Each of the views also
        contains a button that cycles to the next view.
      </p>
      <p className="max-w-2xl mx-auto">
        Moving onto the most important part of the component, and animated
        container which holds the views and decides how to animate between them:
      </p>
      <CodeInline
        code={`<motion.div
  animate={{ height: bounds.height }}
  transition={{
    type: "tween",
    ease: [0.26, 1, 0.5, 1],
    bounce: 0,
    duration: 0.27,
  }}
  className="drawer"
>
  <div className="drawer-content" ref={elementRef}>
    <AnimatePresence initial={false} mode="popLayout" custom={view}>
      <motion.div
        initial={{ opacity: 0, scale: 0.96, filter: "blur(2px)" }}
        animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0)" }}
        exit={{
          opacity: 0,
          scale: 0.96,
          filter: "blur(2px)",
          transition: {
            opacity: { duration: 0.19, ease: [0.26, 0.08, 0.25, 1] },
            default: { duration: 0.27, ease: [0.26, 0.08, 0.25, 1] },
          },
        }}
        key={view}
        transition={{
          duration: 0.27,
          ease: [0.26, 0.08, 0.25, 1],
        }}
      >
        {content}
      </motion.div>
    </AnimatePresence>
  </div>
</motion.div>`}
        className="max-w-2xl mx-auto md:w-2xl overflow-x-scroll text-xs"
      />
      <p className="max-w-2xl mx-auto">
        The outer <span className="code-font">motion.div</span> handles the
        height animation. It animates to{" "}
        <span className="code-font">bounds.height</span>, the measured height of
        the content inside, creating smooth expansion and contraction as views
        change. The <span className="code-font">transition</span> there is set
        to use a custom cubic-bezier{" "}
        <span className="hover-explain">easing curve</span>{" "}
        <span className="code-font">[0.26, 1, 0.5, 1]</span> which is a snappy
        but smooth curve.
      </p>
      <p className="max-w-2xl mx-auto">
        The inner <span className="code-font">div</span> with{" "}
        <span className="code-font">ref={`{elementRef}`}</span> is what gets
        measured by <span className="code-font">useMeasure</span>. This creates
        the feedback loop: content changes → new height measured → outer
        container animates to new height (using the easing curve mentioned
        above).
      </p>
      <p className="max-w-2xl mx-auto">
        <span className="code-font">AnimatePresence</span> wraps the content
        with <span className="code-font">mode="popLayout"</span>, so that when a
        view is exited, it is "popped" out of the DOM, so it does not cause a
        layout shift by interacting with the new view which is animating in. The{" "}
        <span className="code-font">custom={`{view}`}</span> prop passes the
        current <span className="hover-explain">view index</span> to child
        animations.
      </p>
      <p className="max-w-2xl mx-auto">
        The inner <span className="code-font">motion.div</span> handles the
        content transitions. It starts with{" "}
        <span className="code-font">opacity: 0</span>, slightly scaled down (
        <span className="code-font">scale: 0.96</span>), and blurred. The{" "}
        <span className="code-font">animate</span> state brings it to full
        opacity, normal scale, and removes the blur. The{" "}
        <span className="code-font">exit</span> animation reverses this process,
        with separate timing for opacity (190ms) versus other properties (270ms)
        to have less overlap between the two views.
      </p>
      <p className="max-w-2xl mx-auto">
        <span className="font-semibold">Good news!</span> This is the most
        complex part of the component, and it is now done! The next steps for it
        are to replace the filler text with actual recreations of the private
        key and recovery phrase screens taken from the app.
      </p>
    </div>
  )
}
