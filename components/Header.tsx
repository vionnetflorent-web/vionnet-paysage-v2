"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { navLinks, siteConfig } from "@/lib/content";

/**
 * Header premium.
 * - Transparent au-dessus du Hero, logo en version blanche.
 * - Au scroll : fond clair très légèrement translucide, blur léger,
 *   logo couleur. Transition douce et rapide.
 * - `overDark={false}` pour les pages sans Hero photographique : le header
 *   y est clair dès le chargement.
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

  // Bloque le défilement de la page derrière le menu mobile ouvert.
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
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-premium ${
          solid
            ? "border-b border-line/70 bg-paper/85 backdrop-blur-[6px]"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div
          className={`mx-auto flex max-w-content items-center justify-between px-5 transition-all duration-500 ease-premium sm:px-8 lg:px-12 ${
            solid ? "h-[68px]" : "h-[92px]"
          }`}
        >
          {/* Logo — fichier original, simple bascule couleur / blanc */}
          <Link
            href="/"
            aria-label={`${siteConfig.name} — accueil`}
            className="relative block shrink-0"
          >
            <Image
              src={solid ? "/images/vionnet-logo.png" : "/images/vionnet-logo-blanc.png"}
              alt={siteConfig.name}
              width={1368}
              height={850}
              priority
              sizes="180px"
              className={`w-auto transition-all duration-500 ease-premium ${
                solid ? "h-[38px]" : "h-[48px]"
              }`}
            />
          </Link>

          {/* Navigation desktop */}
          <nav
            aria-label="Navigation principale"
            className="hidden items-center gap-8 lg:flex"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-[13px] tracking-[0.04em] transition-colors duration-300 ${
                  solid ? "text-graphite hover:text-ink" : "text-white/85 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/devis"
              className={`ml-2 rounded-[2px] px-6 py-3 text-[11px] font-medium uppercase tracking-[0.16em] transition-all duration-500 ease-premium ${
                solid
                  ? "bg-forest text-paper hover:bg-moss"
                  : "border border-white/50 text-white hover:bg-white hover:text-ink"
              }`}
            >
              Demander un devis
            </Link>
          </nav>

          {/* Bouton menu mobile */}
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-controls="menu-mobile"
            aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            className="-mr-2 flex h-12 w-12 items-center justify-center lg:hidden"
          >
            <span className="relative block h-[10px] w-[22px]">
              <span
                className={`absolute left-0 block h-px w-full transition-all duration-500 ease-premium ${
                  solid ? "bg-ink" : "bg-white"
                } ${menuOpen ? "top-[5px] rotate-45" : "top-0"}`}
              />
              <span
                className={`absolute left-0 block h-px w-full transition-all duration-500 ease-premium ${
                  solid ? "bg-ink" : "bg-white"
                } ${menuOpen ? "top-[5px] -rotate-45" : "top-[10px]"}`}
              />
            </span>
          </button>
        </div>
      </header>

      {/* Menu mobile plein écran, très sobre */}
      <div
        id="menu-mobile"
        hidden={!menuOpen}
        className="fixed inset-0 z-40 bg-paper lg:hidden"
      >
        <nav
          aria-label="Navigation mobile"
          className="flex h-full flex-col justify-center gap-1 px-8 pb-16 pt-24"
        >
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
            href="/devis"
            onClick={() => setMenuOpen(false)}
            className="mt-8 inline-flex min-h-[52px] items-center justify-center rounded-[2px] bg-forest px-7 text-[12px] font-medium uppercase tracking-[0.16em] text-paper"
          >
            Demander un devis
          </Link>
          <a
            href={`tel:${siteConfig.phoneHref}`}
            className="mt-6 text-center text-sm text-graphite"
          >
            {siteConfig.phone}
          </a>
        </nav>
      </div>
    </>
  );
}
