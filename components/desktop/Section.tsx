import { motion } from "motion/react"
import { useEffect, useRef } from "react"

export function DesktopSection({
  children,
  className,
  title,
  onOrbLoad,
}: {
  children: React.ReactNode
  className?: string
  title: string
  onOrbLoad?: (x: number, y: number) => void
}) {
  const orbRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (orbRef.current) {
      const rect = orbRef.current.getBoundingClientRect()
      onOrbLoad?.(rect.left + rect.width / 2, rect.top + rect.height / 2)
    }
  }, [])

  return (
    <div
      style={{
        fontFamily: "PP Neue Montreal",
        fontWeight: 500,
        lineHeight: "30px",
        fontSize: "19px",
      }}
      className={`${className}`}
    >
      <div className="font-mono text-gray-500/60 text-[16px] font-semibold relative">
        {title}
        <motion.div
          ref={orbRef}
          className="w-4 h-4 rounded-full absolute top-1/2 -translate-y-1/2 -translate-x-7"
        ></motion.div>
      </div>
      {children}
    </div>
  )
}
