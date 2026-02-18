"use client"

import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"
import type { BundledLanguage } from "shiki"
import { codeToHtml } from "shiki"

interface CodePreviewSwitchProps {
  children?: React.ReactNode
  code: string
  lang?: BundledLanguage
  previewClassName?: string
  codeClassName?: string
  height?: string
}

export function CodePreviewSwitch({
  children,
  code,
  lang = "tsx",
  previewClassName,
  codeClassName,
  height = "384px",
}: CodePreviewSwitchProps) {
  const [selected, setSelected] = useState<"preview" | "code">("preview")
  const [highlightedHtml, setHighlightedHtml] = useState<string>("")

  useEffect(() => {
    async function highlightCode() {
      const html = await codeToHtml(code, {
        lang,
        themes: {
          light: "github-light",
          dark: "github-dark",
        },
        defaultColor: false,
      })
      setHighlightedHtml(html)
    }

    if (code) {
      highlightCode()
    }
  }, [code, lang])

  return (
    <div className="border-shadow flex flex-col rounded-xl">
      <div
        id="header"
        className="flex h-18 items-center justify-between gap-3 border-b border-gray-200 px-4 dark:border-white/8"
      >
        <button
          onMouseDown={() => setSelected("preview")}
          className={cn(
            "w-full cursor-pointer rounded-full py-2 transition-all duration-100 select-none active:scale-99",
            selected === "preview"
              ? "bg-[#323137] text-white"
              : "bg-[#E3E3E3] dark:bg-white/8 dark:text-gray-400"
          )}
        >
          Preview
        </button>
        <button
          onMouseDown={() => setSelected("code")}
          className={cn(
            "w-full cursor-pointer rounded-full py-2 transition-all duration-100 select-none active:scale-99",
            selected === "code"
              ? "bg-[#323137] text-white"
              : "bg-[#E3E3E3] dark:bg-white/8 dark:text-gray-400"
          )}
        >
          Code
        </button>
      </div>
      <div id="content" className="overflow-auto" style={{ height: height }}>
        {selected === "preview" ? (
          <div className={cn("h-full", previewClassName)}>{children}</div>
        ) : (
          <>
            <style
              dangerouslySetInnerHTML={{
                __html: `
                  .shiki-code-preview pre,
                  .shiki-code-preview code,
                  .shiki-code-preview pre *,
                  .shiki-code-preview code * {
                    font-family: inherit !important;
                  }
                `,
              }}
            />
            <div
              className={cn(
                "shiki-code-preview font-ioskeley-mono h-full overflow-auto p-4 text-sm [&_pre]:m-0 [&_pre]:bg-transparent [&_pre]:p-0",
                codeClassName
              )}
              dangerouslySetInnerHTML={{ __html: highlightedHtml }}
            />
          </>
        )}
      </div>
    </div>
  )
}
