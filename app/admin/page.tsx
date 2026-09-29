import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Espace d'administration — emplacement réservé, non protégé.
// ⚠️ Avant toute mise en ligne réelle : ajoutez une authentification
// (NextAuth.js, Clerk…). La page est désindexée et bloquée dans robots.ts.
export const metadata: Metadata = {
  title: "Administration",
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return (
    <>
      <Header overDark={false} />
      <main id="contenu" className="pt-[68px]">
        <section className="bg-paper py-24 sm:py-28">
          <div className="mx-auto max-w-[760px] px-5 sm:px-8">
            <p className="text-[11px] uppercase tracking-eyebrow text-mute">
              Espace privé
            </p>
            <h1 className="mt-6 font-display text-[34px] leading-[1.15] text-ink sm:text-[42px]">
              Administration
            </h1>
            <p className="mt-6 text-[16px] leading-[1.8] text-graphite">
              Emplacement réservé à la gestion des réalisations, des articles
              et des demandes de devis. Ajoutez une authentification avant
              d&apos;y placer des données.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
