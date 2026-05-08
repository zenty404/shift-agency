/* ═══════════════════════════════════════════════════════════
   LINKEDIN POSTS CONFIGURATION

   Pour ajouter un nouveau post :
   1. Allez sur LinkedIn, cliquez sur "..." > "Intégrer ce post"
   2. Copiez le lien `src` de l'iframe fourni par LinkedIn
   3. Ajoutez-le dans le tableau POSTS ci-dessous
   4. C'est tout !

   Pour ajouter un nouvel auteur :
   1. Décommentez la section "associe" dans AUTHORS
   2. Remplissez les informations
   3. Ajoutez l'ID dans CATEGORIES
   ═══════════════════════════════════════════════════════════ */

// ── Auteurs ──
export const AUTHORS = {
  arthur: {
    id: "arthur",
    name: "Arthur Lasnier",
    linkedin: "https://www.linkedin.com/in/arthur-lasnier-a5962435a",
    avatar: "/avatar-arthur.jpg", // Optionnel
  },
  // Décommentez et complétez quand votre associé sera défini :
  // associe: {
  //   id: "associe",
  //   name: "Nom de l'Associé",
  //   linkedin: "https://www.linkedin.com/in/...",
  //   avatar: "/avatar-associe.jpg",
  // },
} as const;

export type AuthorId = keyof typeof AUTHORS;

// ── Catégories (pour les filtres) ──
export const CATEGORIES = [
  { id: "all", label: "Tout voir" },
  { id: "arthur", label: "Postes d'Arthur Lasnier" },
  // Ajoutez votre associé ici quand il sera défini :
  // { id: "associe", label: "Postes de [Nom Associé]" },
] as const;

// ── Type d'un post ──
export interface LinkedInPostData {
  /** URL src de l'iframe LinkedIn (ex: https://www.linkedin.com/embed/feed/update/urn:li:share:XXXXX?collapsed=1) */
  embedSrc: string;
  /** Hauteur de l'iframe en pixels (fournie par LinkedIn dans le code embed) */
  height: number;
  /** Auteur du post */
  author: AuthorId;
  /** Date de publication (YYYY-MM-DD) */
  date: string;
}

// ── Posts ──
// IMPORTANT : Ajoutez vos nouveaux posts EN HAUT de la liste (les plus récents en premier)
// Pour chaque post, copiez le `src` de l'iframe fourni par LinkedIn ("..." > "Intégrer ce post")
export const POSTS: LinkedInPostData[] = [
  // ═══════════════════════════════════════════════════════════
  // 📌 AJOUTEZ VOS NOUVEAUX POSTS ICI
  // ═══════════════════════════════════════════════════════════

  {
    embedSrc: "https://www.linkedin.com/embed/feed/update/urn:li:share:7451727409214640128?collapsed=1",
    height: 670,
    author: "arthur",
    date: "2026-05-04",
  },
  {
    embedSrc: "https://www.linkedin.com/embed/feed/update/urn:li:share:7451724167374123008?collapsed=1",
    height: 670,
    author: "arthur",
    date: "2026-05-04",
  },
  {
    embedSrc: "https://www.linkedin.com/embed/feed/update/urn:li:share:7450657553400754176?collapsed=1",
    height: 670,
    author: "arthur",
    date: "2026-05-02",
  },
  {
    embedSrc: "https://www.linkedin.com/embed/feed/update/urn:li:share:7448358871384879104?collapsed=1",
    height: 670,
    author: "arthur",
    date: "2026-04-28",
  },
  {
    embedSrc: "https://www.linkedin.com/embed/feed/update/urn:li:share:7445768122524934144?collapsed=1",
    height: 670,
    author: "arthur",
    date: "2026-04-23",
  },
  {
    embedSrc: "https://www.linkedin.com/embed/feed/update/urn:li:share:7444361700797087744?collapsed=1",
    height: 643,
    author: "arthur",
    date: "2026-04-20",
  },
  {
    embedSrc: "https://www.linkedin.com/embed/feed/update/urn:li:share:7444055549286989824?collapsed=1",
    height: 670,
    author: "arthur",
    date: "2026-04-19",
  },
  {
    embedSrc: "https://www.linkedin.com/embed/feed/update/urn:li:share:7442363351885598720?collapsed=1",
    height: 670,
    author: "arthur",
    date: "2026-04-16",
  },
  {
    embedSrc: "https://www.linkedin.com/embed/feed/update/urn:li:share:7442182456444760064?collapsed=1",
    height: 645,
    author: "arthur",
    date: "2026-04-15",
  },
  {
    embedSrc: "https://www.linkedin.com/embed/feed/update/urn:li:share:7441109330784923648?collapsed=1",
    height: 670,
    author: "arthur",
    date: "2026-04-13",
  },
  {
    embedSrc: "https://www.linkedin.com/embed/feed/update/urn:li:share:7440456336133357568?collapsed=1",
    height: 670,
    author: "arthur",
    date: "2026-04-11",
  },
  {
    embedSrc: "https://www.linkedin.com/embed/feed/update/urn:li:share:7437803271236313088?collapsed=1",
    height: 584,
    author: "arthur",
    date: "2026-04-06",
  },
];

// ── Helpers ──
export function getPostsByAuthor(authorId: string): LinkedInPostData[] {
  if (authorId === "all") return POSTS;
  return POSTS.filter((post) => post.author === authorId);
}

export function getAuthorInfo(authorId: AuthorId) {
  return AUTHORS[authorId];
}
