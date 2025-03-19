#!/usr/bin/env node

const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

// Générer une chaîne aléatoire
const generateRandomString = (length = 32) => {
  return crypto.randomBytes(length).toString('base64').replace(/[^a-zA-Z0-9]/g, '').substring(0, length);
};

// Chemins des fichiers .env
const strapiEnvPath = path.join(__dirname, '../apps/backend/.env');
const rootEnvPath = path.join(__dirname, '../.env');

// Lire le fichier .env de Strapi s'il existe
let strapiEnv = '';
if (fs.existsSync(strapiEnvPath)) {
  strapiEnv = fs.readFileSync(strapiEnvPath, 'utf8');
}

// Générer les secrets
const APP_KEYS = `${generateRandomString(16)},${generateRandomString(16)}`;
const API_TOKEN_SALT = generateRandomString(32);
const ADMIN_JWT_SECRET = generateRandomString(32);
const TRANSFER_TOKEN_SALT = generateRandomString(32);
const JWT_SECRET = generateRandomString(32);

// Remplacer les valeurs dans le fichier .env de Strapi
strapiEnv = strapiEnv
  .replace(/APP_KEYS=.*$/m, `APP_KEYS=${APP_KEYS}`)
  .replace(/API_TOKEN_SALT=.*$/m, `API_TOKEN_SALT=${API_TOKEN_SALT}`)
  .replace(/ADMIN_JWT_SECRET=.*$/m, `ADMIN_JWT_SECRET=${ADMIN_JWT_SECRET}`)
  .replace(/TRANSFER_TOKEN_SALT=.*$/m, `TRANSFER_TOKEN_SALT=${TRANSFER_TOKEN_SALT}`)
  .replace(/JWT_SECRET=.*$/m, `JWT_SECRET=${JWT_SECRET}`);

// Écrire le fichier .env de Strapi mis à jour
fs.writeFileSync(strapiEnvPath, strapiEnv);

// Créer ou mettre à jour le fichier .env à la racine pour la production
const rootEnvContent = `
# Production environment variables
DATABASE_NAME=strapi_prod
DATABASE_USERNAME=strapi_prod
DATABASE_PASSWORD=${generateRandomString(16)}
ADMIN_JWT_SECRET=${ADMIN_JWT_SECRET}
JWT_SECRET=${JWT_SECRET}
API_TOKEN_SALT=${API_TOKEN_SALT}
NEXT_PUBLIC_STRAPI_API_URL=https://api.example.com
`;

fs.writeFileSync(rootEnvPath, rootEnvContent);

console.log('Secrets générés avec succès!');