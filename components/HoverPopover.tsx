"use client"

import { cn } from "@/lib/utils"
import { Popover } from "@base-ui/react/popover"
import { AnimatePresence, motion } from "motion/react"
import type { ReactNode } from "react"
import { useState } from "react"

type HoverPopoverProps = {
  href: string
  trigger: ReactNode
  triggerClassName: string
  popupClassName?: string
  preloadImageSrc?: string
  preloadImageWidth?: number
  preloadImageHeight?: number
  children?: ReactNode
}

const popupBaseClassName =
  "rounded-2xl border border-gray-200 bg-white px-4 py-3.5 shadow-lg [corner-shape:squircle] data-[side=bottom]:origin-top data-[side=left]:origin-right data-[side=right]:origin-left data-[side=top]:origin-bottom dark:border-white/8 dark:bg-[#1c1c1e] dark:shadow-[0_8px_30px_rgba(0,0,0,0.5)]"

export function HoverPopover({
  href,
  trigger,
  triggerClassName,
  popupClassName,
  preloadImageSrc,
  preloadImageWidth = 56,
  preloadImageHeight = 56,
  children,
}: HoverPopoverProps) {
  const [open, setOpen] = useState(false)

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      {preloadImageSrc ? (
        <img
          src={preloadImageSrc}
          alt=""
          width={preloadImageWidth}
          height={preloadImageHeight}
          aria-hidden="true"
          loading="eager"
          decoding="async"
          className="pointer-events-none fixed top-0 left-0 h-px w-px opacity-0"
        />
      ) : null}
      <Popover.Trigger
        className={triggerClassName}
        openOnHover
        delay={15}
        nativeButton={false}
        render={<a href={href} target="_blank" rel="noopener noreferrer" />}
      >
        {trigger}
      </Popover.Trigger>
      <AnimatePresence>
        {open && (
          <Popover.Portal>
            <Popover.Positioner side="top" sideOffset={8} collisionPadding={16} sticky>
              <Popover.Popup
                className={cn(popupBaseClassName, popupClassName)}
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
                {children}
              </Popover.Popup>
            </Popover.Positioner>
          </Popover.Portal>
        )}
      </AnimatePresence>
    </Popover.Root>
  )
}
