import type { Metadata } from "next"
import Navigation from "@/components/navigation"
import HeroSection from "@/components/hero-section"
import ServicesSection from "@/components/services-section"
import PortfolioSection from "@/components/portfolio-section"
import TeamSection from "@/components/team-section"
import TestimonialsSection from "@/components/testimonials-section"
import ContactSection from "@/components/contact-section"
import Footer from "@/components/footer"

export const metadata: Metadata = {
  title: "for loop de loop - Fullstack Web & Mobile Development",
  description:
    "Professional fullstack web and mobile app development services by expert developers. We build powerful digital solutions with React, Next.js, Node.js, and React Native.",
  openGraph: {
    title: "for loop de loop - Fullstack Development Services",
    description: "Professional fullstack web and mobile app development services by expert developers",
    images: ["/og-image.jpg"],
  },
}

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://forloopdeloop.com",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Services",
      item: "https://forloopdeloop.com#services",
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Portfolio",
      item: "https://forloopdeloop.com#portfolio",
    },
    {
      "@type": "ListItem",
      position: 4,
      name: "Team",
      item: "https://forloopdeloop.com#team",
    },
    {
      "@type": "ListItem",
      position: 5,
      name: "Contact",
      item: "https://forloopdeloop.com#contact",
    },
  ],
}

const pageJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "for loop de loop - Fullstack Web & Mobile Development",
  description: "Professional fullstack web and mobile app development services by expert developers.",
  url: "https://forloopdeloop.com",
  isPartOf: {
    "@type": "WebSite",
    name: "for loop de loop",
    url: "https://forloopdeloop.com",
  },
  about: {
    "@type": "Organization",
    name: "for loop de loop",
  },
  mainEntity: {
    "@type": "ProfessionalService",
    name: "for loop de loop",
    serviceType: "Web and Mobile Development",
    areaServed: {
      "@type": "Country",
      name: "United States",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Development Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Fullstack Web Development",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Mobile App Development",
          },
        },
      ],
    },
  },
  speakable: {
    "@type": "SpeakableSpecification",
    cssSelector: ["h1", "h2", ".headline-text"],
  },
  specialty: ["Web Development", "Mobile App Development", "UI/UX Design"],
}

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageJsonLd) }} />
      <main className="min-h-screen bg-background">
        <Navigation />
        <HeroSection />
        <ServicesSection />
        <PortfolioSection />
        <TeamSection />
        <TestimonialsSection />
        <ContactSection />
        <Footer />
      </main>
    </>
  )
}
