import { useState, type ReactNode } from "react"

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

  return (
    <>
      {items.map((item) => (
        <ExplorationItem
          key={item.src}
          src={item.src}
          reverseSrc={item.reverseSrc}
          placeholderSrc={item.placeholderSrc}
          width={item.width}
          height={item.height}
          title={item.title}
          description={item.description}
          expanded={openSrc === item.src}
          onToggle={() => setOpenSrc((current) => (current === item.src ? null : item.src))}
        />
      ))}
    </>
  )
}
