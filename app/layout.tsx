import type { Metadata } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/lib/content";

// Polices auto-hébergées par next/font : pas de requête externe, pas de
// décalage de mise en page (CLS, critère Core Web Vitals).
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-cormorant",
  display: "swap",
});

const jost = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-jost",
  display: "swap",
});

// La page d'accueil est la plus forte du site : son titre couvre les deux
// pôles réellement travaillés. Les pages locales dédiées (lib/localPages.ts)
// prennent ensuite le relais commune par commune.
const title = `Paysagiste à ${siteConfig.cityTarget} (${siteConfig.departmentCode}) | ${siteConfig.name}`;
const description = `Paysagiste à ${siteConfig.cityTarget} et ${siteConfig.city} : création de jardin, aménagement paysager, terrasse et entretien dans les ${siteConfig.department}. Devis gratuit après visite du terrain.`;

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: title,
    template: `%s | ${siteConfig.name}`,
  },
  description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.owner }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title,
    description,
    images: [
      {
        url: "/images/hero.png",
        width: 1920,
        height: 1280,
        alt: `${siteConfig.name} — paysagiste à ${siteConfig.cityTarget}`,
      },
    ],
  },
  twitter: { card: "summary_large_image", title, description },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  // ⚠️ À COMPLÉTER : collez ici le code fourni par Google Search Console
  // (méthode « balise HTML ») pour valider la propriété du site.
  // verification: { google: "votre-code-de-verification" },
  formatDetection: { telephone: true, address: true, email: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr-FR" className={`${cormorant.variable} ${jost.variable}`}>
      <body className="bg-paper font-sans text-ink antialiased">
        <a
          href="#contenu"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-[2px] focus:bg-ink focus:px-4 focus:py-2 focus:text-[13px] focus:text-paper"
        >
          Aller au contenu
        </a>
        {children}
      </body>
    </html>
  );
}
