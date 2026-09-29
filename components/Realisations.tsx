import Image from "next/image";
import Reveal from "./Reveal";
import Button from "./Button";
import { realisations, type Realisation } from "@/lib/content";

// Grille asymétrique : les tuiles mises en avant occupent plus de largeur.
// Les classes sont écrites en littéral (obligatoire pour Tailwind).
const spans = [
  "lg:col-span-7",
  "lg:col-span-5",
  "lg:col-span-5",
  "lg:col-span-7",
  "lg:col-span-6",
  "lg:col-span-6",
];

export function RealisationCard({
  item,
  index,
  className = "",
}: {
  item: Realisation;
  index: number;
  className?: string;
}) {
  const tall = Boolean(item.featured);

  return (
    <Reveal as="figure" delay={(index % 3) * 100} className={className}>
      <div
        className={`group relative w-full overflow-hidden bg-cream ${
          tall ? "aspect-[4/3]" : "aspect-[3/2]"
        }`}
      >
        {item.image ? (
          <Image
            src={item.image}
            alt={item.imageAlt ?? `${item.type} — Vionnet Paysage`}
            fill
            sizes="(min-width: 1024px) 640px, 100vw"
            className="object-cover transition-transform duration-[1400ms] ease-premium group-hover:scale-[1.04]"
          />
        ) : (
          // Emplacement réservé. Renseignez `image` dans lib/content.ts
          // pour afficher la photographie du chantier.
          <div className="flex h-full w-full items-end border border-line/80 bg-[linear-gradient(135deg,#efece4_0%,#e5e1d5_100%)] p-6">
            <span className="text-[11px] uppercase tracking-[0.2em] text-mute">
              Photographie à venir
            </span>
          </div>
        )}
      </div>

      <figcaption className="mt-4 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h3 className="font-display text-[20px] text-ink sm:text-[22px]">
          {item.type}
          {/* La commune n'est affichée que si elle est réellement renseignée. */}
          {item.commune && (
            <span className="text-mute"> — {item.commune}</span>
          )}
        </h3>
        {item.prestations && (
          <p className="text-[14px] text-graphite">{item.prestations}</p>
        )}
      </figcaption>
    </Reveal>
  );
}

/** Galerie des réalisations — aperçu sur la page d'accueil. */
export default function Realisations() {
  return (
    <section id="realisations" className="border-t border-line bg-paper py-24 sm:py-28 lg:py-32">
      <div className="mx-auto max-w-content px-5 sm:px-8 lg:px-12">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="text-[11px] uppercase tracking-eyebrow text-mute">
                Réalisations
              </p>
              <h2 className="mt-6 max-w-[620px] font-display text-[30px] leading-[1.15] text-ink sm:text-[40px]">
                Nos chantiers dans les Côtes-d&apos;Armor
              </h2>
            </div>
            <p className="max-w-[360px] text-[15px] leading-[1.75] text-graphite">
              Les photographies de chantiers sont ajoutées au fil des
              réalisations.
            </p>
          </div>
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

        <Reveal className="mt-14">
          <Button href="/realisations" variant="outline">
            Toutes les réalisations
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
