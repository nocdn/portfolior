import { useEffect, useRef, useState, type CSSProperties, type MouseEvent } from "react"
import { TextMorph } from "torph/react"

// Same link treatment as HoverLink, but the text is Torph-morph managed.
// The underline lives in styles.css on the glyph spans (ancestor
// text-decoration can't propagate through Torph's nested inline-blocks);
// `inline-block` + `align-baseline!` + `font-kerning: none` pre-match the
// post-mount geometry so the line never shifts when the controller
// segments the SSR text.
//
// Clicking copies the address instead of opening a mail client: the text
// morphs to "copied" for 1s, then back to "copy" (still hovered) or
// "email" (left).
const EMAIL = "contact@bartoszbak.org"

async function copyEmail() {
  try {
    await navigator.clipboard.writeText(EMAIL)
    return true
  } catch {
    // Fallback for non-secure contexts or denied permission.
    const ta = document.createElement("textarea")
    ta.value = EMAIL
    ta.style.position = "fixed"
    ta.style.opacity = "0"
    document.body.appendChild(ta)
    ta.select()
    let ok = false
    try {
      ok = document.execCommand("copy")
    } catch {
      ok = false
    }
    ta.remove()
    return ok
  }
}

export function EmailCopy() {
  const [hovered, setHovered] = useState(false)
  const [copied, setCopied] = useState(false)
  const timer = useRef<number | null>(null)

  useEffect(() => {
    return () => {
      if (timer.current !== null) window.clearTimeout(timer.current)
    }
  }, [])

  const handleClick = async (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    if (!(await copyEmail())) return
    setCopied(true)
    if (timer.current !== null) window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setCopied(false), 1000)
  }

  return (
    <a
      href={`mailto:${EMAIL}`}
      style={{ "--hover-color": "#000000" } as CSSProperties}
      className="transition-colors duration-100 hover:text-(--hover-color)"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={handleClick}
    >
      <TextMorph className="email-torph inline-block align-baseline! [font-kerning:none] [font-variant-ligatures:none]">
        {copied ? "copied" : hovered ? "copy" : "email"}
      </TextMorph>
    </a>
  )
}
