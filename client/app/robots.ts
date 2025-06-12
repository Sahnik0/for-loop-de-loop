import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/services/", "/portfolio/", "/about/", "/blog/", "/careers/"],
        disallow: ["/api/", "/admin/", "/private/", "/*.json$", "/*.xml$"],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/api/", "/admin/"],
      },
      {
        userAgent: "Bingbot",
        allow: "/",
        disallow: ["/api/", "/admin/"],
      },
    ],
    sitemap: "https://forloopdeloop.com/sitemap.xml",
    host: "https://forloopdeloop.com",
  }
}
