import qs from 'qs';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { API_URL, getProjectBySlug, getProjects } from '@/lib/api';
import { notFound } from 'next/navigation';
import { Project, ProjectResponse } from '@/types';

async function getProject(slug: string) {
  const baseUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL ?? "http://localhost:1337";
  const path = "/api/projects";

  const url = new URL(path, baseUrl);

  url.search = qs.stringify({
    populate: '*',
    filters: {
      slug: {
        $eq: slug,
      },
    },
  });

  const res = await fetch(url);

  if (!res.ok) throw new Error("Failed to fetch project");

  const data = await res.json();
  const project = data?.data[0];
  return project;
}


// // Générer les chemins statiques
// export async function generateStaticParams() {
//   const projectsData: ProjectResponse = await getProjects().catch(() => ({ data: [] }));
//   const projects: Project[] = projectsData.data || [];
  
//   return projects.map((project: Project) => ({
//     slug: project.slug,
//   }));
// }

// Cette page utilise le rendu statique avec régénération incrémentale
// export const revalidate = 0; // Revalider toutes les heures

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  // Récupérer les détails du projet
  const project: Project = await getProject(slug);
  
  // Si le projet n'existe pas, afficher la page 404
  if (!project) {
    notFound();
  }
  
  return (
    <main className="container mx-auto px-4 py-12">
      <Link href="/projects" className="text-blue-500 hover:underline mb-4 inline-block">
        ← Retour aux projets
      </Link>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {project.image && (
          <div className="relative w-full h-96">
            <Image
              src={`${API_URL}${project.image.url}`}
              alt={project.title}
              fill
              className="object-cover"
            />
          </div>
        )}
        
        <div className="p-6">
          <h1 className="text-4xl font-bold mb-2">{project.title}</h1>
          
          {project.category && (
            <div className="mb-4">
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                {project.category.name}
              </span>
            </div>
          )}
          
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Description</h2>
            <p className="text-gray-700">{project.description}</p>
          </div>
          
          {project.content && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Détails</h2>
              <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: project.content }} />
            </div>
          )}
          
          {project.technologies && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Technologies</h2>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech: { name: string; version: string }) => (
                  <span key={tech.name} className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                    {tech.name} <span className="text-gray-500 text-xs">{tech.version}</span>
                  </span>
                ))}
              </div>
            </div>
          )}
          
          <div className="flex gap-4 mt-8">
            {project.projectUrl && (
              <Button asChild>
                <a href={project.projectUrl} target="_blank" rel="noopener noreferrer">
                  Voir le projet
                </a>
              </Button>
            )}
            
            {project.githubUrl && (
              <Button asChild variant="outline">
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                  Code source
                </a>
              </Button>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}