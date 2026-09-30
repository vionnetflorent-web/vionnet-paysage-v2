import Image from "next/image";
import Reveal from "./Reveal";

/**
 * À propos de moi. Pour ajouter votre portrait : déposez la photo dans
 * public/images/portrait.jpg puis remplacez PORTRAIT par "/images/portrait.jpg".
 */
const PORTRAIT: string | null = null;

export default function About() {
  return (
    <section id="a-propos" className="border-t border-line bg-cream/60 py-[clamp(72px,9vw,128px)]">
      <div className="mx-auto flex max-w-content flex-wrap items-center gap-[clamp(32px,5vw,72px)] px-[clamp(20px,4vw,48px)]">
        <Reveal className="flex-[1_1_320px]">
          <div className="relative flex aspect-[4/5] w-full items-end overflow-hidden rounded-[2px] border border-line bg-[linear-gradient(135deg,#efece4_0%,#e5e1d5_100%)] p-6">
            {PORTRAIT ? (
              <Image
                src={PORTRAIT}
                alt="Florent Vionnet, paysagiste"
                fill
                sizes="(min-width: 1024px) 480px, 100vw"
                className="object-cover"
              />
            ) : (
              <span className="text-[11px] uppercase tracking-[0.2em] text-mute">Portrait</span>
            )}
          </div>
        </Reveal>
        <Reveal delay={90} className="flex-[1.3_1_380px]">
          <p className="text-[11px] uppercase tracking-eyebrow text-mute">À propos de moi</p>
          <h2 className="mt-6 font-display text-[clamp(30px,3.8vw,40px)] font-normal leading-[1.15] text-ink">
            Florent Vionnet — Paysagiste à Saint-Quay portrieux
          </h2>
          <p className="mt-6 max-w-[620px] text-[16px] leading-[1.8] text-graphite">
            En tant que paysagiste indépendant, j’aborde chaque projet comme un
            véritable projet d’aménagement, avec une attention particulière
            portée aux lignes, aux volumes et au végétal.
          </p>
          <p className="mt-5 max-w-[620px] text-[16px] leading-[1.8] text-graphite">
            Mon parcours m’a naturellement amené vers la conception de jardins,
            avec l’envie de créer des espaces aussi structurés qu’agréables à
            vivre.
          </p>
          <p className="mt-5 max-w-[620px] text-[16px] leading-[1.8] text-graphite">
            Votre projet commence par un échange. Contactez-moi pour en parler.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
