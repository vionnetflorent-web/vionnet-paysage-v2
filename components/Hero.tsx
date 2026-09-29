import Image from "next/image";
import Logo from "./Logo";
import Button from "./Button";
import { siteConfig } from "@/lib/content";

/**
 * Hero plein écran.
 *
 * 📷 PHOTOGRAPHIE : remplacez /public/images/hero.png par votre propre
 * photographie de jardin (paysage contemporain, terrasse, plantations).
 * Conservez le même nom de fichier — rien d'autre n'est à modifier.
 * L'image actuelle est un fond sombre neutre de remplacement : elle
 * garantit le contraste nécessaire au logo blanc en attendant la photo.
 */
export default function Hero() {
  return (
    <section className="relative flex min-h-[100svh] items-end overflow-hidden bg-forest">
      <Image
        src="/images/hero.png"
        alt="Jardin paysager réalisé par Vionnet Paysage dans les Côtes-d'Armor"
        fill
        priority
        sizes="100vw"
        quality={85}
        className="object-cover"
      />
      {/* Voiles de lisibilité — garantissent le contraste du texte blanc */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/35 to-black/45"
      />

      <div className="relative mx-auto w-full max-w-content px-5 pb-16 pt-32 sm:px-8 sm:pb-20 lg:px-12 lg:pb-24">
        <div className="max-w-[760px]">
          {/* Logo original en version blanche */}
          <div className="w-[min(78vw,460px)]">
            <Logo variant="white" linkTo={null} priority />
          </div>

          <h1 className="mt-10 font-display text-[34px] font-normal leading-[1.1] text-white sm:text-[46px] lg:text-[58px]">
            Paysagiste à {siteConfig.cityTarget}
          </h1>
          <p className="mt-5 max-w-prose text-[16px] leading-[1.75] text-white/85 sm:text-[18px]">
            Conception, aménagement et entretien de jardins à{" "}
            {siteConfig.cityTarget}, {siteConfig.city} et dans les{" "}
            {siteConfig.department} ({siteConfig.departmentCode}).
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:gap-4">
            <Button href="/devis">Demander un devis</Button>
            <Button href="/#realisations" variant="light">
              Voir nos réalisations
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
