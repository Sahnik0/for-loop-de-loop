import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://forloopdeloop.com"

  return {
    rules: [
      {
        userAgent: "*",
        allow: [
          "/",
          "/services/",
          "/portfolio/",
          "/team/",
          "/about/",
          "/blog/",
          "/careers/",
          "/contact/",
          "/pricing/",
          "/case-studies/",
          "/technologies/",
          "/industries/",
          "/resources/",
          "/testimonials/",
          "/reviews/",
          "/process/",
          "/partnerships/",
          "/events/",
          "/news/",
          "/support/",
          "/locations/",
        ],
        disallow: [
          "/api/",
          "/admin/",
          "/private/",
          "/internal/",
          "/temp/",
          "/draft/",
          "/*.json$",
          "/*.xml$",
          "/search?*",
          "/*?utm_*",
          "/*?ref=*",
          "/*?source=*",
          "/checkout/",
          "/payment/",
          "/login/",
          "/register/",
          "/dashboard/",
          "/profile/",
        ],
        crawlDelay: 1,
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/api/", "/admin/", "/private/", "/internal/"],
        crawlDelay: 0,
      },
      {
        userAgent: "Bingbot",
        allow: "/",
        disallow: ["/api/", "/admin/", "/private/", "/internal/"],
        crawlDelay: 1,
      },
      {
        userAgent: "Slurp", // Yahoo
        allow: "/",
        disallow: ["/api/", "/admin/", "/private/"],
        crawlDelay: 2,
      },
      {
        userAgent: "DuckDuckBot",
        allow: "/",
        disallow: ["/api/", "/admin/", "/private/"],
        crawlDelay: 1,
      },
      {
        userAgent: "facebookexternalhit", // Facebook crawler
        allow: "/",
        disallow: ["/api/", "/admin/", "/private/"],
      },
      {
        userAgent: "Twitterbot", // Twitter crawler
        allow: "/",
        disallow: ["/api/", "/admin/", "/private/"],
      },
      {
        userAgent: "LinkedInBot", // LinkedIn crawler
        allow: "/",
        disallow: ["/api/", "/admin/", "/private/"],
      },
      // Block bad bots
      {
        userAgent: ["AhrefsBot", "SemrushBot", "MJ12bot", "DotBot", "BLEXBot", "YandexBot"],
        disallow: "/",
      },
    ],
    sitemap: [`${baseUrl}/sitemap.xml`, `${baseUrl}/sitemap-0.xml`],
    host: baseUrl,
  }
}
