"use client"

import Link from "next/link"
import Star from "@/components/icons/star"
import { motion } from "motion/react"
import { useState } from "react"

export default function NotFound() {
  const [isHoveringHome, setIsHoveringHome] = useState(false)
  return (
    <div className="grid place-items-center h-screen">
      <div className="flex flex-col gap-4">
        <div className="text-[148px] font-medium font-jetbrains-mono leading-tight motion-blur-in-[2px] motion-opacity-in-0 motion-translate-y-in-[2.5%] motion-delay-100">
          404
        </div>
        <div className="font-mono text-[16px] font-[550] relative w-full flex items-center justify-between">
          <p className="font-mono motion-blur-in-[2px] motion-opacity-in-0 motion-translate-y-in-[20%] motion-delay-200">
            PAGE NOT FOUND
          </p>
          <motion.div
            whileHover={{ rotate: 135 }}
            transition={{
              duration: 1,
              ease: [0.175, 0.885, 0.32, 1],
            }}
          >
            <Star
              className="w-4 h-4 motion-blur-in-[2px] motion-opacity-in-0 motion-translate-y-in-[20%] motion-delay-250"
              strokeWidth={2.35}
            />
          </motion.div>
          <Link
            href="/"
            className="font-mono text-[16px] font-semibold text-blue-700 cursor-pointer motion-blur-in-[1px] motion-opacity-in-0 motion-translate-y-in-[15%] motion-delay-300 hover:text-blue-800 active:scale-[0.98] transition-all duration-100 ease-out active:opacity-80"
            onMouseEnter={() => setIsHoveringHome(true)}
            onMouseLeave={() => setIsHoveringHome(false)}
          >
            <motion.span
              initial={{ y: -0.5 }}
              animate={{ x: isHoveringHome ? -2 : 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              style={{
                display: "inline-block",
              }}
            >
              [
            </motion.span>
            HOME
            <motion.span
              initial={{ y: -0.5 }}
              animate={{ x: isHoveringHome ? 2 : 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              style={{ display: "inline-block" }}
            >
              ]
            </motion.span>
          </Link>
        </div>
      </div>
    </div>
  )
}
