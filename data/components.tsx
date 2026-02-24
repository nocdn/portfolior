export type ComponentCard = {
  previewKind: "cornered-button" | "ticker" | "animated-button"
  title: string
  description: React.ReactNode
  href: string
}

export const componentCards: ComponentCard[] = [
  {
    previewKind: "cornered-button",
    title: "Corner bordered buttons",
    description: (
      <>
        Inspired by{" "}
        <a
          href="https://x.com/aliszu/status/1955547875066142862"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-700"
        >
          @aliszu
        </a>{" "}
        and Tailwind CSS docs page. Heavily customizeable with props.
      </>
    ),
    href: "https://ui.bartoszbak.org/components/cornered-button",
  },
  {
    previewKind: "ticker",
    title: "Animated ticker",
    description: "Ticker component which smoothly animates when it's text content changes.",
    href: "https://ui.bartoszbak.org/components/ticker",
  },
  {
    previewKind: "animated-button",
    title: "Animated copy button",
    description: "A button that very smoothly transitions between it's two children.",
    href: "https://ui.bartoszbak.org/components/animated-button",
  },
]
