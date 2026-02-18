"use client"

import { useIsMobile } from "@/lib/hooks/useIsMobile"
import { Popover } from "@base-ui/react/popover"
import { ExternalLink } from "lucide-react"
import { AnimatePresence, motion } from "motion/react"
import { useState } from "react"
import { Drawer } from "vaul"

export function InlineDefinition({
  children,
  title = "Definition",
  explanation,
  readMoreURL,
}: {
  children: React.ReactNode
  title?: string
  explanation: string
  readMoreURL?: string
}) {
  const [open, setOpen] = useState(false)
  const isMobile = useIsMobile()

  const drawerContent = (
    <>
      <p className="text-[15px] font-medium text-gray-600 dark:text-gray-300">{title}</p>
      {readMoreURL && (
        <a
          href={readMoreURL}
          target="_blank"
          rel="noopener noreferrer"
          className="mb-2 flex w-fit items-center gap-1 text-sm text-gray-500/70 hover:text-gray-600 dark:text-gray-300/60 dark:hover:text-gray-300"
        >
          Read more <ExternalLink size={14} />
        </a>
      )}
      <p className="text-sm text-gray-700 dark:text-gray-200">{explanation}</p>
    </>
  )

  const popoverContent = (
    <>
      <p className="text-[15px] font-medium text-gray-300">{title}</p>
      {readMoreURL && (
        <a
          href={readMoreURL}
          target="_blank"
          rel="noopener noreferrer"
          className="mb-2 flex w-fit items-center gap-1 text-sm text-gray-300/60 hover:text-gray-300"
        >
          Read more <ExternalLink size={14} />
        </a>
      )}
      <p className="text-sm text-gray-200">{explanation}</p>
    </>
  )

  if (isMobile) {
    return (
      <Drawer.Root open={open} onOpenChange={setOpen}>
        <Drawer.Trigger className="cursor-help underline decoration-gray-500/50 decoration-dotted underline-offset-2">
          {children}
        </Drawer.Trigger>
        <Drawer.Portal>
          <Drawer.Overlay className="fixed inset-0 bg-black/40" />
          <Drawer.Content className="fixed right-0 bottom-0 left-0 outline-none">
            <Drawer.Title className="sr-only">{title}</Drawer.Title>
            <div className="rounded-t-2xl bg-[#FCFCFC] px-4 py-4 font-medium dark:bg-[#323137]">
              <div className="mx-auto mb-4 h-1 w-12 rounded-full bg-gray-300 dark:bg-gray-500" />
              {drawerContent}
            </div>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    )
  }

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger
        className="cursor-help underline decoration-gray-500/50 decoration-dotted underline-offset-2"
        openOnHover
        delay={15}
      >
        {children}
      </Popover.Trigger>
      <AnimatePresence>
        {open && (
          <Popover.Portal>
            <Popover.Positioner sideOffset={8} collisionPadding={16} sticky>
              <Popover.Popup
                className="max-w-lg rounded-2xl bg-[#323137] px-3 py-2 text-base font-medium text-gray-300 shadow-2xl [corner-shape:squircle] data-[side=bottom]:origin-top data-[side=left]:origin-right data-[side=right]:origin-left data-[side=top]:origin-bottom"
                render={
                  <motion.div
                    initial={{ opacity: 0, scale: 0.92, filter: "blur(2px)" }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                      filter: "blur(0px)",
                      transition: { ease: [0.165, 0.84, 0.2, 1] },
                    }}
                    exit={{
                      opacity: 0,
                      scale: 0.96,
                      filter: "blur(2px)",
                      transition: { ease: [0.19, 1, 0.22, 1] },
                    }}
                  />
                }
              >
                {popoverContent}
              </Popover.Popup>
            </Popover.Positioner>
          </Popover.Portal>
        )}
      </AnimatePresence>
    </Popover.Root>
  )
}
