'use strict';

export default async ({ strapi }: { strapi: any }) => {
  try {
    // Création des rôles si nécessaire
    const pluginStore = strapi.store({
      type: 'plugin',
      name: 'users-permissions',
    });

    const roles = await pluginStore.get({ key: 'roles' });
    
    // Log pour confirmer l'exécution
    strapi.log.info('Bootstrap script executed successfully');
    strapi.log.debug('Current roles:', roles);
    
    // Personnalisation des rôles si nécessaire
    // Ajouter ici la logique de personnalisation des rôles
    
  } catch (error) {
    strapi.log.error('Bootstrap script error:', error);
  }
};