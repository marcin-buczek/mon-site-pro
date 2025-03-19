# Architecture du Projet

## Vue d'ensemble

Ce projet utilise une architecture moderne découplée avec:

- Un frontend Next.js avec rendu hybride (SSR/SSG)
- Un backend headless CMS (Strapi)
- Une base de données PostgreSQL
- Une approche monorepo avec Turborepo

## Architecture Frontend

### Structure des dossiers

```
frontend/
├── src/
│   ├── app/              # Structure des routes Next.js App Router
│   │   ├── api/          # Routes API
│   │   ├── auth/         # Pages d'authentification
│   │   ├── (site)/       # Pages du site public
│   │   └── dashboard/    # Pages du tableau de bord (protégées)
│   ├── components/       # Composants React
│   │   ├── ui/           # Composants UI de base (shadcn/ui)
│   │   ├── layout/       # Composants de mise en page
│   │   └── sections/     # Sections de page réutilisables
│   ├── lib/              # Fonctions utilitaires
│   │   ├── api.ts        # Client API pour Strapi
│   │   └── utils.ts      # Utilitaires généraux
│   └── types/            # Types TypeScript
└── public/               # Fichiers statiques
```

### Flux de données

1. **Rendu côté serveur (SSR)**

   - Les pages dynamiques utilisent `getServerSideProps` pour charger les données
   - Authentification via Auth.js (NextAuth)

2. **Rendu statique (SSG)**

   - Les pages de contenu utilisent `getStaticProps` et `getStaticPaths`
   - Régénération statique incrémentale pour les mises à jour de contenu

3. **Hydratation côté client**
   - React Query pour la gestion des données côté client
   - Gestion d'état locale avec React Context ou Zustand

## Architecture Backend

### Structure des dossiers Strapi

```
backend/
├── api/                 # API Strapi
│   ├── [content-type]/  # Types de contenu
│   │   ├── content-types/
│   │   ├── controllers/
│   │   ├── routes/
│   │   └── services/
├── config/              # Configuration
├── public/              # Fichiers publics
└── src/
    ├── admin/          # Personnalisation de l'admin
    ├── extensions/     # Extensions des plugins
    └── plugins/        # Plugins personnalisés
```

### Modèle de contenu

Le CMS Strapi est configuré avec les types de contenu suivants:

1. **Page**

   - Titre
   - Slug
   - Contenu (composants dynamiques)
   - SEO (méta-titre, description, etc.)

2. **Article**

   - Titre
   - Contenu
   - Catégorie
   - Auteur
   - Date de publication

3. **Projet**

   - Titre
   - Description
   - Images
   - Technologies utilisées
   - URL du projet

4. **Compétence**
   - Nom
   - Catégorie
   - Niveau
   - Description

### API et permissions

- API REST et GraphQL exposées
- Stratégie d'authentification JWT
- Rôles et permissions:
  - Public: lecture des contenus publiés
  - Authentifié: accès aux contenus protégés
  - Éditeur: création et modification de contenu
  - Administrateur: accès complet

## Flux de déploiement

### Environnement de développement

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Feature   │     │   Develop   │     │ Pull Request│
│   Branch    │────►│   Branch    │────►│   Review    │
└─────────────┘     └─────────────┘     └─────────────┘
                                               │
                                               ▼
                                        ┌─────────────┐
                                        │ CI/CD Tests │
                                        └─────────────┘
                                               │
                                               ▼
                                        ┌─────────────┐
                                        │  Preview    │
                                        │ Deployment  │
                                        └─────────────┘
```

### Environnement de production

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Develop   │     │    Main     │     │ Production  │
│   Branch    │────►│   Branch    │────►│ Deployment  │
└─────────────┘     └─────────────┘     └─────────────┘
                                               │
                                               ▼
                                        ┌─────────────┐
                                        │  Vercel     │
                                        │  (Frontend) │
                                        └─────────────┘
                                               │
                                               ▼
                                        ┌─────────────┐
                                        │  Railway    │
                                        │  (Backend)  │
                                        └─────────────┘
```

## Sécurité

### Authentification et autorisation

- JWT pour l'authentification API
- Sessions côté serveur pour l'authentification utilisateur
- RBAC (Role-Based Access Control) pour les permissions
- Protection CSRF pour les formulaires

### Sécurité des données

- Validation des entrées côté client et serveur
- Sanitisation des données
- Rate limiting pour les API
- Protection contre les injections SQL (ORM)

### Infrastructure

- HTTPS obligatoire
- En-têtes de sécurité (CSP, HSTS, etc.)
- Secrets stockés dans des variables d'environnement
- Backups réguliers de la base de données
