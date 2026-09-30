// ─────────────────────────────────────────────────────────────────────────
// SOURCE UNIQUE DE VÉRITÉ DU CONTENU
// Tout le texte, les coordonnées et les listes du site vivent ici.
// Modifiez ce fichier pour faire évoluer le site sans toucher au code
// des composants. C'est aussi le point de bascule naturel vers un CMS.
// ─────────────────────────────────────────────────────────────────────────

export const siteConfig = {
  name: "Vionnet Paysage",
  // ⚠️ Nom du dirigeant : utilisé dans les données structurées (founder).
  owner: "Florent Vionnet",
  activity: "Paysagiste",
  // ── Géographie ────────────────────────────────────────────────────────
  // base : commune réelle d'implantation. Doit correspondre à l'adresse
  // déclarée sur Google Business Profile — ne jamais la falsifier.
  city: "Saint-Quay-Portrieux",
  // target : pôle principal visé en recherche (le plus gros volume).
  // C'est lui qui mène les titres et les descriptions.
  cityTarget: "Saint-Brieuc",
  department: "Côtes-d'Armor",
  departmentCode: "22",
  region: "Bretagne",

  // ⚠️ À COMPLÉTER : remplacez par le domaine définitif avant mise en ligne.
  // Utilisé pour les URLs canoniques, le sitemap et l'Open Graph.
  url: "https://vionnetpaysage.com",

  email: "contact@vionnetpaysage.com",
  phone: "06 22 95 74 84",
  phoneHref: "+33622957484",

  areaShort: "Saint-Brieuc, Saint-Quay-Portrieux et les Côtes-d'Armor",
  areaLong: "Saint-Brieuc, Saint-Quay-Portrieux et les Côtes-d'Armor (22)",

  // ⚠️ À COMPLÉTER : collez ici le lien court de votre fiche Google
  // Business Profile (bouton « Partager » sur la fiche).
  // Dès qu'elle est renseignée, trois liens apparaissent automatiquement :
  // section Contact, footer, et « Laisser un avis Google ».
  // Elle alimente aussi sameAs dans les données structurées.
  googleBusinessUrl: "",
  facebookUrl: "",
  instagramUrl: "",

  // ── Mentions légales (obligatoires en France) ──────────────────────────
  // ⚠️ À COMPLÉTER. Tant qu'un champ est vide, la page Mentions légales
  // l'affiche comme « à compléter ». Ne rien inventer.
  legal: {
    legalForm: "",        // ex. "Entreprise individuelle (micro-entreprise)"
    address: "",          // adresse du siège, ex. "12 rue …, 22410 Saint-Quay-Portrieux"
    siret: "",            // 14 chiffres
    vat: "",              // n° TVA intracommunautaire, ou "Non applicable, art. 293 B du CGI"
    director: "Florent Vionnet", // responsable de la publication
    insurer: "",          // assureur + n° de contrat (RC pro / décennale)
    insuranceArea: "",    // couverture géographique, ex. "France"
  },

  get year() {
    return new Date().getFullYear();
  },
};

// Navigation principale, partagée par le header, le menu mobile et le footer.
export const navLinks = [
  // Les prestations ont leur page dédiée (voir lib/servicePages.ts) :
  // le menu pointe vers ces pages, plus vers des sections de l'accueil.
  { href: "/#methode", label: "Méthode" },
  { href: "/#realisations", label: "Réalisations" },
  { href: "/#a-propos", label: "À propos" },
  { href: "/#avis", label: "Avis" },
];

// ── SERVICES ─────────────────────────────────────────────────────────────

export type Service = {
  id: string;
  number: string;
  title: string;
  lead: string;
  items: string[];
  /** Photo de la prestation. Laissez vide pour afficher l'emplacement réservé. */
  image: string;
  imageAlt: string;
  /** Texte de l'emplacement réservé, visible tant qu'aucune photo n'est fournie. */
  imagePlaceholder: string;
  /** Page dédiée correspondante (voir lib/servicePages.ts). */
  href?: string;
};

export const services: Service[] = [
  {
    id: "conception",
    number: "01",
    title: "Conception",
    lead: "Un projet dessiné à partir du terrain, de son exposition et de vos usages réels.",
    items: [
      "Étude du terrain",
      "Plans d'aménagement",
      "Organisation des espaces",
      "Choix des végétaux",
      "Choix des matériaux",
    ],
    image: "/images/plan-conception.png",
    imageAlt:
      "Plan d'aménagement de jardin dessiné par Vionnet Paysage",
    imagePlaceholder: "Plan d'aménagement",
    href: "/creation-jardin",
  },
  {
    id: "creation",
    number: "02",
    title: "Création & aménagement",
    lead: "L'exécution complète du chantier, du terrassement aux dernières plantations.",
    items: [
      "Terrassement",
      "Maçonnerie paysagère",
      "Terrasses",
      "Plantations",
      "Engazonnement",
      "Clôtures",
      "Arrosage automatique",
      "Aménagements extérieurs",
    ],
    image: "",
    imageAlt: "Chantier d'aménagement paysager et maçonnerie paysagère dans les Côtes-d'Armor",
    imagePlaceholder: "Chantier d'aménagement",
    href: "/amenagement-paysager",
  },
  {
    id: "entretien",
    number: "03",
    title: "Entretien",
    lead: "Un suivi régulier pour que les plantations tiennent leurs promesses dans le temps.",
    items: [
      "Entretien régulier",
      "Taille",
      "Désherbage",
      "Tonte",
      "Entretien des massifs",
      "Suivi des plantations",
    ],
    image: "",
    imageAlt: "Entretien de jardin et taille des massifs",
    imagePlaceholder: "Entretien de jardin",
    href: "/entretien-jardin",
  },
];

// ── MÉTHODE / ACCOMPAGNEMENT ─────────────────────────────────────────────

export const methodSteps = [
  {
    step: "01",
    title: "Visite du terrain",
    text: "Une première rencontre pour comprendre vos attentes, observer le lieu et définir les grandes orientations du projet.",
  },
  {
    step: "02",
    title: "Conception du projet",
    text: "À partir de cette première analyse, nous donnons forme au projet : plans, ambiances, matériaux et palette végétale.",
  },
  {
    step: "03",
    title: "Réalisation",
    text: "Nous conduisons le chantier de bout en bout, avec un interlocuteur unique et un site tenu propre.",
  },
  {
    step: "04",
    title: "Suivi",
    text: "Nous vous accompagnons sur la reprise des plantations et, si vous le souhaitez, sur l'entretien courant.",
  },
];

// ── RÉALISATIONS ─────────────────────────────────────────────────────────
// ⚠️ Aucune réalisation n'est inventée ici : ces entrées sont des
// emplacements réservés. Renseignez `image`, `type` et `commune` au fur et
// à mesure de vos chantiers photographiés — les cartes n'affichent que les
// informations réellement présentes.

export type Realisation = {
  slug: string;
  /** Nature du projet, ex. « Jardin contemporain ». */
  type: string;
  /** Commune du chantier — laissez vide si non communicable. */
  commune?: string;
  /** Prestations réellement réalisées sur ce chantier. */
  prestations?: string;
  image?: string;
  imageAlt?: string;
  /** Mise en avant dans la grille (grande tuile). */
  featured?: boolean;
};

export const realisations: Realisation[] = [
  { slug: "jardin-1", type: "Jardin 1", featured: true },
  { slug: "jardin-2", type: "Jardin 2" },
  { slug: "jardin-3", type: "Jardin 3" },
  { slug: "jardin-4", type: "Jardin 4", featured: true },
  { slug: "jardin-5", type: "Jardin 5" },
  { slug: "jardin-6", type: "Jardin 6" },
];

// ── ZONE D'INTERVENTION ──────────────────────────────────────────────────
// ⚠️ À VÉRIFIER : n'affichez que les communes où vous intervenez réellement.
// Retirez ou ajoutez librement, la section s'adapte.

export const communes = [
  "Saint-Brieuc",
  "Plérin",
  "Pordic",
  "Langueux",
  "Trégueux",
  "Yffiniac",
  "Binic-Étables-sur-Mer",
  "Saint-Quay-Portrieux",
  "Plourhan",
  "Lantic",
];

// ── FORMULAIRE DE DEVIS ──────────────────────────────────────────────────

export const projectTypes = [
  "Conception de jardin",
  "Aménagement paysager",
  "Terrasse",
  "Plantations",
  "Maçonnerie paysagère",
  "Clôture",
  "Arrosage",
  "Entretien",
  "Autre",
];

export const budgetRanges = [
  "Je ne sais pas encore",
  "Moins de 5 000 €",
  "5 000 – 15 000 €",
  "15 000 – 30 000 €",
  "Plus de 30 000 €",
];
