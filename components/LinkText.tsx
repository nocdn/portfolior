import type { ReactNode } from "react"

import { ArrowExternalLink } from "@/icons/arrowExternal"

export const LinkText = ({
  url,
  children,
  className,
}: {
  url: string
  children: ReactNode
  className?: string
}) => {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center ${className ?? ""}`}
    >
      {children} <ArrowExternalLink className="ml-0.5 translate-y-px" />
    </a>
  )
}
