import { NextResponse } from "next/server"

export async function GET() {
  const baseUrl = "https://forloopdeloop.com"
  const currentDate = new Date().toISOString()

  const staticPages = [
    { url: "", priority: "1.0", changefreq: "weekly" },
    { url: "/services", priority: "0.9", changefreq: "monthly" },
    { url: "/portfolio", priority: "0.8", changefreq: "monthly" },
    { url: "/team", priority: "0.7", changefreq: "monthly" },
    { url: "/contact", priority: "0.9", changefreq: "monthly" },
    { url: "/about", priority: "0.7", changefreq: "monthly" },
    { url: "/blog", priority: "0.8", changefreq: "weekly" },
    { url: "/careers", priority: "0.6", changefreq: "weekly" },
    { url: "/pricing", priority: "0.8", changefreq: "monthly" },
    { url: "/case-studies", priority: "0.7", changefreq: "monthly" },
  ]

  const servicePages = [
    "web-development",
    "mobile-development",
    "ai-ml-development",
    "ai-integration",
    "ui-ux-design",
    "database-design",
    "cloud-deployment",
    "performance-optimization",
  ]

  const portfolioPages = [
    "e-commerce-platform",
    "healthcare-management-system",
    "ai-powered-analytics-dashboard",
    "smart-social-media-app",
  ]

  const teamPages = ["sahnik-biswas", "sankalpa-srakar", "shovon-halder", "shreyas-saha"]

  const technologyPages = ["react", "nextjs", "nodejs", "react-native", "typescript", "python", "ai-ml"]

  const industryPages = ["healthcare", "fintech", "e-commerce", "education", "social-media", "enterprise"]

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
  
  ${staticPages
    .map(
      (page) => `
  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`,
    )
    .join("")}

  ${servicePages
    .map(
      (service) => `
  <url>
    <loc>${baseUrl}/services/${service}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`,
    )
    .join("")}

  ${portfolioPages
    .map(
      (project) => `
  <url>
    <loc>${baseUrl}/portfolio/${project}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`,
    )
    .join("")}

  ${teamPages
    .map(
      (member) => `
  <url>
    <loc>${baseUrl}/team/${member}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`,
    )
    .join("")}

  ${technologyPages
    .map(
      (tech) => `
  <url>
    <loc>${baseUrl}/technologies/${tech}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`,
    )
    .join("")}

  ${industryPages
    .map(
      (industry) => `
  <url>
    <loc>${baseUrl}/industries/${industry}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`,
    )
    .join("")}

</urlset>`

  return new NextResponse(sitemap, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  })
}
