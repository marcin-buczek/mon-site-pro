# Mon Site Professionnel

Ce projet est une application web complète comprenant un frontend Next.js et un backend Strapi CMS.

## Structure du projet

```
mon-site-pro/
├── apps/
│   ├── frontend/        # Application Next.js
│   └── backend/         # Strapi CMS
├── packages/
│   ├── ui/              # Composants UI réutilisables
│   └── config/          # Configuration partagée
├── docker/              # Fichiers Docker
└── scripts/             # Scripts utilitaires
```

## Prérequis

- Node.js 20.x
- Docker et Docker Compose
- Git

## Installation

1. Cloner le dépôt:

   ```bash
   git clone https://github.com/votre-username/mon-site-pro.git
   cd mon-site-pro
   ```

2. Exécuter le script de configuration:
   ```bash
   ./scripts/setup.sh
   ```

## Développement

Pour démarrer l'environnement de développement:

```bash
npm run dev
```

### URLs locales:

- Frontend: http://localhost:3000
- Backend (Strapi): http://localhost:1337/admin

## Déploiement

### Déploiement de développement

Les déploiements de développement sont automatiquement effectués sur la branche `develop`.

### Déploiement de production

Les déploiements de production sont effectués manuellement depuis la branche `main`.

```bash
# Déployer en production
git checkout main
git merge develop
git push
```

## Licence

Tous droits réservés.
