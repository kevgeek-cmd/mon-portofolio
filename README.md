# 🚀 Template Landing Page & CMS Pro

Bienvenue dans le **Template Landing Page Professionnel, Réutilisable et Personnalisable**.
Ce projet est une solution complète, moderne et prête à l'emploi permettant de créer et déployer des sites vitrines / landing pages haut de gamme en un temps record pour n'importe quel futur client ou marque.

---

## 🌟 Points Forts & Fonctionnalités

- ⚡ **Next.js 16 (App Router)** & **React 19** pour des performances optimales et un SEO d'excellence.
- 🎨 **Design Moderne & Luxueux** : Thème sombre / or / beige personnalisable, animations Framer Motion, micro-interactions, responsive mobile-first.
- 🛠️ **CMS Intégré Complet (`/admin`)** :
  - **Identité & Logo** : Modification dynamique du nom d'entreprise, sous-titre et logo.
  - **Section Hero** : Titre, sous-titre, vidéo de fond, CTA.
  - **Section À Propos & Piliers** : Textes, badges, statistiques et 4 valeurs clés.
  - **Projets / Portfolio** : Carrousel interactif Embla avec filtres par catégorie.
  - **Blog / Actualités** : Gestion des articles, éditeur riche, catégories, tags, commentaires et partage social.
  - **Vidéos YouTube & Galerie Photos** : Intégration fluide de médias et playlists.
  - **Formulaire de Contact & Newsletter** : Réception des messages avec gestion en back-office.
  - **SEO & Réseaux Sociaux** : Balises OpenGraph, Twitter Cards, Sitemap XML, Flux RSS et Schema.org JSON-LD dynamiques.
- 🗄️ **Base de Données PostgreSQL** gérée avec **Prisma ORM** et compatible **Supabase**.
- 🔐 **Authentification Sécurisée** par JWT & Cookies HTTP-Only.

---

## 🧱 Architecture Technique

```
├── app/
│   ├── (public)             # Pages publiques (Accueil, Blog...)
│   │   ├── page.tsx         # Page d'accueil dynamique assemblant les sections
│   │   ├── layout.tsx       # Root layout avec metadata & schema.org dynamiques
│   │   ├── blog/[slug]/     # Page de détail d'un article
│   │   ├── sitemap.ts       # Sitemap dynamique
│   │   ├── robots.ts        # Fichier robots.txt dynamique
│   │   └── feed.xml/        # Flux RSS dynamique
│   ├── admin/               # Espace d'administration CMS (/admin)
│   │   ├── dashboard/       # Vue globale et statistiques
│   │   ├── settings/        # Gestion de marque, textes, SEO et couleurs
│   │   ├── projects/        # Gestion du portfolio
│   │   ├── blog/            # Gestion des articles
│   │   ├── gallery/         # Gestion de la galerie
│   │   ├── videos/          # Gestion des vidéos YouTube
│   │   └── messages/        # Boîte de réception des messages
│   └── api/                 # Route Handlers REST sécurisés
├── components/
│   ├── layout/              # Header, Footer
│   ├── sections/            # Hero, About, ProjectsCarousel, BlogSection, ContactSection
│   └── ui/                  # Logo, boutons, icônes sociales, carrousel
├── prisma/
│   ├── schema.prisma        # Schéma complet de la base de données
│   ├── seed.ts              # Données de démonstration agence neutres
│   └── seed.js              # Script de seed alternatif
├── supabase/
│   └── schema.sql           # Script SQL complet pour déploiement direct Supabase
└── lib/
    ├── prisma.ts            # Client Prisma singleton
    ├── auth.ts              # Utilitaires JWT et sessions admin
    └── types.ts             # Interfaces TypeScript
```

---

## ⚙️ Prérequis

- **Node.js** v18+ (recommandé v20+)
- **npm** ou **yarn** / **pnpm**
- Une instance **PostgreSQL** (ex: [Supabase](https://supabase.com), [Neon](https://neon.tech), ou local)

---

## 🚀 Installation & Démarrage Rapide

### 1. Cloner ou dupliquer le template
```bash
git clone <votre-repo> mon-nouveau-site
cd mon-nouveau-site
```

### 2. Installer les dépendances
```bash
npm install
```

### 3. Configurer les variables d'environnement
Copiez `.env.example` vers `.env` :
```bash
cp .env.example .env
```
Renseignez votre chaîne de connexion `DATABASE_URL` et vos clés secrètes.

### 4. Initialiser la Base de Données & Seed
```bash
# Appliquer le schéma à la base de données
npm run db:push

# Insérer les données de démonstration neutres
npm run db:seed
```

### 5. Démarrer le serveur de développement
```bash
npm run dev
```
Accédez au site sur [http://localhost:3000](http://localhost:3000).

---

## 🔑 Accès à l'Administration CMS

- **URL d'accès** : [http://localhost:3000/admin/login](http://localhost:3000/admin/login)
- **Identifiants par défaut** (créés via le seed) :
  - **Email** : `admin@template.local`
  - **Mot de passe** : `AdminSecret2026!`
  *(Pensez à changer ces identifiants lors du passage en production).*

---

## 📖 Guide de Personnalisation pour un Futur Client

Pour personnaliser ce template pour un nouveau projet client en moins de 15 minutes, consultez le [Guide de Personnalisation](file:///Users/macbook/Desktop/APPS%20TEST%20KEVIN/225%20Attitude/CUSTOMIZATION_GUIDE.md).

---

## 📦 Déploiement en Production (Vercel)

1. Poussez votre code sur GitHub / GitLab.
2. Créez un nouveau projet sur **Vercel** et importez le dépôt.
3. Configurez les variables d'environnement (`DATABASE_URL`, `DIRECT_URL`, `JWT_SECRET`, `NEXT_PUBLIC_SITE_URL`).
4. Déployez ! La commande de build `prisma generate && next build` est déjà préconfigurée.
