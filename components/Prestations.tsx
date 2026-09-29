import Link from "next/link";
import Reveal from "./Reveal";
import { services, siteConfig } from "@/lib/content";

/**
 * Prestations — liste sobre, sans encadrés.
 *
 * Rôle double : informer le visiteur et assurer le maillage interne vers
 * les pages de prestations (lib/servicePages.ts), qui sont les pages
 * positionnées sur les recherches « création jardin », « terrasse », etc.
 */
export default function Prestations() {
  return (
    <section
      id="prestations"
      className="border-t border-line bg-paper py-20 sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-content px-5 sm:px-8 lg:px-12">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-4">
            <p className="text-[11px] uppercase tracking-eyebrow text-mute">
              Prestations
            </p>
            <h2 className="mt-6 font-display text-[28px] leading-[1.18] text-ink sm:text-[34px]">
              Conception, aménagement et entretien
            </h2>
            <p className="mt-5 max-w-prose text-[15px] leading-[1.75] text-graphite">
              Dans les {siteConfig.department}.
            </p>
          </Reveal>

          <Reveal className="lg:col-span-7 lg:col-start-6" delay={120}>
            <ul className="border-t border-line">
              {services.map((service) => (
                <li key={service.id} className="border-b border-line">
                  {service.href ? (
                    <Link
                      href={service.href}
                      className="group block py-6 no-underline"
                    >
                      <span className="flex items-baseline justify-between gap-4">
                        <span className="font-display text-[22px] text-ink transition-colors group-hover:text-accent sm:text-[24px]">
                          {service.title}
                        </span>
                        <span
                          aria-hidden
                          className="font-display text-[18px] text-mute transition-transform duration-500 ease-premium group-hover:translate-x-1"
                        >
                          →
                        </span>
                      </span>
                      <span className="mt-2 block max-w-prose text-[15px] leading-[1.7] text-graphite">
                        {service.lead}
                      </span>
                    </Link>
                  ) : (
                    <div className="py-6">
                      <span className="font-display text-[22px] text-ink sm:text-[24px]">
                        {service.title}
                      </span>
                      <p className="mt-2 max-w-prose text-[15px] leading-[1.7] text-graphite">
                        {service.lead}
                      </p>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
