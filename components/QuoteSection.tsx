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
    <section id="contact" className="border-t border-line bg-paper py-[clamp(72px,9vw,128px)]">
      <div className="mx-auto max-w-content px-[clamp(20px,4vw,48px)]">
        <div className="flex flex-wrap gap-[clamp(32px,5vw,64px)]">
          <Reveal className="flex-[1_1_320px]">
            <p className="text-[11px] uppercase tracking-eyebrow text-mute">
              Contact
            </p>
            <h2 className="mt-6 font-display text-[clamp(30px,3.8vw,40px)] font-normal leading-[1.15] text-ink">
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
                    className="font-display text-[24px] text-ink"
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
                    className="font-display text-[24px] text-ink"
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

          <Reveal className="flex-[1.4_1_400px]" delay={90}>
            <QuoteForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
