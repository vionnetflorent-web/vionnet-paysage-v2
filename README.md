# Vionnet Paysage — site Next.js

Site vitrine de **Vionnet Paysage**, paysagiste à Saint-Quay-Portrieux
(Côtes-d'Armor), intervenant aussi sur Saint-Brieuc.
Next.js 15 (App Router), TypeScript, Tailwind CSS. Aucune dépendance
superflue : pas de librairie d'animation, pas de captcha tiers.

---

## Démarrer

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # build de production
```

## Déployer sur Vercel

1. Poussez le dossier sur GitHub.
2. Vercel → *New Project* → importez le repo. Next.js est détecté, aucune
   configuration à saisir.
3. Avant la mise en ligne définitive : remplacez `url` dans
   `lib/content.ts` par le domaine réel (utilisé par les URLs canoniques,
   le sitemap et l'Open Graph).

---

## Ce qu'il vous reste à faire

| Priorité | À faire | Où |
|---|---|---|
| 🔴 | **Photographie du Hero** — remplacer le fond sombre provisoire | `public/images/hero.png` |
| 🔴 | **Recevoir les demandes par email** (Resend/SendGrid) | `app/api/devis/route.ts` |
| 🔴 | **Mentions légales** — SIRET, adresse, forme juridique | `app/mentions-legales/page.tsx` |
| 🟠 | Photos de chantiers | `lib/content.ts` → `realisations` |
| 🟠 | Vérifier les communes réellement desservies | `lib/content.ts` → `communes` |
| 🟠 | Domaine définitif | `lib/content.ts` → `url` |
| 🟢 | Fiche Google Business Profile + carte | `components/ServiceArea.tsx` |
| 🟢 | Avis clients réels | `components/Reviews.tsx` → `reviews` |

Tous ces emplacements sont signalés dans le code par un commentaire
`⚠️ À COMPLÉTER` ou `📷`.

---

## Logo

Les fichiers d'origine sont utilisés tels quels, jamais redessinés :

- `public/images/vionnet-logo.png` — logo couleur (header au scroll, footer)
- `public/images/vionnet-logo-blanc.png` — **le même fichier recoloré en
  blanc** (Hero, header transparent, footer). Formes des fleurs,
  proportions et typographie strictement identiques à l'original.
- `public/images/vionnet-flower.png` — motif fleur seul
- `app/icon.png` — favicon généré depuis le motif fleur

Le composant `components/Logo.tsx` centralise les deux variantes.

---

## Structure

```
app/
  layout.tsx                      metadata globale, polices, lien d'évitement
  page.tsx                        page d'accueil (11 sections)
  [service]/page.tsx              pages prestations (contenu : lib/servicePages.ts)
  [service]/                      gère AUSSI les pages locales (lib/localPages.ts)
  realisations/                   galerie complète
  devis/                          page dédiée au formulaire
  blog/                           structure prête (désindexée tant qu'elle est vide)
  admin/                          emplacement réservé (à protéger)
  api/devis/route.ts              réception du formulaire + anti-spam
  sitemap.ts, robots.ts           SEO technique
  mentions-legales/, politique-confidentialite/
  not-found.tsx                   404

components/
  Header  Hero  Intro  Services  Method  Realisations  About
  ServiceArea  Reviews  CtaBand  QuoteSection  QuoteForm  Footer
  Logo  Button  Reveal

lib/
  content.ts        ← tout le contenu du site (textes, coordonnées, listes)
  servicePages.ts   ← contenu des pages prestations
  seo.tsx           ← données structurées Schema.org
```

### Règle de maintenance

**`lib/content.ts` est la source unique de vérité.** Un changement de
téléphone, de zone d'intervention, de prestation ou de liste de communes
se fait là, une seule fois, et se propage partout (pages, footer,
formulaire, données structurées, sitemap).

---

## Recevoir les demandes de devis (à faire en premier)

Le formulaire envoie chaque demande par email à contact@vionnetpaysage.com,
avec les photos en pièces jointes. « Répondre » écrit directement au client.

1. Créez un compte gratuit sur **resend.com** (3 000 emails/mois offerts).
2. Menu **API Keys** → **Create API Key** → copiez la clé (commence par `re_`).
3. Sur **Vercel** → votre projet → **Settings** → **Environment Variables** :
   nom `RESEND_API_KEY`, valeur = la clé → **Save**.
4. **Deployments** → sur le dernier déploiement, **⋯** → **Redeploy**.
5. Testez le formulaire : l'email doit arriver dans les 30 secondes.

⚠️ Tant que le domaine n'est pas validé dans Resend, les emails ne peuvent
partir **que vers l'adresse du compte Resend** : créez donc le compte
Resend avec contact@vionnetpaysage.com.

Plus tard, pour un expéditeur à votre nom : Resend → **Domains** → ajoutez
vionnetpaysage.com, copiez les enregistrements DNS chez votre registraire,
puis ajoutez sur Vercel `QUOTE_FROM` =
`Site Vionnet Paysage <site@vionnetpaysage.com>`.

Sans clé, le formulaire affiche un message d'erreur avec votre email :
aucune demande n'est perdue en silence.

## Mentions légales (obligatoire)

Complétez `siteConfig.legal` dans `lib/content.ts` : forme juridique,
siège, SIRET, TVA, assurance. Les champs vides s'affichent « À compléter ».

## Référencement (SEO)

### Après la mise en ligne — à faire dans l'ordre

1. **Renseigner le domaine réel** dans `lib/content.ts` (`url`). Tant
   qu'il est faux, les URLs canoniques et le sitemap pointent dans le vide.
2. **Créer la fiche Google Business Profile** — c'est le levier n°1 du
   référencement local, devant le site lui-même. Adresse, catégorie
   « Paysagiste », zone desservie, photos de chantiers.
3. **Google Search Console** : ajouter la propriété, coller le code de
   vérification dans `app/layout.tsx` (bloc `verification`), puis
   soumettre `https://votre-domaine/sitemap.xml`.
4. **Reporter l'URL de la fiche Google** dans `siteConfig.googleBusinessUrl`
   (et les réseaux sociaux s'il y en a) : ils alimentent `sameAs` en
   données structurées et relient le site à la fiche.
5. **Compléter l'adresse** dans `lib/seo.tsx` (`streetAddress`,
   `postalCode`) — elle doit être STRICTEMENT identique à celle de la
   fiche Google, sinon Google ignore les deux.
6. **Publier des photos de chantiers** : c'est ce qui manque le plus. Une
   galerie réelle avec des `alt` descriptifs pèse plus que n'importe
   quelle optimisation technique.

### Ce qui est déjà en place

- Title et meta description propres à chaque page, URLs canoniques,
  Open Graph et Twitter Card, favicon.
- `sitemap.xml` et `robots.txt` générés automatiquement.
- Données structurées `LandscapingBusiness`, `WebSite`, `Service` et
  `BreadcrumbList` (`lib/seo.tsx`). **Aucune information inventée** :
  ni horaires, ni note, ni avis, ni GPS.
- Un seul `<h1>` par page, hiérarchie `h2`/`h3` respectée, `alt`
  descriptifs orientés recherche locale.
- Maillage interne : le footer relie toutes les pages prestations et
  locales ; chaque page renvoie vers les pages connexes.
- Pages locales à contenu **réellement distinct** (`lib/localPages.ts`) :
  le littoral et l'agglomération briochine n'y racontent pas la même
  chose. Ne dupliquez jamais une page en changeant juste le nom de la
  commune — Google déclasse ces pages.
- `/blog` et `/admin` désindexés tant qu'ils sont vides.

### Ancienne section SEO

- Title/description par page, canoniques, Open Graph, `sitemap.xml`,
  `robots.txt`, favicon.
- Données structurées `LandscapingBusiness` + `BreadcrumbList`
  (`lib/seo.tsx`). **Aucune information inventée** : pas d'adresse exacte,
  pas d'horaires, pas d'avis, pas de note. Ajoutez-les dans
  `localBusinessJsonLd()` quand elles seront confirmées.
- Un seul `<h1>` par page, hiérarchie `h2`/`h3` respectée, `alt` descriptifs.
- Pages créées uniquement quand elles apportent un contenu propre —
  pas de pages « commune » dupliquées. Pour en ajouter une : une entrée
  dans `lib/servicePages.ts` suffit (route, metadata et sitemap suivent).

## Performance

- `next/image` partout (AVIF/WebP automatiques, dimensions fixées, `priority`
  sur le Hero uniquement → LCP maîtrisé).
- Polices auto-hébergées via `next/font` → aucune requête externe, pas de CLS.
- Animations : une seule classe CSS pilotée par `IntersectionObserver`
  (`components/Reveal.tsx`), `prefers-reduced-motion` respecté. Pas de
  Framer Motion.
- Tous les composants sont serveur par défaut ; seuls `Header` et
  `QuoteForm` sont clients (interaction obligatoire).

## Formulaire de devis

Champs : prénom, nom, téléphone, email, commune, type de projet, budget
indicatif, message, photos (5 max, 5 Mo chacune).
Validation côté client **et** serveur, messages d'erreur liés aux champs,
confirmation après envoi, anti-spam par champ piège + délai minimal.

Les demandes sont actuellement **journalisées** côté serveur : branchez
l'envoi d'email dans `app/api/devis/route.ts` (emplacement `TODO` avec
exemple Resend) pour les recevoir sur `contact@vionnetpaysage.com`.

## Accessibilité

Lien d'évitement, focus visible, labels explicites, `aria-invalid` et
`aria-live` sur le formulaire, cibles tactiles ≥ 48 px, contrastes tenus
(texte blanc plein sur voile sombre dans le Hero).
