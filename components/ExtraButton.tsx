"use client"

import { useRef, useState, useEffect } from "react"

export function ExtraButton() {
  const ref = useRef<HTMLDivElement>(null)
  const [opacity, setOpacity] = useState(0)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current) return

      const rect = ref.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      const distance = Math.sqrt(
        Math.pow(centerX - e.clientX, 2) + Math.pow(centerY - e.clientY, 2)
      )

      const maxDistance = 300 // a value to tweak
      const newOpacity = Math.max(0, 1 - distance / maxDistance)

      setOpacity(newOpacity)
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return (
    
  )
}
