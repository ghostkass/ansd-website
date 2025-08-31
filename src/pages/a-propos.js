// src/pages/a-propos.js
import React from 'react';
import {
  Building, Users, Globe, Award, Target, Eye, Heart, BookOpen, TrendingUp, Shield, Zap, CheckCircle
} from 'lucide-react';
import Layout from '../components/Layout'; // Notre composant Layout
import HeroSection from '../components/HeroSection'; // Notre composant HeroSection mis à jour
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'; // Assurez-vous des chemins corrects
import { Badge } from '../components/ui/badge'; // Assurez-vous des chemins corrects
import { ImageWithFallback } from '../components/figma/ImageWithFallback'; // Assurez-vous du chemin correct

export default function AProposPage() {
  const missions = [
    {
      title: 'Collecte de Données',
      description: 'Organisation et supervision des enquêtes statistiques nationales et sectorielles.',
      icon: Target,
      color: 'bg-blue-500' // Ces couleurs devront être ajustées pour utiliser les variables CSS si tu veux les couleurs du drapeau
    },
    {
      title: 'Analyse & Recherche',
      description: 'Production d\'analyses statistiques pour éclairer les politiques publiques.',
      icon: TrendingUp,
      color: 'bg-green-500'
    },
    {
      title: 'Diffusion',
      description: 'Mise à disposition des données statistiques auprès du public et des décideurs.',
      icon: Globe,
      color: 'bg-purple-500'
    },
    {
      title: 'Coordination',
      description: 'Harmonisation du système statistique national avec les standards internationaux.',
      icon: Shield,
      color: 'bg-orange-500'
    }
  ];

  // Je vais ajuster les couleurs ci-dessous pour utiliser les variables CSS comme dans la page d'accueil
  const valeurs = [
    {
      title: 'Excellence',
      description: 'Nous visons l\'excellence dans toutes nos activités statistiques',
      icon: Award
    },
    {
      title: 'Transparence',
      description: 'Nous garantissons la transparence dans nos méthodes et nos données',
      icon: Eye
    },
    {
      title: 'Intégrité',
      description: 'Nous respectons les plus hauts standards d\'intégrité professionnelle',
      icon: Shield
    },
    {
      title: 'Innovation',
      description: 'Nous adoptons les dernières innovations technologiques et méthodologiques',
      icon: Zap
    },
    {
      title: 'Service Public',
      description: 'Nous servons l\'intérêt général et le développement du Sénégal',
      icon: Heart
    },
    {
      title: 'Collaboration',
      description: 'Nous favorisons la collaboration avec tous nos partenaires',
      icon: Users
    }
  ];

  // Pour l'équipe, il serait idéal d'avoir des images réelles. Pour l'instant, je laisse un placeholder générique.
  const equipe = [
    {
      nom: 'Dr. Babacar FALL',
      poste: 'Directeur Général',
      experience: '15 ans',
      specialite: 'Statistiques économiques',
      image: '/images/team/placeholder-male.jpg', // Placeholder
    },
    {
      nom: 'Dr. Fatou DIAGNE',
      poste: 'Directrice Méthodologie',
      experience: '12 ans',
      specialite: 'Méthodologie statistique',
      image: '/images/team/placeholder-female.jpg', // Placeholder
    },
    {
      nom: 'Mamadou SOW',
      poste: 'Directeur Systèmes d\'Information',
      experience: '10 ans',
      specialite: 'Technologies de l\'information',
      image: '/images/team/placeholder-male.jpg', // Placeholder
    },
    {
      nom: 'Aminata NDIAYE',
      poste: 'Directrice Communication',
      experience: '8 ans',
      specialite: 'Communication institutionnelle',
      image: '/images/team/placeholder-female.jpg', // Placeholder
    }
  ];

  const chiffres = [
    { valeur: '1960', label: 'Année de création', icon: BookOpen },
    { valeur: '250+', label: 'Collaborateurs', icon: Users },
    { valeur: '14', label: 'Régions couvertes', icon: Globe },
    { valeur: '60+', label: 'Années d\'expertise', icon: Award }
  ];

  const partenaires = [
    'Ministère de l\'Économie et des Finances',
    'Institut National de la Statistique (France)',
    'Banque Mondiale',
    'AFRISTAT',
    'Union Européenne',
    'Système des Nations Unies',
    'Banque Africaine de Développement',
    'Organisation Internationale du Travail'
  ];

  const heroStats = [
    { value: '60+', label: 'Années d\'expérience', icon: BookOpen },
    { value: '250+', label: 'Experts', icon: Users },
    { value: '14', label: 'Régions', icon: Globe },
    { value: '250+', label: 'Publications/an', icon: Award }
  ];

  return (
    <Layout title="À Propos - ANSD Sénégal">
      <div className="min-h-screen">
        {/* Hero Section */}
        <HeroSection
          title="À Propos de l'ANSD"
          subtitle="60 ans au service des données du Sénégal"
          description="Depuis 1960, l'Agence Nationale de la Statistique et de la Démographie accompagne le développement du Sénégal en fournissant des données statistiques fiables, pertinentes et de qualité pour éclairer la prise de décision."
          backgroundImage="https://images.unsplash.com/photo-1664735190559-68d8a5996f78?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZW5lZ2FsJTIwZ292ZXJubWVudCUyMGJ1aWxkaW5nJTIwaW5zdGl0dXRpb25hbHxlbnwxfHx8fDE3NTQ2NTM2MDB8MA&ixlib=rb-4.1.0&q=80&w=1080"
          badge={{
            text: 'Institution Publique du Sénégal',
            icon: Building
          }}
          stats={heroStats}
          overlay="green" // Utilisation de l'overlay vert
        />

        {/* Notre Histoire */}
        <section className="py-20">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-[var(--senegal-green)] mb-6">Notre Histoire</h2>
                <div className="space-y-6">
                  <p style={{ fontSize: '1.125rem' }} className="leading-relaxed">
                    Créée en 1960, l'Agence Nationale de la Statistique et de la Démographie (ANSD)
                    est l'institution publique chargée de la production, de l'analyse et de la
                    diffusion des statistiques officielles du Sénégal.
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    Au fil des décennies, l'ANSD a su s'adapter aux évolutions technologiques et
                    méthodologiques pour maintenir son rôle central dans l'écosystème statistique
                    national et régional.
                  </p>
                  <div className="grid grid-cols-2 gap-6">
                    {chiffres.map((chiffre, index) => (
                      <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
                        <chiffre.icon className="h-8 w-8 mx-auto text-[var(--senegal-green)] mb-3" />
                        <div className="font-bold text-[var(--senegal-green)]" style={{ fontSize: '1.5rem' }}>
                          {chiffre.valeur}
                        </div>
                        <div className="text-gray-600" style={{ fontSize: '0.875rem' }}>
                          {chiffre.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div>
                <ImageWithFallback
                  src="/api/placeholder/600/400" // Remplacez par une image réelle dans public/images
                  alt="Bâtiment ANSD"
                  className="w-full h-96 object-cover rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Nos Missions */}
        <section className="py-20 bg-gray-50">
          <div className="container-custom">
            <div className="text-center mb-16">
              <h2 className="text-[var(--senegal-green)] mb-6">Nos Missions</h2>
              <p className="text-gray-600 max-w-3xl mx-auto" style={{ fontSize: '1.125rem' }}>
                L'ANSD remplit quatre missions principales pour répondre aux besoins en données
                statistiques du pays et soutenir le développement socio-économique du Sénégal.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {missions.map((mission, index) => (
                <Card key={index} className="hover-lift text-center border-0 shadow-lg">
                  <CardContent className="p-8">
                    <div className={`w-16 h-16 bg-[var(--senegal-green)] rounded-2xl flex items-center justify-center mx-auto mb-6`}> {/* Couleur ajustée */}
                      <mission.icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="font-semibold text-[var(--neutral-dark)] mb-4"> {/* Couleur ajustée */}
                      {mission.title}
                    </h3>
                    <p className="text-gray-600" style={{ fontSize: '0.875rem' }}>
                      {mission.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Nos Valeurs */}
        <section className="py-20">
          <div className="container-custom">
            <div className="text-center mb-16">
              <h2 className="text-[var(--senegal-green)] mb-6">Nos Valeurs</h2>
              <p className="text-gray-600 max-w-3xl mx-auto" style={{ fontSize: '1.125rem' }}>
                Nos valeurs guident notre action quotidienne et reflètent notre engagement
                envers l'excellence statistique au service du développement du Sénégal.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {valeurs.map((valeur, index) => (
                <Card key={index} className="hover-lift border-l-4 border-l-[var(--senegal-gold)]"> {/* Couleur de bordure ajustée */}
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="w-12 h-12 bg-[var(--senegal-green)] rounded-full flex items-center justify-center">
                        <valeur.icon className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="font-semibold text-[var(--neutral-dark)]"> {/* Couleur ajustée */}
                        {valeur.title}
                      </h3>
                    </div>
                    <p className="text-gray-600" style={{ fontSize: '0.875rem' }}>
                      {valeur.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Notre Équipe */}
        <section className="py-20 bg-gray-50">
          <div className="container-custom">
            <div className="text-center mb-16">
              <h2 className="text-[var(--senegal-green)] mb-6">Direction Générale</h2>
              <p className="text-gray-600 max-w-3xl mx-auto" style={{ fontSize: '1.125rem' }}>
                Une équipe de direction expérimentée et multidisciplinaire pour porter
                la vision stratégique de l'ANSD.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {equipe.map((membre, index) => (
                <Card key={index} className="hover-lift text-center">
                  <CardContent className="p-6">
                    {/* Utilisation de l'image du membre de l'équipe */}
                    <img
                      src={membre.image}
                      alt={`Photo de ${membre.nom}`}
                      className="w-20 h-20 rounded-full object-cover mx-auto mb-4 border-2 border-[var(--senegal-gold)]"
                    />
                    <h3 className="font-semibold text-[var(--senegal-green)] mb-2">
                      {membre.nom}
                    </h3>
                    <p className="text-gray-800 mb-2" style={{ fontSize: '0.875rem' }}>
                      {membre.poste}
                    </p>
                    <div className="space-y-1">
                      <Badge variant="secondary" className="text-xs bg-[var(--senegal-gold)] text-black"> {/* Couleur ajustée */}
                        {membre.experience} d'expérience
                      </Badge>
                      <p className="text-gray-600" style={{ fontSize: '0.75rem' }}>
                        {membre.specialite}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Nos Partenaires */}
        <section className="py-20">
          <div className="container-custom">
            <div className="text-center mb-16">
              <h2 className="text-[var(--senegal-green)] mb-6">Nos Partenaires</h2>
              <p className="text-gray-600 max-w-3xl mx-auto" style={{ fontSize: '1.125rem' }}>
                L'ANSD travaille en étroite collaboration avec de nombreux partenaires
                nationaux et internationaux pour renforcer le système statistique sénégalais.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {partenaires.map((partenaire, index) => (
                <Card key={index} className="hover-lift">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-[var(--senegal-green)] rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="h-6 w-6 text-white" />
                    </div>
                    <p className="font-medium text-[var(--neutral-dark)]" style={{ fontSize: '0.875rem' }}> {/* Couleur ajustée */}
                      {partenaire}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Engagement */}
        <section className="py-20 bg-gradient-to-r from-[var(--senegal-green)] via-[var(--senegal-green-light)] to-[var(--senegal-green-dark)] text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-dots-pattern opacity-20"></div>
          <div className="container-custom relative">
            <div className="text-center max-w-4xl mx-auto space-y-8">
              <h2 className="mb-6" style={{ fontSize: '2.5rem' }}>
                Notre Engagement pour le Sénégal
              </h2>
              <p className="text-white/90" style={{ fontSize: '1.375rem' }}>
                Chaque jour, nous nous engageons à fournir des statistiques fiables et de qualité
                pour éclairer les décisions qui façonnent l'avenir du Sénégal et de ses citoyens.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8">
                <div className="glassmorphism rounded-xl p-6 backdrop-blur-md">
                  <Target className="h-12 w-12 mx-auto mb-4 text-[var(--senegal-gold)]" />
                  <h4 className="mb-2">Vision 2035</h4>
                  <p className="text-white/80" style={{ fontSize: '0.875rem' }}>
                    Devenir le leader régional des statistiques
                  </p>
                </div>
                <div className="glassmorphism rounded-xl p-6 backdrop-blur-md">
                  <Heart className="h-12 w-12 mx-auto mb-4 text-[var(--senegal-gold)]" />
                  <h4 className="mb-2">Impact Social</h4>
                  <p className="text-white/80" style={{ fontSize: '0.875rem' }}>
                    Contribuer au bien-être des populations
                  </p>
                </div>
                <div className="glassmorphism rounded-xl p-6 backdrop-blur-md">
                  <Zap className="h-12 w-12 mx-auto mb-4 text-[var(--senegal-gold)]" />
                  <h4 className="mb-2">Innovation</h4>
                  <p className="text-white/80" style={{ fontSize: '0.875rem' }}>
                    Adopter les technologies de pointe
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}