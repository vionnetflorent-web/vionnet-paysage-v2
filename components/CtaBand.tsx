
import Link from "next/link";
import Reveal from "./Reveal";
import { siteConfig } from "@/lib/content";

export default function CtaBand({
  title = "Et si votre extérieur devenait un vrai projet ?",
  text = "Visite du terrain et devis détaillé, sans engagement.",
  tone = "dark",
}: {
  title?: string;
  text?: string;
  tone?: "dark" | "light";
}) {
  const dark = tone === "dark";
  return (
    <section
      className={`border-t pb-[clamp(28px,3.5vw,44px)] pt-[clamp(56px,7vw,80px)] ${
        dark ? "border-forest bg-forest" : "border-line bg-paper pb-[clamp(56px,7vw,80px)]"
      }`}
    >
      <Reveal className="mx-auto flex max-w-content flex-wrap items-center justify-between gap-8 px-[clamp(20px,4vw,48px)]">
        <div className="max-w-[640px]">
          <h2 className={`font-display text-[clamp(26px,3.2vw,34px)] font-normal leading-[1.2] ${dark ? "text-white" : "text-ink"}`}>
            {title}
          </h2>
          <p className={`mt-4 text-[16px] leading-[1.75] ${dark ? "text-[#e9efea]" : "text-graphite"}`}>
            {text}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-5">
          <Link
            href="/#contact"
            className={
              dark
                ? "inline-flex min-h-[48px] items-center justify-center rounded-[2px] border border-white/45 px-7 text-[12px] font-medium uppercase tracking-[0.16em] text-white transition-all duration-500 ease-premium hover:bg-white hover:text-ink"
                : "inline-flex min-h-[48px] items-center justify-center rounded-[2px] bg-forest px-7 text-[12px] font-medium uppercase tracking-[0.16em] text-paper transition-colors duration-500 ease-premium hover:bg-moss"
            }
          >
            Demander un devis
          </Link>
          <a
            href={`tel:${siteConfig.phoneHref}`}
            className={`text-[15px] ${dark ? "text-[#e9efea] hover:text-white" : "text-graphite hover:text-ink"}`}
          >
            {siteConfig.phone}
          </a>
        </div>
      </Reveal>
    </section>
  );
}
