"use client"

import type React from "react"

import { useEffect, useRef, useState, useCallback } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Github, Linkedin, Twitter, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { WordReveal } from "@/components/ui/text-animations"

const teamMembers = [
  {
    name: "Sahnik Biswas",
    role: "Full Stack Developer",
    intro: "Passionate about creating scalable web applications with modern technologies and clean architecture.",
    image: "/placeholder.svg?height=400&width=400",
    skills: ["React", "Node.js", "TypeScript", "AWS"],
    social: {
      github: "#",
      linkedin: "#",
      twitter: "#",
    },
    glowColor: "card-glow-blue",
  },
  {
    name: "Sankalpa Srakar",
    role: "Frontend Specialist",
    intro: "Expert in crafting beautiful, responsive user interfaces and exceptional user experiences.",
    image: "/placeholder.svg?height=400&width=400",
    skills: ["React", "Vue.js", "CSS", "Figma"],
    social: {
      github: "#",
      linkedin: "#",
      twitter: "#",
    },
    glowColor: "card-glow-green",
  },
  {
    name: "Shovon Halder",
    role: "Backend Engineer",
    intro: "Focused on building robust APIs and scalable server-side architectures with modern technologies.",
    image: "/placeholder.svg?height=400&width=400",
    skills: ["Python", "Django", "PostgreSQL", "Docker"],
    social: {
      github: "#",
      linkedin: "#",
      twitter: "#",
    },
    glowColor: "card-glow-purple",
  },
  {
    name: "Shreyas Saha",
    role: "Mobile Developer",
    intro: "Specializes in cross-platform mobile development and native app optimization for iOS and Android.",
    image: "/placeholder.svg?height=400&width=400",
    skills: ["React Native", "Flutter", "iOS", "Android"],
    social: {
      github: "#",
      linkedin: "#",
      twitter: "#",
    },
    glowColor: "card-glow-orange",
  },
]

export default function TeamSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [isFlipped, setIsFlipped] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const sectionRef = useRef<HTMLElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

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

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % teamMembers.length)
  }, [])

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + teamMembers.length) % teamMembers.length)
  }, [])

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index)
  }, [])

  useEffect(() => {
    if (isAutoPlaying) {
      intervalRef.current = setInterval(nextSlide, 4000)
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isAutoPlaying, nextSlide])

  const handleMouseEnter = () => {
    setIsAutoPlaying(false)
  }

  const handleMouseLeave = () => {
    setIsAutoPlaying(true)
    setIsFlipped(false)
  }

  const handleCardClick = () => {
    setIsFlipped(!isFlipped)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const rotateX = (y - centerY) / 20
    const rotateY = (centerX - x) / 20

    setMousePosition({ x: rotateY, y: rotateX })
  }

  const currentMember = teamMembers[currentIndex]

  return (
    <section id="team" ref={sectionRef} className="bg-secondary/30">
      <div className="container mx-auto px-4 md:px-6">
        <div
          className={`text-center mb-12 md:mb-20 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="headline-text mb-4 md:mb-6">
            <WordReveal text="Meet Our Team" delay={300} />
          </h2>
          <p className="body-text text-muted-foreground max-w-2xl mx-auto">
            <WordReveal text="Four passionate developers dedicated to bringing your ideas to life" delay={800} />
          </p>
        </div>

        <div
          className={`max-w-4xl mx-auto transition-all duration-1000 delay-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="relative">
            <div
              ref={cardRef}
              className="perspective-1000 cursor-pointer"
              onClick={handleCardClick}
              onMouseMove={handleMouseMove}
            >
              <div
                className={`relative transition-all duration-700 transform-style-3d ${isFlipped ? "rotate-y-180" : ""}`}
                style={{
                  transform: isFlipped
                    ? "rotateY(180deg)"
                    : `rotateY(${mousePosition.x}deg) rotateX(${mousePosition.y}deg)`,
                }}
              >
                {/* Front of Card */}
                <Card
                  className={`border-0 bg-background/50 backdrop-blur-sm overflow-hidden transition-all duration-500 backface-hidden ${currentMember.glowColor} ${
                    isFlipped ? "opacity-0" : "opacity-100"
                  }`}
                >
                  <CardContent className="p-0">
                    <div className="grid md:grid-cols-2 gap-0 min-h-[400px] md:min-h-[500px]">
                      {/* Image Section */}
                      <div className="relative overflow-hidden bg-gradient-to-br from-primary/5 to-primary/10">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                        <img
                          src={currentMember.image || "/placeholder.svg"}
                          alt={currentMember.name}
                          className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                        />
                        <div className="absolute bottom-3 md:bottom-6 left-3 md:left-6 right-3 md:right-6">
                          <div className="flex flex-wrap gap-1 md:gap-2">
                            {currentMember.skills.map((skill) => (
                              <span
                                key={skill}
                                className="px-2 md:px-3 py-1 bg-background/90 backdrop-blur-sm rounded-full text-xs font-medium"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Content Section */}
                      <div className="p-4 md:p-8 lg:p-12 flex flex-col justify-center">
                        <div className="space-y-4 md:space-y-6">
                          <div>
                            <h3 className="text-xl md:text-2xl lg:text-3xl font-medium mb-2 hover-text">
                              {currentMember.name}
                            </h3>
                            <p className="text-primary font-medium hover-text text-sm md:text-base">
                              {currentMember.role}
                            </p>
                          </div>

                          <p className="text-muted-foreground leading-relaxed hover-text text-sm md:text-base">
                            {currentMember.intro}
                          </p>

                          <div className="flex space-x-3 md:space-x-4">
                            <a
                              href={currentMember.social.github}
                              className="p-2 md:p-3 rounded-full bg-secondary hover:bg-secondary/80 transition-colors group hover-button"
                            >
                              <Github className="h-4 w-4 md:h-5 md:w-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                            </a>
                            <a
                              href={currentMember.social.linkedin}
                              className="p-2 md:p-3 rounded-full bg-secondary hover:bg-secondary/80 transition-colors group hover-button"
                            >
                              <Linkedin className="h-4 w-4 md:h-5 md:w-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                            </a>
                            <a
                              href={currentMember.social.twitter}
                              className="p-2 md:p-3 rounded-full bg-secondary hover:bg-secondary/80 transition-colors group hover-button"
                            >
                              <Twitter className="h-4 w-4 md:h-5 md:w-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Back of Card */}
                <Card
                  className={`border-0 bg-background/50 backdrop-blur-sm overflow-hidden absolute inset-0 transition-all duration-500 backface-hidden rotate-y-180 ${currentMember.glowColor} ${
                    isFlipped ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <CardContent className="p-4 md:p-8 lg:p-12 flex flex-col justify-center items-center h-full">
                    <div className="text-center space-y-4 md:space-y-8 max-w-md mx-auto">
                      <div className="w-16 h-16 md:w-24 md:h-24 rounded-full overflow-hidden mx-auto border-4 border-primary/20">
                        <img
                          src={currentMember.image || "/placeholder.svg"}
                          alt={currentMember.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div>
                        <h3 className="text-xl md:text-2xl lg:text-3xl font-medium mb-2 hover-text">
                          {currentMember.name}
                        </h3>
                        <p className="text-primary font-medium hover-text text-sm md:text-base">{currentMember.role}</p>
                      </div>

                      <div className="space-y-3 md:space-y-4">
                        <h4 className="font-medium hover-text text-sm md:text-base">About Me</h4>
                        <p className="text-muted-foreground leading-relaxed hover-text text-sm md:text-base">
                          {currentMember.intro}
                        </p>
                      </div>

                      <div className="space-y-3 md:space-y-4">
                        <h4 className="font-medium hover-text text-sm md:text-base">Skills</h4>
                        <div className="flex flex-wrap justify-center gap-1 md:gap-2">
                          {currentMember.skills.map((skill) => (
                            <span
                              key={skill}
                              className="px-2 md:px-3 py-1 bg-primary/10 rounded-full text-xs font-medium hover-badge"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex justify-center space-x-3 md:space-x-4">
                        <a
                          href={currentMember.social.github}
                          className="p-2 md:p-3 rounded-full bg-secondary hover:bg-secondary/80 transition-colors group hover-button"
                        >
                          <Github className="h-4 w-4 md:h-5 md:w-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                        </a>
                        <a
                          href={currentMember.social.linkedin}
                          className="p-2 md:p-3 rounded-full bg-secondary hover:bg-secondary/80 transition-colors group hover-button"
                        >
                          <Linkedin className="h-4 w-4 md:h-5 md:w-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                        </a>
                        <a
                          href={currentMember.social.twitter}
                          className="p-2 md:p-3 rounded-full bg-secondary hover:bg-secondary/80 transition-colors group hover-button"
                        >
                          <Twitter className="h-4 w-4 md:h-5 md:w-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Navigation Buttons */}
            <Button
              variant="outline"
              size="icon"
              onClick={(e) => {
                e.stopPropagation()
                prevSlide()
              }}
              className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 rounded-full bg-background/80 backdrop-blur-sm border-0 hover:bg-background hover-button z-10 h-8 w-8 md:h-10 md:w-10"
            >
              <ChevronLeft className="h-3 w-3 md:h-4 md:w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={(e) => {
                e.stopPropagation()
                nextSlide()
              }}
              className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 rounded-full bg-background/80 backdrop-blur-sm border-0 hover:bg-background hover-button z-10 h-8 w-8 md:h-10 md:w-10"
            >
              <ChevronRight className="h-3 w-3 md:h-4 md:w-4" />
            </Button>
          </div>

          {/* Pagination Dots */}
          <div className="flex justify-center mt-6 md:mt-8 space-x-2">
            {teamMembers.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 hover-button ${
                  currentIndex === index
                    ? "bg-primary w-6 md:w-8"
                    : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                }`}
              />
            ))}
          </div>

          {/* Progress Bar */}
          <div className="mt-3 md:mt-4 w-full bg-muted-foreground/20 rounded-full h-1 overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-300 ease-out"
              style={{ width: `${((currentIndex + 1) / teamMembers.length) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
