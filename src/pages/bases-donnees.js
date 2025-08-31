// src/pages/bases-donnees.js

import React from 'react';
import { Database, ExternalLink, Search, Archive, Globe, Map, BarChart3, Users, FileText, Download, Shield, Clock } from 'lucide-react';
import { Button } from '../components/ui/button'; // Chemin ajusté pour les composants UI
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'; // Chemin ajusté
import { Badge } from '../components/ui/badge'; // Chemin ajusté
// import { ImageWithFallback } from '../figma/ImageWithFallback'; // Commenté car ce composant n'est pas standard et peut nécessiter une implémentation séparée
import Layout from '../components/Layout'; // Import du composant Layout

export default function BasesDonneesPage() {
  const plateformes = [
    {
      id: 1,
      name: 'Archivage National',
      description: 'Système de stockage et d\'archivage des données statistiques historiques du Sénégal',
      icon: Archive,
      url: 'https://archive.ansd.sn',
      type: 'principale',
      features: [
        'Archives historiques depuis 1960',
        'Recherche avancée par période',
        'Métadonnées détaillées',
        'Export multiple formats'
      ],
      stats: {
        datasets: '15K+',
        coverage: '1960-2024',
        formats: '8',
        access: 'Public'
      },
      status: 'actif'
    },
    {
      id: 2,
      name: 'Plateforme Open Data',
      description: 'Portail national des données ouvertes avec API REST et interface de visualisation',
      icon: Globe,
      url: 'https://opendata.ansd.sn',
      type: 'principale',
      features: [
        'API REST complète',
        'Visualisations interactives',
        'Téléchargement automatisé',
        'Documentation développeur'
      ],
      stats: {
        datasets: '180+',
        coverage: '2020-2024',
        formats: '6',
        access: 'Public'
      },
      status: 'actif'
    },
    {
      id: 3,
      name: 'Annuaire Statistique',
      description: 'Compilation annuelle des principales statistiques officielles du Sénégal',
      icon: FileText,
      url: 'https://annuaire.ansd.sn',
      type: 'publication',
      features: [
        'Données consolidées annuelles',
        'Séries chronologiques longues',
        'Comparaisons régionales',
        'Format PDF et Excel'
      ],
      stats: {
        datasets: '2K+',
        coverage: '2000-2023',
        formats: '3',
        access: 'Public'
      },
      status: 'actif'
    },
    {
      id: 4,
      name: 'Métadonnées Genre',
      description: 'Base de données spécialisée sur les statistiques genre et autonomisation des femmes',
      icon: Users,
      url: 'https://genre.ansd.sn',
      type: 'thematique',
      features: [
        'Indicateurs genre certifiés',
        'Comparaisons internationales',
        'Tableaux de bord dynamiques',
        'Rapports automatisés'
      ],
      stats: {
        datasets: '500+',
        coverage: '2010-2024',
        formats: '4',
        access: 'Public'
      },
      status: 'actif'
    },
    {
      id: 5,
      name: 'Répertoire des Localités',
      description: 'Base géographique complète des divisions administratives et localités du Sénégal',
      icon: Map,
      url: 'https://localites.ansd.sn',
      type: 'geographique',
      features: [
        'Géocodage complet',
        'Limites administratives',
        'Coordonnées GPS',
        'API de géolocalisation'
      ],
      stats: {
        datasets: '25K+',
        coverage: 'National',
        formats: '5',
        access: 'Public'
      },
      status: 'actif'
    },
    {
      id: 6,
      name: 'Système SIG',
      description: 'Infrastructure de données spatiales et cartographie statistique interactive',
      icon: Map,
      url: 'https://sig.ansd.sn',
      type: 'geographique',
      features: [
        'Cartes interactives',
        'Analyse spatiale avancée',
        'Superposition de couches',
        'Export cartographique'
      ],
      stats: {
        datasets: '1K+',
        coverage: 'National',
        formats: '7',
        access: 'Restreint'
      },
      status: 'actif'
    }
  ];

  const typeMapping = {
    'principale': { label: 'Plateforme Principale', color: 'bg-[var(--senegal-green)]' },
    'publication': { label: 'Publication', color: 'bg-[var(--senegal-gold)]' },
    'thematique': { label: 'Thématique', color: 'bg-blue-600' },
    'geographique': { label: 'Géographique', color: 'bg-purple-600' }
  };

  const accessMethods = [
    {
      icon: Globe,
      title: 'Interface Web',
      description: 'Accès via navigateur avec interface utilisateur intuitive',
      features: ['Navigation guidée', 'Recherche facettée', 'Visualisations', 'Export simple']
    },
    {
      icon: Database,
      title: 'API REST',
      description: 'Accès programmatique pour intégration dans vos applications',
      features: ['Endpoints documentés', 'Authentification sécurisée', 'Formats JSON/XML', 'Rate limiting']
    },
    {
      icon: Download,
      title: 'Téléchargement Direct',
      description: 'Téléchargement en lot de jeux de données complets',
      features: ['Archives ZIP', 'Formats multiples', 'Métadonnées incluses', 'Scheduling possible']
    },
    {
      icon: BarChart3,
      title: 'Tableaux de Bord',
      description: 'Visualisations préconfigurées pour analyse rapide',
      features: ['Graphiques interactifs', 'Filtres dynamiques', 'Export PDF/PNG', 'Partage public']
    }
  ];

  return (
    <Layout> {/* Ajout du composant Layout ici */}
      <div className="min-h-screen py-8">
        <div className="container-custom">
          {/* En-tête */}
          <div className="text-center mb-12">
            <h1 className="text-[var(--senegal-green)] text-4xl font-bold mb-4">Accès aux Bases de Données</h1>
            <p className="text-gray-600 max-w-3xl mx-auto text-lg">
              Découvrez l'écosystème complet des plateformes de données de l'ANSD.
              Accédez facilement aux informations statistiques via nos différents portails spécialisés.
            </p>
          </div>

          {/* Vue d'ensemble */}
          <div className="glassmorphism rounded-lg p-8 mb-12 shadow-lg"> {/* Ajout de shadow-lg */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-[var(--senegal-green)] text-3xl font-bold mb-4">Écosystème Intégré</h2>
                <p className="text-gray-700 mb-6 text-base">
                  L'ANSD met à disposition un écosystème numérique complet permettant l'accès
                  aux données statistiques sous différentes formes selon vos besoins spécifiques.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                    <div className="font-bold text-[var(--senegal-green)] text-2xl">6</div>
                    <div className="text-gray-600 text-sm">Plateformes</div>
                  </div>
                  <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                    <div className="font-bold text-[var(--senegal-green)] text-2xl">43K+</div>
                    <div className="text-gray-600 text-sm">Jeux de données</div>
                  </div>
                  <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                    <div className="font-bold text-[var(--senegal-green)] text-2xl">4</div>
                    <div className="text-gray-600 text-sm">Méthodes d'accès</div>
                  </div>
                  <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                    <div className="font-bold text-[var(--senegal-green)] text-2xl">24/7</div>
                    <div className="text-gray-600 text-sm">Disponibilité</div>
                  </div>
                </div>
              </div>
              <div className="text-center">
                {/* Utilisation d'une balise img simple comme substitut */}
                <img
                  src="https://via.placeholder.com/500x300?text=Placeholder+Image" // Image de remplacement
                  alt="Écosystème de données ANSD"
                  className="w-full h-64 object-cover rounded-lg shadow-md"
                />
              </div>
            </div>
          </div>

          {/* Plateformes disponibles */}
          <div className="mb-12">
            <h2 className="text-[var(--senegal-green)] text-3xl font-bold mb-8 text-center">Plateformes Disponibles</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {plateformes.map((plateforme) => (
                <Card key={plateforme.id} className="hover-lift shadow-md"> {/* Ajout de shadow-md */}
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 rounded-full bg-[var(--senegal-green)] flex items-center justify-center">
                          <plateforme.icon className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <CardTitle className="text-[var(--senegal-green)] text-xl">
                            {plateforme.name}
                          </CardTitle>
                          <div className="flex items-center space-x-2 mt-1">
                            <Badge className={`${typeMapping[plateforme.type].color} text-white text-xs`}>
                              {typeMapping[plateforme.type].label}
                            </Badge>
                            <Badge
                              className={`${plateforme.status === 'actif' ? 'bg-green-500' : 'bg-gray-500'} text-white text-xs`}
                            >
                              {plateforme.status === 'actif' ? 'Actif' : 'Maintenance'}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        className="bg-[var(--senegal-gold)] text-black hover:bg-[var(--senegal-gold-dark)]" // Couleur ajustée pour le bouton
                        onClick={() => window.open(plateforme.url, '_blank')} // Ouvrir dans un nouvel onglet
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Accéder
                      </Button>
                    </div>
                    <CardDescription className="mt-3 text-base">
                      {plateforme.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Fonctionnalités */}
                    <div>
                      <h4 className="font-semibold mb-3 text-sm">Fonctionnalités principales :</h4>
                      <ul className="space-y-2">
                        {plateforme.features.map((feature, index) => (
                          <li key={index} className="flex items-start space-x-2 text-sm">
                            <div className="w-1.5 h-1.5 min-w-[0.375rem] min-h-[0.375rem] mt-1.5 rounded-full bg-[var(--senegal-green)]"></div> {/* Ajustement de taille et marge */}
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Statistiques */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gray-50 p-3 rounded-lg text-center">
                        <div className="font-bold text-[var(--senegal-green)] text-lg">
                          {plateforme.stats.datasets}
                        </div>
                        <div className="text-gray-600 text-xs">Jeux de données</div>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg text-center">
                        <div className="font-bold text-[var(--senegal-green)] text-lg">
                          {plateforme.stats.coverage}
                        </div>
                        <div className="text-gray-600 text-xs">Couverture</div>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg text-center">
                        <div className="font-bold text-[var(--senegal-green)] text-lg">
                          {plateforme.stats.formats}
                        </div>
                        <div className="text-gray-600 text-xs">Formats</div>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg text-center">
                        <div className="flex items-center justify-center space-x-1 mb-1">
                          {plateforme.stats.access === 'Public' ? (
                            <Globe className="h-4 w-4 text-green-600" />
                          ) : (
                            <Shield className="h-4 w-4 text-orange-600" />
                          )}
                          <div className="font-bold text-[var(--senegal-green)] text-lg">
                            {plateforme.stats.access}
                          </div>
                        </div>
                        <div className="text-gray-600 text-xs">Accès</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Méthodes d'accès */}
          <div className="mb-12">
            <h2 className="text-[var(--senegal-green)] text-3xl font-bold mb-8 text-center">Méthodes d'Accès</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {accessMethods.map((method, index) => (
                <Card key={index} className="hover-lift text-center shadow-md">
                  <CardHeader>
                    <div className="w-16 h-16 rounded-full bg-[var(--senegal-green)] mx-auto mb-4 flex items-center justify-center">
                      <method.icon className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-[var(--senegal-green)] text-xl">
                      {method.title}
                    </CardTitle>
                    <CardDescription className="text-base">
                      {method.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-left">
                      {method.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start space-x-2 text-sm">
                          <div className="w-1.5 h-1.5 min-w-[0.375rem] min-h-[0.375rem] mt-1.5 rounded-full bg-[var(--senegal-green)]"></div> {/* Ajustement de taille et marge */}
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Support et aide */}
          <div className="bg-gradient-to-r from-[var(--senegal-green)] to-[var(--senegal-green-light)] text-white rounded-lg p-8 shadow-lg"> {/* Ajout de shadow-lg */}
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4">Besoin d'Aide ?</h2>
              <p className="text-lg mb-6 max-w-2xl mx-auto">
                Notre équipe technique est à votre disposition pour vous accompagner dans l'utilisation
                de nos plateformes de données et répondre à vos questions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-white text-[var(--senegal-green)] hover:bg-gray-100">
                  <FileText className="h-4 w-4 mr-2" />
                  Documentation
                </Button>
                <Button variant="outline" className="border-white text-white hover:bg-white hover:text-[var(--senegal-green)]">
                  <Users className="h-4 w-4 mr-2" />
                  Support Technique
                </Button>
                <Button variant="outline" className="border-white text-white hover:bg-white hover:text-[var(--senegal-green)]">
                  <Clock className="h-4 w-4 mr-2" />
                  Formation
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}