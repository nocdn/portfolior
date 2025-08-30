"use client"

import { AnimatedCircularButton } from "@/components/AnimatedCircularButton"
import { Check, ChevronLeft } from "lucide-react"
import { LinkIcon } from "@/components/ui/link"
import { ArrowLeftIcon } from "@/components/ui/arrow-left"
import { useRouter } from "next/navigation"

export default function WritingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full max-w-2xl px-6 md:py-16 py-12 font-inter">
        <div className="flex justify-between mb-16">
          <AnimatedCircularButton
            ariaLabel="Go back"
            onClick={() => {
              router.back()
            }}
          >
            <ArrowLeftIcon
              className="opacity-50 group-hover:opacity-100"
              size={18}
            />
          </AnimatedCircularButton>
          <AnimatedCircularButton
            ariaLabel="Copy URL"
            secondaryChildren={
              <Check className="h-4 w-4 text-blue-800" strokeWidth={2.25} />
            }
            onClick={() => {
              navigator.clipboard.writeText(window.location.href)
            }}
          >
            <LinkIcon
              className="h-4 w-4 opacity-50 group-hover:opacity-100"
              size={16}
            />
          </AnimatedCircularButton>
        </div>
        {children}
        <div
          className="bottom-scroll-mask pointer-events-none"
          aria-hidden="true"
        />
      </div>
    </div>
  )
}
