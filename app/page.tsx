import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Intro from "@/components/Intro";
import Prestations from "@/components/Prestations";
import Method from "@/components/Method";
import Realisations from "@/components/Realisations";
import About from "@/components/About";
import Reviews from "@/components/Reviews";
import CtaBand from "@/components/CtaBand";
import QuoteSection from "@/components/QuoteSection";
import Footer from "@/components/Footer";
import { JsonLd, localBusinessJsonLd, websiteJsonLd } from "@/lib/seo";

/**
 * Page d'accueil.
 * Rythme : photographie plein écran → texte court → prestations →
 * méthode (bande verte) → galerie → à propos → avis → formulaire.
 * Les appels au devis ponctuent le parcours.
 */
export default function HomePage() {
  return (
    <>
      <JsonLd data={localBusinessJsonLd()} />
      <JsonLd data={websiteJsonLd()} />
      <Header />
      <main id="contenu">
        <Hero />
        <Intro />
        <Prestations />
        <CtaBand
          title="Et si votre extérieur devenait un vrai projet ?"
          text="Visite du terrain et devis détaillé, sans engagement."
        />
        <Method />
        <Realisations />
        <About />
        <Reviews />
        <QuoteSection />
      </main>
      <Footer />
    </>
  );
}
