import Link from "next/link";

type Variant = "solid" | "outline" | "light";

const base =
  "inline-flex items-center justify-center gap-2 rounded-[2px] px-7 py-4 text-[12px] font-medium uppercase tracking-[0.16em] transition-all duration-500 ease-premium min-h-[48px]";

const variants: Record<Variant, string> = {
  // CTA principal — vert profond, sobre.
  solid: "bg-forest text-paper hover:bg-moss",
  // CTA secondaire sur fond clair.
  outline: "border border-ink/25 text-ink hover:border-ink hover:bg-ink hover:text-paper",
  // CTA secondaire sur photographie sombre.
  light: "border border-white/45 text-white hover:bg-white hover:text-ink",
};

/** Bouton d'action réutilisable — micro-interaction discrète au survol. */
export default function Button({
  href,
  children,
  variant = "solid",
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
}) {
  return (
    <Link href={href} className={`${base} ${variants[variant]} ${className}`}>
      {children}
    </Link>
  );
}
