# Guide de déploiement

Ce document détaille les étapes pour déployer l'application en production.

## Prérequis

- Comptes sur Vercel et Railway
- Nom de domaine configuré
- Accès SSH au serveur (si déploiement manuel)

## Déploiement automatisé (recommandé)

### Configuration de Vercel (Frontend)

1. Connectez votre dépôt GitHub à Vercel
2. Configurez le projet:

   - Framework preset: Next.js
   - Root directory: apps/frontend
   - Build command: npm run build
   - Output directory: .next

3. Configurez les variables d'environnement:

   ```
   NEXT_PUBLIC_STRAPI_API_URL=https://api.votre-domaine.com
   NEXTAUTH_URL=https://votre-domaine.com
   NEXTAUTH_SECRET=votre-secret-nextauth
   ```

4. Déployez le projet

### Configuration de Railway (Backend)

1. Connectez votre dépôt GitHub à Railway
2. Créez un nouveau projet avec les services:

   - Service Strapi (apps/backend)
   - Service PostgreSQL

3. Configurez les variables d'environnement pour Strapi:

   ```
   NODE_ENV=production
   DATABASE_CLIENT=postgres
   DATABASE_URL=${DATABASE_URL fourni par Railway}
   ADMIN_JWT_SECRET=votre-secret-admin-jwt
   JWT_SECRET=votre-secret-jwt
   API_TOKEN_SALT=votre-salt-api-token
   APP_KEYS=cle1,cle2
   ```

4. Déployez le projet

### Configuration du domaine

1. Configurez votre domaine dans Vercel
2. Configurez un sous-domaine pour l'API dans Railway (api.votre-domaine.com)
3. Mettez à jour les DNS chez votre registrar

## Déploiement manuel (alternative)

### Préparation du serveur

1. Installez Docker et Docker Compose

   ```bash
   apt update
   apt install -y docker.io docker-compose
   systemctl enable --now docker
   ```

2. Configurez Nginx et Certbot

   ```bash
   apt install -y nginx certbot python3-certbot-nginx
   ```

3. Clonez le dépôt
   ```bash
   git clone https://github.com/votre-username/mon-site-pro.git /opt/mon-site-pro
   cd /opt/mon-site-pro
   ```

### Configuration des variables d'environnement

1. Créez le fichier .env

   ```bash
   cp .env.example .env
   nano .env  # Modifiez les valeurs
   ```

2. Générez les secrets
   ```bash
   node scripts/generate-secrets.js
   ```

### Déploiement avec Docker Compose

1. Construisez et démarrez les conteneurs

   ```bash
   docker-compose -f docker-compose.prod.yml build
   docker-compose -f docker-compose.prod.yml up -d
   ```

2. Configurez SSL avec Certbot
   ```bash
   certbot --nginx -d votre-domaine.com -d www.votre-domaine.com
   ```

### Mise à jour de l'application

1. Récupérez les dernières modifications

   ```bash
   git pull origin main
   ```

2. Reconstruisez et redémarrez les conteneurs
   ```bash
   docker-compose -f docker-compose.prod.yml build
   docker-compose -f docker-compose.prod.yml up -d
   ```

## Monitoring et maintenance

### Surveillance des logs

```bash
# Logs Docker
docker-compose -f docker-compose.prod.yml logs -f

# Logs Nginx
tail -f /var/log/nginx/access.log
tail -f /var/log/nginx/error.log
```

### Backups

1. Sauvegarde de la base de données

   ```bash
   # Script de backup automatique
   cat > /opt/backup-db.sh << 'ENDSCRIPT'
   #!/bin/bash
   DATE=$(date +%Y%m%d)
   BACKUP_DIR=/opt/backups
   mkdir -p $BACKUP_DIR
   docker exec mon-site-pro_postgres_1 pg_dump -U strapi strapi > $BACKUP_DIR/db_$DATE.sql
   ENDSCRIPT
   chmod +x /opt/backup-db.sh
   ```

2. Ajoutez le script au crontab
   ```bash
   crontab -e
   # Ajoutez: 0 2 * * * /opt/backup-db.sh
   ```

### Mise à jour des certificats SSL

Les certificats Let's Encrypt sont renouvelés automatiquement par Certbot.
Vérifiez que le renouvellement fonctionne:

```bash
certbot renew --dry-run
```

## Résolution des problèmes courants

### Problème: Le frontend ne peut pas se connecter au backend

**Solution:**

1. Vérifiez que l'URL de l'API est correcte dans les variables d'environnement
2. Vérifiez que les CORS sont correctement configurés dans Strapi
3. Vérifiez les règles de pare-feu et les groupes de sécurité

### Problème: Erreurs 502 Bad Gateway

**Solution:**

1. Vérifiez que tous les conteneurs sont en cours d'exécution
   ```bash
   docker-compose -f docker-compose.prod.yml ps
   ```
2. Vérifiez les logs Nginx et des conteneurs
3. Redémarrez Nginx
   ```bash
   systemctl restart nginx
   ```

### Problème: Performances lentes

**Solution:**

1. Vérifiez l'utilisation des ressources
   ```bash
   docker stats
   ```
2. Augmentez les ressources allouées aux conteneurs
3. Activez la mise en cache dans Nginx
