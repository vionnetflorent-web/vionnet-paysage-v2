import Image from "next/image";
import Link from "next/link";
import Reveal from "./Reveal";
import { services } from "@/lib/content";

/**
 * Les trois prestations, en blocs alternés pleine largeur.
 * Les données viennent de `services` (lib/content.ts) : ajoutez une entrée
 * pour créer un nouveau bloc, sans toucher à ce composant.
 */
export default function Services() {
  return (
    <section id="services" className="bg-paper">
      {services.map((service, index) => {
        const reversed = index % 2 === 1;
        return (
          <article
            key={service.id}
            id={service.id}
            className={`border-t border-line ${
              reversed ? "bg-cream/60" : "bg-paper"
            }`}
          >
            <div className="mx-auto max-w-content px-5 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-28">
              <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
                {/* Visuel */}
                <Reveal
                  className={`lg:col-span-7 ${
                    reversed ? "lg:order-2 lg:col-start-6" : ""
                  }`}
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-cream">
                    {service.image ? (
                      <Image
                        src={service.image}
                        alt={service.imageAlt}
                        fill
                        sizes="(min-width: 1024px) 720px, 100vw"
                        className="object-cover transition-transform duration-[1200ms] ease-premium hover:scale-[1.03]"
                      />
                    ) : (
                      // Emplacement réservé : remplacez `image` dans
                      // lib/content.ts pour afficher la photographie.
                      <div className="flex h-full w-full items-end border border-line/80 bg-[linear-gradient(135deg,#efece4_0%,#e7e3d8_100%)] p-6">
                        <span className="text-[11px] uppercase tracking-[0.2em] text-mute">
                          {service.imagePlaceholder}
                        </span>
                      </div>
                    )}
                  </div>
                </Reveal>

                {/* Texte */}
                <Reveal
                  className={`lg:col-span-5 ${reversed ? "lg:order-1 lg:col-start-1" : ""}`}
                  delay={120}
                >
                  <p className="font-display text-[15px] tracking-[0.2em] text-accent">
                    {service.number}
                  </p>
                  <h2 className="mt-4 font-display text-[30px] leading-[1.15] text-ink sm:text-[38px]">
                    {service.title}
                  </h2>
                  <p className="mt-5 max-w-prose text-[16px] leading-[1.8] text-graphite">
                    {service.lead}
                  </p>

                  <ul className="mt-8 grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2">
                    {service.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-baseline gap-3 text-[15px] text-graphite"
                      >
                        <span
                          aria-hidden
                          className="mt-[7px] h-px w-3 shrink-0 bg-accent"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>

                  {service.href && (
                    <Link
                      href={service.href}
                      className="mt-8 inline-flex items-center gap-2 border-b border-ink/30 pb-1 text-[12px] uppercase tracking-[0.16em] text-ink transition-colors duration-300 hover:border-ink"
                    >
                      En savoir plus
                      <span aria-hidden className="font-display text-base">
                        →
                      </span>
                    </Link>
                  )}
                </Reveal>
              </div>
            </div>
          </article>
        );
      })}
    </section>
  );
}
