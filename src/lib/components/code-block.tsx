import { cn } from "@/lib/utils"
import { highlightCode } from "@/server/highlight"
import { Suspense, use } from "react"

const cache = new Map<string, Promise<string>>()
const MAX_CACHE_ENTRIES = 100

function getHighlightedHtml(code: string, lang: string): Promise<string> {
  const key = `${lang}\n${code}`
  const existing = cache.get(key)
  if (existing) return existing

  const pending = highlightCode({ data: { code, lang } })
  // evict rejections so one bad snippet doesn't poison later renders
  pending.catch(() => {
    if (cache.get(key) === pending) cache.delete(key)
  })
  if (cache.size >= MAX_CACHE_ENTRIES) {
    const oldest = cache.keys().next()
    if (!oldest.done) cache.delete(oldest.value)
  }
  cache.set(key, pending)
  return pending
}

function HighlightedCode({
  code,
  lang,
  className,
}: {
  code: string
  lang: string
  className?: string
}) {
  const html = use(getHighlightedHtml(code, lang))

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

export function CodeBlock({
  children: code,
  lang,
  className,
}: {
  children: string
  lang: string
  className?: string
}) {
  return (
    <Suspense
      fallback={
        <pre className={cn("font-ioskeley-mono overflow-auto text-sm", className)}>
          <code>{code}</code>
        </pre>
      }
    >
      <HighlightedCode code={code} lang={lang} className={className} />
    </Suspense>
  )
}
