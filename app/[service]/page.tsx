import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CtaBand from "@/components/CtaBand";
import Reveal from "@/components/Reveal";
import QuoteSection from "@/components/QuoteSection";
import {
  JsonLd,
  breadcrumbJsonLd,
  localBusinessJsonLd,
  serviceJsonLd,
} from "@/lib/seo";
import { getServicePage, servicePages } from "@/lib/servicePages";
import { getLocalPage, localPages } from "@/lib/localPages";
import { siteConfig } from "@/lib/content";

/**
 * Route unique pour les pages prestations (lib/servicePages.ts) et les
 * pages locales (lib/localPages.ts). `dynamicParams = false` garantit
 * qu'aucune URL hors de ces deux listes n'existe : pas de page vide
 * indexable, pas de contenu dupliqué généré au hasard.
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return [
    ...servicePages.map((p) => ({ service: p.slug })),
    ...localPages.map((p) => ({ service: p.slug })),
  ];
}

type Props = { params: Promise<{ service: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { service } = await params;
  const page = getServicePage(service) ?? getLocalPage(service);
  if (!page) return {};

  return {
    title: { absolute: page.metaTitle },
    description: page.metaDescription,
    alternates: { canonical: `/${page.slug}` },
    openGraph: {
      title: page.metaTitle,
      description: page.metaDescription,
      url: `${siteConfig.url}/${page.slug}`,
    },
  };
}

export default async function DynamicPage({ params }: Props) {
  const { service } = await params;
  const servicePage = getServicePage(service);
  const localPage = getLocalPage(service);
  const page = servicePage ?? localPage;
  if (!page) notFound();

  // Maillage interne : les pages prestations pointent entre elles, les
  // pages locales pointent vers toutes les prestations.
  const related = servicePage
    ? servicePage.related
        .map((slug) => getServicePage(slug))
        .filter((p): p is NonNullable<typeof p> => Boolean(p))
    : servicePages;

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Accueil", path: "/" },
          { name: page.h1, path: `/${page.slug}` },
        ])}
      />
      {servicePage && (
        <JsonLd
          data={serviceJsonLd({
            name: servicePage.h1,
            description: servicePage.metaDescription,
            path: `/${servicePage.slug}`,
          })}
        />
      )}
      {localPage && <JsonLd data={localBusinessJsonLd()} />}

      <Header overDark={false} />
      <main id="contenu" className="pt-[68px]">
        <article>
          <header className="bg-paper py-20 sm:py-24 lg:py-28">
            <div className="mx-auto max-w-content px-5 sm:px-8 lg:px-12">
              <Reveal>
                <nav aria-label="Fil d'Ariane" className="text-[13px] text-mute">
                  <Link href="/" className="transition-colors hover:text-ink">
                    Accueil
                  </Link>
                  <span aria-hidden> / </span>
                  <span className="text-graphite">{page.h1}</span>
                </nav>

                <h1 className="mt-8 max-w-[860px] font-display text-[34px] leading-[1.12] text-ink sm:text-[46px] lg:text-[54px]">
                  {page.h1}
                </h1>

                <div className="mt-8 max-w-prose space-y-5 text-[16px] leading-[1.8] text-graphite sm:text-[17px]">
                  {page.intro.map((paragraph) => (
                    <p key={paragraph.slice(0, 32)}>{paragraph}</p>
                  ))}
                </div>
              </Reveal>
            </div>
          </header>

          <div className="border-t border-line bg-cream/50 py-20 sm:py-24">
            <div className="mx-auto max-w-content px-5 sm:px-8 lg:px-12">
              <div className="grid gap-12 lg:grid-cols-12">
                <div className="lg:col-span-8 lg:col-start-3">
                  {page.sections.map((section, i) => (
                    <Reveal key={section.heading} delay={i * 80}>
                      <section className="border-t border-line py-10 first:border-t-0 first:pt-0">
                        <h2 className="font-display text-[26px] leading-[1.2] text-ink sm:text-[32px]">
                          {section.heading}
                        </h2>
                        <div className="mt-5 space-y-4 text-[16px] leading-[1.8] text-graphite">
                          {section.paragraphs.map((paragraph) => (
                            <p key={paragraph.slice(0, 32)}>{paragraph}</p>
                          ))}
                        </div>

                        {"items" in section && section.items && (
                          <ul className="mt-7 grid gap-x-8 gap-y-3 sm:grid-cols-2">
                            {section.items.map((item) => (
                              <li
                                key={item}
                                className="flex items-baseline gap-3 text-[15px] text-graphite"
                              >
                                <span
                                  aria-hidden
                                  className="mt-[7px] h-px w-3 shrink-0 bg-accent"
                                />
                                {item}
                              </li>
                            ))}
                          </ul>
                        )}
                      </section>
                    </Reveal>
                  ))}

                  {/* Communes desservies — uniquement sur les pages locales */}
                  {localPage && (
                    <Reveal>
                      <section className="border-t border-line py-10">
                        <h2 className="font-display text-[26px] leading-[1.2] text-ink sm:text-[32px]">
                          Communes desservies
                        </h2>
                        <ul className="mt-7 flex flex-wrap gap-3">
                          {localPage.communes.map((commune) => (
                            <li
                              key={commune}
                              className="rounded-[2px] border border-line bg-paper px-4 py-2 text-[14px] text-graphite"
                            >
                              {commune}
                            </li>
                          ))}
                        </ul>
                      </section>
                    </Reveal>
                  )}

                  {related.length > 0 && (
                    <Reveal>
                      <nav
                        aria-label="Pages liées"
                        className="border-t border-line pt-10"
                      >
                        <p className="text-[11px] uppercase tracking-eyebrow text-mute">
                          À voir également
                        </p>
                        <ul className="mt-5 space-y-3">
                          {related.map((item) => (
                            <li key={item.slug}>
                              <Link
                                href={`/${item.slug}`}
                                className="font-display text-[22px] text-ink transition-colors hover:text-accent"
                              >
                                {item.h1}
                              </Link>
                            </li>
                          ))}
                          {/* Une page prestation renvoie aussi vers le local */}
                          {servicePage &&
                            localPages.map((lp) => (
                              <li key={lp.slug}>
                                <Link
                                  href={`/${lp.slug}`}
                                  className="font-display text-[22px] text-ink transition-colors hover:text-accent"
                                >
                                  {lp.h1}
                                </Link>
                              </li>
                            ))}
                        </ul>
                      </nav>
                    </Reveal>
                  )}
                </div>
              </div>
            </div>
          </div>

          <CtaBand
            title={`${page.h1} — parlons de votre projet`}
            text="Visite du terrain, conseil et devis détaillé."
          />
          <QuoteSection />
        </article>
      </main>
      <Footer />
    </>
  );
}
