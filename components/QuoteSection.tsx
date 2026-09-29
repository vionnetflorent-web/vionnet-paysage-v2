import Reveal from "./Reveal";
import QuoteForm from "./QuoteForm";
import { siteConfig } from "@/lib/content";

/** Section de conversion principale : contexte à gauche, formulaire à droite. */
export default function QuoteSection({
  title = "Demander un devis",
  intro = "Décrivez votre projet en quelques lignes. Nous vous répondons rapidement et convenons d'une visite du terrain avant tout chiffrage.",
}: {
  title?: string;
  intro?: string;
}) {
  return (
    <section id="contact" className="border-t border-line bg-paper py-24 sm:py-28 lg:py-32">
      <div className="mx-auto max-w-content px-5 sm:px-8 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <p className="text-[11px] uppercase tracking-eyebrow text-mute">
              Contact
            </p>
            <h2 className="mt-6 font-display text-[30px] leading-[1.15] text-ink sm:text-[40px]">
              {title}
            </h2>
            <p className="mt-6 max-w-prose text-[16px] leading-[1.8] text-graphite">
              {intro}
            </p>

            <dl className="mt-10 space-y-6 border-t border-line pt-8">
              <div>
                <dt className="text-[11px] uppercase tracking-[0.16em] text-mute">
                  Email
                </dt>
                <dd className="mt-2">
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="font-display text-[22px] text-ink transition-colors hover:text-accent sm:text-[24px]"
                  >
                    {siteConfig.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-[11px] uppercase tracking-[0.16em] text-mute">
                  Téléphone
                </dt>
                <dd className="mt-2">
                  <a
                    href={`tel:${siteConfig.phoneHref}`}
                    className="font-display text-[22px] text-ink transition-colors hover:text-accent sm:text-[24px]"
                  >
                    {siteConfig.phone}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-[11px] uppercase tracking-[0.16em] text-mute">
                  Secteur
                </dt>
                <dd className="mt-2 text-[16px] text-graphite">
                  {siteConfig.areaLong}
                </dd>
              </div>
              {/* Lien vers la fiche Google Business Profile. N'apparaît que
                  lorsque siteConfig.googleBusinessUrl est renseignée. Un lien
                  vers la fiche est plus utile — et plus léger — qu'une carte
                  intégrée : pas de script tiers, pas de cookie à déclarer. */}
              {siteConfig.googleBusinessUrl && (
                <div>
                  <dt className="text-[11px] uppercase tracking-[0.16em] text-mute">
                    Sur Google
                  </dt>
                  <dd className="mt-2">
                    <a
                      href={siteConfig.googleBusinessUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 border-b border-ink/30 pb-1 text-[16px] text-ink transition-colors hover:border-ink hover:text-accent"
                    >
                      Voir notre fiche et nos avis
                      <span aria-hidden className="font-display text-[18px]">
                        →
                      </span>
                    </a>
                  </dd>
                </div>
              )}
            </dl>
          </Reveal>

          <Reveal className="lg:col-span-7" delay={120}>
            <QuoteForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
