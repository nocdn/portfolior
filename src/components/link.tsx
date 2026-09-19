import { Link as RouterLink } from "@tanstack/react-router"
import { forwardRef, type ReactNode } from "react"

// Internal links prefetch on hover intent via the router's defaultPreload.
const Link = forwardRef<
  HTMLAnchorElement,
  {
    href: string
    prefetch?: boolean
    className?: string
    children?: ReactNode
  }
>(function Link({ href, prefetch, className, children }, ref) {
  return (
    <RouterLink
      ref={ref}
      to={href}
      preload={prefetch === false ? false : "intent"}
      className={className}
    >
      {children}
    </RouterLink>
  )
})

export default Link
