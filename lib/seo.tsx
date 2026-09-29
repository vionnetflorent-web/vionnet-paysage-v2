import { siteConfig, communes, services } from "./content";

/**
 * Données structurées Schema.org.
 *
 * Règle appliquée sans exception : seules les informations réellement
 * connues figurent ici. Pas d'adresse postale précise, pas d'horaires,
 * pas de note ni d'avis, pas de coordonnées GPS — Google sanctionne les
 * données structurées qui ne correspondent pas au contenu visible.
 * Les emplacements à compléter sont signalés ⚠️.
 */
export function localBusinessJsonLd() {
  const sameAs = [
    siteConfig.googleBusinessUrl,
    siteConfig.facebookUrl,
    siteConfig.instagramUrl,
  ].filter(Boolean);

  return {
    "@context": "https://schema.org",
    "@type": "LandscapingBusiness",
    "@id": `${siteConfig.url}/#business`,
    name: siteConfig.name,
    alternateName: `${siteConfig.name} — ${siteConfig.activity.toLowerCase()} ${siteConfig.cityTarget}`,
    description: `Paysagiste intervenant à ${siteConfig.cityTarget} et ${siteConfig.city}. Conception, aménagement et entretien de jardins dans les ${siteConfig.department} (${siteConfig.departmentCode}).`,
    url: siteConfig.url,
    email: siteConfig.email,
    telephone: siteConfig.phoneHref,
    image: `${siteConfig.url}/images/vionnet-logo.png`,
    logo: `${siteConfig.url}/images/vionnet-logo.png`,
    priceRange: "€€",
    currenciesAccepted: "EUR",
    founder: { "@type": "Person", name: siteConfig.owner },
    ...(sameAs.length > 0 ? { sameAs } : {}),

    // Adresse limitée à la commune : le numéro et la rue ne sont pas connus.
    // ⚠️ Complétez streetAddress / postalCode quand l'adresse sera publique,
    // en veillant à ce qu'elle soit IDENTIQUE à celle du profil Google.
    address: {
      "@type": "PostalAddress",
      addressLocality: siteConfig.city,
      addressRegion: siteConfig.region,
      addressCountry: "FR",
    },

    // Zone desservie : département + communes réellement listées sur le site.
    areaServed: [
      {
        "@type": "AdministrativeArea",
        name: `${siteConfig.department} (${siteConfig.departmentCode})`,
      },
      ...communes.map((c) => ({ "@type": "City", name: c })),
    ],

    knowsAbout: services.flatMap((s) => s.items),

    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Prestations de paysagiste",
      itemListElement: services.map((s) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: s.title,
          description: s.lead,
          serviceType: s.title,
          areaServed: `${siteConfig.cityTarget}, ${siteConfig.city}, ${siteConfig.department}`,
          provider: { "@id": `${siteConfig.url}/#business` },
        },
      })),
    },
  };
}

/** Identité du site — aide Google à afficher le bon nom dans les résultats. */
export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
    url: siteConfig.url,
    name: siteConfig.name,
    inLanguage: "fr-FR",
    publisher: { "@id": `${siteConfig.url}/#business` },
  };
}

/** Page de prestation : décrit le service ET son rattachement local. */
export function serviceJsonLd(opts: {
  name: string;
  description: string;
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: opts.name,
    description: opts.description,
    url: `${siteConfig.url}${opts.path}`,
    serviceType: opts.name,
    provider: { "@id": `${siteConfig.url}/#business` },
    areaServed: [
      {
        "@type": "AdministrativeArea",
        name: `${siteConfig.department} (${siteConfig.departmentCode})`,
      },
      ...communes.map((c) => ({ "@type": "City", name: c })),
    ],
  };
}

/** Fil d'Ariane structuré — affiché par Google sous le titre du résultat. */
export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${siteConfig.url}${item.path}`,
    })),
  };
}

/**
 * Questions fréquentes structurées.
 * ⚠️ N'utilisez cette fonction QUE si les mêmes questions/réponses sont
 * visibles sur la page — sinon Google considère le balisage comme trompeur.
 */
export function faqJsonLd(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

/** Injecte un bloc JSON-LD dans une page serveur. */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
