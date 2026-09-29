import Reveal from "./Reveal";
import { methodSteps } from "@/lib/content";

/** Méthode / accompagnement — quatre étapes, fond sombre pour marquer le rythme. */
export default function Method() {
  return (
    <section id="methode" className="bg-forest py-24 sm:py-28 lg:py-32">
      <div className="mx-auto max-w-content px-5 sm:px-8 lg:px-12">
        <Reveal>
          <p className="text-[11px] uppercase tracking-eyebrow text-[#d3ddd3]">
            Notre méthode
          </p>
          <h2 className="mt-6 max-w-[620px] font-display text-[30px] leading-[1.15] text-white sm:text-[40px]">
            Du premier relevé à la reprise des plantations
          </h2>
        </Reveal>

        <ol className="mt-14 grid gap-px border-t border-white/15 sm:grid-cols-2 lg:grid-cols-4">
          {methodSteps.map((step, i) => (
            <Reveal as="li" key={step.step} delay={i * 90}>
              <div className="h-full border-b border-white/15 py-8 pr-6 sm:border-r sm:pl-0 lg:py-10">
                <p className="font-display text-[15px] tracking-[0.2em] text-[#cdd9cd]">
                  {step.step}
                </p>
                <h3 className="mt-4 font-display text-[22px] text-white sm:text-[24px]">
                  {step.title}
                </h3>
                <p className="mt-3 text-[15px] leading-[1.75] text-[#e6ede6]">
                  {step.text}
                </p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
