import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { siteConfig } from "@/lib/content";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: `Mentions légales du site ${siteConfig.name}.`,
  alternates: { canonical: "/mentions-legales" },
};

export default function MentionsLegalesPage() {
  const l = siteConfig.legal;
  // Les valeurs viennent de lib/content.ts (siteConfig.legal).
  const legalRows: [string, string][] = [
    ["Forme juridique", l.legalForm],
    ["Siège", l.address],
    ["SIRET", l.siret],
    ["TVA intracommunautaire", l.vat],
    ["Responsable de la publication", l.director],
    ["Assurance professionnelle", l.insurer],
    ["Couverture géographique", l.insuranceArea],
  ];

  return (
    <>
      <Header overDark={false} />
      <main id="contenu" className="pt-[68px]">
        <section className="bg-paper py-20 sm:py-24">
          <div className="mx-auto max-w-[760px] px-5 sm:px-8">
            <h1 className="font-display text-[34px] leading-[1.15] text-ink sm:text-[42px]">
              Mentions légales
            </h1>

            <div className="mt-10 space-y-10 text-[16px] leading-[1.8] text-graphite">
              <section>
                <h2 className="font-display text-[24px] text-ink">Éditeur du site</h2>
                <p className="mt-3">
                  {siteConfig.name}
                  <br />
                  Paysagiste — {siteConfig.areaLong}
                  <br />
                  Email :{" "}
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="border-b border-ink/30 text-ink hover:border-ink"
                  >
                    {siteConfig.email}
                  </a>
                  <br />
                  Téléphone : {siteConfig.phone}
                </p>
                <dl className="mt-6 grid gap-x-8 gap-y-3 sm:grid-cols-[220px_1fr]">
                  {legalRows.map(([label, value]) => (
                    <div key={label} className="contents">
                      <dt className="text-[14px] text-mute">{label}</dt>
                      <dd className={value ? "text-ink" : "text-mute italic"}>
                        {value || "À compléter"}
                      </dd>
                    </div>
                  ))}
                </dl>
              </section>

              <section>
                <h2 className="font-display text-[24px] text-ink">Hébergement</h2>
                <p className="mt-3">
                  Site hébergé par Vercel Inc., 340 S Lemon Ave #4133, Walnut,
                  CA 91789, États-Unis — vercel.com
                </p>
              </section>

              <section>
                <h2 className="font-display text-[24px] text-ink">
                  Propriété intellectuelle
                </h2>
                <p className="mt-3">
                  L&apos;ensemble des contenus de ce site (textes,
                  photographies, logo, plans) est la propriété de{" "}
                  {siteConfig.name}, sauf mention contraire. Toute
                  reproduction sans autorisation écrite est interdite.
                </p>
              </section>

              <section>
                <h2 className="font-display text-[24px] text-ink">
                  Données personnelles
                </h2>
                <p className="mt-3">
                  Les modalités de traitement des données transmises via le
                  formulaire de devis sont détaillées dans notre{" "}
                  <a
                    href="/politique-confidentialite"
                    className="border-b border-ink/30 text-ink hover:border-ink"
                  >
                    politique de confidentialité
                  </a>
                  .
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
