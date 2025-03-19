# Guide d'utilisation de Strapi

Ce document explique comment utiliser et étendre le CMS Strapi dans ce projet.

## Accès à l'administration

- URL locale: http://localhost:1337/admin
- Identifiants par défaut:
  - Email: admin@example.com
  - Mot de passe: Admin123

## Types de contenu

### Création d'un nouveau type de contenu

1. Accédez à "Content-Type Builder" dans le menu de gauche
2. Cliquez sur "Create new collection type"
3. Définissez le nom et les champs
4. Enregistrez le type de contenu

### Types de champs disponibles

- Texte (court, long, riche)
- Nombre
- Date
- Média
- Booléen
- Relation
- JSON
- Enumération

### Composants réutilisables

Les composants permettent de créer des structures de données réutilisables:

1. Accédez à "Content-Type Builder"
2. Cliquez sur "Create new component"
3. Définissez la catégorie et le nom
4. Ajoutez les champs nécessaires

## API et permissions

### Configuration des permissions

1. Accédez à "Settings > Roles"
2. Sélectionnez un rôle (Public, Authenticated)
3. Définissez les permissions pour chaque type de contenu
4. Enregistrez les modifications

### Utilisation de l'API

#### Exemples de requêtes REST

```javascript
// Récupérer tous les articles
fetch("http://localhost:1337/api/articles")
  .then((response) => response.json())
  .then((data) => console.log(data));

// Récupérer un article spécifique
fetch("http://localhost:1337/api/articles/1")
  .then((response) => response.json())
  .then((data) => console.log(data));

// Créer un article (nécessite authentification)
fetch("http://localhost:1337/api/articles", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer YOUR_JWT_TOKEN",
  },
  body: JSON.stringify({
    data: {
      title: "Mon nouvel article",
      content: "Contenu de l'article",
    },
  }),
})
  .then((response) => response.json())
  .then((data) => console.log(data));
```

#### Exemples de requêtes GraphQL

```javascript
// Récupérer tous les articles avec leurs catégories
const query = `
  query {
    articles {
      data {
        id
        attributes {
          title
          content
          category {
            data {
              attributes {
                name
              }
            }
          }
        }
      }
    }
  }
`;

fetch("http://localhost:1337/graphql", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ query }),
})
  .then((response) => response.json())
  .then((data) => console.log(data));
```

## Extensions et plugins

### Installation d'un plugin

```bash
cd apps/backend
npm install strapi-plugin-nom-du-plugin
```

Puis redémarrez Strapi.

### Plugins recommandés

- **strapi-plugin-seo**: Gestion des métadonnées SEO
- **strapi-plugin-slugify**: Génération automatique de slugs
- **strapi-plugin-import-export-entries**: Import/export de contenu
- **strapi-plugin-preview-button**: Prévisualisation du contenu

## Déploiement

### Préparation pour la production

1. Générer des clés API sécurisées
2. Configurer les variables d'environnement
3. Optimiser la base de données

### Sauvegarde et restauration

```bash
# Sauvegarde
strapi export --no-encrypt

# Restauration
strapi import -f export_20250311.tar.gz
```

## Bonnes pratiques

1. **Modélisation des données**

   - Utiliser des composants pour les structures répétitives
   - Définir des relations claires entre les types de contenu
   - Utiliser des champs dynamiques zones pour les contenus flexibles

2. **Sécurité**

   - Limiter les permissions au minimum nécessaire
   - Utiliser des tokens API avec des permissions spécifiques
   - Activer l'authentification à deux facteurs

3. **Performance**
   - Utiliser la mise en cache des requêtes API
   - Optimiser les requêtes avec des filtres et des relations
   - Limiter le nombre de plugins actifs
