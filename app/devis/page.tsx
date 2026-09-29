import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import QuoteSection from "@/components/QuoteSection";
import { JsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/content";

export const metadata: Metadata = {
  title: `Devis paysagiste ${siteConfig.cityTarget} — gratuit`,
  description: `Demandez un devis gratuit à ${siteConfig.name}, paysagiste à ${siteConfig.cityTarget} et ${siteConfig.city} : création de jardin, aménagement paysager, terrasse et entretien dans les ${siteConfig.department}.`,
  alternates: { canonical: "/devis" },
};

export default function DevisPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Accueil", path: "/" },
          { name: "Demander un devis", path: "/devis" },
        ])}
      />
      <Header overDark={false} />
      <main id="contenu" className="pt-[68px]">
        <QuoteSection
          title="Demander un devis"
          intro="Renseignez votre projet ci-dessous. Nous vous rappelons pour convenir d'une visite du terrain, indispensable avant tout chiffrage sérieux."
        />
      </main>
      <Footer />
    </>
  );
}
