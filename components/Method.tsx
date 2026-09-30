import Reveal from "./Reveal";

const steps = [
  {
    title: "Visite du terrain",
    text: "Une première rencontre pour comprendre vos attentes, observer le lieu et définir les grandes orientations du projet.",
  },
  {
    title: "Conception du projet",
    text: "À partir de cette première analyse, nous donnons forme au projet : plans, ambiances, matériaux et palette végétale.",
  },
  {
    title: "Réalisation",
    text: "Nous conduisons le chantier de bout en bout, avec un interlocuteur unique et un site tenu propre.",
  },
  {
    title: "Suivi",
    text: "Nous vous accompagnons sur la reprise des plantations et, si vous le souhaitez, sur l'entretien courant.",
  },
];

/** Méthode : frise en 4 étapes sur fond vert, qui s'allume de gauche à droite. */
export default function Method() {
  return (
    <section id="methode" className="bg-forest pb-[clamp(72px,9vw,120px)] pt-[clamp(24px,3vw,40px)]">
      <div className="mx-auto max-w-content px-[clamp(20px,4vw,48px)]">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="text-[11px] uppercase tracking-eyebrow text-[#dbe3dd]">Notre méthode</p>
            <h2 className="mt-6 max-w-[620px] font-display text-[clamp(30px,3.8vw,40px)] font-normal leading-[1.15] text-white">
              Du premier relevé à la reprise des plantations
            </h2>
          </div>
          <p className="max-w-[320px] text-[15px] leading-[1.75] text-[#e9efea]">
            Quatre étapes, un seul interlocuteur du début à la fin du chantier.
          </p>
        </Reveal>

        <ol className="mt-16 grid grid-cols-1 min-[561px]:grid-cols-2 min-[901px]:grid-cols-4">
          {steps.map((step, i) => (
            <Reveal
              as="li"
              key={step.title}
              delay={i * 800}
              className="relative border-t border-white/[0.22] pb-12 pr-7 pt-10"
            >
              <span aria-hidden className="absolute -top-[5px] left-0 h-[9px] w-[9px] rounded-full bg-[#c9d6cd]" />
              <p className="font-display text-[42px] leading-none text-[#a7bcb0]">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-3.5 font-display text-[23px] font-normal text-white">{step.title}</h3>
              <p className="mt-2.5 text-[15px] leading-[1.75] text-[#e9efea]">{step.text}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
