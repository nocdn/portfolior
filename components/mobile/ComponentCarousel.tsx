"use client"
import { useEffect, useRef } from "react"
import cornerComponentImage from "../../public/images/corner-buttons.png"
import animatedTickerImage from "../../public/images/ticker.gif"
import animatedCopyButtonImage from "../../public/images/copy.gif"

type MobileComponentCarouselProps = {
  activeIndex: number
  onActiveIndexChange?: (index: number) => void
}

export function MobileComponentCarousel({
  activeIndex,
  onActiveIndexChange,
}: MobileComponentCarouselProps) {
  const scrollerRef = useRef<HTMLDivElement | null>(null)
  const updateSourceRef = useRef<"idle" | "scroll" | "external">("idle")
  const rafIdRef = useRef<number | null>(null)
  const SLIDE_COUNT = 3

  useEffect(() => {
    const scroller = scrollerRef.current
    if (!scroller) return
    // If the update came from user scroll, don't programmatically scroll back
    if (updateSourceRef.current === "scroll") {
      updateSourceRef.current = "idle"
      return
    }
    const width = scroller.offsetWidth
    const target = Math.max(0, Math.min(SLIDE_COUNT - 1, activeIndex)) * width
    scroller.scrollTo({ left: target, behavior: "smooth" })
    updateSourceRef.current = "idle"
  }, [activeIndex])

  function handleScroll() {
    const scroller = scrollerRef.current
    if (!scroller) return
    if (rafIdRef.current != null) cancelAnimationFrame(rafIdRef.current)
    rafIdRef.current = requestAnimationFrame(() => {
      const width = scroller.offsetWidth || 1
      const index = Math.round(scroller.scrollLeft / width)
      const clamped = Math.max(0, Math.min(SLIDE_COUNT - 1, index))
      if (onActiveIndexChange && clamped !== activeIndex) {
        updateSourceRef.current = "scroll"
        onActiveIndexChange(clamped)
      }
    })
  }

  return (
    <div
      ref={scrollerRef}
      onScroll={handleScroll}
      className="w-full snap-x snap-mandatory overflow-x-scroll flex scroll-smooth"
      style={{
        scrollbarWidth: "none",
        WebkitOverflowScrolling: "touch",
      }}
    >
      <a
        className="flex flex-col gap-3 cursor-pointer w-full min-w-full flex-shrink-0 snap-center px-0.5"
        href="https://ui.bartoszbak.org/?item=cornered-button"
        target="_blank"
      >
        <div className="relative w-full aspect-[2/1] rounded-xl border border-gray-200 bg-white overflow-hidden p-12.5">
          <img
            src={cornerComponentImage.src}
            alt="Corner bordered buttons"
            className="w-full h-full object-contain"
            loading="lazy"
          />
        </div>
        <div className="flex flex-col gap-1 mb-auto">
          <p className="self-start font-inter text-[16.5px]">
            Corner bordered buttons
          </p>
          <p className="mb-auto text-[15.5px] font-inter font-[450] text-gray-700 leading-normal">
            Inspired by{" "}
            <span className="text-blue-700">@aliszu</span> and Tailwind CSS docs
            page. Heavily customizeable with props.
          </p>
        </div>
      </a>
      <a
        className="flex flex-col gap-3 cursor-pointer w-full min-w-full flex-shrink-0 snap-center px-0.5"
        href="https://ui.bartoszbak.org/?item=ticker"
        target="_blank"
      >
        <div className="relative w-full aspect-[2/1] rounded-xl border border-gray-200 bg-white overflow-hidden">
          <img
            src={animatedTickerImage.src}
            alt="Animated ticker"
            className="w-full h-full object-contain"
            loading="lazy"
          />
        </div>
        <div className="flex flex-col gap-1 mb-auto">
          <p className="self-start font-inter text-[16.5px]">Animated ticker</p>
          <p className="mb-auto text-[15.5px] font-inter font-[450] text-gray-700 leading-normal">
            Ticker component which smoothly animates when it's text content
            changes.
          </p>
        </div>
      </a>
      <a
        className="flex flex-col gap-3 cursor-pointer w-full min-w-full flex-shrink-0 snap-center px-0.5"
        href="https://ui.bartoszbak.org/?item=copy-button"
        target="_blank"
      >
        <div className="relative w-full aspect-[2/1] rounded-xl border border-gray-200 bg-white overflow-hidden">
          <img
            src={animatedCopyButtonImage.src}
            alt="Animated copy button"
            className="w-full h-full object-contain"
            loading="lazy"
          />
        </div>
        <div className="flex flex-col gap-1 mb-auto">
          <p className="self-start font-inter text-[16.5px]">
            Animated copy button
          </p>
          <p className="mb-auto text-[15.5px] font-inter font-[450] text-gray-700 leading-normal">
            A button that very smoothly transitions between it's two children.
          </p>
        </div>
      </a>
    </div>
  )
}
