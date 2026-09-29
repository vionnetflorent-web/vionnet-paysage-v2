import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CtaBand from "@/components/CtaBand";
import Reveal from "@/components/Reveal";
import { RealisationCard } from "@/components/Realisations";
import { JsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { realisations, siteConfig } from "@/lib/content";

export const metadata: Metadata = {
  title: `Réalisations — aménagement de jardins ${siteConfig.department}`,
  description: `Chantiers de création, d'aménagement paysager et de terrasses réalisés par ${siteConfig.name} à ${siteConfig.cityTarget}, ${siteConfig.city} et dans les ${siteConfig.department}.`,
  alternates: { canonical: "/realisations" },
};

const spans = [
  "lg:col-span-7",
  "lg:col-span-5",
  "lg:col-span-5",
  "lg:col-span-7",
  "lg:col-span-6",
  "lg:col-span-6",
];

export default function RealisationsPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Accueil", path: "/" },
          { name: "Réalisations", path: "/realisations" },
        ])}
      />
      <Header overDark={false} />
      <main id="contenu" className="pt-[68px]">
        <section className="bg-paper py-20 sm:py-24 lg:py-28">
          <div className="mx-auto max-w-content px-5 sm:px-8 lg:px-12">
            <Reveal>
              <p className="text-[11px] uppercase tracking-eyebrow text-mute">
                Réalisations
              </p>
              <h1 className="mt-6 max-w-[780px] font-display text-[34px] leading-[1.12] text-ink sm:text-[46px] lg:text-[54px]">
                Chantiers de création, d&apos;aménagement et d&apos;entretien
              </h1>
              <p className="mt-6 max-w-prose text-[16px] leading-[1.8] text-graphite sm:text-[17px]">
                Une sélection de nos travaux dans les{" "}
                {siteConfig.department}. Les
                photographies sont ajoutées au fur et à mesure des chantiers
                terminés — nous ne publions que des réalisations qui sont les
                nôtres.
              </p>
            </Reveal>

            <div className="mt-14 grid gap-8 lg:grid-cols-12 lg:gap-x-8 lg:gap-y-14">
              {realisations.map((item, i) => (
                <RealisationCard
                  key={item.slug}
                  item={item}
                  index={i}
                  className={spans[i % spans.length]}
                />
              ))}
            </div>
          </div>
        </section>

        <CtaBand
          title="Un projet comparable ?"
          text="Décrivez-nous le terrain et les travaux envisagés : nous vous répondons rapidement."
        />
      </main>
      <Footer />
    </>
  );
}
