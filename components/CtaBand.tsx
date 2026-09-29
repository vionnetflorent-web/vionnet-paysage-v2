import Reveal from "./Reveal";
import Button from "./Button";
import { siteConfig } from "@/lib/content";

/**
 * Bande d'appel à l'action, réutilisée à plusieurs endroits du parcours
 * (après les services, après les réalisations…). `tone` permet d'alterner
 * avec la section qui précède sans casser le rythme visuel.
 */
export default function CtaBand({
  title,
  text,
  tone = "dark",
}: {
  title: string;
  text?: string;
  tone?: "dark" | "light";
}) {
  const dark = tone === "dark";

  return (
    <section
      className={`border-t py-16 sm:py-20 ${
        dark ? "border-forest bg-forest" : "border-line bg-paper"
      }`}
    >
      <div className="mx-auto max-w-content px-5 sm:px-8 lg:px-12">
        <Reveal>
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-[640px]">
              <h2
                className={`font-display text-[26px] leading-[1.2] sm:text-[34px] ${
                  dark ? "text-white" : "text-ink"
                }`}
              >
                {title}
              </h2>
              {text && (
                <p
                  className={`mt-4 text-[16px] leading-[1.75] ${
                    dark ? "text-[#e6ede6]" : "text-graphite"
                  }`}
                >
                  {text}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
              <Button href="/devis" variant={dark ? "light" : "solid"}>
                Demander un devis
              </Button>
              <a
                href={`tel:${siteConfig.phoneHref}`}
                className={`text-[15px] tracking-[0.02em] transition-colors sm:px-2 ${
                  dark ? "text-[#e6ede6] hover:text-white" : "text-graphite hover:text-ink"
                }`}
              >
                {siteConfig.phone}
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
