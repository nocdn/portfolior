import { createServerFn } from "@tanstack/react-start"
import type { BundledLanguage } from "shiki"

// Shiki stays server-only: this module is split by the Start compiler, so the
// client only ever sees an RPC stub. GET makes repeated blocks edge-cacheable.
export const highlightCode = createServerFn({ method: "GET" })
  .validator((data: unknown) => {
    if (typeof data !== "object" || data === null) throw new Error("bad input")
    const { code, lang } = data as { code?: unknown; lang?: unknown }
    if (typeof code !== "string" || typeof lang !== "string" || code.length > 20000) {
      throw new Error("bad input")
    }
    return { code, lang }
  })
  .handler(async ({ data }) => {
    // Singleton highlighter (cached across calls) with the JavaScript regex
    // engine: no WASM, so highlighting works in every runtime (local dev,
    // edge workers). Note: `engine` is only honored here, not by the
    // standalone codeToHtml shorthand.
    const { getSingletonHighlighter, createJavaScriptRegexEngine } = await import("shiki")
    const highlighter = await getSingletonHighlighter({
      themes: ["github-light", "github-dark"],
      langs: ["tsx", "ts", "jsx", "js", "json", "bash", "css"],
      engine: createJavaScriptRegexEngine(),
    })
    return highlighter.codeToHtml(data.code, {
      lang: data.lang as BundledLanguage,
      themes: {
        light: "github-light",
        dark: "github-dark",
      },
      defaultColor: false,
    })
  })
