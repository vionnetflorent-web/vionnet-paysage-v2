import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/content";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Pages sans valeur pour la recherche.
        disallow: ["/admin", "/api/", "/blog"],
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
