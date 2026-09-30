import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <>
      <Header overDark={false} />
      <main id="contenu" className="pt-[94px]">
        <section className="bg-paper py-28 sm:py-36">
          <div className="mx-auto max-w-[660px] px-5 text-center sm:px-8">
            <p className="text-[11px] uppercase tracking-eyebrow text-mute">
              Erreur 404
            </p>
            <h1 className="mt-6 font-display text-[34px] leading-[1.15] text-ink sm:text-[44px]">
              Cette page n&apos;existe pas
            </h1>
            <p className="mt-5 text-[16px] leading-[1.8] text-graphite">
              Le lien est peut-être obsolète. Vous pouvez revenir à
              l&apos;accueil ou nous décrire directement votre projet.
            </p>
            <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row sm:gap-4">
              <Link
                href="/"
                className="inline-flex min-h-[48px] items-center justify-center rounded-[2px] bg-forest px-7 text-[12px] font-medium uppercase tracking-[0.16em] text-paper transition-colors duration-500 ease-premium hover:bg-moss"
              >
                Retour à l&apos;accueil
              </Link>
              <Link
                href="/devis"
                className="inline-flex min-h-[48px] items-center justify-center rounded-[2px] border border-ink/25 px-7 text-[12px] font-medium uppercase tracking-[0.16em] text-ink transition-colors duration-500 ease-premium hover:bg-ink hover:text-paper"
              >
                Demander un devis
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
