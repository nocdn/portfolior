import { Book } from "@/components/icons/book"
import { HistoryTimerIcon } from "@/components/icons/clock2"

export function Article({
  title,
  date,
  href,
  disabled,
}: {
  title: string
  date: string
  href: string
  disabled?: boolean
}) {
  return (
    <a
      href={href}
      className={`font-inter text-[16px] leading-normal flex justify-between border border-gray-200 rounded-lg p-3 w-full ${
        disabled ? "cursor-not-allowed" : "hover:bg-gray-100/55 cursor-pointer"
      }`}
    >
      <div>
        <p className="font-medium text-gray-1200">{title}</p>
        <div className="text-gray-500 shrink-0 whitespace-nowrap inline-flex items-center gap-2">
          {!disabled && <p>{date}</p>}
          <span className="flex items-center gap-2">
            {disabled && <p>Check back later</p>}
            {disabled ? (
              <HistoryTimerIcon className="w-4 h-4" strokeWidth={2.25} />
            ) : (
              <Book className="w-4 h-4" strokeWidth={2.25} />
            )}
          </span>
        </div>
      </div>
    </a>
  )
}
