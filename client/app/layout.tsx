import type React from "react"
import type { Metadata } from "next"
import { Instrument_Sans } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import CustomCursor from "@/components/ui/custom-cursor"
import AIAssistantButton from "@/components/ai-assistant-button"

// Using Instrument Sans as it's similar to Apple's SF Pro
const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

export const metadata: Metadata = {
  title: {
    default: "for loop de loop - Fullstack Web & Mobile Development with AI/ML",
    template: "%s | for loop de loop",
  },
  description:
    "Professional fullstack web and mobile app development services with AI/ML integration by expert developers. We build powerful digital solutions with React, Next.js, Node.js, React Native, and cutting-edge AI technologies. Get custom web applications, mobile apps, AI solutions, and machine learning implementations.",
  keywords: [
    "fullstack development",
    "web development",
    "mobile app development",
    "AI development",
    "machine learning development",
    "artificial intelligence services",
    "AI integration",
    "ML solutions",
    "React development",
    "Next.js development",
    "Node.js development",
    "React Native development",
    "custom web applications",
    "mobile app development services",
    "AI-powered applications",
    "machine learning models",
    "natural language processing",
    "computer vision",
    "predictive analytics",
    "AI automation",
    "chatbot development",
    "AI API integration",
    "digital solutions",
    "software development company",
    "web design",
    "UI/UX development",
    "API development",
    "database design",
    "cloud deployment",
    "responsive web design",
    "cross-platform mobile apps",
    "TypeScript development",
    "JavaScript development",
    "frontend development",
    "backend development",
    "e-commerce development",
    "progressive web apps",
    "serverless applications",
    "web performance optimization",
    "SEO-friendly websites",
    "accessibility compliant websites",
    "custom software development",
    "enterprise software solutions",
    "AI consulting",
    "machine learning consulting",
    "data science services",
    "intelligent automation",
    "smart applications",
  ],
  authors: [{ name: "for loop de loop", url: "https://forloopdeloop.com" }],
  creator: "for loop de loop",
  publisher: "for loop de loop",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://forloopdeloop.com"),
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/en-US",
    },
  },
  openGraph: {
    title: "for loop de loop - Fullstack Development with AI/ML Services",
    description:
      "Professional fullstack web and mobile app development services with AI/ML integration by expert developers. Custom solutions with React, Next.js, Node.js, React Native, and AI technologies.",
    url: "https://forloopdeloop.com",
    siteName: "for loop de loop",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "for loop de loop - Fullstack Development with AI/ML Services",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "for loop de loop - Fullstack Development with AI/ML Services",
    description:
      "Professional fullstack web and mobile app development services with AI/ML integration by expert developers",
    images: ["/og-image.jpg"],
    creator: "@forloopdeloop",
    site: "@forloopdeloop",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
    yahoo: "your-yahoo-verification-code",
    bing: "your-bing-verification-code",
  },
  category: "technology",
  applicationName: "for loop de loop",
  referrer: "origin-when-cross-origin",
  colorScheme: "light dark",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
  },
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
    
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "for loop de loop",
  description: "Professional fullstack web and mobile app development services with AI/ML integration",
  url: "https://forloopdeloop.com",
  logo: "https://forloopdeloop.com/logo.png",
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: "+1-555-123-4567",
      contactType: "customer service",
      email: "for.loop.de.loop@gmail.com",
      availableLanguage: ["English"],
    },
  ],
  address: {
    "@type": "PostalAddress",
    addressCountry: "US",
    addressLocality: "San Francisco",
    addressRegion: "CA",
    postalCode: "94103",
  },
  sameAs: [
    "https://github.com/forloopdeloop",
    "https://linkedin.com/company/forloopdeloop",
    "https://twitter.com/forloopdeloop",
    "https://facebook.com/forloopdeloop",
    "https://instagram.com/forloopdeloop",
  ],
  founder: [
    {
      "@type": "Person",
      name: "Sahnik Biswas",
      jobTitle: "Full Stack Developer",
      sameAs: "https://linkedin.com/in/sahnikbiswas",
    },
    {
      "@type": "Person",
      name: "Sankalpa Srakar",
      jobTitle: "Frontend Specialist",
      sameAs: "https://linkedin.com/in/sankalpasrakar",
    },
    {
      "@type": "Person",
      name: "Shovon Halder",
      jobTitle: "Backend Engineer",
      sameAs: "https://linkedin.com/in/shovonhalder",
    },
    {
      "@type": "Person",
      name: "Shreyas Saha",
      jobTitle: "Mobile Developer",
      sameAs: "https://linkedin.com/in/shreyassaha",
    },
  ],
  service: [
    {
      "@type": "Service",
      name: "Fullstack Web Development",
      description: "Modern, responsive web applications built with cutting-edge technologies",
      offers: {
        "@type": "Offer",
        availability: "https://schema.org/InStock",
      },
    },
    {
      "@type": "Service",
      name: "Mobile App Development",
      description: "Native and cross-platform mobile applications for iOS and Android",
      offers: {
        "@type": "Offer",
        availability: "https://schema.org/InStock",
      },
    },
    {
      "@type": "Service",
      name: "AI & Machine Learning",
      description: "Intelligent solutions powered by artificial intelligence and machine learning",
      offers: {
        "@type": "Offer",
        availability: "https://schema.org/InStock",
      },
    },
    {
      "@type": "Service",
      name: "AI Integration & Automation",
      description: "Seamlessly integrate AI capabilities into existing systems and automate processes",
      offers: {
        "@type": "Offer",
        availability: "https://schema.org/InStock",
      },
    },
    {
      "@type": "Service",
      name: "UI/UX Design",
      description: "Beautiful, intuitive interfaces designed for optimal user experience",
      offers: {
        "@type": "Offer",
        availability: "https://schema.org/InStock",
      },
    },
    {
      "@type": "Service",
      name: "Database Design",
      description: "Scalable database architecture for optimal performance",
      offers: {
        "@type": "Offer",
        availability: "https://schema.org/InStock",
      },
    },
  ],
  review: [
    {
      "@type": "Review",
      reviewRating: {
        "@type": "Rating",
        ratingValue: "5",
        bestRating: "5",
      },
      author: {
        "@type": "Person",
        name: "Sarah Johnson",
      },
      reviewBody:
        "The team at for loop de loop delivered an exceptional e-commerce platform that exceeded our expectations. Their attention to detail and technical expertise is unmatched.",
    },
    {
      "@type": "Review",
      reviewRating: {
        "@type": "Rating",
        ratingValue: "5",
        bestRating: "5",
      },
      author: {
        "@type": "Person",
        name: "Michael Chen",
      },
      reviewBody:
        "Working with this team was a game-changer for our healthcare platform. They understood our complex requirements and delivered a scalable, user-friendly solution.",
    },
  ],
  areaServed: {
    "@type": "GeoCircle",
    geoMidpoint: {
      "@type": "GeoCoordinates",
      latitude: 37.7749,
      longitude: -122.4194,
    },
    geoRadius: "10000",
  },
  knowsAbout: [
    "Web Development",
    "Mobile App Development",
    "Artificial Intelligence",
    "Machine Learning",
    "React",
    "Next.js",
    "Node.js",
    "TypeScript",
    "React Native",
    "AI Integration",
    "Natural Language Processing",
    "Computer Vision",
    "Predictive Analytics",
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#000000" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="color-scheme" content="light dark" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body className={`${instrumentSans.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
          <Toaster />
          <CustomCursor />
          <AIAssistantButton />
        </ThemeProvider>
      </body>
    </html>
  )
}
