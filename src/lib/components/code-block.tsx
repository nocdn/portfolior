import { use } from "react"
import { cn } from "@/lib/utils"
import { highlightCode } from "@/server/highlight"

const cache = new Map<string, Promise<string>>()

export function CodeBlock({
  children: code,
  lang,
  className,
}: {
  children: string
  lang: string
  className?: string
}) {
  const key = `${lang}\n${code}`
  let pending = cache.get(key)
  if (!pending) {
    pending = highlightCode({ data: { code, lang } })
    cache.set(key, pending)
  }
  const html = use(pending)

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
            .shiki-code-block pre,
            .shiki-code-block code,
            .shiki-code-block pre *,
            .shiki-code-block code * {
              font-family: inherit !important;
            }
          `,
        }}
      />
      <div
        className={cn(
          "shiki-code-block font-ioskeley-mono overflow-auto text-sm [&_pre]:m-0 [&_pre]:bg-transparent [&_pre]:p-0",
          className
        )}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </>
  )
}
