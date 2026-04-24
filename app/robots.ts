import type { MetadataRoute } from "next"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.thebroov.com"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/checkout", "/order-confirmation", "/api/"],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  }
}
