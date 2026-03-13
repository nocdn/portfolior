import { componentCards } from "@/data/components"
import { ArrowRightIcon, ArrowUpRight, ExternalLink } from "lucide-react"
import { SectionDesktop } from "../Section"

const fallbackCard = componentCards[0]

export function ComponentsDesktopFallback() {
  return (
    <SectionDesktop
      title="COMPONENTS"
      subtitleChildren={
        <span className="flex items-center gap-1">
          SHADCN REGISTRY{" "}
          <ArrowUpRight
            size={16}
            strokeWidth={2.75}
            className="mr-0.5 text-blue-700 opacity-40 transition-all duration-200 group-hover:opacity-60 dark:text-blue-400"
          />
        </span>
      }
      subtitleURL="https://ui.bartoszbak.org/"
      secondaryChildren={
        <div className="mr-2 flex items-center gap-2">
          <button type="button" tabIndex={-1} aria-hidden="true">
            <ArrowRightIcon className="cursor-pointer opacity-100" size={18} />
          </button>
        </div>
      }
    >
      <div>
        <div className="mr-6 flex items-center gap-3 rounded-xl">
          <div
            className="h-[100px] w-[200px] shrink-0 overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/10 dark:bg-[#1c1c1c]"
            aria-hidden="true"
          />
          <div className="mb-auto flex flex-col gap-1">
            <a
              href={fallbackCard.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group font-inter self-start text-[16.5px] antialiased"
            >
              <span className="inline-flex items-center gap-2">
                {fallbackCard.title}
                <ExternalLink
                  size={16}
                  strokeWidth={2.75}
                  className="text-blue-700 opacity-0 transition-opacity duration-200 group-hover:opacity-60 dark:text-blue-400/60"
                />
              </span>
            </a>
            <p className="font-inter mb-auto text-[15.5px] leading-normal font-[450] text-gray-700 dark:text-gray-300">
              {fallbackCard.description}
            </p>
          </div>
        </div>
      </div>
    </SectionDesktop>
  )
}
