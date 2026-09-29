// ─────────────────────────────────────────────────────────────────────────
// PAGES SERVICES & SEO LOCAL
//
// Chaque entrée produit une page réelle, avec un contenu qui lui est
// propre (voir app/[service]/page.tsx). Principe à conserver : on ne crée
// une page que si elle apporte une information que les autres n'ont pas.
// Pas de duplication de contenu, pas de pages « commune » en série.
// ─────────────────────────────────────────────────────────────────────────

export type ServicePage = {
  slug: string;
  /** Titre de l'onglet / résultat Google (55-60 caractères idéalement). */
  metaTitle: string;
  metaDescription: string;
  /** H1 de la page — unique, différent du titre meta. */
  h1: string;
  intro: string[];
  sections: { heading: string; paragraphs: string[]; items?: string[] }[];
  /** Maillage interne : slugs des pages liées. */
  related: string[];
};

export const servicePages: ServicePage[] = [
  {
    slug: "creation-jardin",
    metaTitle: "Création de jardin à Saint-Brieuc (22) | Vionnet Paysage",
    metaDescription:
      "Création et conception de jardin à Saint-Brieuc, Saint-Quay-Portrieux et dans les Côtes-d'Armor : étude du terrain, plans d'aménagement, végétaux et matériaux.",
    h1: "Création et conception de jardin",
    intro: [
      "La création d'un jardin commence par le terrain : sa pente, la nature de son sol, son exposition, ses accès et la manière dont l'eau s'y comporte. Ces éléments déterminent ce qu'il est possible d'y faire, et surtout ce qui tiendra dans le temps.",
      "Nous intervenons à Saint-Brieuc, à Saint-Quay-Portrieux et dans les Côtes-d'Armor, sur des terrains nus comme sur des jardins existants à reprendre entièrement.",
    ],
    sections: [
      {
        heading: "Étude du terrain",
        paragraphs: [
          "Nous relevons les dimensions, les niveaux et les contraintes du site : réseaux, murs existants, arbres à conserver, vis-à-vis, vents dominants. Un sol lourd ou un point bas mal drainé change radicalement le projet.",
        ],
      },
      {
        heading: "Plans d'aménagement",
        paragraphs: [
          "Le plan organise les espaces selon vos usages réels : accès et stationnement, zone de repas, circulation, espace de jeu, potager, rangement. L'objectif est un jardin praticable toute l'année, pas seulement en photographie.",
        ],
        items: [
          "Plan de masse et niveaux",
          "Organisation des espaces et circulations",
          "Choix des végétaux selon l'exposition et le sol",
          "Choix des matériaux et finitions",
          "Chiffrage détaillé par poste",
        ],
      },
      {
        heading: "Choix des végétaux et des matériaux",
        paragraphs: [
          "Le climat atlantique autorise une palette végétale large, à condition de tenir compte du vent, des embruns sur le littoral et des sols parfois acides. Nous privilégions des sujets adaptés au site, dont la reprise et l'entretien sont maîtrisés.",
        ],
      },
    ],
    related: ["amenagement-paysager", "terrasse-paysagere", "entretien-jardin"],
  },
  {
    slug: "amenagement-paysager",
    metaTitle: "Aménagement paysager Saint-Brieuc (22) | Vionnet Paysage",
    metaDescription:
      "Aménagement paysager à Saint-Brieuc et dans les Côtes-d'Armor : terrassement, maçonnerie paysagère, plantations, engazonnement, clôtures et arrosage.",
    h1: "Aménagement paysager et travaux extérieurs",
    intro: [
      "L'aménagement paysager, c'est la phase de travaux : préparer les sols, reprendre les niveaux, construire, planter. C'est là que se joue la qualité durable d'un jardin.",
      "Nous réalisons l'ensemble des postes, sans sous-traiter le cœur du chantier, autour de Saint-Brieuc, de Saint-Quay-Portrieux et dans le département.",
    ],
    sections: [
      {
        heading: "Terrassement et préparation",
        paragraphs: [
          "Décapage, évacuation ou réemploi des terres, reprise des niveaux, drainage et préparation des fonds de forme. Un terrassement mal exécuté se paie ensuite sur les dallages, les murs et la reprise des plantations.",
        ],
      },
      {
        heading: "Maçonnerie paysagère",
        paragraphs: [
          "Murets, soutènements, bordures, escaliers extérieurs, pas japonais et dallages. Nous travaillons les matériaux minéraux en cohérence avec la maison et avec le bâti local.",
        ],
        items: [
          "Murets et soutènements",
          "Bordures et escaliers",
          "Dallages et pavages",
          "Terrasses",
        ],
      },
      {
        heading: "Plantations, engazonnement et équipements",
        paragraphs: [
          "Préparation et amendement des sols, plantation des arbres, arbustes et vivaces, engazonnement par semis ou placage. Nous posons également les clôtures et les systèmes d'arrosage automatique lorsque le projet le demande.",
        ],
        items: [
          "Plantations d'arbres, arbustes et vivaces",
          "Engazonnement (semis ou placage)",
          "Clôtures et portails",
          "Arrosage automatique",
        ],
      },
    ],
    related: ["creation-jardin", "terrasse-paysagere", "entretien-jardin"],
  },
  {
    slug: "terrasse-paysagere",
    metaTitle: "Création de terrasse à Saint-Brieuc (22) | Vionnet Paysage",
    metaDescription:
      "Création de terrasse à Saint-Brieuc, Saint-Quay-Portrieux et dans les Côtes-d'Armor : dallage, pavage, bois, fonds de forme et raccord au jardin.",
    h1: "Création de terrasse",
    intro: [
      "Une terrasse réussie est d'abord une affaire de structure : fond de forme, drainage, pentes d'évacuation et raccords de niveau avec la maison et le jardin.",
      "Nous réalisons des terrasses en dallage, en pavage et en bois, à Saint-Brieuc, à Saint-Quay-Portrieux et dans les Côtes-d'Armor.",
    ],
    sections: [
      {
        heading: "Structure et évacuation de l'eau",
        paragraphs: [
          "La préparation du support conditionne la tenue de l'ouvrage : compactage, épaisseurs, pentes de 1 à 2 % vers l'extérieur, gestion des eaux de ruissellement. C'est la partie invisible, et la plus déterminante.",
        ],
      },
      {
        heading: "Matériaux",
        paragraphs: [
          "Le choix se fait selon l'exposition, l'entretien accepté et le caractère de la maison. En climat atlantique, la porosité du matériau et le risque de glissance comptent autant que l'aspect.",
        ],
        items: [
          "Dallage pierre naturelle ou reconstituée",
          "Pavage",
          "Bois et lames composites",
          "Bordures et raccords au jardin",
        ],
      },
      {
        heading: "Raccord au jardin",
        paragraphs: [
          "Une terrasse ne s'arrête pas à son dernier joint : massifs de transition, emmarchements, allées et plantations de bordure permettent de l'inscrire dans le jardin plutôt que de la poser dessus.",
        ],
      },
    ],
    related: ["amenagement-paysager", "creation-jardin", "entretien-jardin"],
  },
  {
    slug: "entretien-jardin",
    metaTitle: "Entretien de jardin à Saint-Brieuc (22) | Vionnet Paysage",
    metaDescription:
      "Entretien de jardin à Saint-Brieuc, Saint-Quay-Portrieux et dans les Côtes-d'Armor : taille, tonte, désherbage, massifs et suivi des plantations.",
    h1: "Entretien de jardin",
    intro: [
      "Un jardin aménagé demande un suivi, surtout les trois premières années : c'est la période où les plantations s'installent et où les erreurs d'entretien se voient durablement.",
      "Nous assurons l'entretien régulier de jardins de particuliers et de professionnels autour de Saint-Brieuc et de Saint-Quay-Portrieux.",
    ],
    sections: [
      {
        heading: "Prestations d'entretien",
        paragraphs: [
          "Nous adaptons la fréquence au jardin et à la saison plutôt que d'appliquer un calendrier uniforme.",
        ],
        items: [
          "Taille des arbustes et des haies",
          "Tonte et entretien des gazons",
          "Désherbage",
          "Entretien des massifs",
          "Suivi des plantations",
        ],
      },
      {
        heading: "Suivi des plantations",
        paragraphs: [
          "Arrosage de reprise, paillage, contrôle des attaches et des tuteurs, remplacement des sujets qui n'ont pas repris. C'est ce suivi qui fait la différence entre un massif qui s'étoffe et un massif qui stagne.",
        ],
      },
      {
        heading: "Jardins que nous n'avons pas créés",
        paragraphs: [
          "Nous reprenons également l'entretien de jardins existants. Une première visite permet d'établir un état des lieux et de définir ce qui relève de l'entretien courant ou d'une remise en état ponctuelle.",
        ],
      },
    ],
    related: ["creation-jardin", "amenagement-paysager", "terrasse-paysagere"],
  },
];

export function getServicePage(slug: string) {
  return servicePages.find((page) => page.slug === slug);
}
