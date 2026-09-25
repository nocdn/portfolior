const rippleMask =
  "radial-gradient(circle, rgba(0, 0, 0, 0.08) 0%, rgba(0, 0, 0, 0.16) 34%, rgba(0, 0, 0, 0.95) 55%, rgba(0, 0, 0, 0.45) 74%, transparent 90%)"

export type RippleColors = { body: string; heading: string; muted: string }

export function rippleText(
  main: HTMLElement,
  clientX: number,
  clientY: number,
  colors: RippleColors,
  onFinish: () => void
) {
  const parent = main.parentElement
  if (!parent) return () => {}

  // A short-lived, inert copy preserves the exact wrapping and typography of
  // every text node, including article dates and exploration descriptions.
  // It is out of flow, so it cannot shift the real page. Remove media sources
  // before insertion so the copy cannot request videos or images again.
  const overlay = main.cloneNode(true) as HTMLElement
  overlay.classList.add("text-ripple-overlay")
  overlay.setAttribute("aria-hidden", "true")
  overlay.inert = true
  overlay.querySelectorAll("[id]").forEach((element) => element.removeAttribute("id"))
  overlay.querySelectorAll("[src], [srcset], [poster]").forEach((element) => {
    element.removeAttribute("src")
    element.removeAttribute("srcset")
    element.removeAttribute("poster")
  })

  const bounds = main.getBoundingClientRect()
  const parentBounds = parent.getBoundingClientRect()
  const x = clientX - bounds.left
  const y = clientY - bounds.top
  const radius = Math.hypot(Math.max(x, bounds.width - x), Math.max(y, bounds.height - y))

  Object.assign(overlay.style, {
    position: "absolute",
    left: `${bounds.left - parentBounds.left}px`,
    top: `${bounds.top - parentBounds.top}px`,
    width: `${bounds.width}px`,
    margin: "0",
    pointerEvents: "none",
    opacity: "0",
    zIndex: "1",
    maskImage: rippleMask,
    webkitMaskImage: rippleMask,
    maskRepeat: "no-repeat",
    webkitMaskRepeat: "no-repeat",
    maskSize: "0px 0px",
    webkitMaskSize: "0px 0px",
    willChange: "opacity, mask-position, mask-size",
  })
  overlay.style.setProperty("--ripple-body", colors.body)
  overlay.style.setProperty("--ripple-heading", colors.heading)
  overlay.style.setProperty("--ripple-muted", colors.muted)
  parent.appendChild(overlay)

  const frame = (scale: number, opacity: number, offset?: number): Keyframe => {
    const scaledRadius = radius * scale
    const position = `${x - scaledRadius}px ${y - scaledRadius}px`
    const size = `${scaledRadius * 2}px ${scaledRadius * 2}px`
    return {
      opacity,
      offset,
      maskPosition: position,
      maskSize: size,
      webkitMaskPosition: position,
      webkitMaskSize: size,
    }
  }

  const animation = overlay.animate(
    [frame(0.05, 0), frame(0.12, 1, 0.08), frame(1, 0.95, 0.82), frame(1.08, 0)],
    // The example's ease-out crosses a 455px illustration nicely, but races
    // through a full page. Keep the ring's appearance and give it a steady
    // travel speed so headings and article rows are visibly reached in turn.
    { duration: Math.max(1050, radius * 1.15), easing: "linear" }
  )
  animation.finished.then(
    () => {
      overlay.remove()
      onFinish()
    },
    () => overlay.remove()
  )

  return () => {
    animation.cancel()
    overlay.remove()
  }
}
