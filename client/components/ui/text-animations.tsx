"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface TypewriterProps {
  text: string
  delay?: number
  speed?: number
  className?: string
}

export function Typewriter({ text, delay = 0, speed = 50, className }: TypewriterProps) {
  const [displayText, setDisplayText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setTimeout(
      () => {
        if (currentIndex < text.length) {
          setDisplayText(text.slice(0, currentIndex + 1))
          setCurrentIndex(currentIndex + 1)
        }
      },
      delay + currentIndex * speed,
    )

    return () => clearTimeout(timer)
  }, [currentIndex, text, delay, speed])

  return (
    <span className={cn("inline-block", className)}>
      {displayText}
      <span className="animate-pulse">|</span>
    </span>
  )
}

interface WordRevealProps {
  text: string
  delay?: number
  className?: string
}

export function WordReveal({ text, delay = 0, className }: WordRevealProps) {
  const [visibleWords, setVisibleWords] = useState(0)
  const words = text.split(" ")

  useEffect(() => {
    const timer = setTimeout(
      () => {
        if (visibleWords < words.length) {
          setVisibleWords(visibleWords + 1)
        }
      },
      delay + visibleWords * 200,
    )

    return () => clearTimeout(timer)
  }, [visibleWords, words.length, delay])

  return (
    <span className={className}>
      {words.map((word, index) => (
        <span
          key={index}
          className={cn(
            "inline-block transition-all duration-500 ease-out",
            index < visibleWords ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
          )}
          style={{ transitionDelay: `${index * 100}ms` }}
        >
          {word}{" "}
        </span>
      ))}
    </span>
  )
}

interface GradientTextProps {
  text: string
  className?: string
  gradient?: string
}

export function GradientText({
  text,
  className,
  gradient = "from-primary via-purple-500 to-primary",
}: GradientTextProps) {
  return (
    <span className={cn("bg-gradient-to-r bg-clip-text text-transparent animate-gradient-x", gradient, className)}>
      {text}
    </span>
  )
}

interface TextRevealProps {
  text: string
  delay?: number
  className?: string
}

export function TextReveal({ text, delay = 0, className }: TextRevealProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, delay)

    return () => clearTimeout(timer)
  }, [delay])

  return (
    <div className={cn("overflow-hidden", className)}>
      <div
        className={cn(
          "transition-all duration-1000 ease-out",
          isVisible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0",
        )}
      >
        {text}
      </div>
    </div>
  )
}
