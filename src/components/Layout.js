// src/components/Layout.js

import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router'; // Importe useRouter pour connaître la page active
import { BarChart3, MapPin, Phone, Mail, User, Shield, LogOut, Menu, X, Crown } from 'lucide-react';
import { useAuth } from '../context/AuthContext'; // Importe le hook useAuth (assurez-vous du bon chemin)
import { Button } from './ui/button'; // Importe le composant Button (assurez-vous du bon chemin)
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'; // Importe les composants DropdownMenu
import { useState } from 'react'; // Importe useState pour la gestion du menu mobile

export default function Layout({ children, title = "ANSD Sénégal - Données fiables pour un Sénégal éclairé" }) {
  const { isAuthenticated, user, logout } = useAuth(); // Récupère l'état d'authentification
  const router = useRouter(); // Initialise le routeur Next.js
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // État pour le menu mobile

  const handleLogout = () => {
    logout(); // Déconnecte l'utilisateur
    router.push('/'); // Redirige vers la page d'accueil après déconnexion
  };

  // Fonction pour déterminer si un lien est actif
  const isActive = (pathname) => router.pathname === pathname;

  const handleLoginClick = () => {
    router.push('/login'); // Redirige vers la page de connexion
    setIsMobileMenuOpen(false); // Ferme le menu mobile si ouvert
  };

  const navLinks = [
    { href: '/', label: 'Accueil' },
    { href: '/a-propos', label: 'À Propos' },
    { href: '/publications', label: 'Publications' },
    { href: '/etudes', label: 'Études & Enquêtes' },
    { href: '/sesn', label: 'SESN' },
    { href: '/open-data', label: 'Open Data' },
    { href: '/bases-donnees', label: 'Bases de Données' },
    { href: '/actualites', label: 'Actualités' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Agence Nationale de la Statistique et de la Démographie du Sénégal - Données officielles et analyses." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Header */}
      <header className="bg-white shadow-md py-4 sticky top-0 z-50">
        <div className="container-custom flex justify-between items-center">
          {/* Logo ANSD */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-[var(--senegal-green)] rounded-lg flex items-center justify-center">
              <BarChart3 className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-[var(--senegal-green)]">ANSD</span>
          </Link>

          {/* Menu de Navigation (Desktop) */}
          <nav className="hidden lg:flex items-center text-[var(--neutral-dark)] space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 text-sm transition-colors duration-200 ${
                  isActive(link.href)
                    ? 'text-[var(--senegal-green)] font-semibold'
                    : 'hover:text-[var(--senegal-green)]'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Espace Connexion / User Menu (Desktop) */}
          <div className="hidden lg:block">
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="flex items-center space-x-2 text-[var(--senegal-green)] hover:text-white hover:bg-[var(--senegal-green)] rounded-full px-4 py-2"
                  >
                    {user?.role === 'admin' ? <Crown className="h-5 w-5" /> : <User className="h-5 w-5" />}
                    <span>{user?.role === 'admin' ? 'Admin' : 'Agent'}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-48 bg-white shadow-lg">
                  <DropdownMenuItem onClick={() => router.push(user?.role === 'admin' ? '/admin' : '/agent')}>
                    <Shield className="h-4 w-4 mr-2" />
                    Tableau de Bord
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="h-4 w-4 mr-2" />
                    Déconnexion
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                onClick={handleLoginClick}
                className="bg-[var(--senegal-gold)] text-black font-semibold py-2 px-6 rounded-full hover:bg-[var(--senegal-gold-dark)] transition-all duration-300 shadow-md"
              >
                Espace Privé
              </Button>
            )}
          </div>

          {/* Mobile Menu Button (Hamburger) */}
          <div className="lg:hidden">
            <Button
              variant="ghost"
              size="icon"
              className="text-[var(--neutral-dark)]"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu Content (conditionally rendered) */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-[72px] left-0 w-full bg-white shadow-lg pb-4 animate-fade-in-down">
            <nav className="flex flex-col items-start px-4 py-2 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`w-full px-4 py-2 text-base transition-colors duration-200 ${
                    isActive(link.href)
                      ? 'text-[var(--senegal-green)] font-semibold bg-gray-100 rounded-md'
                      : 'hover:text-[var(--senegal-green)] hover:bg-gray-50 rounded-md'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)} // Ferme le menu au clic
                >
                  {link.label}
                </Link>
              ))}
              {isAuthenticated ? (
                <>
                  <Link
                    href={user?.role === 'admin' ? '/admin' : '/agent'}
                    className={`w-full px-4 py-2 text-base transition-colors duration-200 ${
                      isActive(user?.role === 'admin' ? '/admin' : '/agent')
                        ? 'text-[var(--senegal-green)] font-semibold bg-gray-100 rounded-md'
                        : 'hover:text-[var(--senegal-green)] hover:bg-gray-50 rounded-md'
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Shield className="h-4 w-4 mr-2 inline-block" /> Tableau de Bord
                  </Link>
                  <Button
                    variant="ghost"
                    onClick={handleLogout}
                    className="w-full justify-start text-base hover:bg-gray-50 text-red-600"
                  >
                    <LogOut className="h-4 w-4 mr-2" /> Déconnexion
                  </Button>
                </>
              ) : (
                <Button
                  onClick={handleLoginClick}
                  className="w-full justify-center bg-[var(--senegal-gold)] text-black font-semibold py-2 px-4 rounded-md hover:bg-[var(--senegal-gold-dark)] transition-all duration-300"
                >
                  Espace Privé
                </Button>
              )}
            </nav>
          </div>
        )}
      </header>

      <main>
        {children}
      </main>

      {/* Footer (inchangé) */}
      <footer className="bg-[var(--senegal-green)] text-white py-12">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Colonne 1: Logo et description */}
            <div className="md:col-span-1">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                  <BarChart3 className="h-6 w-6 text-[var(--senegal-green)]" />
                </div>
                <span className="text-2xl font-bold">ANSD</span>
              </div>
              <p className="text-sm opacity-90">
                L'Agence Nationale de la Statistique et de la Démographie fournit des données fiables et de qualité pour le développement du Sénégal.
              </p>
            </div>

            {/* Colonne 2: Liens rapides */}
            <div className="md:col-span-1">
              <h4 className="text-xl font-bold mb-4">Liens Rapides</h4>
              <ul className="space-y-2 text-sm opacity-90">
                <li><Link href="/" className="hover:text-[var(--senegal-gold)] transition-colors duration-200">Accueil</Link></li>
                <li><Link href="/a-propos" className="hover:text-[var(--senegal-gold)] transition-colors duration-200">À Propos</Link></li>
                <li><Link href="/publications" className="hover:text-[var(--senegal-gold)] transition-colors duration-200">Publications</Link></li>
                <li><Link href="/etudes" className="hover:text-[var(--senegal-gold)] transition-colors duration-200">Études & Enquêtes</Link></li>
                <li><Link href="/sesn" className="hover:text-[var(--senegal-gold)] transition-colors duration-200">SESN</Link></li>
                <li><Link href="/open-data" className="hover:text-[var(--senegal-gold)] transition-colors duration-200">Open Data</Link></li>
                <li><Link href="/bases-donnees" className="hover:text-[var(--senegal-gold)] transition-colors duration-200">Bases de Données</Link></li>
                <li><Link href="/actualites" className="hover:text-[var(--senegal-gold)] transition-colors duration-200">Actualités</Link></li>
                <li><Link href="/contact" className="hover:text-[var(--senegal-gold)] transition-colors duration-200">Contact</Link></li>
              </ul>
            </div>

            {/* Colonne 3: Contact & Médias Sociaux */}
            <div className="md:col-span-1">
              <h4 className="text-xl font-bold mb-4">Contact</h4>
              <p className="text-sm mb-2 opacity-90">
                <MapPin className="inline-block h-4 w-4 mr-2" />
                Rocade Fann Bel-Air, Cerf-Volant, Dakar, Sénégal
              </p>
              <p className="text-sm mb-2 opacity-90">
                <Phone className="inline-block h-4 w-4 mr-2" />
                +221 33 869 21 39
              </p>
              <p className="text-sm mb-4 opacity-90">
                <Mail className="inline-block h-4 w-4 mr-2" />
                contact@ansd.sn
              </p>
              <div className="flex space-x-4">
                <a href="https://facebook.com/ansd.senegal" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[var(--senegal-gold)] transition-colors duration-200">Facebook</a>
                <a href="https://twitter.com/ansd_senegal" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[var(--senegal-gold)] transition-colors duration-200">Twitter</a>
                <a href="https://linkedin.com/company/ansd-senegal" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[var(--senegal-gold)] transition-colors duration-200">LinkedIn</a>
              </div>
            </div>

            {/* Colonne 4: Newsletter (Placeholder) */}
            <div className="md:col-span-1 lg:col-span-1">
              <h4 className="text-xl font-bold mb-4">Newsletter</h4>
              <p className="text-sm mb-4 opacity-90">Inscrivez-vous pour recevoir nos dernières publications et actualités.</p>
              <form>
                <input
                  type="email"
                  placeholder="Votre email"
                  className="w-full p-3 rounded-md bg-white text-[var(--neutral-dark)] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--senegal-gold)]"
                />
                <button
                  type="submit"
                  className="mt-3 w-full bg-[var(--senegal-gold)] text-[var(--senegal-green)] font-bold py-3 rounded-md hover:bg-[var(--senegal-gold-dark)] transition-all duration-300"
                >
                  S'inscrire
                </button>
              </form>
            </div>
          </div>
          <div className="text-center text-sm mt-8 opacity-80">
            © {new Date().getFullYear()} Agence Nationale de la Statistique et de la Démographie (ANSD) - Tous droits réservés.
          </div>
        </div>
      </footer>
    </>
  );
}