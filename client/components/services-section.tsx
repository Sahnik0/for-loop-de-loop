"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { WordReveal } from "@/components/ui/text-animations"
import { Monitor, Smartphone, Database, Cloud, Palette, Zap, Brain, Bot } from "lucide-react"

const services = [
  {
    title: "Fullstack Web Development",
    description:
      "Modern, responsive web applications built with cutting-edge technologies like React, Next.js, and Node.js.",
    features: ["Next.js & React", "Node.js & Express", "Database Design", "API Development", "Cloud Deployment"],
    icon: Monitor,
    gradient: "from-blue-500 to-purple-600",
  },
  {
    title: "Mobile App Development",
    description:
      "Native and cross-platform mobile applications that deliver exceptional user experiences across all devices.",
    features: ["React Native", "iOS & Android", "Cross-platform", "App Store Deployment", "Performance Optimization"],
    icon: Smartphone,
    gradient: "from-green-500 to-blue-500",
  },
  {
    title: "AI & Machine Learning",
    description:
      "Intelligent solutions powered by artificial intelligence and machine learning to automate processes and gain insights.",
    features: [
      "Custom AI Models",
      "Data Analytics",
      "Predictive Analytics",
      "Natural Language Processing",
      "Computer Vision",
    ],
    icon: Brain,
    gradient: "from-purple-500 to-pink-600",
  },
  {
    title: "AI Integration & Automation",
    description: "Seamlessly integrate AI capabilities into existing systems and automate complex business processes.",
    features: [
      "AI API Integration",
      "Workflow Automation",
      "Chatbots & Virtual Assistants",
      "Document Processing",
      "Smart Analytics",
    ],
    icon: Bot,
    gradient: "from-orange-500 to-red-500",
  },
]

const additionalServices = [
  { icon: Database, title: "Database Design", description: "Scalable database architecture" },
  { icon: Cloud, title: "Cloud Deployment", description: "AWS, Vercel, and more" },
  { icon: Palette, title: "UI/UX Design", description: "Beautiful, intuitive interfaces" },
  { icon: Zap, title: "Performance Optimization", description: "Lightning-fast applications" },
]

export default function ServicesSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [visibleCards, setVisibleCards] = useState<boolean[]>(new Array(services.length).fill(false))
  const [visibleAdditionalCards, setVisibleAdditionalCards] = useState<boolean[]>(
    new Array(additionalServices.length).fill(false),
  )
  const [hoveredService, setHoveredService] = useState<number | null>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const additionalCardRefs = useRef<(HTMLDivElement | null)[]>([])
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const cardObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const mainIndex = cardRefs.current.findIndex((ref) => ref === entry.target)
            const additionalIndex = additionalCardRefs.current.findIndex((ref) => ref === entry.target)

            if (mainIndex !== -1) {
              setVisibleCards((prev) => {
                const newVisible = [...prev]
                newVisible[mainIndex] = true
                return newVisible
              })
            }

            if (additionalIndex !== -1) {
              setVisibleAdditionalCards((prev) => {
                const newVisible = [...prev]
                newVisible[additionalIndex] = true
                return newVisible
              })
            }
          }
        })
      },
      { threshold: 0.3 },
    )

    cardRefs.current.forEach((ref) => {
      if (ref) cardObserver.observe(ref)
    })

    additionalCardRefs.current.forEach((ref) => {
      if (ref) cardObserver.observe(ref)
    })

    return () => cardObserver.disconnect()
  }, [])

  const handleMouseMove = (e: React.MouseEvent, index: number) => {
    if (!cardRefs.current[index]) return

    const rect = cardRefs.current[index]!.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const rotateX = (y - centerY) / 50 // Reduced sensitivity
    const rotateY = (centerX - x) / 50 // Reduced sensitivity

    setMousePosition({ x: rotateY, y: rotateX })
  }

  const getRevealAnimation = (index: number, isVisible: boolean) => {
    const animations = [
      // Card 0: Scale up from center with rotation
      isVisible ? "opacity-100 scale-100 rotate-0" : "opacity-0 scale-75 rotate-6",
      // Card 1: Slide up with bounce effect
      isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12",
      // Card 2: Slide from left with fade
      isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12",
      // Card 3: Slide from right with scale and rotation
      isVisible ? "opacity-100 translate-x-0 scale-100 rotate-0" : "opacity-0 translate-x-12 scale-90 -rotate-3",
    ]
    return animations[index] || (isVisible ? "opacity-100" : "opacity-0")
  }

  const getCardHoverEffect = (index: number, isHovered: boolean) => {
    if (!isHovered) return ""

    const effects = [
      "shadow-2xl shadow-blue-500/20 border-blue-500/30",
      "shadow-2xl shadow-green-500/20 border-green-500/30",
      "shadow-2xl shadow-purple-500/20 border-purple-500/30",
      "shadow-2xl shadow-orange-500/20 border-orange-500/30",
    ]
    return effects[index] || ""
  }

  return (
    <section id="services" ref={sectionRef} className="bg-secondary/30">
      <div className="container mx-auto px-6">
        <div
          className={`text-center mb-20 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="headline-text mb-6 shimmer-text">
            <WordReveal text="Our Services" delay={300} />
          </h2>
          <p className="body-text text-muted-foreground max-w-2xl mx-auto animated-underline">
            <WordReveal text="We specialize in creating digital solutions that drive business growth" delay={800} />
          </p>
        </div>

        {/* Main Services */}
        <div className="grid md:grid-cols-2 gap-12 max-w-7xl mx-auto mb-16">
          {services.map((service, index) => {
            const IconComponent = service.icon
            const isHovered = hoveredService === index
            return (
              <div
                key={service.title}
                className={`perspective-1000 transition-all duration-1000 ease-out ${getRevealAnimation(
                  index,
                  visibleCards[index],
                )}`}
                style={{ transitionDelay: `${index * 150}ms` }}
                onMouseEnter={() => setHoveredService(index)}
                onMouseLeave={() => setHoveredService(null)}
                onMouseMove={(e) => handleMouseMove(e, index)}
                ref={(el) => (cardRefs.current[index] = el)}
              >
                <Card
                  className={`border-0 bg-background/50 backdrop-blur-sm h-full transition-all duration-500 group transform-style-3d border ${getCardHoverEffect(
                    index,
                    isHovered,
                  )}`}
                  style={{
                    transform:
                      hoveredService === index
                        ? `rotateY(${mousePosition.x}deg) rotateX(${mousePosition.y}deg) translateZ(20px)`
                        : "rotateY(0) rotateX(0) translateZ(0)",
                  }}
                >
                  <CardContent className="p-10 flex flex-col h-full relative overflow-hidden">
                    {/* Animated background gradient */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-r ${service.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                    />

                    {/* Floating particles effect */}
                    {isHovered && (
                      <div className="absolute inset-0 pointer-events-none">
                        {[...Array(6)].map((_, i) => (
                          <div
                            key={i}
                            className="absolute w-1 h-1 bg-primary rounded-full animate-float"
                            style={{
                              left: `${20 + i * 15}%`,
                              top: `${30 + (i % 3) * 20}%`,
                              animationDelay: `${i * 0.2}s`,
                              animationDuration: `${2 + i * 0.3}s`,
                            }}
                          />
                        ))}
                      </div>
                    )}

                    <div className="mb-6 relative z-10">
                      <div
                        className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${service.gradient} p-4 mb-4 transition-all duration-500 ${
                          isHovered ? "scale-110 rotate-12 shadow-lg" : "scale-100 rotate-0"
                        }`}
                      >
                        <IconComponent className="w-full h-full text-white" />
                      </div>
                      <h3
                        className={`text-2xl font-medium mb-4 transition-all duration-300 hover-text ${
                          isHovered ? "text-primary transform translate-x-2" : ""
                        }`}
                      >
                        {service.title}
                      </h3>
                      <p
                        className={`text-muted-foreground mb-8 leading-relaxed hover-text transition-all duration-300 ${
                          isHovered ? "transform translate-x-1" : ""
                        }`}
                      >
                        {service.description}
                      </p>
                    </div>
                    <ul className="space-y-3 mt-auto relative z-10">
                      {service.features.map((feature, featureIndex) => (
                        <li
                          key={feature}
                          className={`flex items-center text-sm transition-all duration-300 hover-text ${
                            isHovered ? "translate-x-3" : ""
                          }`}
                          style={{ transitionDelay: `${featureIndex * 50}ms` }}
                        >
                          <div
                            className={`w-1 h-1 bg-primary rounded-full mr-3 transition-all duration-300 ${
                              isHovered ? "scale-150 shadow-sm shadow-primary" : ""
                            }`}
                          />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    {/* Animated border */}
                    <div
                      className={`absolute inset-0 rounded-lg transition-opacity duration-300 ${
                        isHovered ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      <div className="absolute inset-0 rounded-lg animate-shimmer" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            )
          })}
        </div>

        {/* Additional Services */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {additionalServices.map((service, index) => {
            const IconComponent = service.icon
            return (
              <div
                key={service.title}
                className={`transition-all duration-700 ${
                  visibleAdditionalCards[index]
                    ? "opacity-100 translate-y-0 scale-100"
                    : "opacity-0 translate-y-4 scale-95"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
                ref={(el) => (additionalCardRefs.current[index] = el)}
              >
                <Card className="border-0 bg-background/30 backdrop-blur-sm hover:bg-background/50 transition-all duration-300 group hover-button relative overflow-hidden">
                  <CardContent className="p-6 text-center relative z-10">
                    <div className="relative">
                      <IconComponent className="w-8 h-8 mx-auto mb-3 text-primary group-hover:scale-110 transition-transform duration-300" />
                      {/* Ripple effect on hover */}
                      <div className="absolute inset-0 bg-primary/10 rounded-full scale-0 group-hover:scale-150 transition-transform duration-500 opacity-0 group-hover:opacity-100" />
                    </div>
                    <h4 className="font-medium mb-2 text-sm hover-text">{service.title}</h4>
                    <p className="text-xs text-muted-foreground hover-text">{service.description}</p>
                  </CardContent>

                  {/* Animated background */}
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Card>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
