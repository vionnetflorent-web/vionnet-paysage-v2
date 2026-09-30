import Reveal from "./Reveal";

/** Présentation courte de l'entreprise. */
export default function Intro() {
  return (
    <section className="bg-paper py-[clamp(80px,10vw,160px)]">
      <div className="mx-auto flex max-w-content flex-wrap gap-[clamp(32px,5vw,64px)] px-[clamp(20px,4vw,48px)]">
        <Reveal className="flex-[1_1_280px]">
          <p className="text-[11px] uppercase tracking-eyebrow text-mute">Vionnet Paysage</p>
          <h2 className="mt-6 font-display text-[clamp(26px,3vw,32px)] font-normal leading-[1.25] text-ink">
            Une entreprise de paysage installée dans les Côtes-d&apos;Armor.
          </h2>
        </Reveal>
        <Reveal
          delay={90}
          className="flex flex-[1.6_1_420px] flex-col gap-6 text-[clamp(16px,1.5vw,17px)] leading-[1.8] text-graphite"
        >
          <p>
            Nous concevons et réalisons des jardins et des aménagements
            extérieurs autour de Saint-Quay Portrieux : étude du terrain, plans,
            terrassement, maçonnerie paysagère, terrasse bois, plantations,
            clôtures et arrosage automatique.
          </p>
          <p>
            Chaque projet commence par une lecture du lieu : son exposition, ses
            accès, ses usages et son architecture. Ces contraintes dessinent le
            projet et orientent le choix des végétaux et des matériaux, dans une
            recherche de continuité avec l’habitation.
          </p>
          <p>
            Nous assurons l&apos;exécution des travaux et, lorsque vous le
            souhaitez, l&apos;entretien qui suit. Un seul interlocuteur, du
            premier relevé au suivi des plantations.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
