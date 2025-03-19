#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Vérifier la structure des dossiers
console.log('Vérification de la structure du projet...');
const requiredDirs = [
  'apps/frontend',
  'apps/backend',
  'packages/ui',
  'packages/config',
  'docker',
  'scripts',
  'docs'
];

let allDirsExist = true;
for (const dir of requiredDirs) {
  if (!fs.existsSync(path.join(process.cwd(), dir))) {
    console.error(`Dossier manquant: \${dir}`);
    allDirsExist = false;
  }
}

if (!allDirsExist) {
  console.error('Certains dossiers sont manquants. Veuillez vérifier la structure du projet.');
  process.exit(1);
}

// Vérifier les fichiers de configuration
console.log('Vérification des fichiers de configuration...');
const requiredFiles = [
  'turbo.json',
  'docker-compose.dev.yml',
  'docker/nextjs.Dockerfile',
  'docker/strapi.Dockerfile',
  '.github/workflows/ci.yml'
];

let allFilesExist = true;
for (const file of requiredFiles) {
  if (!fs.existsSync(path.join(process.cwd(), file))) {
    console.error(`Fichier manquant: \${file}`);
    allFilesExist = false;
  }
}

if (!allFilesExist) {
  console.error('Certains fichiers de configuration sont manquants.');
  process.exit(1);
}

// Vérifier les dépendances Node.js
console.log('Vérification des dépendances Node.js...');
try {
  execSync('npm ls --depth=0', { stdio: 'ignore' });
  console.log('Toutes les dépendances sont correctement installées.');
} catch (error) {
  console.warn('Certaines dépendances peuvent être manquantes ou incorrectes.');
}

// Vérifier Docker
console.log('Vérification de Docker...');
try {
  execSync('docker --version', { stdio: 'pipe' });
  execSync('docker-compose --version', { stdio: 'pipe' });
  console.log('Docker et Docker Compose sont correctement installés.');
} catch (error) {
  console.error('Docker ou Docker Compose ne sont pas correctement installés.');
  process.exit(1);
}

console.log('Vérification terminée avec succès! Le projet est correctement configuré.');