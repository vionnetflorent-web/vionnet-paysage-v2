import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/content";
import { servicePages } from "@/lib/servicePages";
import { localPages } from "@/lib/localPages";

// Sitemap généré automatiquement : toute page ajoutée dans
// lib/servicePages.ts ou lib/localPages.ts y apparaît sans intervention.
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const base = siteConfig.url;

  const staticRoutes: { path: string; priority: number }[] = [
    { path: "/", priority: 1 },
    { path: "/devis", priority: 0.9 },
    { path: "/realisations", priority: 0.8 },
    { path: "/mentions-legales", priority: 0.2 },
    { path: "/politique-confidentialite", priority: 0.2 },
  ];

  return [
    ...staticRoutes.map((route) => ({
      url: `${base}${route.path}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: route.priority,
    })),
    // Pages locales : portes d'entrée Google. La première de la liste
    // (lib/localPages.ts) est la cible principale et reçoit la priorité
    // la plus forte après l'accueil.
    ...localPages.map((page, i) => ({
      url: `${base}/${page.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: i === 0 ? 0.95 : 0.85,
    })),
    ...servicePages.map((page) => ({
      url: `${base}/${page.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
