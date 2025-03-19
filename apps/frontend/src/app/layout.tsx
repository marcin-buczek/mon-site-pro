import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Marcin Buczek - Développeur Web Freelance',
  description: 'Portfolio professionnel de Marcin Buczek, développeur web freelance.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <header className="bg-white shadow-sm">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <Link href="/" className="text-xl font-bold">Marcin Buczek</Link>
            <nav>
              <ul className="flex space-x-6">
                <li><Link href="/" className="hover:text-blue-600">Accueil</Link></li>
                <li><Link href="/projects" className="hover:text-blue-600">Projets</Link></li>
                <li><Link href="/about" className="hover:text-blue-600">À propos</Link></li>
                <li><Link href="/contact" className="hover:text-blue-600">Contact</Link></li>
              </ul>
            </nav>
          </div>
        </header>
        
        {children}
        
        <footer className="bg-gray-800 text-white py-8">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">Marcin Buczek</h3>
                <p>Développeur Web Freelance.</p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-4">Liens</h3>
                <ul className="space-y-2">
                  <li><Link href="/" className="hover:text-blue-400">Accueil</Link></li>
                  <li><Link href="/projects" className="hover:text-blue-400">Projets</Link></li>
                  <li><Link href="/about" className="hover:text-blue-400">À propos</Link></li>
                  <li><Link href="/contact" className="hover:text-blue-400">Contact</Link></li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-4">Contact</h3>
                <ul className="space-y-2">
                  <li>Email: contact@example.com</li>
                  <li>Localisation: Bordeaux, France</li>
                </ul>
                <div className="flex space-x-4 mt-4">
                  <a href="#" className="hover:text-blue-400">LinkedIn</a>
                  <a href="#" className="hover:text-blue-400">GitHub</a>
                  <a href="#" className="hover:text-blue-400">Twitter</a>
                </div>
              </div>
            </div>
            
            <div className="border-t border-gray-700 mt-8 pt-4 text-center">
              <p>&copy; {new Date().getFullYear()} Marcin Buczek. Tous droits réservés.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}