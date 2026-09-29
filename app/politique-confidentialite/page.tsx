import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { siteConfig } from "@/lib/content";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description: `Traitement des données personnelles sur le site ${siteConfig.name}.`,
  alternates: { canonical: "/politique-confidentialite" },
};

export default function ConfidentialitePage() {
  return (
    <>
      <Header overDark={false} />
      <main id="contenu" className="pt-[68px]">
        <section className="bg-paper py-20 sm:py-24">
          <div className="mx-auto max-w-[760px] px-5 sm:px-8">
            <h1 className="font-display text-[34px] leading-[1.15] text-ink sm:text-[42px]">
              Politique de confidentialité
            </h1>

            <div className="mt-10 space-y-10 text-[16px] leading-[1.8] text-graphite">
              <section>
                <h2 className="font-display text-[24px] text-ink">
                  Données collectées
                </h2>
                <p className="mt-3">
                  Le formulaire de demande de devis collecte uniquement les
                  informations nécessaires au traitement de votre demande :
                  prénom, nom, téléphone, email, commune, type de projet,
                  budget indicatif, description du projet et, si vous en
                  joignez, photographies du terrain.
                </p>
                <p className="mt-3">
                  Les demandes envoyées via le formulaire sont transmises par
                  email au moyen du service Resend (Resend Inc., États-Unis),
                  qui agit comme sous-traitant technique. Elles ne sont ni
                  revendues ni utilisées à des fins commerciales.
                </p>
              </section>

              <section>
                <h2 className="font-display text-[24px] text-ink">Finalité</h2>
                <p className="mt-3">
                  Ces informations servent exclusivement à vous répondre,
                  préparer une visite du terrain et établir un devis. Elles ne
                  sont ni revendues, ni utilisées à des fins publicitaires.
                </p>
              </section>

              <section>
                <h2 className="font-display text-[24px] text-ink">
                  Conservation
                </h2>
                <p className="mt-3">
                  Les demandes sont conservées le temps nécessaire au suivi
                  commercial, puis supprimées. Les devis émis relèvent des
                  obligations comptables de conservation.
                </p>
              </section>

              <section>
                <h2 className="font-display text-[24px] text-ink">Vos droits</h2>
                <p className="mt-3">
                  Conformément au RGPD, vous disposez d&apos;un droit
                  d&apos;accès, de rectification, d&apos;effacement et
                  d&apos;opposition sur vos données. Pour l&apos;exercer,
                  écrivez à{" "}
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="border-b border-ink/30 text-ink hover:border-ink"
                  >
                    {siteConfig.email}
                  </a>
                  .
                </p>
              </section>

              <section>
                <h2 className="font-display text-[24px] text-ink">
                  Cookies et mesure d&apos;audience
                </h2>
                <p className="mt-3">
                  Ce site ne dépose aucun cookie publicitaire et n&apos;utilise
                  aucun traceur tiers. Si un outil de mesure d&apos;audience est
                  ajouté ultérieurement, cette page sera mise à jour et un
                  bandeau de consentement sera mis en place.
                </p>
              </section>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
