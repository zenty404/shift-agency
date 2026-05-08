# 📌 Guide : Ajouter des posts LinkedIn

## 🚀 Ajouter un nouveau post (10 secondes)

1. **Publiez votre post sur LinkedIn**

2. **Copiez l'URL du post**
   - Cliquez sur les `...` en haut à droite du post
   - Cliquez sur "Copier le lien du post"
   - Vous obtenez une URL comme : `https://www.linkedin.com/posts/arthur-lasnier-a5962435a_webdev-nextjs-react-activity-1234567890123-AbCd`

3. **Ouvrez le fichier** `app/lib/linkedin-posts.ts`

4. **Collez l'URL dans le tableau `POSTS`** (en haut de la liste) :

```typescript
export const POSTS = [
  // ⬇️ COLLEZ VOTRE NOUVEAU POST ICI (les plus récents en haut)
  {
    url: "https://www.linkedin.com/posts/arthur-lasnier-a5962435a_...",
    author: "arthur",
    date: "2026-05-05", // Date du jour
  },
  // ... autres posts
];
```

5. **Sauvegardez** - Le post apparaît immédiatement sur votre site ! 🎉

---

## 👥 Ajouter un nouvel auteur (votre associé)

Quand vous aurez défini votre associé :

1. **Dans `app/lib/linkedin-posts.ts`**, décommentez et complétez :

```typescript
export const AUTHORS = {
  arthur: { ... },
  associe: {
    id: "associe",
    name: "Prénom Nom", // ⬅️ Nom de votre associé
    linkedin: "https://www.linkedin.com/in/...", // ⬅️ Son profil LinkedIn
    avatar: "/avatar-associe.jpg", // Optionnel
  },
};
```

2. **Ajoutez la catégorie dans `CATEGORIES`** :

```typescript
export const CATEGORIES = [
  { id: "all", label: "Tout voir" },
  { id: "arthur", label: "Postes d'Arthur Lasnier" },
  { id: "associe", label: "Postes de [Nom Associé]" }, // ⬅️ Décommentez et modifiez
];
```

3. **Ajoutez les posts de votre associé** :

```typescript
export const POSTS = [
  {
    url: "https://www.linkedin.com/posts/...",
    author: "associe", // ⬅️ Utilisez l'ID de l'auteur
    date: "2026-05-05",
  },
  // ...
];
```

---

## 🎯 Ordre d'affichage

Les posts sont affichés **dans l'ordre du tableau** (du haut vers le bas).

✅ **Bonne pratique** : Ajoutez toujours les nouveaux posts **en haut** de la liste pour qu'ils apparaissent en premier.

---

## 🔍 Filtres

- **"Tout voir"** → Affiche tous les posts de tous les auteurs
- **"Postes d'Arthur Lasnier"** → Affiche uniquement les posts d'Arthur
- **"Postes de [Associé]"** → Affiche uniquement les posts de l'associé

---

## ⚡ Performance

- Les embeds LinkedIn sont mis en cache pendant 1 heure
- Chargement progressif avec animation
- État de chargement et gestion d'erreurs automatiques

---

## 🐛 Dépannage

**Le post ne s'affiche pas ?**
- Vérifiez que l'URL est complète et commence par `https://www.linkedin.com/posts/`
- Vérifiez que le post est **public** sur LinkedIn
- Attendez quelques secondes (le chargement peut prendre 2-3 secondes)

**Message "Aucun post pour le moment" ?**
- Le tableau `POSTS` est vide
- Ajoutez au moins un post avec la structure ci-dessus

---

## 📝 Exemple complet

```typescript
export const POSTS = [
  // Post du 5 mai 2026
  {
    url: "https://www.linkedin.com/posts/arthur-lasnier-a5962435a_nextjs-react-webdev-activity-7193847562847562847-AbCd",
    author: "arthur",
    date: "2026-05-05",
  },
  // Post du 3 mai 2026
  {
    url: "https://www.linkedin.com/posts/arthur-lasnier-a5962435a_typescript-frontend-activity-7193123456789123456-XyZw",
    author: "arthur",
    date: "2026-05-03",
  },
  // Post de l'associé du 1er mai 2026
  {
    url: "https://www.linkedin.com/posts/associe-profile_design-uxui-activity-7192999888777666555-QrSt",
    author: "associe",
    date: "2026-05-01",
  },
];
```
