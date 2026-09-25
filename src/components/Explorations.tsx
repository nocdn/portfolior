import { useCallback, useEffect, useState, type ReactNode } from "react"

import { ExplorationItem } from "./ExplorationItem"

export type Exploration = {
  src: string
  reverseSrc: string
  placeholderSrc: string
  width: number
  height: number
  title: string
  description: ReactNode
}

export function Explorations({ items }: { items: Exploration[] }) {
  const [openSrc, setOpenSrc] = useState<string | null>(null)
  const [firstReady, setFirstReady] = useState(false)
  const startNextVideo = useCallback(() => setFirstReady(true), [])

  // Give the first video the initial network slot, but don't let a stalled
  // preload keep the rest of the page waiting indefinitely.
  useEffect(() => {
    if (firstReady) return
    const timeout = window.setTimeout(startNextVideo, 5000)
    return () => window.clearTimeout(timeout)
  }, [firstReady, startNextVideo])

  return (
    <>
      {items.map((item, index) => (
        <ExplorationItem
          key={item.src}
          src={item.src}
          reverseSrc={item.reverseSrc}
          placeholderSrc={item.placeholderSrc}
          width={item.width}
          height={item.height}
          title={item.title}
          description={item.description}
          eager={index === 0 || firstReady}
          onPreloadDone={index === 0 ? startNextVideo : undefined}
          expanded={openSrc === item.src}
          onToggle={() => setOpenSrc((current) => (current === item.src ? null : item.src))}
        />
      ))}
    </>
  )
}
