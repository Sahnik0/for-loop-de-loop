"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { QuoteIcon } from "lucide-react"

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "CEO, TechStart Inc.",
    content:
      "The team at for loop de loop delivered an exceptional e-commerce platform that exceeded our expectations. Their attention to detail and technical expertise is unmatched.",
    glowColor: "card-glow-blue",
  },
  {
    name: "Michael Chen",
    role: "Product Manager, HealthTech Solutions",
    content:
      "Working with this team was a game-changer for our healthcare platform. They understood our complex requirements and delivered a scalable, user-friendly solution.",
    glowColor: "card-glow-green",
  },
  {
    name: "Emily Rodriguez",
    role: "Founder, FinanceFlow",
    content:
      "The financial dashboard they built for us has transformed how we analyze data. The real-time features and intuitive design have impressed all our stakeholders.",
    glowColor: "card-glow-purple",
  },
  {
    name: "David Thompson",
    role: "CTO, SocialConnect",
    content:
      "Their mobile app development skills are outstanding. The cross-platform app they created performs flawlessly and our users love the experience.",
    glowColor: "card-glow-orange",
  },
]

export default function TestimonialsSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const sectionRef = useRef<HTMLElement>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const carouselApiRef = useRef<any>(null)

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
    if (carouselApiRef.current) {
      carouselApiRef.current.scrollNext()
    }
  }, [])

  useEffect(() => {
    if (isAutoPlaying) {
      intervalRef.current = setInterval(nextSlide, 5000)
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

  const handleMouseEnter = () => setIsAutoPlaying(false)
  const handleMouseLeave = () => setIsAutoPlaying(true)

  return (
    <section id="testimonials" ref={sectionRef} className="bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div
          className={`text-center mb-12 md:mb-20 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="headline-text mb-4 md:mb-6 shimmer-text">What Our Clients Say</h2>
          <p className="body-text text-muted-foreground max-w-2xl mx-auto animated-underline">
            Don't just take our word for it - hear from our satisfied clients
          </p>
        </div>

        <div
          className={`max-w-5xl mx-auto transition-all duration-1000 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <Carousel
            opts={{
              align: "center",
              loop: true,
            }}
            className="w-full"
            setApi={(api) => {
              carouselApiRef.current = api
            }}
            onSelect={(api) => {
              if (api) {
                setActiveIndex(api.selectedScrollSnap())
              }
            }}
          >
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={testimonial.name}>
                  <div className="p-1">
                    <Card
                      className={`border-0 bg-secondary/30 backdrop-blur-sm transform-style-3d hover-button ${testimonial.glowColor}`}
                    >
                      <CardContent className="p-6 md:p-10 text-center">
                        <QuoteIcon className="h-8 w-8 md:h-10 md:w-10 mx-auto mb-4 md:mb-6 text-primary/20" />
                        <blockquote className="text-lg md:text-xl lg:text-2xl font-light italic mb-6 md:mb-8 leading-relaxed tracking-tight hover-text">
                          "{testimonial.content}"
                        </blockquote>

                        <div>
                          <p className="font-medium text-base md:text-lg hover-text">{testimonial.name}</p>
                          <p className="text-xs md:text-sm text-muted-foreground hover-text">{testimonial.role}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center mt-6 md:mt-8">
              <CarouselPrevious className="static translate-y-0 mr-2 hover-button h-8 w-8 md:h-10 md:w-10" />
              <div className="flex items-center space-x-2">
                {testimonials.map((_, index) => (
                  <div
                    key={index}
                    className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full transition-all duration-300 ${
                      activeIndex === index ? "bg-primary w-3 md:w-4" : "bg-muted-foreground/30"
                    }`}
                  />
                ))}
              </div>
              <CarouselNext className="static translate-y-0 ml-2 hover-button h-8 w-8 md:h-10 md:w-10" />
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  )
}
