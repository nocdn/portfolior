"use client"

import { Metadata } from "next"
import { Sandpack } from "@codesandbox/sandpack-react"
import dynamic from "next/dynamic"
import { CodeInline } from "@/components/CodeBlock"
import { HoverExplain } from "./components/HoverExplain"

const DrawerSandpack0 = dynamic(() => import("./components/DrawerSandpack0"), {
  ssr: false,
})

const DrawerSandpack1 = dynamic(() => import("./components/DrawerSandpack1"), {
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
        Now, let's break down each part of this initial{" "}
        <HoverExplain description="A component is a self-contained piece of code that performs a specific function or displays a specific UI element. In this case, the component is the entire drawer, and later on, will have other components inside it. For this component, it holds the HTML structure, styling, and the logic.">
          component
        </HoverExplain>
        , starting with all of those imports, and why they are needed.
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
        <HoverExplain description="The Document Object Model - a tree-like structure that represents all the HTML elements on a web page in the browser's memory, allowing JavaScript to interact with and modify the page content.">
          DOM
        </HoverExplain>
        . The <span className="code-font">animate</span> property describes the
        animation that occurs as soon as the element is mounted, while{" "}
        <span className="code-font">exit</span> defines how the element animates
        out when it's removed.
      </p>
      <p className="max-w-2xl mx-auto">
        <span className="code-font">AnimatePresence</span> is crucial here since
        it allows components to animate out before being removed from the DOM,
        rather than disappearing instantly. Without it, the{" "}
        <span className="code-font">exit</span> animation would never play.
      </p>
      <p className="max-w-2xl mx-auto">
        <span className="code-font">react-use-measure</span> provides the{" "}
        <span className="code-font">useMeasure</span>{" "}
        <HoverExplain description="A special React (the frontend framework I am using here) function that lets you 'hook into' React features like state and lifecycle events from functional components, similar to how plugins extend software functionality.">
          hook
        </HoverExplain>{" "}
        , which tracks the dimensions of DOM elements in real-time. This is
        essential for creating smooth height transitions as the drawer content
        changes—we can animate to the actual measured height rather than
        guessing or using fixed values.
      </p>
      <CodeInline
        code={`const [view, setView] = useState(0);
const [elementRef, bounds] = useMeasure();`}
        className="max-w-2xl mx-auto md:w-2xl overflow-x-scroll text-xs"
      />
      <p className="max-w-2xl mx-auto">
        The <span className="code-font">view</span>{" "}
        <HoverExplain description="Data stored in a component that can change over time. When state changes, React automatically updates the user interface to reflect the new data, like a variable that triggers UI updates.">
          state
        </HoverExplain>{" "}
        tracks which content is currently displayed, starting at index 0. The{" "}
        <span className="code-font">useMeasure</span> hook returns two things:{" "}
        <span className="code-font">elementRef</span> (a{" "}
        <HoverExplain description="A reference that provides direct access to a DOM element from React code, like getting a pointer to a specific HTML element so you can measure or manipulate it directly. Here, it is used to attach to the element we want to measure, so we can measure its height.">
          ref
        </HoverExplain>{" "}
        to attach to the element we want to measure) and{" "}
        <span className="code-font">bounds</span> (an object containing the
        element's dimensions, including height, width, and position).
      </p>
      <p className="max-w-2xl mx-auto">
        The <span className="code-font">options</span> array contains the
        different{" "}
        <HoverExplain description="Different screens or content layouts that can be displayed in the same container, like different pages in a tabbed interface where only one is visible at a time.">
          views
        </HoverExplain>{" "}
        that can be displayed in the drawer, in this case, just some{" "}
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
        <HoverExplain description="A mathematical function that defines how an animation progresses over time - whether it starts slow and speeds up, or moves at a constant rate, similar to acceleration curves in physics.">
          easing curve
        </HoverExplain>{" "}
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
        current{" "}
        <HoverExplain description="A number that identifies which view/screen is currently being displayed, like an array index that tells the system 'show screen #2' or 'show screen #0'.">
          view index
        </HoverExplain>{" "}
        to child animations.
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
      <div className="w-9/10 mx-auto my-6">
        <DrawerSandpack1 />
      </div>
      <p className="max-w-2xl mx-auto">
        Now, with this version, the only meaningful code change that was made,
        was adding the{" "}
        <a
          href="https://github.com/lauridskern/open-runde"
          target="_blank"
          className="article-link"
        >
          "open runde" font
        </a>{" "}
        (which is an alternative to the "SF Pro Rounded" font that I presume is
        used in the original app) as well as the icon library{" "}
        <span className="code-font">lucide-react</span>.
      </p>
      <p className="max-w-2xl mx-auto">
        The options array is now populated with the actual views, which are
        imported from the{" "}
        <span
          className="code-font"
          style={{ paddingRight: "8px", paddingLeft: "4px" }}
        >
          ./InitialView
        </span>
        ,{" "}
        <span
          className="code-font"
          style={{ paddingRight: "8px", paddingLeft: "4px" }}
        >
          ./KeyView
        </span>{" "}
        and{" "}
        <span
          className="code-font"
          style={{ paddingRight: "8px", paddingLeft: "4px" }}
        >
          ./RecoveryView
        </span>{" "}
        files.
      </p>
      <CodeInline
        code={`const options = [
  <InitialView
    key="initial"
    onViewKey={() => setView(1)}
    onViewRecovery={() => setView(2)}
    onRemoveWallet={() => {}}
  />,
  <KeyView key="key" ... />,
  <RecoveryView key="recovery" ... />,
];`}
        className="max-w-2xl mx-auto md:w-2xl overflow-x-scroll text-xs"
      />
      <p className="max-w-2xl mx-auto">
        Inside every view is a{" "}
        <HoverExplain description="A function that is passed as a parameter (a parameter is a value that is passed to a function/component) to another function and gets executed when a specific event happens, like a phone number you give someone to 'call you back' when they're ready.">
          callback function
        </HoverExplain>{" "}
        that instructs the{" "}
        <HoverExplain description="The over-arching component that contains and controls this component, like a parent folder that contains subfolders - it manages the child component's (the views) behavior and data. The drawer is the parent, and the views are the children.">
          parent component
        </HoverExplain>{" "}
        to change the view to the chosen index.
      </p>
      <p className="max-w-2xl mx-auto">
        Since in the beginning, the code for the parent component included lines
        to automatically resize itself, no other changes need to be made to the
        parent, since we could place anything in the views and it would fit.{" "}
        <span className="font-semibold">
          And with that, the component is finished!
        </span>
      </p>
      <p className="max-w-2xl mx-auto mt-8">Thank you for reading!</p>
    </div>
  )
}
