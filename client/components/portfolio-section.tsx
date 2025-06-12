"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github, Star, Users, Calendar } from "lucide-react"
import { WordReveal } from "@/components/ui/text-animations"

const projects = [
  {
    title: "E-Commerce Platform",
    description: "A modern e-commerce solution with real-time inventory management and seamless payment integration.",
    longDescription:
      "Built with Next.js and TypeScript, featuring advanced search, real-time notifications, and comprehensive admin dashboard.",
    technologies: ["Next.js", "TypeScript", "Stripe", "PostgreSQL"],
    demoUrl: "#",
    githubUrl: "#",
    stats: {
      stars: 124,
      users: "10k+",
      duration: "3 months",
    },
    image: "/placeholder.svg?height=300&width=500",
    category: "Web Development",
    glowColor: "card-glow-blue",
  },
  {
    title: "Healthcare Management System",
    description:
      "Comprehensive healthcare platform for patient management, appointment scheduling, and medical records.",
    longDescription: "HIPAA-compliant system with real-time chat, video consultations, and integrated billing system.",
    technologies: ["React", "Node.js", "MongoDB", "Socket.io"],
    demoUrl: "#",
    githubUrl: "#",
    stats: {
      stars: 89,
      users: "5k+",
      duration: "4 months",
    },
    image: "/placeholder.svg?height=300&width=500",
    category: "Healthcare",
    glowColor: "card-glow-green",
  },
  {
    title: "AI-Powered Analytics Dashboard",
    description: "Real-time financial analytics dashboard with AI-powered insights and predictive analytics.",
    longDescription:
      "Interactive dashboard with machine learning models, real-time market data, and AI-powered insights for better decision making.",
    technologies: ["Vue.js", "Python", "TensorFlow", "Redis"],
    demoUrl: "#",
    githubUrl: "#",
    stats: {
      stars: 156,
      users: "8k+",
      duration: "2 months",
    },
    image: "/placeholder.svg?height=300&width=500",
    category: "AI/ML",
    glowColor: "card-glow-purple",
  },
  {
    title: "Smart Social Media App",
    description: "Cross-platform social media application with AI content moderation and smart recommendations.",
    longDescription:
      "Feature-rich social platform with AI-powered content curation, smart notifications, and automated moderation.",
    technologies: ["React Native", "Firebase", "GraphQL", "AWS"],
    demoUrl: "#",
    githubUrl: "#",
    stats: {
      stars: 203,
      users: "15k+",
      duration: "5 months",
    },
    image: "/placeholder.svg?height=300&width=500",
    category: "Mobile",
    glowColor: "card-glow-orange",
  },
]

export default function PortfolioSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [visibleCards, setVisibleCards] = useState<boolean[]>(new Array(projects.length).fill(false))
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
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
            const index = cardRefs.current.findIndex((ref) => ref === entry.target)
            if (index !== -1) {
              setVisibleCards((prev) => {
                const newVisible = [...prev]
                newVisible[index] = true
                return newVisible
              })
            }
          }
        })
      },
      { threshold: 0.2 },
    )

    cardRefs.current.forEach((ref) => {
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

    const rotateX = (y - centerY) / 40 // Reduced sensitivity
    const rotateY = (centerX - x) / 40 // Reduced sensitivity

    setMousePosition({ x: rotateY, y: rotateX })
  }

  return (
    <section id="portfolio" ref={sectionRef} className="bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div
          className={`text-center mb-12 md:mb-20 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="headline-text mb-4 md:mb-6 shimmer-text">
            <WordReveal text="Our Work" delay={300} />
          </h2>
          <p className="body-text text-muted-foreground max-w-2xl mx-auto animated-underline">
            <WordReveal text="Showcasing our latest projects and digital solutions" delay={800} />
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-7xl mx-auto">
          {projects.map((project, index) => {
            const isLeft = index % 2 === 0
            return (
              <div
                key={project.title}
                className={`perspective-1000 transition-all duration-1000 ${
                  visibleCards[index]
                    ? "opacity-100 translate-x-0"
                    : `opacity-0 ${isLeft ? "-translate-x-20" : "translate-x-20"}`
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
                onMouseMove={(e) => handleMouseMove(e, index)}
                ref={(el) => (cardRefs.current[index] = el)}
              >
                <Card
                  className={`border-0 bg-secondary/30 backdrop-blur-sm overflow-hidden h-full group transform-style-3d ${project.glowColor}`}
                  style={{
                    transform:
                      hoveredCard === index
                        ? `rotateY(${mousePosition.x}deg) rotateX(${mousePosition.y}deg)`
                        : "rotateY(0) rotateX(0)",
                  }}
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      className="w-full h-32 md:h-48 object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute top-2 md:top-4 right-2 md:right-4">
                      <Badge variant="secondary" className="bg-background/90 backdrop-blur-sm hover-badge text-xs">
                        {project.category}
                      </Badge>
                    </div>
                    <div className="absolute bottom-2 md:bottom-4 left-2 md:left-4 right-2 md:right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="flex items-center gap-2 md:gap-4 text-white text-xs">
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 md:h-4 md:w-4" />
                          {project.stats.stars}
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-3 w-3 md:h-4 md:w-4" />
                          {project.stats.users}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3 md:h-4 md:w-4" />
                          {project.stats.duration}
                        </div>
                      </div>
                    </div>
                  </div>

                  <CardContent className="p-4 md:p-8 flex flex-col h-full">
                    <div className="flex-1">
                      <h3 className="text-lg md:text-xl font-medium mb-2 md:mb-3 group-hover:text-primary transition-colors hover-text">
                        {project.title}
                      </h3>
                      <p className="text-muted-foreground mb-3 md:mb-4 leading-relaxed hover-text text-sm md:text-base">
                        {hoveredCard === index ? project.longDescription : project.description}
                      </p>

                      <div className="flex flex-wrap gap-1 md:gap-2 mb-4 md:mb-6">
                        {project.technologies.map((tech) => (
                          <Badge
                            key={tech}
                            variant="secondary"
                            className="text-xs font-light hover:bg-primary hover:text-primary-foreground transition-colors hover-badge"
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-2 md:gap-4 mt-auto">
                      <Button
                        variant="outline"
                        size="sm"
                        className="rounded-full flex items-center gap-1 md:gap-2 border-0 bg-secondary/50 hover:bg-primary hover:text-primary-foreground transition-all duration-300 flex-1 hover-button animated-border text-xs md:text-sm"
                      >
                        <ExternalLink className="h-3 w-3 md:h-4 md:w-4" />
                        <span className="hidden sm:inline">View Demo</span>
                        <span className="sm:hidden">Demo</span>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="rounded-full flex items-center gap-1 md:gap-2 border-0 bg-secondary/50 hover:bg-primary hover:text-primary-foreground transition-all duration-300 flex-1 hover-button animated-border text-xs md:text-sm"
                      >
                        <Github className="h-3 w-3 md:h-4 md:w-4" />
                        <span className="hidden sm:inline">Source Code</span>
                        <span className="sm:hidden">Code</span>
                      </Button>
                    </div>
                  </CardContent>

                  {/* Animated border */}
                  <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <div className="absolute inset-0 rounded-lg animate-shimmer" />
                  </div>
                </Card>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
