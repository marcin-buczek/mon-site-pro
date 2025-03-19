import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Bienvenue sur mon site professionnel
        </p>
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          <a
            className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
            href="https://github.com/marcin-buczek"
            target="_blank"
            rel="noopener noreferrer"
          >
            Par Marcin Buczek IIIII
          </a>
        </div>
      </div>

      <div className="relative flex place-items-center">
        <h1 className="text-6xl font-bold">Mon Portfolio</h1>
      </div>

      <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-3 lg:text-left gap-6">
        <Card>
          <CardHeader>
            <CardTitle>À propos</CardTitle>
            <CardDescription>Développeur Web à Bordeaux</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Spécialisé en développement web avec NestJS, Node.js, Angular et SCSS.</p>
          </CardContent>
          <CardFooter>
            <Button asChild>
              <Link href="/about">En savoir plus</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Projets</CardTitle>
            <CardDescription>Mes réalisations récentes</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Découvrez mes derniers projets et réalisations dans le domaine du développement web.</p>
          </CardContent>
          <CardFooter>
            <Button asChild>
              <Link href="/projects">Voir les projets</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Contact</CardTitle>
            <CardDescription>Travaillons ensemble</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Vous avez un projet en tête ? N&apos;hésitez pas à me contacter pour en discuter.</p>
          </CardContent>
          <CardFooter>
            <Button asChild>
              <Link href="/contact">Me contacter</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </main>
  );
}