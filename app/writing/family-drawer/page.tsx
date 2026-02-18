import { ArticleHeading } from "@/components/ArticleHeading"
import { InlineDefinition } from "@/components/InlineDefinition"
import { articleMetadata } from "@/lib/article-metadata"
import { CodeBlock } from "@/lib/components/code-block"
import { cacheLife } from "next/cache"
import { finishedCode, initialCode } from "./article-code"
import { CodePreviewSwitch } from "./components/codePreviewSwitch"
import { FinishedDrawer } from "./components/finishedDrawer"
import { InitialDrawer } from "./components/initialDrawer"

export const metadata = articleMetadata("Recreating the Family Drawer", "/writing/family-drawer")

export default async function FamilyDrawer() {
  "use cache"
  cacheLife("max")

  return (
    <div className="flex flex-col gap-5 px-5 md:px-0">
      <ArticleHeading title="Recreating the Family Drawer" date="August 2025" />
      <p className="text-paragraph mb-2 max-w-2xl">
        It feels like whenever the topic of animations (whether that is web or otherwise) comes up,
        the{" "}
        <a href="https://family.co/" target="_blank" className="article-link">
          Family App
        </a>{" "}
        is front and center of all the examples. And for good reason.
      </p>
      <p className="text-paragraph max-w-2xl">
        It represents incredible attention to detail and a deep understanding of animation
        principles. And for this very reason, when I originally started learning motion design, I
        had set aspects of this app as my goal to recreate.
      </p>
      <p className="text-paragraph max-w-2xl">
        Naturally, the app is filled with lots of great interactions, but here, I will focus on just
        one of them, a wallet options drawer:
      </p>
      <div className="mx-auto my-4 flex max-w-2xl gap-6">
        <video
          autoPlay
          muted
          playsInline
          loop
          preload="metadata"
          width={886}
          height={1118}
          className="border-shadow h-auto w-1/2 rounded-[9px] bg-[#BFBCBF] [corner-shape:squircle] supports-[corner-shape:squircle]:rounded-2xl"
        >
          <source src="/videos/articles/family-drawer.mp4" type="video/mp4" />
        </video>
        <p className="hidden text-[16px] text-gray-500/60 md:block dark:text-gray-400/60">
          The drawer itself, straight from the app (2025). Choosing the "Remove Wallet" option
          closes the drawer and opens another confirmation dialog, so I did not include that in the
          video.
        </p>
      </div>
      <p className="text-paragraph max-w-2xl">
        The most important aspect of this whole component is the motion, no doubt about that, so
        with my first attempt, I ignored the icons, colours and typography and ended up with this:
      </p>
      <CodePreviewSwitch
        code={initialCode}
        previewClassName="flex flex-col items-center justify-end pb-4"
      >
        <InitialDrawer />
      </CodePreviewSwitch>
      <p className="text-paragraph max-w-2xl">
        Now, let's break down each part of this initial{" "}
        <InlineDefinition
          title="What is a component?"
          explanation="A component is a self-contained piece of code that performs a specific function or displays a specific UI element. In this case, the component is the entire drawer, and later on, will have other components inside it. For this component, it holds the HTML structure, styling, and the logic."
          readMoreURL="https://react.dev/learn/your-first-component"
        >
          component
        </InlineDefinition>
        , starting with all of those imports, and why they are needed.
      </p>
      <CodeBlock
        lang="tsx"
        className="border-shadow max-w-2xl rounded-[9.5px] p-3"
      >{`import { AnimatePresence, motion } from "motion/react"
import { useMemo, useState } from "react"
import useMeasure from "react-use-measure"`}</CodeBlock>
      <p className="text-paragraph max-w-2xl">
        <span className="code-inline">motion/react</span> is the library that provides the motion
        primitives, like <span className="code-inline">motion.div</span> which allows us to animate
        pretty much every property of that element using{" "}
        <span className="code-inline">initial</span>, <span className="code-inline">animate</span>,
        and <span className="code-inline">exit</span> props.
      </p>
      <p className="text-paragraph max-w-2xl">
        <span className="code-inline">AnimatePresence</span> is crucial here since it allows
        components to animate out before being removed from the{" "}
        <InlineDefinition
          title="What is the DOM?"
          explanation="The Document Object Model - a tree-like structure that represents all the HTML elements on a web page in the browser's memory, allowing JavaScript to interact with and modify the page content."
          readMoreURL="https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model"
        >
          DOM
        </InlineDefinition>
        , rather than disappearing instantly. Without it, the{" "}
        <span className="code-inline">exit</span> animation would never play.
      </p>
      <p className="text-paragraph max-w-2xl">
        <span className="code-inline">react-use-measure</span> provides the{" "}
        <span className="code-inline">useMeasure</span>{" "}
        <InlineDefinition
          title="What is a react hook?"
          explanation="A special React function that lets you 'hook into' React features like state and lifecycle events from functional components, similar to how plugins extend software functionality."
          readMoreURL="https://react.dev/reference/react/hooks"
        >
          hook
        </InlineDefinition>
        , which tracks the dimensions of DOM elements in real-time. This is essential for creating
        smooth height transitions as the drawer content changes as we can animate to the actual
        measured height rather than guessing or using fixed values.
      </p>
      <CodeBlock
        lang="tsx"
        className="border-shadow max-w-2xl rounded-[9.5px] p-3"
      >{`const [view, setView] = useState(0);
const [elementRef, bounds] = useMeasure();`}</CodeBlock>
      <p className="text-paragraph max-w-2xl">
        The <span className="code-inline">view</span>{" "}
        <InlineDefinition
          title="What is state?"
          explanation="Data stored in a component that can change over time. When state changes, React automatically updates the user interface to reflect the new data, like a variable that triggers UI updates."
          readMoreURL="https://react.dev/learn/state-a-components-memory"
        >
          state
        </InlineDefinition>{" "}
        tracks which content is currently displayed, starting at index 0. The{" "}
        <span className="code-inline">useMeasure</span> hook returns two things:{" "}
        <span className="code-inline">elementRef</span> (a{" "}
        <InlineDefinition
          title="What is a useRef hook?"
          explanation="A reference that provides direct access to a DOM element from React code, like getting a pointer to a specific HTML element so you can measure or manipulate it directly. Here, it is used to attach to the element we want to measure, so we can measure its height."
          readMoreURL="https://react.dev/learn/referencing-values-with-refs"
        >
          ref
        </InlineDefinition>{" "}
        to attach to the element we want to measure) and <span className="code-inline">bounds</span>{" "}
        (an object containing the element's dimensions, including height, width, and position).
      </p>
      <p className="text-paragraph max-w-2xl">
        The <span className="code-inline">options</span> array contains the different{" "}
        <InlineDefinition
          title="What is a view in this context?"
          explanation="Different screens or content layouts that can be displayed in the same container, like different pages in a tabbed interface where only one is visible at a time."
          readMoreURL="https://react.dev/learn/conditional-rendering"
        >
          views
        </InlineDefinition>{" "}
        that can be displayed in the drawer, in this case, just some{" "}
        <span className="code-inline">lorem ipsum</span> text for each, which I will later replace
        with actual recreations of the private key and recovery phrase screens taken from the app.
        Each of the views also contains a button that cycles to the next view.
      </p>
      <p className="text-paragraph max-w-2xl">
        Moving onto the most important part of the component, an animated container which holds the
        views and decides how to animate between them:
      </p>
      <CodeBlock lang="tsx" className="border-shadow max-w-2xl rounded-[9.5px] p-3">{`<motion.div
  animate={{ height: bounds.height }}
  transition={{
    type: "tween",
    ease: [0.26, 1, 0.5, 1],
    bounce: 0,
    duration: 0.27,
  }}
  className="overflow-hidden rounded-[2rem] border border-gray-200 bg-white"
>
  <div className="p-6" ref={elementRef}>
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
</motion.div>`}</CodeBlock>
      <p className="text-paragraph max-w-2xl">
        The outer <span className="code-inline">motion.div</span> handles the height animation. It
        animates to <span className="code-inline">bounds.height</span>, the measured height of the
        content inside, creating smooth expansion and contraction as views change. The{" "}
        <span className="code-inline">transition</span> there is set to use a custom cubic-bezier{" "}
        <InlineDefinition
          title="What is an easing curve?"
          explanation="A mathematical function that defines how an animation progresses over time - whether it starts slow and speeds up, or moves at a constant rate, similar to acceleration curves in physics."
          readMoreURL="https://developer.mozilla.org/en-US/docs/Web/CSS/easing-function"
        >
          easing curve
        </InlineDefinition>{" "}
        <span className="code-inline">[0.26, 1, 0.5, 1]</span> which is a snappy but smooth curve.
      </p>
      <p className="text-paragraph max-w-2xl">
        The inner <span className="code-inline">div</span> with{" "}
        <span className="code-inline">ref={`{elementRef}`}</span> is what gets measured by{" "}
        <span className="code-inline">useMeasure</span>. This creates the feedback loop: content
        changes → new height measured → outer container animates to new height (using the easing
        curve mentioned above).
      </p>
      <p className="text-paragraph max-w-2xl">
        <span className="code-inline">AnimatePresence</span> wraps the content with{" "}
        <span className="code-inline">mode="popLayout"</span>, so that when a view is exited, it is
        "popped" out of the DOM, so it does not cause a layout shift by interacting with the new
        view which is animating in. The <span className="code-inline">custom={`{view}`}</span> prop
        passes the current{" "}
        <InlineDefinition
          title="What is a view index?"
          explanation="A number that identifies which view/screen is currently being displayed, like an array index that tells the system 'show screen #2' or 'show screen #0'."
          readMoreURL="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array#array_indices"
        >
          view index
        </InlineDefinition>{" "}
        to child animations.
      </p>
      <p className="text-paragraph max-w-2xl">
        The inner <span className="code-inline">motion.div</span> handles the content transitions.
        It starts with <span className="code-inline">opacity: 0</span>, slightly scaled down (
        <span className="code-inline">scale: 0.96</span>), and blurred. The{" "}
        <span className="code-inline">animate</span> state brings it to full opacity, normal scale,
        and removes the blur. The <span className="code-inline">exit</span> animation reverses this
        process, with separate timing for opacity (190ms) versus other properties (270ms) to have
        less overlap between the two views.
      </p>
      <p className="text-paragraph max-w-2xl">
        <span className="font-semibold">Good news!</span> This is the most complex part of the
        component, and it is now done! The next steps for it are to replace the filler text with
        actual recreations of the private key and recovery phrase screens taken from the app.
      </p>
      <CodePreviewSwitch
        code={finishedCode}
        height="480px"
        previewClassName="flex flex-col items-center justify-end pb-4"
      >
        <FinishedDrawer />
      </CodePreviewSwitch>
      <p className="text-paragraph max-w-2xl">
        Now, with this version, the only meaningful code change that was made, was adding the{" "}
        <a
          href="https://github.com/lauridskern/open-runde"
          target="_blank"
          className="article-link"
        >
          "open runde" font
        </a>{" "}
        (which is an alternative to the "SF Pro Rounded" font that I presume is used in the original
        app) as well as the icon library <span className="code-inline">lucide-react</span>.
      </p>
      <p className="text-paragraph max-w-2xl">
        The options array is now populated with the actual views, which are imported from the{" "}
        <span className="code-inline">./InitialView</span>,{" "}
        <span className="code-inline">./KeyView</span> and{" "}
        <span className="code-inline">./RecoveryView</span> files.
      </p>
      <CodeBlock
        lang="tsx"
        className="border-shadow max-w-2xl rounded-[9.5px] p-3"
      >{`const options = [
  <InitialView
    key="initial"
    onViewKey={() => setView(1)}
    onViewRecovery={() => setView(2)}
    onRemoveWallet={() => {}}
  />,
  <KeyView key="key" ... />,
  <RecoveryView key="recovery" ... />,
];`}</CodeBlock>
      <p className="text-paragraph max-w-2xl">
        Inside every view is a{" "}
        <InlineDefinition
          title="What is a callback function?"
          explanation="A function that is passed as a parameter to another function and gets executed when a specific event happens, like a phone number you give someone to 'call you back' when they're ready."
          readMoreURL="https://developer.mozilla.org/en-US/docs/Glossary/Callback_function"
        >
          callback function
        </InlineDefinition>{" "}
        that instructs the{" "}
        <InlineDefinition
          title="What is a parent component?"
          explanation="The over-arching component that contains and controls this component, like a parent folder that contains subfolders - it manages the child component's behavior and data. The drawer is the parent, and the views are the children."
          readMoreURL="https://react.dev/learn/passing-props-to-a-component"
        >
          parent component
        </InlineDefinition>{" "}
        to change the view to the chosen index.
      </p>
      <p className="text-paragraph max-w-2xl">
        Since in the beginning, the code for the parent component included lines to automatically
        resize itself, no other changes need to be made to the parent, since we could place anything
        in the views and it would fit.{" "}
        <span className="font-semibold">And with that, the component is finished!</span>
      </p>
      <p className="text-paragraph mt-8 max-w-2xl">Thank you for reading!</p>
    </div>
  )
}
