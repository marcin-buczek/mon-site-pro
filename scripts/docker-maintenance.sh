#!/bin/bash

echo "🧹 Nettoyage des volumes Docker inutilisés..."
docker volume prune -f

echo "🧹 Nettoyage des images non utilisées..."
docker image prune -a -f

echo "🧹 Nettoyage des conteneurs arrêtés..."
docker container prune -f

echo "✅ Nettoyage terminé!"