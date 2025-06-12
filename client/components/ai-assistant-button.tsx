"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Bot, X, Send, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"

interface Message {
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

export default function AIAssistantButton() {
  const [isOpen, setIsOpen] = useState(false)
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [hasShownGreeting, setHasShownGreeting] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hello! I'm the AI assistant for for loop de loop. I can help answer questions about our services, team, or any development-related queries. How can I assist you today?",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    // Show the assistant button after a delay
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 2000)

    // Show greeting after button appears
    const greetingTimer = setTimeout(() => {
      setIsOpen(true)
      setHasShownGreeting(true)
    }, 3500)

    return () => {
      clearTimeout(timer)
      clearTimeout(greetingTimer)
    }
  }, [mounted])

  useEffect(() => {
    if (mounted) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages, mounted])

  // Don't render anything during SSR
  if (!mounted) {
    return null
  }

  const toggleOpen = () => {
    if (!isChatOpen) {
      setIsOpen(!isOpen)
    }
  }

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen)
    setIsOpen(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    const currentInput = input.trim()
    setInput("")
    setIsLoading(true)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: currentInput,
          history: messages,
        }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      // Check if the response is a stream
      const contentType = response.headers.get("content-type")

      if (contentType && contentType.includes("text/plain")) {
        // Handle streaming response
        const reader = response.body?.getReader()
        const decoder = new TextDecoder()
        let assistantContent = ""

        if (reader) {
          // Add initial assistant message
          const assistantMessage: Message = {
            role: "assistant",
            content: "",
            timestamp: new Date(),
          }
          setMessages((prev) => [...prev, assistantMessage])

          try {
            while (true) {
              const { done, value } = await reader.read()
              if (done) break

              const chunk = decoder.decode(value, { stream: true })
              const lines = chunk.split("\n")

              for (const line of lines) {
                if (line.startsWith("0:")) {
                  try {
                    const jsonStr = line.slice(2)
                    const parsed = JSON.parse(jsonStr)
                    if (parsed && typeof parsed === "string") {
                      assistantContent += parsed
                      // Update the last message with accumulated content
                      setMessages((prev) => {
                        const newMessages = [...prev]
                        const lastMessage = newMessages[newMessages.length - 1]
                        if (lastMessage && lastMessage.role === "assistant") {
                          lastMessage.content = assistantContent
                        }
                        return newMessages
                      })
                    }
                  } catch (parseError) {
                    console.warn("Failed to parse streaming chunk:", parseError)
                  }
                }
              }
            }
          } finally {
            reader.releaseLock()
          }
        }
      } else {
        // Handle regular JSON response
        const data = await response.json()
        const assistantMessage: Message = {
          role: "assistant",
          content: data.message || "Sorry, I didn't receive a proper response.",
          timestamp: new Date(),
        }
        setMessages((prev) => [...prev, assistantMessage])
      }
    } catch (error) {
      console.error("Chat error:", error)
      const errorMessage: Message = {
        role: "assistant",
        content: "Sorry, I encountered an error. Please try again later.",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div
      className={cn(
        "fixed bottom-6 right-6 z-40 transition-all duration-500",
        isVisible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0",
      )}
    >
      {/* Message Bubble */}
      {!isChatOpen && (
        <div
          className={cn(
            "absolute bottom-full right-0 mb-3 bg-background rounded-lg p-4 shadow-lg border border-border w-64 transition-all duration-300",
            isOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0 pointer-events-none",
          )}
        >
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <Bot className="h-5 w-5 text-primary" />
              <p className="font-medium text-sm">AI Assistant</p>
            </div>
            <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={() => setIsOpen(false)}>
              <X className="h-3 w-3" />
            </Button>
          </div>
          <p className="text-sm mt-2 text-muted-foreground">Hi there! Need help with your project? Chat with our AI!</p>
          <Button size="sm" className="w-full mt-3 text-xs" onClick={toggleChat}>
            Start Chat
          </Button>
          <div className="absolute bottom-0 right-6 transform translate-y-1/2 rotate-45 w-3 h-3 bg-background border-r border-b border-border" />
        </div>
      )}

      {/* Chat Popup */}
      {isChatOpen && (
        <div className="absolute bottom-full right-0 mb-3 bg-background rounded-lg shadow-lg border border-border w-80 md:w-96 transition-all duration-300">
          <div className="p-3 border-b flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bot className="h-5 w-5 text-primary" />
              <h3 className="font-medium">AI Assistant</h3>
            </div>
            <Button variant="ghost" size="sm" className="h-7 w-7 p-0" onClick={toggleChat}>
              <X className="h-4 w-4" />
            </Button>
          </div>

          <ScrollArea className="h-80 p-4">
            <div className="space-y-6">
              {messages.map((message, index) => (
                <div key={index} className={`flex gap-4 ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`flex gap-4 max-w-[80%] ${message.role === "user" ? "flex-row-reverse" : "flex-row"}`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        message.role === "user" ? "bg-primary text-primary-foreground" : "bg-secondary"
                      }`}
                    >
                      {message.role === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                    </div>
                    <div
                      className={`rounded-2xl p-4 ${
                        message.role === "user" ? "bg-primary text-primary-foreground" : "bg-secondary"
                      }`}
                    >
                      <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                      <p className="text-xs opacity-70 mt-2">{message.timestamp.toLocaleTimeString()}</p>
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex gap-4 justify-start">
                  <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                    <Bot className="h-4 w-4" />
                  </div>
                  <div className="bg-secondary rounded-2xl p-4">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                      <div
                        className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      />
                      <div
                        className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          <form onSubmit={handleSubmit} className="p-3 border-t flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything about our services..."
              disabled={isLoading}
              className="flex-1 border-0 bg-secondary/50 focus-visible:ring-0 focus-visible:ring-offset-0"
            />
            <Button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="rounded-full aspect-square p-0 w-10 h-10"
            >
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      )}

      {/* Button */}
      <Button
        onClick={isChatOpen ? toggleChat : toggleOpen}
        className="h-14 w-14 rounded-full shadow-lg bg-primary hover:bg-primary/90 transition-all duration-300 group"
        aria-label="AI Assistant"
      >
        <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping opacity-30 group-hover:animate-none" />
        <Bot className="h-6 w-6 text-primary-foreground group-hover:scale-110 transition-transform" />
      </Button>
    </div>
  )
}
