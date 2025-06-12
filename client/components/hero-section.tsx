"use client"

import { useEffect, useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { ArrowDown, Code, Smartphone, Brain, Bot, Database, Cloud } from "lucide-react"
import { WordReveal, GradientText } from "@/components/ui/text-animations"

const floatingCards = [
  { icon: Code, title: "Web Dev", gradient: "from-blue-500 to-purple-600", delay: 0 },
  { icon: Smartphone, title: "Mobile", gradient: "from-green-500 to-blue-500", delay: 200 },
  { icon: Brain, title: "AI/ML", gradient: "from-purple-500 to-pink-600", delay: 400 },
  { icon: Bot, title: "Automation", gradient: "from-orange-500 to-red-500", delay: 600 },
  { icon: Database, title: "Database", gradient: "from-cyan-500 to-blue-600", delay: 800 },
  { icon: Cloud, title: "Cloud", gradient: "from-indigo-500 to-purple-600", delay: 1000 },
]

export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [cardsAnimated, setCardsAnimated] = useState(false)
  const [windowSize, setWindowSize] = useState({ width: 1200, height: 800 })
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    // Set initial window size
    if (typeof window !== "undefined") {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })

      const handleResize = () => {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        })
      }

      window.addEventListener("resize", handleResize)
      return () => window.removeEventListener("resize", handleResize)
    }
  }, [])

  useEffect(() => {
    setIsVisible(true)

    const handleScroll = () => {
      // Trigger cards animation when user starts scrolling
      if (typeof window !== "undefined" && window.scrollY > 100 && !cardsAnimated) {
        setCardsAnimated(true)
      }
    }

    if (typeof window !== "undefined") {
      window.addEventListener("scroll", handleScroll)
      return () => window.removeEventListener("scroll", handleScroll)
    }
  }, [cardsAnimated])

  const scrollToServices = () => {
    const element = document.getElementById("services")
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const getCardPosition = (index: number) => {
    const { width, height } = windowSize

    const positions = [
      // Top corners - far from center
      { x: 50, y: 50 }, // Top left
      { x: Math.max(width - 150, 200), y: 80 }, // Top right
      // Bottom corners - far from center
      { x: 80, y: Math.max(height - 200, 400) }, // Bottom left
      { x: Math.max(width - 120, 200), y: Math.max(height - 150, 400) }, // Bottom right
      // Side positions - middle height but far from center
      { x: 30, y: height * 0.4 }, // Left side
      { x: Math.max(width - 100, 200), y: height * 0.6 }, // Right side
    ]
    return positions[index] || { x: 100, y: 100 }
  }

  const getFloatingAnimation = (index: number, cardsAnimated: boolean) => {
    if (!cardsAnimated) return {}

    return {
      animationName: `float-${index}`,
      animationDuration: "4s",
      animationTimingFunction: "ease-in-out",
      animationIterationCount: "infinite",
      animationDelay: `${index * 0.5}s`,
    }
  }

  return (
    <section
      id="home"
      ref={sectionRef}
      className="min-h-[90vh] flex items-center justify-center relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-background to-background/95" />

      {/* Floating Background Cards */}
      <div className="absolute inset-0 pointer-events-none">
        {floatingCards.map((card, index) => {
          const IconComponent = card.icon
          const isLeft = index % 2 === 0
          const baseX = isLeft ? -200 : windowSize.width + 200
          const position = getCardPosition(index)

          return (
            <div
              key={card.title}
              className={`absolute transition-all duration-2000 ease-out ${
                cardsAnimated ? "opacity-15" : "opacity-5 blur-sm"
              }`}
              style={{
                left: cardsAnimated ? `${position.x}px` : `${baseX}px`,
                top: `${position.y}px`,
                transitionDelay: `${card.delay}ms`,
                zIndex: 1,
                ...getFloatingAnimation(index, cardsAnimated),
              }}
            >
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${card.gradient} p-3 shadow-lg backdrop-blur-sm`}>
                <IconComponent className="w-full h-full text-white" />
              </div>
              <p className="text-xs text-center mt-1 font-medium text-muted-foreground">{card.title}</p>
            </div>
          )
        })}
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div
          className={`text-center max-w-5xl mx-auto transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h1 className="display-text mb-8">
            <WordReveal text="We build powerful" delay={500} className="shimmer-text" />
            <span className="block mt-2">
              <GradientText
                text="digital solutions"
                gradient="from-primary via-blue-600 to-purple-600"
                className="animate-gradient-x shimmer-text"
              />
            </span>
          </h1>

          <div
            className={`transition-all duration-1000 delay-1500 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <p className="body-text text-muted-foreground mb-12 max-w-2xl mx-auto">
              <WordReveal text="with simplicity at heart" delay={2000} className="animated-underline" />
            </p>
          </div>

          <div
            className={`flex flex-col sm:flex-row gap-6 justify-center items-center transition-all duration-1000 delay-2500 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <Button
              onClick={scrollToServices}
              className="apple-button bg-primary text-primary-foreground hover:opacity-90 animate-glow hover-button animated-border"
              size="lg"
            >
              Explore Our Work
            </Button>
            <Button
              variant="outline"
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              className="apple-button bg-transparent border-0 hover:bg-secondary hover-button"
              size="lg"
            >
              Get In Touch
            </Button>
          </div>
        </div>
      </div>

      <div
        className={`absolute bottom-12 left-1/2 transform -translate-x-1/2 transition-all duration-1000 delay-3000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <button
          onClick={scrollToServices}
          className="animate-bounce p-2 rounded-full hover:bg-secondary/50 transition-colors animate-float hover-button"
          aria-label="Scroll down"
        >
          <ArrowDown className="h-6 w-6 text-muted-foreground" />
        </button>
      </div>
    </section>
  )
}
