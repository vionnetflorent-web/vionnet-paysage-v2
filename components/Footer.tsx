import Image from "next/image";
import Link from "next/link";
import Reveal from "./Reveal";
import { navLinks, siteConfig } from "@/lib/content";

/** Pied de page : photographie en fond, voile vert, logo blanc. */
export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-forest pb-[clamp(28px,3.5vw,44px)] pt-[clamp(56px,7vw,80px)]">
      <Image src="/images/hero.png" alt="" fill sizes="100vw" className="vp-zoom object-cover" />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{ background: "linear-gradient(to bottom, rgba(78,112,80,.55), rgba(66,98,68,.72))" }}
      />
      <div className="relative mx-auto max-w-content px-[clamp(20px,4vw,48px)]">
        <div className="flex flex-wrap gap-[clamp(32px,5vw,64px)]">
          <Reveal className="flex-[1.4_1_300px]">
            <Image
              src="/images/vionnet-logo-blanc.png"
              alt={siteConfig.name}
              width={1368}
              height={850}
              sizes="90px"
              className="block h-[54px] w-auto"
            />
            <p className="mt-6 max-w-[380px] text-[15px] leading-[1.8] text-[#e9efea]">
              Paysagiste à Saint-Brieuc, Saint-Quay-Portrieux et dans les
              Côtes-d&apos;Armor. Conception, aménagement et entretien de jardins.
            </p>
          </Reveal>

          <Reveal delay={90} className="flex-[1_1_180px]">
            <p className="text-[11px] uppercase tracking-[0.16em] text-[#dbe3dd]">Navigation</p>
            <nav aria-label="Pied de page" className="mt-5 flex flex-col gap-3">
              {[...navLinks, { href: "/#contact", label: "Contact" }].map((l) => (
                <Link key={l.href} href={l.href} className="text-[15px] text-[#e9efea] hover:text-white">
                  {l.label}
                </Link>
              ))}
            </nav>
          </Reveal>

          <Reveal delay={180} className="flex-[1_1_220px]">
            <p className="text-[11px] uppercase tracking-[0.16em] text-[#dbe3dd]">Contact</p>
            <div className="mt-5 flex flex-col gap-3 text-[15px]">
              <a href={`mailto:${siteConfig.email}`} className="text-[#e9efea] hover:text-white">
                {siteConfig.email}
              </a>
              <a href={`tel:${siteConfig.phoneHref}`} className="text-[#e9efea] hover:text-white">
                {siteConfig.phone}
              </a>
              <span className="text-[#dbe3dd]">Saint-Brieuc et les Côtes-d&apos;Armor (22)</span>
            </div>
            <Link
              href="/#contact"
              className="mt-8 inline-flex min-h-[48px] items-center justify-center rounded-[2px] border border-white/40 px-6 text-[11px] font-medium uppercase tracking-[0.16em] text-white transition-all duration-500 ease-premium hover:bg-white hover:text-ink"
            >
              Demander un devis
            </Link>
          </Reveal>
        </div>

        <div className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-8 text-[13px] text-[#dbe3dd]">
          <span>© {new Date().getFullYear()} {siteConfig.name}</span>
          <div className="flex flex-wrap gap-6">
            <Link href="/mentions-legales" className="text-[#dbe3dd] hover:text-white">
              Mentions légales
            </Link>
            <Link href="/politique-confidentialite" className="text-[#dbe3dd] hover:text-white">
              Politique de confidentialité
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
