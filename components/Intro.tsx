import Reveal from "./Reveal";
import { siteConfig } from "@/lib/content";

/** Présentation courte de l'entreprise, juste après le Hero. */
export default function Intro() {
  return (
    <section className="bg-paper py-24 sm:py-32 lg:py-40">
      <div className="mx-auto max-w-content px-5 sm:px-8 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-4">
            <p className="text-[11px] uppercase tracking-eyebrow text-mute">
              {siteConfig.name}
            </p>
            <p className="mt-6 font-display text-[26px] leading-[1.25] text-ink sm:text-[32px]">
              Une entreprise de paysage installée dans les {siteConfig.department}.
            </p>
          </Reveal>

          <Reveal className="lg:col-span-7 lg:col-start-6" delay={120}>
            <div className="space-y-6 text-[16px] leading-[1.8] text-graphite sm:text-[17px]">
              <p>
                Nous concevons et réalisons des jardins et des aménagements
                extérieurs autour de Saint-Quay Portrieux : étude du terrain,
                plans, terrassement, maçonnerie paysagère, terrasse bois,
                plantations, clôtures et arrosage automatique.
              </p>
              <p>
                Chaque projet part des contraintes réelles du site — nature du
                sol, exposition, accès, gestion de l&apos;eau — et de vos usages.
                C&apos;est ce qui détermine le dessin, le choix des végétaux et
                celui des matériaux.
              </p>
              <p>
                Nous assurons l&apos;exécution des travaux et, lorsque vous le
                souhaitez, l&apos;entretien qui suit. Un seul interlocuteur, du
                premier relevé au suivi des plantations.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
