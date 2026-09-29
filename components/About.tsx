import Image from "next/image";
import Reveal from "./Reveal";
import { siteConfig } from "@/lib/content";

// 📷 PORTRAIT : déposez votre photo dans /public/images/portrait.jpg puis
// renseignez le chemin ci-dessous. Tant que la valeur est vide, un
// emplacement réservé sobre est affiché à la place.
const portrait = "";

/** « À propos de moi » — portrait + texte à la première personne. */
export default function About() {
  return (
    <section
      id="a-propos"
      className="border-t border-line bg-cream/60 py-24 sm:py-28 lg:py-32"
    >
      <div className="mx-auto max-w-content px-5 sm:px-8 lg:px-12">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-20">
          <Reveal className="lg:col-span-5">
            <div className="relative aspect-[4/5] w-full overflow-hidden border border-line bg-paper">
              {portrait ? (
                <Image
                  src={portrait}
                  alt={`Portrait de ${siteConfig.owner}`}
                  fill
                  sizes="(min-width: 1024px) 480px, 100vw"
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-end bg-[linear-gradient(135deg,#efece4_0%,#e5e1d5_100%)] p-6">
                  <span className="text-[11px] uppercase tracking-[0.2em] text-mute">
                    Portrait — photographie à ajouter
                  </span>
                </div>
              )}
            </div>
          </Reveal>

          <Reveal className="lg:col-span-6 lg:col-start-7" delay={120}>
            <p className="text-[11px] uppercase tracking-eyebrow text-mute">
              À propos de moi
            </p>
            <h2 className="mt-6 font-display text-[30px] leading-[1.15] text-ink sm:text-[40px]">
              Florent Vionnet — Paysagiste à Saint-Quay Portrieux
            </h2>

            <div className="mt-6 space-y-5 text-[16px] leading-[1.8] text-graphite">
              <p>
                En tant que paysagiste indépendant, j&apos;aborde chaque projet
                comme un véritable projet d&apos;aménagement, avec une attention
                particulière portée aux lignes, aux volumes et au végétal.
              </p>
              <p>
                Mon parcours m&apos;a naturellement amené vers la conception de
                jardins, avec l&apos;envie de créer des espaces aussi structurés
                qu&apos;agréables à vivre.
              </p>
              <p>
                Votre projet commence par un échange. Contactez-moi pour en
                parler.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
