import Image from "next/image"
import cornerComponentImage from "../../public/images/corner-buttons.png"

export function MobileComponentCarousel() {
  return (
    <div
      className="w-full snap-x snap-mandatory overflow-x-scroll flex scroll-smooth"
      style={{
        scrollbarWidth: "none",
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
    </div>
  )
}
