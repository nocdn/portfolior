import animatedCopyButtonImage from "../public/images/copy.gif"
import cornerComponentImage from "../public/images/corner-buttons.png"
import animatedTickerImage from "../public/images/ticker.gif"

export type ComponentCard = {
  image: string
  alt: string
  title: string
  description: React.ReactNode
  href: string
  useNextImage?: boolean
}

export const componentCards: ComponentCard[] = [
  {
    image: cornerComponentImage.src,
    alt: "Corner bordered buttons",
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
    href: "https://ui.bartoszbak.org/?item=cornered-button",
    useNextImage: true,
  },
  {
    image: animatedTickerImage.src,
    alt: "Animated ticker",
    title: "Animated ticker",
    description: "Ticker component which smoothly animates when it's text content changes.",
    href: "https://ui.bartoszbak.org/?item=ticker",
  },
  {
    image: animatedCopyButtonImage.src,
    alt: "Animated copy button",
    title: "Animated copy button",
    description: "A button that very smoothly transitions between it's two children.",
    href: "https://ui.bartoszbak.org/?item=copy-button",
  },
]
