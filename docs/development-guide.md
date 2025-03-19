# Guide de développement

Ce document fournit les directives et bonnes pratiques pour le développement de ce projet.

## Workflow Git

Nous utilisons un workflow basé sur Git Flow:

1. **Branches principales**

   - `main`: Code de production
   - `develop`: Branche d'intégration

2. **Branches de fonctionnalités**

   - Format: `feature/nom-de-la-fonctionnalite`
   - Créées à partir de `develop`
   - Fusionnées dans `develop` via Pull Request

3. **Branches de correction**

   - Format: `hotfix/nom-du-correctif`
   - Créées à partir de `main`
   - Fusionnées dans `main` et `develop`

4. **Commits**
   - Format: `type(scope): description`
   - Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`
   - Exemple: `feat(auth): ajouter la connexion avec Google`

## Standards de code

### TypeScript

- Utiliser des types explicites plutôt que `any`
- Préférer les interfaces pour les objets publics
- Utiliser les types d'union pour les valeurs limitées
- Documenter les fonctions complexes avec JSDoc

### React

- Utiliser des composants fonctionnels avec hooks
- Séparer la logique métier de la présentation
- Utiliser des props typées
- Éviter les effets de bord dans les composants

### CSS/Styling

- Utiliser TailwindCSS pour le styling
- Créer des composants pour les patterns répétitifs
- Suivre une approche mobile-first
- Utiliser les variables CSS pour les thèmes

## Structure des composants

Chaque composant devrait suivre cette structure:

```tsx
// Imports
import React from "react";
import { useEffect, useState } from "react";
import { ComponentProps } from "./types";

// Types
interface Props {
  title: string;
  children: React.ReactNode;
}

// Component
export const Component = ({ title, children }: Props) => {
  // State et hooks
  const [isOpen, setIsOpen] = useState(false);

  // Side effects
  useEffect(() => {
    // Effect logic
  }, []);

  // Handlers
  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  // Render
  return (
    <div>
      <h2>{title}</h2>
      <button onClick={handleClick}>Toggle</button>
      {isOpen && <div>{children}</div>}
    </div>
  );
};
```
