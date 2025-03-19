/**
 * Client API pour Strapi
 */

export const API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337';

/**
 * Récupère les données depuis l'API Strapi
 * @param path - Chemin de l'API
 * @param urlParams - Paramètres de requête
 */
export async function fetchAPI(path: string, urlParams = {}) {
  // Construire l'URL avec les paramètres
  const queryString = new URLSearchParams(
    Object.entries(urlParams).map(([key, value]) => [key, String(value)])
  ).toString();
  
  const baseUrl = `${API_URL}/api${path}${queryString ? `?${queryString}` : ''}`;
  const url = new URL(baseUrl);

  // Faire la requête
  const response = await fetch(url);
  
  // Vérifier si la requête a réussi
  if (!response.ok) {
    throw new Error(`Erreur API: ${response.statusText}`);
  }
  
  // Retourner les données
  const data = await response.json();
  return data;
}

/**
 * Récupère tous les projets
 * @param params - Paramètres de requête (pagination, filtres, etc.)
 */
export async function getProjects(params = {}) {
  const defaultParams = {
    populate: '*',
    sort: 'order:asc',
    'pagination[pageSize]': 100,
    ...params,
  };
  
  const data = await fetchAPI('/projects', defaultParams);
  return data;
}

/**
 * Récupère un projet par son slug
 * @param slug - Slug du projet
 */
export async function getProjectBySlug(slug: string) {
  const data = await fetchAPI('/projects', {
    filters: { slug: { $eq: slug } },
    populate: '*',
  });
  
  return data.data[0] || null;
}

/**
 * Récupère toutes les catégories
 */
export async function getCategories() {
  const data = await fetchAPI('/categories', {
    populate: '*',
    sort: 'name:asc',
  });
  
  return data;
}

/**
 * Récupère les projets mis en avant
 */
export async function getFeaturedProjects() {
  const data = await fetchAPI('/projects', {
    filters: { featured: { $eq: true } },
    populate: '*',
    sort: 'order:asc',
  });
  
  return data;
}