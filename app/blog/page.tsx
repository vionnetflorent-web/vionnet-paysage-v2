import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CtaBand from "@/components/CtaBand";

// Structure prête pour un futur journal de chantiers / conseils de saison.
// Tant qu'il n'y a pas d'articles réels, la page reste désindexée : une
// page vide indexée nuit au référencement.
export const metadata: Metadata = {
  title: "Journal",
  description: "Conseils de saison et retours de chantier — à venir.",
  robots: { index: false, follow: true },
};

export default function BlogPage() {
  return (
    <>
      <Header overDark={false} />
      <main id="contenu" className="pt-[94px]">
        <section className="bg-paper py-24 sm:py-28">
          <div className="mx-auto max-w-[760px] px-5 sm:px-8">
            <p className="text-[11px] uppercase tracking-eyebrow text-mute">
              Journal
            </p>
            <h1 className="mt-6 font-display text-[34px] leading-[1.15] text-ink sm:text-[42px]">
              Conseils de saison et retours de chantier
            </h1>
            <p className="mt-6 text-[16px] leading-[1.8] text-graphite">
              Cette section accueillera des articles sur les chantiers
              réalisés, le choix des végétaux et l&apos;entretien au fil de
              l&apos;année. Pour publier un article : créez
              <code className="mx-1 rounded-[2px] bg-cream px-1.5 py-0.5 text-[14px]">
                app/blog/[slug]/page.tsx
              </code>
              ou branchez un CMS (voir README).
            </p>
          </div>
        </section>
        <CtaBand
          title="Une question sur votre jardin ?"
          text="Nous répondons directement, sans passer par un formulaire interminable."
          tone="light"
        />
      </main>
      <Footer />
    </>
  );
}
