import Link from "next/link"

type IconProps = {
  size?: number | string
  strokeWidth?: number
  className?: string
}

function BookIcon({ size = 24, strokeWidth = 1.5, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className={className}
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strokeWidth}
        color="currentColor"
      >
        <path d="M16.613 16.085C13.98 17.568 12.477 20.64 12 21.5V8c.415-.746 1.602-2.884 3.632-4.336c.855-.612 1.282-.918 1.825-.64c.543.28.543.896.543 2.127v8.84c0 .666 0 .999-.137 1.232c-.136.234-.508.443-1.25.862" />
        <path d="M12 7.806c-.687-.722-2.678-2.436-6.02-3.036c-1.692-.305-2.538-.457-3.26.126C2 5.48 2 6.426 2 8.321v6.809c0 1.732 0 2.598.463 3.139c.462.54 1.48.724 3.518 1.09c1.815.326 3.232.847 4.258 1.37c1.01.514 1.514.771 1.761.771s.752-.257 1.76-.771c1.027-.523 2.444-1.044 4.26-1.37c2.036-.366 3.055-.55 3.517-1.09c.463-.541.463-1.407.463-3.14V8.322c0-1.894 0-2.841-.72-3.425C20.557 4.313 19 4.77 18 5.5" />
      </g>
    </svg>
  )
}

function ClockIcon({ size = 24, strokeWidth = 2, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20.4532 12.8928C20.1754 15.5027 18.6967 17.9484 16.2497 19.3612C12.1842 21.7084 6.98566 20.3155 4.63845 16.25L4.38845 15.817M3.54617 11.1071C3.82397 8.49723 5.30276 6.05151 7.74974 4.63874C11.8152 2.29153 17.0138 3.68447 19.361 7.74995L19.611 8.18297M3.49316 18.0659L4.22522 15.3339L6.95727 16.0659M17.0422 7.93398L19.7743 8.66603L20.5063 5.93398M11.9997 8.5V12L14.4997 14.5"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

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
    <Link
      href={href}
      prefetch={true}
      className={`font-inter flex w-full justify-between rounded-lg border border-gray-200 bg-white p-3 text-[16px] leading-normal antialiased dark:border-white/8 dark:bg-white/5 ${
        disabled
          ? "cursor-not-allowed"
          : "cursor-pointer hover:bg-gray-100/55 dark:hover:bg-white/8"
      }`}
    >
      <div>
        <p className="text-gray-1200 font-medium">{title}</p>
        <div className="inline-flex shrink-0 items-center gap-2 whitespace-nowrap text-gray-500 dark:text-gray-400">
          {!disabled && <p>{date}</p>}
          <span className="flex items-center gap-2">
            {disabled && <p>Check back later</p>}
            {disabled ? (
              <ClockIcon className="h-4 w-4" strokeWidth={2.25} />
            ) : (
              <BookIcon className="h-4 w-4" strokeWidth={2.25} />
            )}
          </span>
        </div>
      </div>
    </Link>
  )
}
