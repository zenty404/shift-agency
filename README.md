# arthur.dev — Site Officiel

> Site web vitrine de l'agence de développement **arthur.dev**, spécialisée dans la création d'applications web et mobiles sur mesure.

[![Next.js](https://img.shields.io/badge/Next.js-16.2.2-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.4-blue)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8)](https://tailwindcss.com/)

🌐 **Production** : [arthurdev-siteweb.vercel.app](https://arthurdev-siteweb.vercel.app)
🚀 **Preview** : [arthurdev-preview.vercel.app](https://arthurdev-preview.vercel.app)

---

## 📋 Table des matières

- [À propos](#-à-propos)
- [Stack technique](#-stack-technique)
- [Prérequis](#-prérequis)
- [Installation](#-installation)
- [Développement](#-développement)
- [Structure du projet](#-structure-du-projet)
- [Déploiement](#-déploiement)
- [Fonctionnalités clés](#-fonctionnalités-clés)
- [Ajouter des posts LinkedIn](#-ajouter-des-posts-linkedin)
- [Performance & Optimisations](#-performance--optimisations)
- [Branches & Workflow](#-branches--workflow)

---

## 🎯 À propos

Site web moderne et performant présentant les services, projets et expertises de l'agence **arthur.dev**. Conçu avec une approche **mobile-first**, le site offre une expérience utilisateur fluide et professionnelle sur tous les appareils.

### Pages principales

- **Accueil** (`/`) — Hero animé avec présentation de l'agence
- **À propos** (`/about`) — Histoire et valeurs de l'agence
- **Nos services** (`/nos-services`) — Catalogue des prestations
- **Nos projets** (`/our-projects`) — Portfolio de réalisations
- **Ressources LinkedIn** (`/ressources/linkedin`) — Fil d'actualités LinkedIn intégré
- **Contact** (`/contact`) — Formulaire de contact
- **Pages légales** — Mentions légales, CGV, Politique de confidentialité

---

## 🛠️ Stack technique

### Cœur de l'application

- **[Next.js 16.2.2](https://nextjs.org/)** — Framework React avec App Router (`/app`)
- **[React 19.2.4](https://react.dev/)** — Bibliothèque UI avec Server Components
- **[TypeScript 5](https://www.typescriptlang.org/)** — Typage strict pour la fiabilité

### Styling & Animations

- **[Tailwind CSS 4](https://tailwindcss.com/)** — Framework CSS utility-first
- **[Framer Motion 12.38.0](https://www.framer.com/motion/)** — Animations fluides et performantes
- **[GSAP 3.14.2](https://gsap.com/)** — Animations complexes et timeline
- **[clsx](https://github.com/lukeed/clsx)** + **[tailwind-merge](https://github.com/dcastil/tailwind-merge)** — Gestion des classes conditionnelles

### Icônes & UI

- **[Lucide React](https://lucide.dev/)** — Bibliothèque d'icônes modernes

### Outils de développement

- **[ESLint 9](https://eslint.org/)** — Linter pour la qualité du code
- **[@tailwindcss/postcss](https://tailwindcss.com/)** — Compilation Tailwind optimisée

---

## 📦 Prérequis

- **Node.js** ≥ 18.x
- **npm** ≥ 9.x (ou yarn/pnpm/bun)
- **Git** pour la gestion de versions

---

## 🚀 Installation

```bash
# Cloner le repository
git clone https://github.com/zenty404/arthurdev-siteweb.git
cd arthurdev-siteweb

# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev
```

Le site sera accessible sur [http://localhost:3000](http://localhost:3000).

---

## 💻 Développement

### Commandes disponibles

```bash
# Développement (mode watch avec hot reload)
npm run dev

# Build de production
npm run build

# Démarrer en mode production (après build)
npm run start

# Linter (vérification du code)
npm run lint
```

### Conventions de code

- **Server Components par défaut** : Utiliser `"use client"` uniquement si nécessaire (interactivité, hooks React)
- **TypeScript strict** : Tous les types doivent être explicites
- **Mobile-first** : Concevoir pour mobile d'abord, puis desktop
- **Accessibilité** : Respecter les normes WCAG (sémantique HTML, contrastes, navigation clavier)
- **Optimisation images** : Utiliser systématiquement `next/image`

---

## 📁 Structure du projet

```
arthurdev-siteweb/
├── app/
│   ├── components/          # Composants réutilisables
│   │   ├── Hero.tsx
│   │   ├── LinkedInPost.tsx
│   │   ├── Navigation.tsx
│   │   └── ...
│   ├── lib/                 # Utilitaires & configuration
│   │   ├── linkedin-posts.ts    # Configuration des posts LinkedIn
│   │   ├── LINKEDIN-README.md   # Guide d'ajout de posts
│   │   └── utils.ts
│   ├── about/               # Page À propos
│   ├── contact/             # Page Contact
│   ├── nos-services/        # Page Services
│   ├── our-projects/        # Page Projets
│   ├── ressources/
│   │   └── linkedin/        # Page LinkedIn avec carousel
│   ├── cgv/                 # Conditions Générales de Vente
│   ├── mentions-legales/    # Mentions Légales
│   ├── politique-confidentialite/  # RGPD
│   ├── layout.tsx           # Layout racine
│   ├── page.tsx             # Page d'accueil
│   └── globals.css          # Styles globaux Tailwind
├── public/                  # Assets statiques
│   ├── avatar-arthur.jpg
│   ├── logo.svg
│   └── ...
├── .gitignore
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── README.md
```

---

## 🌍 Déploiement

Le projet est déployé sur **Vercel** avec deux environnements :

### Environnements

| Environnement | Branche | URL | Déclenchement |
|---------------|---------|-----|---------------|
| **Production** | `main` | [arthurdev-siteweb.vercel.app](https://arthurdev-siteweb.vercel.app) | Push sur `main` |
| **Preview** | `dev` | [arthurdev-preview.vercel.app](https://arthurdev-preview.vercel.app) | Push sur `dev` |

### Déployer manuellement

```bash
# Déployer en production (branche main)
npx vercel --prod

# Déployer en preview
npx vercel
```

---

## ✨ Fonctionnalités clés

### 🎨 Design & UX

- **Design System cohérent** — Palette de couleurs, typographie et espacements uniformes
- **Animations subtiles** — Framer Motion et GSAP pour des transitions fluides
- **Responsive** — Adapté à tous les écrans (mobile, tablette, desktop)
- **Micro-interactions** — Effets de survol et animations d'apparition

### ⚡ Performance

- **Server Components** — Rendu côté serveur pour un chargement ultra-rapide
- **Optimisation images** — `next/image` avec lazy loading automatique
- **Optimisation polices** — `next/font` avec chargement optimisé
- **Code splitting** — Chargement différé des composants client
- **Core Web Vitals** — Scores élevés (LCP, FID, CLS)

### 🔗 Intégration LinkedIn

- **Fil d'actualités** — Affichage des derniers posts LinkedIn d'Arthur Lasnier
- **Système d'auteurs modulaire** — Prêt pour ajouter plusieurs contributeurs
- **Filtres par auteur** — Navigation intuitive entre les posts
- **Chargement progressif** — Skeleton loaders et animations d'apparition

---

## 📝 Ajouter des posts LinkedIn

### Ajouter un nouveau post (10 secondes)

1. **Copiez l'URL embed de votre post LinkedIn**
   - Allez sur LinkedIn, cliquez sur `...` > "Intégrer ce post"
   - Copiez le lien `src` de l'iframe fourni

2. **Ouvrez** `app/lib/linkedin-posts.ts`

3. **Ajoutez votre post** en haut du tableau `POSTS` :

```typescript
export const POSTS: LinkedInPostData[] = [
  // ⬇️ NOUVEAU POST ICI (les plus récents en haut)
  {
    embedSrc: "https://www.linkedin.com/embed/feed/update/urn:li:share:XXXXX?collapsed=1",
    height: 670,
    author: "arthur",
    date: "2026-05-05",
  },
  // ... autres posts
];
```

4. **Sauvegardez** — Le post apparaît immédiatement ! 🎉

### Guide complet

Consultez le guide détaillé : [`app/lib/LINKEDIN-README.md`](./app/lib/LINKEDIN-README.md)

---

## 🚀 Performance & Optimisations

### Stratégies appliquées

- **Static Site Generation (SSG)** — Pages pré-générées au build
- **Incremental Static Regeneration (ISR)** — Mise à jour progressive des pages statiques
- **Image Optimization** — Formats WebP/AVIF, responsive, lazy loading
- **Font Optimization** — Chargement asynchrone avec `next/font`
- **CSS Optimization** — Purge Tailwind, code splitting
- **Bundle Analysis** — Optimisation de la taille des chunks JavaScript

### Résultats

- ⚡ **Temps de chargement** < 1s
- 🎯 **Lighthouse Score** > 95
- 📦 **Taille bundle** optimisée avec Turbopack

---

## 🔄 Branches & Workflow

### Stratégie de branches

```
main  ──────●────────●────────●──────> Production (stable)
             │        │        │
dev   ──●────┴───●────┴───●────┴──────> Preview (développement)
```

### Workflow recommandé

1. **Développer** sur la branche `dev`
2. **Tester** sur l'environnement preview
3. **Merger** vers `main` quand stable
4. **Déploiement auto** en production

```bash
# Développement
git checkout dev
# ... faire vos modifications ...
git add .
git commit -m "feat: nouvelle fonctionnalité"
git push origin dev

# Quand stable, merger vers main
git checkout main
git merge dev
git push origin main
```

---

## 📄 Licence

© 2026 arthur.dev — Tous droits réservés.

---

## 🤝 Contact

**Arthur Lasnier**
🌐 [arthur.dev](https://arthurdev-siteweb.vercel.app)
💼 [LinkedIn](https://www.linkedin.com/in/arthur-lasnier-a5962435a)

---

<div align="center">
  <sub>Développé par arthur.dev</sub>
</div>
