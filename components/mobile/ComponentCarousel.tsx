"use client"
import Image from "next/image"
import { useEffect, useRef } from "react"
import cornerComponentImage from "../../public/images/corner-buttons.png"

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
        href="https://ui.shadcn.com/docs/components/animated-spinner"
        target="_blank"
      >
        <img
          src="https://oiszjiwtfc65cwa2.public.blob.vercel-storage.com/work-previews/oklch-colors-new.png"
          alt="OKLCH colors"
          className="w-full h-auto rounded-xl border border-gray-200"
        />
        <div className="flex flex-col gap-1 mb-auto">
          <p className="self-start font-inter text-[16.5px]">
            Animated spinners
          </p>
          <p className="mb-auto text-[15.5px] font-inter font-[450] text-gray-700 leading-normal">
            Custom recreation of the default iOS spinner, built for Svelte and
            React.
          </p>
        </div>
      </a>
      <div
        className="flex flex-col gap-3 cursor-pointer w-full min-w-full flex-shrink-0 snap-center px-0.5"
        onClick={() =>
          window.open(
            "https://ui.bartoszbak.org/docs/cornered-button",
            "_blank"
          )
        }
      >
        <Image
          src={cornerComponentImage.src}
          alt="Corner bordered buttons"
          width={2000}
          height={1000}
          className="w-full h-auto rounded-xl border border-gray-200 px-8 py-4 object-contain"
        />
        <div className="flex flex-col gap-1 mb-auto">
          <p className="self-start font-inter text-[16.5px]">
            Corner bordered buttons
          </p>
          <p className="mb-auto text-[15.5px] font-inter font-[450] text-gray-700 leading-normal">
            Inspired by{" "}
            <a
              href="https://www.twitter.com/aliszu"
              target="_blank"
              className="text-blue-700"
            >
              @aliszu
            </a>{" "}
            and Tailwind CSS docs page. Heavily customizeable with props.
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-3 w-full min-w-full flex-shrink-0 snap-center px-0.5">
        <div className="w-full h-[180px] rounded-xl border border-dashed border-gray-300 flex items-center justify-center bg-gray-50">
          <p className="text-gray-600 font-inter text-[15.5px]">
            More components coming soon
          </p>
        </div>
        <div className="flex flex-col gap-1 mb-auto">
          <p className="self-start font-inter text-[16.5px]">Coming soon</p>
          <p className="mb-auto text-[15.5px] font-inter font-[450] text-gray-700 leading-normal">
            A growing collection of interactive UI components.
          </p>
        </div>
      </div>
    </div>
  )
}
