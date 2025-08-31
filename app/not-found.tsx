"use client"

import Link from "next/link"
import Star from "@/components/icons/star"
import { motion } from "motion/react"

export default function NotFound() {
  return (
    <div className="grid place-items-center h-screen">
      <div className="flex flex-col gap-4">
        <div className="text-[148px] font-medium font-jetbrains-mono leading-tight motion-blur-in-[2px] motion-opacity-in-0 motion-translate-y-in-[2.5%] motion-delay-100">
          404
        </div>
        <div className="font-mono text-[16px] font-semibold relative w-full flex items-center justify-between">
          <p className="font-mono motion-blur-in-[2px] motion-opacity-in-0 motion-translate-y-in-[20%] motion-delay-200">
            PAGE NOT FOUND
          </p>
          <Star
            className="w-4 h-4 motion-blur-in-[2px] motion-opacity-in-0 motion-translate-y-in-[20%] motion-delay-250"
            strokeWidth={2.35}
          />
          <Link
            href="/"
            className="font-mono text-[16px] font-semibold text-blue-700 cursor-pointer motion-blur-in-[1px] motion-opacity-in-0 motion-translate-y-in-[15%] motion-delay-300"
          >
            [HOME]
          </Link>
        </div>
      </div>
    </div>
  )
}
