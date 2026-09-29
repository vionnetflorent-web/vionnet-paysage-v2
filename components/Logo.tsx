import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/lib/content";

/**
 * Logo Vionnet Paysage.
 *
 * ⚠️ Les deux variantes pointent vers les FICHIERS ORIGINAUX du logo.
 * La version blanche est le même fichier recoloré (formes, proportions et
 * typographie strictement identiques). Le logo n'est jamais redessiné,
 * ni reconstitué en HTML/CSS avec une autre police.
 */
export default function Logo({
  variant = "colour",
  className = "",
  priority = false,
  linkTo = "/",
}: {
  variant?: "colour" | "white";
  className?: string;
  priority?: boolean;
  /** Passez null pour un logo non cliquable (ex. dans le Hero). */
  linkTo?: string | null;
}) {
  const src =
    variant === "white"
      ? "/images/vionnet-logo-blanc.png"
      : "/images/vionnet-logo.png";

  const image = (
    <Image
      src={src}
      alt={siteConfig.name}
      width={1368}
      height={850}
      priority={priority}
      sizes="(min-width: 1024px) 520px, 60vw"
      className={`h-auto w-full ${className}`}
    />
  );

  if (!linkTo) return image;

  return (
    <Link href={linkTo} aria-label={`${siteConfig.name} — accueil`} className="block">
      {image}
    </Link>
  );
}
