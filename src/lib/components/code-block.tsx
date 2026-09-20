import { useMemo } from "react"
import { highlightToHtml } from "@/lib/highlight"
import { cn } from "@/lib/utils"

export function CodeBlock({
  children: code,
  lang = "tsx",
  className,
}: {
  children: string
  lang?: string
  className?: string
}) {
  const html = useMemo(() => highlightToHtml(code, lang), [code, lang])

  return (
    <div
      className={cn("font-ioskeley-mono overflow-auto text-sm [&_pre]:m-0", className)}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
