"use client"

import { Popover } from "@base-ui/react/popover"
import { AnimatePresence, motion } from "motion/react"
import { useCallback, useEffect, useRef, useState } from "react"

export function EmailCopy() {
  const [open, setOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null)

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText("contact@bartoszbak.org")
    setCopied(true)
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => setCopied(false), 1000)
  }, [])

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger
        className="text-blue-600 underline decoration-blue-600/0 decoration-[1.5px] underline-offset-2 hover:decoration-blue-600 dark:text-blue-400 dark:hover:decoration-blue-400"
        openOnHover
        delay={15}
        onClickCapture={(e) => {
          e.stopPropagation()
          handleCopy()
        }}
      >
        email
      </Popover.Trigger>
      <AnimatePresence>
        {open && (
          <Popover.Portal>
            <Popover.Positioner side="top" sideOffset={2} collisionPadding={24} sticky>
              <Popover.Popup
                className="border-shadow w-16 rounded-xl bg-white py-1.5 text-center text-sm font-medium text-gray-700 [corner-shape:squircle] data-[side=bottom]:origin-top data-[side=left]:origin-right data-[side=right]:origin-left data-[side=top]:origin-bottom dark:border-white/8 dark:bg-[#1c1c1e] dark:text-gray-200 dark:shadow-[0_8px_30px_rgba(0,0,0,0.5)]"
                render={
                  <motion.div
                    style={{ willChange: "transform, opacity, filter" }}
                    initial={{ opacity: 0, scale: 0.52, filter: "blur(2px)" }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                      filter: "blur(0px)",
                      transition: { ease: [0.165, 0.84, 0.2, 1] },
                    }}
                    exit={{
                      opacity: 0,
                      scale: 0.8,
                      filter: "blur(2px)",
                      transition: { ease: [0.19, 1, 0.22, 1] },
                    }}
                  />
                }
              >
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.span
                    key={copied ? "copied" : "copy"}
                    initial={{ opacity: 0, filter: "blur(1.5px)", y: -8 }}
                    animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                    exit={{ opacity: 0, filter: "blur(1px)", y: 8, scale: 0.8 }}
                    transition={{ duration: 0.1 }}
                    className="block"
                  >
                    {copied ? "Copied" : "Copy"}
                  </motion.span>
                </AnimatePresence>
              </Popover.Popup>
            </Popover.Positioner>
          </Popover.Portal>
        )}
      </AnimatePresence>
    </Popover.Root>
  )
}
