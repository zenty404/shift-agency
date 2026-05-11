# 📧 Configuration de l'envoi d'emails avec Resend

## ✅ Ce qui a été fait

Tout le code est prêt ! Il ne reste plus qu'à configurer ta clé API Resend.

### 📦 Fichiers créés

1. **Templates d'emails** (avec React Email)
   - `emails/QuizEmail.tsx` - Email stylé pour les demandes de devis du configurateur
   - `emails/ContactEmail.tsx` - Email stylé pour les messages de contact

2. **API Routes**
   - `app/api/quiz/route.ts` - Endpoint pour le formulaire Quiz
   - `app/api/contact/route.ts` - Endpoint pour le formulaire Contact

3. **Composants mis à jour**
   - `app/components/Quiz.tsx` - Connecté à l'API avec gestion d'états
   - `app/contact/page.tsx` - Connecté à l'API avec gestion d'états

4. **Configuration**
   - `.env.local` - Variables d'environnement (à compléter)

---

## 🚀 Configuration (5 minutes)

### Étape 1 : Créer un compte Resend (gratuit)

1. Va sur [resend.com](https://resend.com)
2. Clique sur "Sign up" et crée un compte
3. Confirme ton email

### Étape 2 : Obtenir ta clé API

1. Une fois connecté, va dans **API Keys** dans le menu
2. Clique sur **Create API Key**
3. Donne un nom (ex: "ShiftAgency Production")
4. Sélectionne les permissions **Sending access**
5. Copie la clé (elle commence par `re_...`)

### Étape 3 : Configurer les variables d'environnement

Ouvre le fichier `.env.local` et remplace :

```env
RESEND_API_KEY=re_votre_clé_ici

# Email de l'expéditeur (doit être vérifié dans Resend)
EMAIL_FROM=contact@arthur-dev.eu

# Email de destination (où tu recevras les demandes)
EMAIL_TO=contact@arthur-dev.eu
```

### Étape 4 : Vérifier ton domaine (optionnel mais recommandé)

Par défaut, Resend utilise `onboarding@resend.dev` comme expéditeur. Pour utiliser ton propre domaine :

1. Dans Resend, va dans **Domains**
2. Clique sur **Add Domain**
3. Entre ton domaine (`arthur-dev.eu`)
4. Suis les instructions pour ajouter les records DNS (SPF, DKIM, DMARC)
5. Une fois vérifié, mets à jour `EMAIL_FROM` avec ton adresse

---

## 🧪 Tester les formulaires

### Test en local

1. Lance le serveur de dev :
   ```bash
   npm run dev
   ```

2. Ouvre ton navigateur :
   - Quiz : `http://localhost:3000` (scroll jusqu'au configurateur)
   - Contact : `http://localhost:3000/contact`

3. Remplis un formulaire et soumets

4. Vérifie ta boîte mail (regarde aussi les spams)

### Ce que tu dois voir

✅ **Quiz Form** - Email avec :
- Infos du client (nom, prénom, email, téléphone, entreprise, ville)
- **Pack sélectionné** (label, prix, délai)
- **Fonctionnalités incluses** (liste complète)
- Détails supplémentaires (si renseignés)

✅ **Contact Form** - Email avec :
- Infos du client (nom, prénom, email, téléphone, entreprise, secteur)
- Message complet

---

## 🎨 Personnalisation

### Changer le design des emails

Édite les fichiers dans `/emails/` :
- `QuizEmail.tsx` - Template du quiz
- `ContactEmail.tsx` - Template du contact

Les styles sont en CSS-in-JS (inline styles pour compatibilité email).

### Changer les messages de succès

Édite les composants :
- `app/components/Quiz.tsx` (ligne avec `setSubmitMessage`)
- `app/contact/page.tsx` (ligne avec `setSubmitMessage`)

### Ajouter un email de confirmation au client

Dans les API routes (`app/api/quiz/route.ts` ou `app/api/contact/route.ts`), ajoute un second appel à `resend.emails.send()` avec :
- `to: email` (l'email du client)
- Un template de confirmation

---

## 📊 Limites du plan gratuit Resend

- ✅ **3 000 emails/mois** (largement suffisant pour démarrer)
- ✅ **100 emails/jour** maximum
- ✅ Tous les domaines vérifiés
- ✅ Analytics et logs inclus

Si tu dépasses, upgrade vers le plan Pro (20$/mois pour 50 000 emails).

---

## 🐛 Dépannage

### "RESEND_API_KEY is not defined"
→ Vérifie que tu as bien créé le fichier `.env.local` et ajouté la clé

### "Email not sent" ou erreur 500
→ Vérifie ta clé API dans le dashboard Resend
→ Regarde les logs dans le terminal (`npm run dev`)

### Les emails arrivent en spam
→ Vérifie ton domaine dans Resend (SPF, DKIM, DMARC)
→ Utilise un vrai domaine vérifié au lieu de `onboarding@resend.dev`

### Le formulaire ne s'envoie pas
→ Ouvre la console du navigateur (F12) pour voir les erreurs
→ Vérifie que le serveur Next.js tourne

---

## 📞 Support

- [Documentation Resend](https://resend.com/docs)
- [Documentation React Email](https://react.email/docs)
- [Dashboard Resend](https://resend.com/emails) pour voir tous les emails envoyés

---

## 🎉 Prochaines étapes

Une fois les emails configurés, tu peux :
- ✅ Ajouter un webhook pour notifier sur Slack/Discord
- ✅ Intégrer avec un CRM (HubSpot, Pipedrive, etc.)
- ✅ Envoyer des emails de confirmation aux clients
- ✅ Créer des séquences d'emails automatiques
