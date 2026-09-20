import { createHighlighter } from "@tanstack/highlight/core"
import { tsx } from "@tanstack/highlight/languages/tsx"

// Single shared instance for server render and client hydration.
// Only tsx is registered: every snippet on the site is tsx.
export const highlighter = createHighlighter({ languages: [tsx] })

const ESCAPES: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
}

function escapeCode(code: string): string {
  return code.replace(/[&<>"]/g, (c) => ESCAPES[c] ?? c)
}

export function highlightToHtml(code: string, lang = "tsx"): string {
  try {
    return highlighter.highlight(code, { lang }).html
  } catch {
    return `<pre class="th-code"><code>${escapeCode(code)}</code></pre>`
  }
}
