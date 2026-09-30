import Image from "next/image";
import Reveal from "./Reveal";
import { realisations, type Realisation } from "@/lib/content";

const spans = [
  "lg:col-span-7",
  "lg:col-span-5",
  "lg:col-span-5",
  "lg:col-span-7",
  "lg:col-span-6",
  "lg:col-span-6",
];

export default function Realisations() {
  return (
    <section id="realisations" className="border-t border-line bg-paper py-[clamp(72px,9vw,128px)]">
      <div className="mx-auto max-w-content px-[clamp(20px,4vw,48px)]">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="text-[11px] uppercase tracking-eyebrow text-mute">Réalisations</p>
            <h2 className="mt-6 max-w-[620px] font-display text-[clamp(30px,3.8vw,40px)] font-normal leading-[1.15] text-ink">
              Nos chantiers dans les Côtes-d&apos;Armor
            </h2>
          </div>
          <p className="max-w-[360px] text-[15px] leading-[1.75] text-graphite">
            Les photographies de chantiers sont ajoutées au fil des réalisations.
          </p>
        </Reveal>

        <div className="mt-14 grid items-start gap-8 lg:grid-cols-12 lg:gap-x-8 lg:gap-y-14">
          {realisations.map((item, i) => (
            <RealisationCard key={item.slug} item={item} index={i} className={spans[i % spans.length]} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function RealisationCard({
  item,
  index = 0,
  className = "",
}: {
  item: Realisation;
  index?: number;
  className?: string;
}) {
  const title = item.commune ? `${item.type} — ${item.commune}` : item.type;
  return (
    <Reveal delay={(index % 4) * 90} className={className}>
      <div className="vp-tile relative flex aspect-[3/2] w-full items-end overflow-hidden border border-line bg-[linear-gradient(135deg,#efece4_0%,#e5e1d5_100%)] p-6">
        {item.image ? (
          <Image
            src={item.image}
            alt={item.imageAlt ?? title}
            fill
            sizes="(min-width: 1024px) 700px, 100vw"
            className="object-cover"
          />
        ) : (
          <span className="text-[11px] uppercase tracking-[0.2em] text-mute">Photographie à venir</span>
        )}
      </div>
      <h3 className="mt-4 font-display text-[21px] font-normal text-ink">{title}</h3>
      {item.prestations && (
        <p className="mt-1 text-[14px] leading-[1.7] text-graphite">{item.prestations}</p>
      )}
    </Reveal>
  );
}
