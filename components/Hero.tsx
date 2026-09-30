import Image from "next/image";
import Link from "next/link";

/** Hero plein écran — photographie, logo blanc, titre, deux boutons. */
export default function Hero() {
  return (
    <section id="top" className="relative flex min-h-[100svh] items-end overflow-hidden bg-forest">
      <Image
        src="/images/hero.png"
        alt="Jardin paysager réalisé par Vionnet Paysage dans les Côtes-d'Armor"
        fill
        priority
        sizes="100vw"
        className="vp-zoom object-cover"
      />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(105deg, rgba(30,45,35,.62) 0%, rgba(38,56,44,.34) 42%, rgba(60,80,62,.10) 100%)",
        }}
      />

      <div className="relative mx-auto w-full max-w-content px-[clamp(20px,4vw,48px)] pb-[clamp(64px,8vw,96px)] pt-[140px]">
        <div className="max-w-[760px]">
          <Image
            src="/images/vionnet-logo-blanc.png"
            alt="Vionnet Paysage"
            width={1368}
            height={850}
            priority
            sizes="460px"
            className="vp-in vp-in-1 block h-auto w-[min(78%,460px)]"
          />
          <h1 className="vp-in vp-in-2 mt-10 font-display text-[clamp(34px,5.2vw,58px)] font-normal leading-[1.1] text-white">
            Paysagiste à Saint-Brieuc
          </h1>
          <p className="vp-in vp-in-3 mt-5 max-w-[660px] text-[clamp(16px,1.6vw,18px)] leading-[1.75] text-white/85">
            Conception, aménagement et entretien de jardins à Saint-Brieuc,
            Saint-Quay-Portrieux et dans les Côtes-d&apos;Armor (22).
          </p>
          <div className="vp-in vp-in-4 mt-10 flex flex-wrap gap-3.5">
            <Link
              href="/#contact"
              className="inline-flex min-h-[48px] items-center justify-center rounded-[2px] bg-forest px-7 text-[12px] font-medium uppercase tracking-[0.16em] text-paper transition-colors duration-500 ease-premium hover:bg-moss"
            >
              Demander un devis
            </Link>
            <Link
              href="/#realisations"
              className="inline-flex min-h-[48px] items-center justify-center rounded-[2px] border border-white/45 px-7 text-[12px] font-medium uppercase tracking-[0.16em] text-white transition-all duration-500 ease-premium hover:bg-white hover:text-ink"
            >
              Voir nos réalisations
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
