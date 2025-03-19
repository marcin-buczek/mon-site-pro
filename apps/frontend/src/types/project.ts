import { Media } from '@/types/media';
import { Category } from '@/types/category';

export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  content?: string;
  image?: Media | null;
  technologies?: []; // ou définir une structure plus précise selon vos données JSON
  projectUrl?: string;
  githubUrl?: string;
  featured: boolean;
  order: number;
  category?:  Category | null;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
}

export interface ProjectResponse {
  data: Project[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    }
  }
}

export interface SingleProjectResponse {
  data: Project;
}