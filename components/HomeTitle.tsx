type HomeTitleProps = {
  index: number
  onClick: (index: number) => void
  title: string
  count?: number
  motionDelay?: number
}

export function HomeTitle({ index, onClick, title, count, motionDelay }: HomeTitleProps) {
  return (
    <div
      onClick={() => onClick(index)}
      style={{
        animationDelay: `${motionDelay}ms`,
      }}
      className={`motion-opacity-in-0 motion-translate-y-in-[15%] motion-blur-in-[2px] relative flex w-fit cursor-pointer select-none items-center transition-all duration-150 active:scale-95 active:opacity-50`}
    >
      <p>{title}</p>
      {count && (
        <span className="font-geist-mono absolute -top-1 -right-4.5 rounded-full px-2 py-0.5 text-xs font-semibold text-gray-500 dark:text-gray-400">
          {count}
        </span>
      )}
    </div>
  )
}
