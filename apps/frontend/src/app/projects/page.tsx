import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { API_URL, getProjects } from '@/lib/api';
import { Project, ProjectResponse } from '@/types';

// Cette page utilise le rendu côté serveur
export const revalidate = 0; // Revalider toutes les heures

export default async function ProjectsPage() {
  // Récupérer les projets depuis l'API
  const projectsData: ProjectResponse = await getProjects().catch(() => ({ data: [] }));
  const projects: Project[] = projectsData.data || [];

  return (
    <main className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Mes projets</h1>
      
      {projects.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl text-gray-500">Aucun projet disponible pour le moment.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project: Project)  => (
            <Card key={project.id} className="flex flex-col h-full">
              <CardHeader>
                <CardTitle>{project.title}</CardTitle>
                {project.category && (
                  <CardDescription>
                    {project.category.name}
                  </CardDescription>
                )}
              </CardHeader>
              
              <CardContent className="flex-grow">
                {project.image && (
                  <div className="relative w-full h-48 mb-4">
                    <Image
                      src={`${API_URL}${project.image.url}`}
                      alt={project.title}
                      fill
                      className="object-cover rounded-md"
                    />
                  </div>
                )}
                <p className="line-clamp-3">{project.description}</p>
              </CardContent>
              
              <CardFooter className="flex justify-between">
                <Button asChild variant="outline">
                  <Link href={`/projects/${project.slug}`}>
                    Détails
                  </Link>
                </Button>
                
                {project.projectUrl && (
                  <Button asChild>
                    <a 
                      href={project.projectUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      Voir le projet
                    </a>
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </main>
  );
}