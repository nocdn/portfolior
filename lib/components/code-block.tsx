import { cn } from "@/lib/utils"
import type { BundledLanguage } from "shiki"
import { codeToHtml } from "shiki"

interface CodeBlockProps {
  children: string
  lang: BundledLanguage
  className?: string
}

export async function CodeBlock({ children, lang, className }: CodeBlockProps) {
  const html = await codeToHtml(children, {
    lang,
    themes: {
      light: "github-light",
      dark: "github-dark",
    },
    defaultColor: false,
  })

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
