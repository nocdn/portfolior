// Markdown variants served to clients that ask for text/markdown (AI agents,
// scrapers). Keep in sync with the live pages (see AGENTS.md): the `/`
// variant mirrors src/routes/index.tsx, article variants mirror
// src/articles/*/Body.tsx. Code samples are imported, not pasted, so they
// can never drift. Variants are static strings: no compute, never cached.

import { finishedCode, initialCode } from "@/articles/family-drawer/article-code"

// Trailing slashes never match content, so normalize before lookup.
export function normalizePath(pathname: string): string {
  if (pathname.length > 1) pathname = pathname.replace(/\/+$/, "")
  return pathname
}

export function getMarkdown(pathname: string): string | null {
  switch (normalizePath(pathname)) {
    case "/":
      return `# Bartek Bak

Intern at Cloudflare.

I am currently on the UI platform team at [Cloudflare](https://www.cloudflare.com/), where I work on the Dashboard, and the ways that people interact with the products. Along with the team, I aim to make it a delightful and thoughtful experience.

I study computer science at the University of York, and I was previously a software development intern at [Objective](https://objectiveit.com/).

You can contact me via [email](mailto:contact@bartoszbak.org), or [LinkedIn](https://linkedin.com/in/bartek-bak), or find me on [X](https://x.com/nocdns) and [GitHub](https://github.com/nocdn).

## Writing

- [My take on the Family Drawer](/writing/family-drawer) - August 2025
- [Turning an old phone into an OTP server](/writing/otp-api) - March 2026
- Fixing the infamous Cloudflare error pages - Coming soon

## Explorations

- EmDash loading stepper - An upgrade I made to the playground loading screen, try it live [here](https://try.emdashcms.com/)
- Dashboard illustration - Added interactivity with the signature glow colour to dashboard's 404 pages, to make it a little less annoying to hit one. Original cloud SVG by [Bálint Ferenczy](https://x.com/BalintFerenczy)
- ChatGPT effort picker - Prove that you are worthy to wield higher intelligence, by solving some math problems

## Contact

- Email: contact@bartoszbak.org
- [LinkedIn](https://linkedin.com/in/bartek-bak)
- [X](https://x.com/nocdns)
- [GitHub](https://github.com/nocdn)
- [CV](/cv)
`
    case "/writing/family-drawer":
      return `# My take on the Family Drawer

August 2025.

It feels like whenever the topic of animations (whether that is web or otherwise) comes up, the [Family App](https://family.co/) is front and center of all the examples. And for good reason.

It represents incredible attention to detail and a deep understanding of animation principles. And for this very reason, when I originally started learning motion design, I had set aspects of this app as my goal to recreate.

Naturally, the app is filled with lots of great interactions, but here, I will focus on just one of them, a wallet options drawer. (The page shows a video of the drawer itself, straight from the app (2025). Choosing the "Remove Wallet" option closes the drawer and opens another confirmation dialog.)

The most important aspect of this whole component is the motion, no doubt about that, so with my first attempt, I ignored the icons, colours and typography and ended up with this:

\`\`\`tsx
${initialCode}\`\`\`

Now, let's break down each part of this initial component, starting with all of those imports, and why they are needed.

\`\`\`tsx
import { AnimatePresence, motion } from "motion/react"
import { useMemo, useState } from "react"
import useMeasure from "react-use-measure"\`\`\`

\`motion/react\` is the library that provides the motion primitives, like \`motion.div\` which allows us to animate pretty much every property of that element using \`initial\`, \`animate\`, and \`exit\` props.

\`AnimatePresence\` is crucial here since it allows components to animate out before being removed from the DOM, rather than disappearing instantly. Without it, the \`exit\` animation would never play.

\`react-use-measure\` provides the \`useMeasure\` hook, which tracks the dimensions of DOM elements in real-time. This is essential for creating smooth height transitions as the drawer content changes as we can animate to the actual measured height rather than guessing or using fixed values.

\`\`\`tsx
const [view, setView] = useState(0);
const [elementRef, bounds] = useMeasure();\`\`\`

The \`view\` state tracks which content is currently displayed, starting at index 0. The \`useMeasure\` hook returns two things: \`elementRef\` (a ref to attach to the element we want to measure) and \`bounds\` (an object containing the element's dimensions, including height, width, and position).

The \`options\` array contains the different views that can be displayed in the drawer, in this case, just some \`lorem ipsum\` text for each, which I will later replace with actual recreations of the private key and recovery phrase screens taken from the app. Each of the views also contains a button that cycles to the next view.

Moving onto the most important part of the component, an animated container which holds the views and decides how to animate between them:

\`\`\`tsx
<motion.div
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
</motion.div>\`\`\`

The outer \`motion.div\` handles the height animation. It animates to \`bounds.height\`, the measured height of the content inside, creating smooth expansion and contraction as views change. The \`transition\` there is set to use a custom cubic-bezier easing curve \`[0.26, 1, 0.5, 1]\` which is a snappy but smooth curve.

The inner \`div\` with \`ref={elementRef}\` is what gets measured by \`useMeasure\`. This creates the feedback loop: content changes → new height measured → outer container animates to new height (using the easing curve mentioned above).

\`AnimatePresence\` wraps the content with \`mode="popLayout"\`, so that when a view is exited, it is "popped" out of the DOM, so it does not cause a layout shift by interacting with the new view which is animating in. The \`custom={view}\` prop passes the current view index to child animations.

The inner \`motion.div\` handles the content transitions. It starts with \`opacity: 0\`, slightly scaled down (\`scale: 0.96\`), and blurred. The \`animate\` state brings it to full opacity, normal scale, and removes the blur. The \`exit\` animation reverses this process, with separate timing for opacity (190ms) versus other properties (270ms) to have less overlap between the two views.

**Good news!** This is the most complex part of the component, and it is now done! The next steps for it are to replace the filler text with actual recreations of the private key and recovery phrase screens taken from the app. (The page shows an interactive demo of the finished drawer.)

Now, with this version, the only meaningful code change that was made, was adding the ["open runde" font](https://github.com/lauridskern/open-runde) (which is an alternative to the "SF Pro Rounded" font that I presume is used in the original app) as well as the icon library \`lucide-react\`.

The options array is now populated with the actual views, which are imported from the \`./InitialView\`, \`./KeyView\` and \`./RecoveryView\` files.

\`\`\`tsx
const options = [
  <InitialView
    key="initial"
    onViewKey={() => setView(1)}
    onViewRecovery={() => setView(2)}
    onRemoveWallet={() => {}}
  />,
  <KeyView key="key" ... />,
  <RecoveryView key="recovery" ... />,
];\`\`\`

Inside every view is a callback function that instructs the parent component to change the view to the chosen index.

Since in the beginning, the code for the parent component included lines to automatically resize itself, no other changes need to be made to the parent, since we could place anything in the views and it would fit. **And with that, the component is finished!**

The full finished component code:

\`\`\`tsx
${finishedCode}\`\`\`

Thank you for reading!

[Back to home](/)
`
    case "/writing/otp-api":
      return `# Turning my old phone into an OTP server

March 2026.

I'm a big fan of not giving out my phone number for some random service I've used once. Yet my phone only has one SIM slot.

This is where my trusty, 11 year-old phone comes into play. With an increbible 5.74 GB of internal storage, and an *entire* gigabyte of RAM, I figured why not use it to run an OTP server? (I had a sim card handy, so that was what we were going to use).

I'm comfortable with TypeScript APIs, but the problem arises with the fact that I have never written a native Android app before - especially for Android 6.0.0 (released September 2015). Thankfully, sillicon valley's golden child - OpenAI, had [just released GPT-5.4](https://openai.com/index/introducing-gpt-5-4/), so I decided to take it for a spin.

The rough idea is simple: keep the device permanently online, push a quick POST request on incoming SMS messages, and make it accessible as an API without having to manually check the phone each time.

I decided to first write the backend, and then have the model write the app around that.

Of course, we also needed a suitable database to store the messages. I used Neon's serverless Postgres (since I was familiar) with this schema.

So next, we have to tackle the mobile app. With the spec of the API, and some extra instructions, Codex guided me through creating a new Android Studio project, and wrote about 90% of the code needed to make it work. Some small UI and UX refinements later and we had a working app, that I could compile and sideload straight into the phone.

I added the backend URL, saved it and the light was green so to say.

The rest of the article coming soon :)

[Back to home](/)
`
    default:
      return null
  }
}
