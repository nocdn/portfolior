import type { ReactNode } from "react"

import Link from "@/components/link"
import { ArrowExternalLink } from "@/icons/arrowExternal"

export const LinkText = ({
  url,
  children,
  className,
  iconClassName,
}: {
  url: string
  children: ReactNode
  className?: string
  iconClassName?: string
}) => {
  const classes = `inline-flex items-center dark:text-white ${className ?? ""}`
  const content = (
    <>
      {children} <ArrowExternalLink className={`ml-0.5 translate-y-px ${iconClassName ?? ""}`} />
    </>
  )

  // Site paths go through the router so they preload on hover and stay in the tab.
  if (url.startsWith("/")) {
    return (
      <Link href={url} className={classes}>
        {content}
      </Link>
    )
  }

  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className={classes}>
      {content}
    </a>
  )
}
