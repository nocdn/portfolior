import { ChevronLeft } from "lucide-react"
import { cacheLife } from "next/cache"

import Link from "@/components/link"

export default async function WritingLayout({ children }: { children: React.ReactNode }) {
  "use cache"
  cacheLife("max")

  return (
    <div className="font-inter flex w-full flex-col items-center py-20 font-[440]">
      <div className="mb-20 flex w-full max-w-2xl justify-between">
        <Link
          href="/"
          className="group ml-5 flex items-center gap-1 rounded-full bg-[#f3f3f3] py-1 pr-3.5 pl-2 text-[15px] text-[#838383] hover:bg-[#f0f0f0] md:ml-0"
        >
          <ChevronLeft
            size={16}
            className="transition-transform duration-200 ease-[cubic-bezier(0.175,0.885,0.32,1)] group-hover:-translate-x-px"
          />{" "}
          Back
        </Link>
      </div>
      <div className="w-full max-w-2xl leading-relaxed">{children}</div>
    </div>
  )
}
