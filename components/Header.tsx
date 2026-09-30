"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { navLinks, siteConfig } from "@/lib/content";

const EASE = "ease-premium duration-500";

/**
 * Header — identique à l'aperçu.
 * - Au-dessus du Hero : transparent, SANS logo (le grand logo blanc du Hero
 *   suffit), liens blancs, bouton vert.
 * - Au scroll : fond clair translucide + léger blur, le logo couleur
 *   apparaît en fondu, la barre se resserre.
 * - `overDark={false}` pour les pages sans Hero photographique.
 */
export default function Header({ overDark = true }: { overDark?: boolean }) {
  const [scrolled, setScrolled] = useState(!overDark);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!overDark) return;
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [overDark]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const solid = scrolled || menuOpen;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b transition-all ${EASE} ${
          solid
            ? "border-line/70 bg-paper/85 backdrop-blur-[6px]"
            : "border-transparent bg-transparent"
        }`}
      >
        <div
          className={`mx-auto flex max-w-content items-center justify-between px-[clamp(20px,4vw,48px)] transition-[height] ${EASE} ${
            solid ? "h-[94px]" : "h-[124px]"
          }`}
        >
          <Link
            href="/"
            aria-label={`${siteConfig.name} — accueil`}
            className={`relative block shrink-0 transition-all ${EASE} ${
              solid ? "h-[66px] opacity-100" : "pointer-events-none h-[84px] opacity-0"
            }`}
          >
            <Image
              src="/images/vionnet-logo.png"
              alt={`${siteConfig.name} — paysagiste à Saint-Brieuc`}
              width={1368}
              height={850}
              priority
              sizes="140px"
              className="h-full w-auto"
            />
          </Link>

          <nav aria-label="Navigation principale" className="hidden items-center gap-[clamp(14px,2vw,32px)] min-[921px]:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`vp-underline text-[13px] tracking-[0.04em] transition-colors duration-300 ${
                  solid ? "text-graphite hover:text-ink" : "text-white/85 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/#contact"
              className={`ml-1.5 whitespace-nowrap rounded-[2px] border border-forest bg-forest px-[22px] py-3 text-[11px] font-medium uppercase tracking-[0.16em] text-white transition-all hover:border-moss hover:bg-moss ${EASE}`}
            >
              Demander un devis
            </Link>
          </nav>

          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-controls="menu-mobile"
            aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            className="-mr-2.5 flex h-12 w-12 items-center justify-center min-[921px]:hidden"
          >
            <span className="relative block h-[10px] w-[22px]">
              <span
                className={`absolute left-0 block h-px w-full transition-all duration-[400ms] ease-premium ${
                  solid ? "bg-ink" : "bg-white"
                } ${menuOpen ? "top-[5px] rotate-45" : "top-0"}`}
              />
              <span
                className={`absolute left-0 block h-px w-full transition-all duration-[400ms] ease-premium ${
                  solid ? "bg-ink" : "bg-white"
                } ${menuOpen ? "top-[5px] -rotate-45" : "top-[10px]"}`}
              />
            </span>
          </button>
        </div>
      </header>

      <div id="menu-mobile" hidden={!menuOpen} className="fixed inset-0 z-40 bg-paper min-[921px]:hidden">
        <nav aria-label="Navigation mobile" className="flex h-full flex-col justify-center px-8 pb-16 pt-24">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="border-b border-line py-5 font-display text-[28px] text-ink"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/#contact"
            onClick={() => setMenuOpen(false)}
            className="mt-8 inline-flex min-h-[52px] items-center justify-center rounded-[2px] bg-forest text-[12px] font-medium uppercase tracking-[0.16em] text-paper"
          >
            Demander un devis
          </Link>
          <a href={`tel:${siteConfig.phoneHref}`} className="mt-6 text-center text-[15px] text-graphite">
            {siteConfig.phone}
          </a>
        </nav>
      </div>
    </>
  );
}
