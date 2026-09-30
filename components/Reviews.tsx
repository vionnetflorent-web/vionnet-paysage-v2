import Reveal from "./Reveal";
import { siteConfig } from "@/lib/content";

/**
 * Avis clients.
 *
 * ⚠️ Aucun avis n'est inventé. Cette section présente un emplacement sobre
 * en attendant de vrais avis. Pour les intégrer : remplissez le tableau
 * `reviews` ci-dessous (ou branchez l'API Google Places), puis la grille
 * s'affiche automatiquement à la place du message d'attente.
 */
type Review = { author: string; text: string; commune?: string };

const reviews: Review[] = [];

export default function Reviews() {
  return (
    <section id="avis" className="border-t border-line bg-cream/60 py-[clamp(72px,9vw,112px)]">
      <div className="mx-auto max-w-content px-[clamp(20px,4vw,48px)]">
        <Reveal>
          <p className="text-[11px] uppercase tracking-eyebrow text-mute">
            Avis clients
          </p>
        </Reveal>

        {reviews.length === 0 ? (
          <Reveal delay={80}>
            <div className="mt-8 max-w-[720px]">
              <p className="font-display text-[clamp(24px,3vw,30px)] leading-[1.3] text-ink">
                Les avis de nos clients seront publiés ici.
              </p>
              <p className="mt-5 text-[16px] leading-[1.8] text-graphite">
                Nous préférons n&apos;afficher que des retours réels et
                vérifiables. Si nous avons travaillé pour vous et que vous
                souhaitez témoigner, écrivez-nous à{" "}
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="border-b border-ink/30 text-ink transition-colors hover:border-ink"
                >
                  {siteConfig.email}
                </a>
                .
              </p>
              {siteConfig.googleBusinessUrl && (
                <a
                  href={siteConfig.googleBusinessUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 inline-flex items-center gap-2 border-b border-ink/30 pb-1 text-[12px] uppercase tracking-[0.16em] text-ink transition-colors hover:border-ink"
                >
                  Laisser un avis Google
                  <span aria-hidden className="font-display text-base">
                    →
                  </span>
                </a>
              )}
            </div>
          </Reveal>
        ) : (
          <ul className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {reviews.map((review, i) => (
              <Reveal as="li" key={review.author} delay={i * 90}>
                <blockquote className="border-t border-line pt-6">
                  <p className="text-[16px] leading-[1.8] text-graphite">
                    {review.text}
                  </p>
                  <footer className="mt-4 text-[13px] uppercase tracking-[0.14em] text-mute">
                    {review.author}
                    {review.commune && ` — ${review.commune}`}
                  </footer>
                </blockquote>
              </Reveal>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
