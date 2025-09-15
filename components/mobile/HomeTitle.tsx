import { motion } from "motion/react"

type HomeTitleProps = {
  index: number
  onClick: (index: number) => void
  title: string
  count?: number
  motionDelay?: number
}

export default function HomeTitle({
  index,
  onClick,
  title,
  count,
  motionDelay,
}: HomeTitleProps) {
  return (
    <motion.div
      whileTap={{
        scale: 0.9,
        opacity: 0.5,
      }}
      onClick={() => onClick(index)}
      style={{
        animationDelay: `${motionDelay}ms`,
      }}
      className={`relative flex items-center w-fit motion-opacity-in-0 motion-translate-y-in-[15%] motion-blur-in-[2px]`}
    >
      <motion.p>{title}</motion.p>
      {count && (
        <span className="absolute -top-1 -right-4.5 text-xs text-gray-500 rounded-full px-2 py-0.5 font-geist-mono font-semibold">
          {count}
        </span>
      )}
    </motion.div>
  )
}
