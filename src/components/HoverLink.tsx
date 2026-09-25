import type { CSSProperties } from "react"

type HoverLinkProps = {
  text: string
  href: string
  hoverColor: string
  className?: string
}

export function HoverLink({ text, href, hoverColor, className = "" }: HoverLinkProps) {
  const isExternal = href.startsWith("http")

  return (
    <a
      href={href}
      {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      style={{ "--hover-color": hoverColor } as CSSProperties}
      className={`underline [text-decoration-color:color-mix(in_srgb,currentColor_35%,transparent)] underline-offset-[3px] transition-colors duration-100 [text-decoration-skip-ink:auto] hover:text-(--hover-color) hover:decoration-(--hover-color) ${className}`}
    >
      {text}
    </a>
  )
}
