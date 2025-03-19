#!/bin/bash

# Vérifier si Node.js est installé
if ! command -v node &> /dev/null; then
    echo "Node.js n'est pas installé. Veuillez l'installer avant de continuer."
    exit 1
fi

# Vérifier si Docker est installé
if ! command -v docker &> /dev/null; then
    echo "Docker n'est pas installé. Veuillez l'installer avant de continuer."
    exit 1
fi

# Installer les dépendances
echo "Installation des dépendances..."
npm install

# Générer les secrets
echo "Génération des secrets..."
node scripts/generate-secrets.js

# Construire les packages partagés
echo "Construction des packages partagés..."
npm run build --workspace=@mon-site-pro/ui
npm run build --workspace=@mon-site-pro/config

# Démarrer les services Docker pour le développement
echo "Démarrage des services Docker..."
docker-compose -f docker-compose.dev.yml up -d

echo "Configuration terminée! Votre environnement de développement est prêt."
echo "Pour démarrer le développement, exécutez: npm run dev"