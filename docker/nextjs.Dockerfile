FROM node:22-alpine AS base

# Installation des dépendances système nécessaires pour Turbopack
RUN apk add --no-cache libc6-compat

# Configuration pour le développement avec Turbopack
FROM base AS development
WORKDIR /app

# Copier uniquement les fichiers de dépendances pour optimiser le cache Docker
COPY apps/frontend/package*.json ./

# Installer les dépendances
RUN npm install

# Le reste des fichiers sera monté comme volume
# Ne pas copier le code source dans l'image pour permettre le hot-reload

EXPOSE 3000

# Commande pour démarrer avec Turbopack
CMD ["npm", "run", "dev"]

# Installer les dépendances nécessaires
FROM base AS deps
WORKDIR /app

COPY apps/frontend/package*.json ./

RUN npm install

# Construction de l'application
FROM base AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY apps/frontend .

RUN npm run build

# Image de production
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/public ./public

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["npm", "start"]