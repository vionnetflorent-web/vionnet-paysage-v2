import Link from "next/link";
import Image from "next/image";
import { navLinks, siteConfig } from "@/lib/content";
import { servicePages } from "@/lib/servicePages";
import { localPages } from "@/lib/localPages";

const legalLinks = [
  { href: "/mentions-legales", label: "Mentions légales" },
  { href: "/politique-confidentialite", label: "Politique de confidentialité" },
];

/**
 * Footer. Porte aussi le maillage interne vers les pages prestations et
 * les pages locales : c'est ce qui permet à Google de les découvrir et de
 * comprendre leur rattachement au site.
 */
export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-forest py-16 text-white sm:py-20">
      <div className="mx-auto max-w-content px-5 sm:px-8 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-4">
            <Image
              src="/images/vionnet-logo-blanc.png"
              alt={siteConfig.name}
              width={1368}
              height={850}
              sizes="220px"
              className="h-[54px] w-auto"
            />
            <p className="mt-6 max-w-[380px] text-[15px] leading-[1.8] text-[#e6ede6]">
              Paysagiste à {siteConfig.cityTarget}, {siteConfig.city} et dans
              les {siteConfig.department}. Conception, aménagement et entretien
              de jardins.
            </p>
          </div>

          <nav aria-label="Prestations" className="lg:col-span-3">
            <h2 className="text-[11px] uppercase tracking-[0.16em] text-[#d3ddd3]">
              Prestations
            </h2>
            <ul className="mt-5 space-y-3">
              {servicePages.map((page) => (
                <li key={page.slug}>
                  <Link
                    href={`/${page.slug}`}
                    className="text-[15px] text-[#e6ede6] transition-colors duration-300 hover:text-white"
                  >
                    {page.h1}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Secteurs" className="lg:col-span-2">
            <h2 className="text-[11px] uppercase tracking-[0.16em] text-[#d3ddd3]">
              Secteurs
            </h2>
            <ul className="mt-5 space-y-3">
              {localPages.map((page) => (
                <li key={page.slug}>
                  <Link
                    href={`/${page.slug}`}
                    className="text-[15px] text-[#e6ede6] transition-colors duration-300 hover:text-white"
                  >
                    {page.city}
                  </Link>
                </li>
              ))}
            </ul>
            <ul className="mt-6 space-y-3">
              {navLinks.slice(0, 3).map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[15px] text-[#e6ede6] transition-colors duration-300 hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <h2 className="text-[11px] uppercase tracking-[0.16em] text-[#d3ddd3]">
              Contact
            </h2>
            <ul className="mt-5 space-y-3 text-[15px]">
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="text-[#e6ede6] transition-colors duration-300 hover:text-white"
                >
                  {siteConfig.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${siteConfig.phoneHref}`}
                  className="text-[#e6ede6] transition-colors duration-300 hover:text-white"
                >
                  {siteConfig.phone}
                </a>
              </li>
              <li className="text-[#dbe4db]">{siteConfig.areaLong}</li>
              {siteConfig.googleBusinessUrl && (
                <li>
                  <a
                    href={siteConfig.googleBusinessUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#e6ede6] underline decoration-white/30 underline-offset-4 transition-colors duration-300 hover:text-white"
                  >
                    Voir sur Google Maps
                  </a>
                </li>
              )}
            </ul>

            <Link
              href="/devis"
              className="mt-8 inline-flex min-h-[48px] items-center justify-center rounded-[2px] border border-white/50 px-6 text-[11px] font-medium uppercase tracking-[0.16em] text-white transition-colors duration-500 ease-premium hover:bg-white hover:text-ink"
            >
              Demander un devis
            </Link>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-8 text-[13px] text-[#dbe4db] sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {siteConfig.year} {siteConfig.name}
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {legalLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="transition-colors duration-300 hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
