"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [clicked, setClicked] = useState(false)
  const [linkHovered, setLinkHovered] = useState(false)
  const [hidden, setHidden] = useState(true)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted || typeof window === "undefined") return

    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
      setHidden(false)
    }

    const handleMouseDown = () => setClicked(true)
    const handleMouseUp = () => setClicked(false)

    const handleLinkHoverOn = () => setLinkHovered(true)
    const handleLinkHoverOff = () => setLinkHovered(false)

    const handleMouseLeave = () => setHidden(true)
    const handleMouseEnter = () => setHidden(false)

    document.addEventListener("mousemove", updatePosition)
    document.addEventListener("mousedown", handleMouseDown)
    document.addEventListener("mouseup", handleMouseUp)
    document.addEventListener("mouseleave", handleMouseLeave)
    document.addEventListener("mouseenter", handleMouseEnter)

    const linkElements = document.querySelectorAll("a, button, [role='button']")
    linkElements.forEach((link) => {
      link.addEventListener("mouseenter", handleLinkHoverOn)
      link.addEventListener("mouseleave", handleLinkHoverOff)
    })

    return () => {
      document.removeEventListener("mousemove", updatePosition)
      document.removeEventListener("mousedown", handleMouseDown)
      document.removeEventListener("mouseup", handleMouseUp)
      document.removeEventListener("mouseleave", handleMouseLeave)
      document.removeEventListener("mouseenter", handleMouseEnter)

      linkElements.forEach((link) => {
        link.removeEventListener("mouseenter", handleLinkHoverOn)
        link.removeEventListener("mouseleave", handleLinkHoverOff)
      })
    }
  }, [mounted])

  // Don't render anything during SSR
  if (!mounted) {
    return null
  }

  const cursorClasses = cn(
    "fixed top-0 left-0 pointer-events-none z-50 transition-transform duration-100 mix-blend-difference",
    hidden && "opacity-0",
  )

  const ringClasses = cn(
    "fixed top-0 left-0 rounded-full pointer-events-none z-50 border-2 border-white mix-blend-difference transition-all duration-300",
    clicked && "scale-75 opacity-70",
    linkHovered && "scale-150 opacity-70",
    hidden && "opacity-0",
  )

  return (
    <>
      <div
        className={cursorClasses}
        style={{
          transform: `translate(${position.x - 4}px, ${position.y - 4}px)`,
        }}
      >
        <div className="w-2 h-2 bg-white rounded-full" />
      </div>
      <div
        className={ringClasses}
        style={{
          transform: `translate(${position.x - 16}px, ${position.y - 16}px)`,
          width: "32px",
          height: "32px",
        }}
      />
    </>
  )
}
