"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import emailjs from '@emailjs/browser'

export default function ContactSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const sectionRef = useRef<HTMLElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const { toast } = useToast()

  // Get EmailJS configuration from environment variables
  const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID
  const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID
  const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY

  useEffect(() => {
    // Initialize EmailJS
    try {
      if (EMAILJS_PUBLIC_KEY) {
        emailjs.init(EMAILJS_PUBLIC_KEY)
        console.log('EmailJS initialized successfully')
      } else {
        console.error('EmailJS public key not found in environment variables')
      }
    } catch (error) {
      console.error('EmailJS initialization failed:', error)
    }

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
  }, [EMAILJS_PUBLIC_KEY])

  const validateForm = () => {
    if (!formData.name.trim()) {
      throw new Error("Please enter your name")
    }
    if (!formData.email.trim()) {
      throw new Error("Please enter your email")
    }
    if (!formData.message.trim()) {
      throw new Error("Please enter your message")
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      throw new Error("Please enter a valid email address")
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      validateForm()

      // Check if environment variables are configured
      if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
        throw new Error("EmailJS configuration is missing. Please check your environment variables.")
      }

      console.log('Sending email with configuration:', {
        serviceId: EMAILJS_SERVICE_ID,
        templateId: EMAILJS_TEMPLATE_ID,
        publicKey: EMAILJS_PUBLIC_KEY.substring(0, 8) + '...' // Hide full key in logs
      })

      // Enhanced template parameters to show sender info clearly
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
        to_name: 'For Loop De Loop Team',
        // Additional parameters to make sender info more visible
        sender_name: formData.name,
        sender_email: formData.email,
        contact_message: formData.message,
        // Format a complete message with sender info
        full_message: `
Name: ${formData.name}
Email: ${formData.email}

Message:
${formData.message}
        `,
        // Reply-to email for easy response
        reply_to: formData.email,
        // Subject line with sender name
        subject: `New Contact Form Message from ${formData.name}`,
      }

      console.log('Sending with template params:', templateParams)

      const result = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      )

      console.log('Email sent successfully:', result)

      toast({
        title: "Message sent!",
        description: "Thank you for your message. We'll get back to you soon.",
      })

      // Reset form
      setFormData({ name: "", email: "", message: "" })
      
    } catch (error) {
      console.error('Email sending failed:', error)
      
      let errorMessage = "Failed to send message. Please try again."
      
      if (error instanceof Error) {
        errorMessage = error.message
      } else if (
        error &&
        typeof error === 'object' &&
        'text' in error &&
        'status' in error &&
        typeof (error as any).status === 'number'
      ) {
        switch ((error as any).status) {
          case 400:
            errorMessage = "Invalid request. Please check your form data."
            break
          case 401:
            errorMessage = "Unauthorized. Please check your EmailJS public key."
            break
          case 403:
            errorMessage = "Forbidden. Please check your EmailJS service settings."
            break
          case 404:
            errorMessage = "EmailJS service or template not found. Please check your configuration."
            break
          case 422:
            errorMessage = "Invalid template parameters. Please check your form fields match your EmailJS template."
            break
          case 429:
            errorMessage = "Rate limit exceeded. Please try again later."
            break
          default:
            errorMessage = `EmailJS Error: ${(error as any).text || 'Unknown error'}`
        }
      }
      
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    
    // Update form data based on input name
    if (name === "from_name") {
      setFormData(prev => ({ ...prev, name: value }))
    } else if (name === "from_email") {
      setFormData(prev => ({ ...prev, email: value }))
    } else if (name === "message") {
      setFormData(prev => ({ ...prev, message: value }))
    }
  }

  return (
    <section id="contact" ref={sectionRef} className="bg-secondary/30">
      <div className="container mx-auto px-4 md:px-6">
        <div
          className={`text-center mb-12 md:mb-20 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="headline-text mb-4 md:mb-6">Get In Touch</h2>
          <p className="body-text text-muted-foreground max-w-2xl mx-auto">
            Ready to start your next project? Let's discuss how we can help bring your ideas to life.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 md:gap-16 max-w-6xl mx-auto">
          <div
            className={`transition-all duration-1000 delay-300 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <Card className="border-0 bg-background/50 backdrop-blur-sm card-glow-primary">
              <CardContent className="p-6 md:p-10">
                <h3 className="text-xl md:text-2xl font-medium mb-4 md:mb-6">Send us a message</h3>
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                  <div>
                    <Input
                      name="from_name"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      disabled={isSubmitting}
                      className="border-0 bg-secondary/50 h-10 md:h-12 px-3 md:px-4 text-sm md:text-base"
                    />
                  </div>
                  <div>
                    <Input
                      name="from_email"
                      type="email"
                      placeholder="Your Email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      disabled={isSubmitting}
                      className="border-0 bg-secondary/50 h-10 md:h-12 px-3 md:px-4 text-sm md:text-base"
                    />
                  </div>
                  <div>
                    <Textarea
                      name="message"
                      placeholder="Your Message"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      required
                      disabled={isSubmitting}
                      className="border-0 bg-secondary/50 px-3 md:px-4 py-2 md:py-3 resize-none text-sm md:text-base"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full apple-button bg-primary text-primary-foreground hover:opacity-90 disabled:opacity-50"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          <div
            className={`space-y-8 md:space-y-12 transition-all duration-1000 delay-500 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <div>
              <h3 className="text-xl md:text-2xl font-medium mb-6 md:mb-8">Contact Information</h3>

              <div className="space-y-4 md:space-y-6">
                <div className="flex items-center gap-4 md:gap-6">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-secondary/80 rounded-full flex items-center justify-center">
                    <Mail className="h-4 w-4 md:h-5 md:w-5" />
                  </div>
                  <div>
                    <p className="font-medium text-sm md:text-base">Email</p>
                    <a
                      href="mailto:for.loop.de.loop@gmail.com"
                      className="text-muted-foreground hover:text-foreground transition-colors text-sm md:text-base"
                    >
                      for.loop.de.loop@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4 md:gap-6">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-secondary/80 rounded-full flex items-center justify-center">
                    <Phone className="h-4 w-4 md:h-5 md:w-5" />
                  </div>
                  <div>
                    <p className="font-medium text-sm md:text-base">Phone</p>
                    <p className="text-muted-foreground text-sm md:text-base">+1 (555) 123-4567</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-lg md:text-xl font-medium mb-4 md:mb-6">Why Choose Us?</h4>
              <ul className="space-y-3 md:space-y-4 text-muted-foreground">
                <li className="flex items-center text-sm md:text-base">
                  <div className="w-1 h-1 bg-primary rounded-full mr-3" />
                  Expert team with years of experience
                </li>
                <li className="flex items-center text-sm md:text-base">
                  <div className="w-1 h-1 bg-primary rounded-full mr-3" />
                  Modern technologies and best practices
                </li>
                <li className="flex items-center text-sm md:text-base">
                  <div className="w-1 h-1 bg-primary rounded-full mr-3" />
                  Timely delivery and ongoing support
                </li>
                <li className="flex items-center text-sm md:text-base">
                  <div className="w-1 h-1 bg-primary rounded-full mr-3" />
                  Competitive pricing and transparent communication
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}