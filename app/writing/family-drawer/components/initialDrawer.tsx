"use client"

import { AnimatePresence, motion } from "motion/react"
import { useMemo, useState } from "react"
import useMeasure from "react-use-measure"

export const InitialDrawer = () => {
  const [view, setView] = useState(0)
  const [elementRef, bounds] = useMeasure()

  const options = [
    <div className="flex flex-col gap-2" key={0}>
      <p className="text-sm font-medium text-[#222222]">Private Key</p>
      <p className="text-sm">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates dolorem fugit
        consequatur sint necessitatibus natus deserunt? Impedit deleniti libero necessitatibus, fuga
        officiis autem consectetur.
      </p>
      <button
        className="mt-2 cursor-pointer rounded-xl border border-gray-200 px-4 py-2 text-sm transition-transform active:scale-95"
        onClick={() => setView((currentView) => (currentView + 1) % options.length)}
      >
        Show Recovery Phrase
      </button>
    </div>,
    <div className="flex flex-col gap-2" key={1}>
      <p className="text-sm font-medium text-[#222222]">Secret Recovery Phrase</p>
      <p className="text-sm">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aliquid sint molestiae maxime
        harum ea nisi corporis a eligendi dolor illo eveniet doloremque aperiam est, ratione et
        officia consequuntur, atque error aut! Magni accusantium deleniti, eius laboriosam nihil
        sunt. Corporis iusto doloremque ex explicabo commodi earum, nobis.
      </p>
      <button
        className="mt-2 cursor-pointer rounded-xl border border-gray-200 px-4 py-2 text-sm transition-transform active:scale-95"
        onClick={() => setView((currentView) => (currentView + 1) % options.length)}
      >
        Show Private Key
      </button>
    </div>,
  ]

  const content = useMemo(() => {
    return options[view]
  }, [options, view])

  return (
    <motion.div
      animate={{ height: bounds.height }}
      transition={{
        type: "tween",
        ease: [0.26, 1, 0.5, 1],
        bounce: 0,
        duration: 0.27,
      }}
      className="border-shadow mt-auto max-w-80 overflow-hidden rounded-4xl"
    >
      <div className="px-6 pt-6 pb-6 antialiased" ref={elementRef}>
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
    </motion.div>
  )
}
