#!/bin/bash

# Afficher le message d'accueil
echo "======================================"
echo "  Configuration de Mon Site Pro      "
echo "======================================"
echo ""

# Vérifier les prérequis
command -v node >/dev/null 2>&1 || { echo "Node.js est requis mais n'est pas installé. Veuillez l'installer avant de continuer."; exit 1; }
command -v npm >/dev/null 2>&1 || { echo "npm est requis mais n'est pas installé. Veuillez l'installer avant de continuer."; exit 1; }
command -v docker >/dev/null 2>&1 || { echo "Docker est requis mais n'est pas installé. Veuillez l'installer avant de continuer."; exit 1; }
command -v docker-compose >/dev/null 2>&1 || { echo "Docker Compose est requis mais n'est pas installé. Veuillez l'installer avant de continuer."; exit 1; }

echo "Tous les prérequis sont installés."
echo ""

# Demander à l'utilisateur de choisir le mode d'installation
echo "Choisissez le mode d'installation :"
echo "1. Développement (recommandé pour commencer)"
echo "2. Production"
read -p "Votre choix (1/2): " install_mode

# Installer les dépendances
echo ""
echo "Installation des dépendances..."
npm install

# Générer les secrets
echo ""
echo "Génération des secrets..."
node scripts/generate-secrets.js

# Construire les packages partagés
echo ""
echo "Construction des packages partagés..."
npm run build --workspace=@mon-site-pro/ui
npm run build --workspace=@mon-site-pro/config

# Démarrer les services Docker selon le mode choisi
echo ""
if [ "$install_mode" = "1" ]; then
  echo "Démarrage des services Docker en mode développement..."
  docker-compose -f docker-compose.dev.yml up -d
  
  echo ""
  echo "======================================"
  echo "  Installation terminée avec succès!  "
  echo "======================================"
  echo ""
  echo "Accès à l'application :"
  echo "- Frontend: http://localhost:3000"
  echo "- Backend (Strapi): http://localhost:1337/admin"
  echo ""
  echo "Pour démarrer le développement, exécutez: npm run dev"
else
  echo "Démarrage des services Docker en mode production..."
  docker-compose -f docker-compose.prod.yml up -d
  
  echo ""
  echo "======================================"
  echo "  Installation terminée avec succès!  "
  echo "======================================"
  echo ""
  echo "Votre application est maintenant déployée en production."
  echo "Assurez-vous de configurer votre nom de domaine et vos certificats SSL."
  echo ""
  echo "Pour plus d'informations, consultez la documentation dans le dossier docs/"
fi

echo ""
echo "Merci d'avoir installé Mon Site Pro!"