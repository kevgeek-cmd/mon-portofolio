# 🎨 Guide de Personnalisation Rapide d'un Nouveau Site

Ce guide vous accompagne étape par étape pour transformer ce template en un site sur mesure pour votre prochain client en **10 à 15 minutes**.

---

## 📋 Checklist de Personnalisation

### 1. Variables d'Environnement (`.env`)
Modifiez les paramètres du nouveau client dans votre fichier `.env` :
- `DATABASE_URL` : Chaîne de connexion PostgreSQL du client.
- `NEXT_PUBLIC_SITE_URL` : Le nom de domaine officiel (ex: `https://acme-agency.com`).
- `JWT_SECRET` : Clé secrète aléatoire unique.

---

### 2. Identité de Marque & Textes (Via le CMS `/admin/settings`)
Connectez-vous sur `/admin` avec vos identifiants administrateur :

1. **Onglet "1. Identité & Logo"** :
   - Renseignez le **Nom de l'Entreprise** (ex: *Nova Studio*).
   - Renseignez le **Sous-titre / Slogan court** (ex: *Architecture & Design d'Intérieur*).
   - *Optionnel* : Ajoutez l'URL d'un logo image ou laissez vide pour conserver l'emblème géométrique doré.

2. **Onglet "2. Hero Banner"** :
   - Définissez le titre d'accroche principal et le texte explicatif.
   - Ajoutez le lien ou la vidéo de fond MP4 (si applicable).
   - Configurez le bouton d'action principal (CTA).

3. **Onglet "3. À Propos"** :
   - Modifiez les paragraphes de présentation, mission et vision.
   - Personnalisez les 4 valeurs piliers avec vos titres et descriptions.
   - Mettez à jour l'image de présentation.

4. **Onglet "4. Contact"** :
   - Saisissez l'email de contact, le numéro de téléphone et l'adresse physique du client.
   - Intégrez l'URL d'iframe Google Maps du bureau client.

5. **Onglet "5. SEO & Footer"** :
   - Renseignez le Meta Title (balise titre du navigateur).
   - Rédigez la Meta Description pour Google.
   - Ajoutez les mots-clés séparés par des virgules et le compte Twitter / X.

6. **Onglet "6. Menu"** :
   - Ajustez ou renommez les liens de navigation si nécessaire.

7. **Onglet "7. Couleurs"** :
   - Adaptez la couleur d'accentuation (or, bleu roi, émeraude, violet...) pour respecter la charte graphique exacte du client.

---

### 3. Portfolio & Projets (`/admin/projects`)
- Créez les catégories de projets adaptées à l'activité du client (ex: *Web*, *Mobile*, *Branding*, ou *Résidentiel*, *Commercial*).
- Ajoutez les projets avec leurs visuels, descriptions, technologies et liens live.

---

### 4. Blog & Articles (`/admin/blog`)
- Ajoutez les premiers articles ou actualités pour dynamiser le référencement naturel dès le lancement.

---

### 5. Réseaux Sociaux (Database ou Seed)
- Mettez à jour les URLs des réseaux sociaux officiels du client (LinkedIn, Instagram, Facebook, X, YouTube...).

---

## 💡 Astuces Pro

- **Changer la palette Tailwind** :
  Si vous souhaitez modifier les polices ou les couleurs de base à la racine du code, éditez directement `tailwind.config.js` et `app/globals.css`.
- **Ajout de nouveaux composants** :
  Tous les composants sont modulaires dans le dossier `components/sections/`. Vous pouvez facilement en ajouter de nouveaux et les importer dans `app/page.tsx`.
