// ─────────────────────────────────────────────────────────────────────────
// PAGES LOCALES (SEO)
//
// Une page par secteur RÉEL, avec un contenu qui lui est propre : sols,
// climat, contraintes, communes. Pas de page « commune » dupliquée — Google
// déclasse les pages locales générées en série.
// N'ajoutez une entrée que si vous pouvez écrire dessus quelque chose que
// les autres pages ne disent pas.
// ─────────────────────────────────────────────────────────────────────────

export type LocalPage = {
  slug: string;
  city: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  intro: string[];
  sections: { heading: string; paragraphs: string[] }[];
  communes: string[];
};

export const localPages: LocalPage[] = [
  {
    slug: "paysagiste-saint-brieuc",
    city: "Saint-Brieuc",
    metaTitle: "Paysagiste à Saint-Brieuc (22) | Vionnet Paysage",
    metaDescription:
      "Paysagiste intervenant à Saint-Brieuc et dans l'agglomération briochine : création de jardin, aménagement paysager, terrasse et entretien. Devis gratuit.",
    h1: "Paysagiste à Saint-Brieuc",
    intro: [
      "Vionnet Paysage intervient à Saint-Brieuc et dans l'agglomération briochine, à une vingtaine de minutes de son point d'attache de Saint-Quay-Portrieux.",
      "Le contexte y est différent de celui du littoral : moins d'embruns, mais des terrains marqués par le relief des vallées et des sols plus lourds.",
    ],
    sections: [
      {
        heading: "Des terrains en pente",
        paragraphs: [
          "Les vallées du Gouët et du Gouédic découpent l'agglomération, et beaucoup de parcelles présentent un dénivelé marqué. Ces jardins demandent un travail de terrassement et de soutènement avant toute plantation : murets, emmarchements, reprise des niveaux, canalisation des eaux de ruissellement.",
        ],
      },
      {
        heading: "Sols acides et parfois compacts",
        paragraphs: [
          "Les sols briochins sont fréquemment acides, ce qui favorise une palette de terre de bruyère, et parfois compactés par les travaux de construction. Un décompactage et un amendement sérieux conditionnent la reprise — c'est souvent là que se joue la réussite d'un massif.",
        ],
      },
      {
        heading: "Jardins de ville et jardins de lotissement",
        paragraphs: [
          "En ville, la contrainte est l'espace et le vis-à-vis : il s'agit de structurer sans enfermer. En lotissement, le sujet est plutôt de donner du caractère à un terrain nu et de traiter les limites autrement que par une clôture nue.",
        ],
      },
    ],
    communes: [
      "Saint-Brieuc",
      "Plérin",
      "Pordic",
      "Langueux",
      "Trégueux",
      "Yffiniac",
    ],
  },
  {
    slug: "paysagiste-saint-quay-portrieux",
    city: "Saint-Quay-Portrieux",
    metaTitle: "Paysagiste à Saint-Quay-Portrieux (22) | Vionnet Paysage",
    metaDescription:
      "Paysagiste à Saint-Quay-Portrieux : création de jardin, aménagement paysager, terrasse et entretien sur la côte du Goëlo. Devis gratuit après visite du terrain.",
    h1: "Paysagiste à Saint-Quay-Portrieux",
    intro: [
      "Vionnet Paysage est installé à Saint-Quay-Portrieux et intervient sur la côte du Goëlo pour la conception, l'aménagement et l'entretien de jardins.",
      "Travailler ici suppose de composer avec le littoral : vents d'ouest soutenus, embruns salés, terrains en pente vers la mer et sols souvent légers. Ces contraintes ne sont pas un détail — elles déterminent ce qui pousse et ce qui tient.",
    ],
    sections: [
      {
        heading: "Jardiner face à la mer",
        paragraphs: [
          "Sur les parcelles exposées, la reprise des plantations dépend d'abord de la protection au vent : haies brise-vent, tuteurage renforcé, choix de sujets tolérants aux embruns. Tamaris, escallonia, éléagnus, graminées et vivaces de bord de mer forment une base fiable, à laquelle on ajoute des sujets plus délicats une fois l'abri constitué.",
          "En retrait du trait de côte, la palette s'élargit nettement : la contrainte devient celle du sol et de l'exposition plutôt que celle du sel.",
        ],
      },
      {
        heading: "Terrasses et ouvrages en bord de mer",
        paragraphs: [
          "L'air marin impose des choix de matériaux durables : visserie inox, essences de bois adaptées, pierres peu gélives. Les terrains en pente demandent par ailleurs un travail sérieux sur les niveaux, les soutènements et l'évacuation de l'eau.",
        ],
      },
      {
        heading: "Entretien sur le littoral",
        paragraphs: [
          "Les jardins de bord de mer se dégradent vite sans suivi : tailles de formation, remplacement des sujets brûlés par le sel, contrôle des attaches. Un passage régulier coûte moins cher qu'une reprise complète.",
        ],
      },
    ],
    communes: [
      "Saint-Quay-Portrieux",
      "Tréveneuc",
      "Plourhan",
      "Binic-Étables-sur-Mer",
      "Lantic",
      "Plouha",
    ],
  },
];

export function getLocalPage(slug: string) {
  return localPages.find((page) => page.slug === slug);
}
