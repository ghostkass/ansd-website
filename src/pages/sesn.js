// src/pages/sesn.js

import React, { useState, useEffect } from 'react';
import { Download, BarChart3, Users, Building, Coins, TrendingUp, MapPin, Calendar, FileText, Eye, Award } from 'lucide-react';
import HeroSection from '../components/HeroSection'; // Assurez-vous que le chemin est correct
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Progress } from '../components/ui/progress';
import Layout from '../components/Layout'; // Import du composant Layout
import { usePublications } from '../hooks/useANSDApi'; // Import du hook

export default function SESNPage() {
  const [selectedYear, setSelectedYear] = useState('2023');

  const { data: fetchedPublications, loading, error } = usePublications();

  const heroStats = [
    { value: '450', label: 'Pages (2023)', icon: FileText },
    { value: '2.5K+', label: 'Téléchargements', icon: Download },
    { value: '60+', label: 'Ans de publication', icon: Calendar },
    { value: '100%', label: 'Couverture nationale', icon: MapPin }
  ];

  const heroActions = [
    {
      label: `Télécharger SESN ${selectedYear}`,
      onClick: () => {
        if (currentSESN && currentSESN.fileUrl) {
          window.open(currentSESN.fileUrl, '_blank');
        } else {
          alert('Aucun fichier disponible pour le téléchargement.');
        }
      },
      icon: Download
    },
    {
      label: 'Explorer les sections',
      onClick: () => {
        const element = document.getElementById('sesn-sections');
        element?.scrollIntoView({ behavior: 'smooth' });
      },
      variant: 'outline', // 'as const' retiré car non nécessaire en JS
      icon: BarChart3
    }
  ];

  const sesnData = {};
  if (fetchedPublications) {
    fetchedPublications.filter(pub => pub.type === 'sesn' || pub.title.includes('SESN')).forEach(pub => {
      const year = new Date(pub.publishedAt || pub.createdAt).getFullYear().toString();
      sesnData[year] = {
        year: year,
        status: 'Publié',
        publishDate: pub.publishedAt || pub.createdAt,
        pages: 'N/A', // No direct mapping
        downloads: 'N/A', // No direct mapping
        size: 'N/A', // No direct mapping
        highlights: [], // No direct mapping
        fileUrl: pub.fileUrl,
      };
    });
  }

  // Set selectedYear to the latest available year if not already set or if the current year is not available
  useEffect(() => {
    if (Object.keys(sesnData).length > 0 && !sesnData[selectedYear]) {
      const latestYear = Object.keys(sesnData).sort((a, b) => b - a)[0];
      setSelectedYear(latestYear);
    }
  }, [fetchedPublications, sesnData, selectedYear]);

  const sections = [
    {
      id: 'territoire',
      title: 'Territoire & Population',
      icon: MapPin,
      description: 'Démographie, urbanisation et répartition territoriale',
      keyIndicators: [
        { label: 'Population totale', value: '18.2M habitants', trend: 'up' },
        { label: 'Taux d\'urbanisation', value: '49.2%', trend: 'up' },
        { label: 'Densité', value: '93 hab/km²', trend: 'up' },
        { label: 'Taux de croissance', value: '2.8%/an', trend: 'stable' }
      ]
    },
    {
      id: 'emploi',
      title: 'Emploi & Formation',
      icon: Users,
      description: 'Marché du travail, chômage et système éducatif',
      keyIndicators: [
        { label: 'Taux d\'activité', value: '72.3%', trend: 'up' },
        { label: 'Taux de chômage', value: '3.8%', trend: 'down' },
        { label: 'Emploi informel', value: '68.5%', trend: 'down' },
        { label: 'Taux de scolarisation', value: '85.2%', trend: 'up' }
      ]
    },
    {
      id: 'social',
      title: 'Conditions Sociales',
      icon: Building,
      description: 'Pauvreté, santé, éducation et conditions de vie',
      keyIndicators: [
        { label: 'Taux de pauvreté', value: '37.8%', trend: 'down' },
        { label: 'Espérance de vie', value: '67.8 ans', trend: 'up' },
        { label: 'Accès eau potable', value: '84.3%', trend: 'up' },
        { label: 'Taux d\'alphabétisation', value: '68.7%', trend: 'up' }
      ]
    },
    {
      id: 'economie',
      title: 'Économie & Finances',
      icon: Coins,
      description: 'Comptes nationaux, finances publiques et secteur privé',
      keyIndicators: [
        { label: 'PIB nominal', value: '17.8 mille Mds FCFA', trend: 'up' },
        { label: 'PIB par habitant', value: '978 000 FCFA', trend: 'up' },
        { label: 'Déficit budgétaire', value: '-3.2% PIB', trend: 'stable' },
        { label: 'Taux d\'investissement', value: '26.4%', trend: 'up' }
      ]
    }
  ];

  const currentSESN = sesnData[selectedYear];

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen py-8 flex items-center justify-center">
          <p className="text-gray-600 text-xl">Chargement des données SESN...</p>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="min-h-screen py-8 flex items-center justify-center">
          <p className="text-red-600 text-xl">Erreur: {error}</p>
        </div>
      </Layout>
    );
  }

  // Même si aucune donnée SESN n'est disponible pour l'année sélectionnée,
  // nous ne retournons plus prématurément ici. Le hero et le reste de la
  // page s'afficheront toujours, et un message sera rendu plus bas
  // lorsque les données spécifiques à l'année sont absentes.

  const getTrendIcon = (trend) => { // Type 'trend: string' retiré
    switch (trend) {
      case 'up': return <TrendingUp className="h-4 w-4 text-green-600" />;
      case 'down': return <TrendingUp className="h-4 w-4 text-red-600 rotate-180" />;
      case 'stable': return <div className="h-4 w-4 bg-gray-400 rounded-full"></div>;
      default: return null;
    }
  };

  return (
    <Layout> {/* Ajout du composant Layout ici */}
      <div className="min-h-screen">
        {/* Hero Section */}
        <HeroSection
          title="Situation Économique et Sociale du Sénégal"
          subtitle="Publication phare de l'ANSD"
          description="Publication annuelle de référence présentant une analyse complète de l'évolution économique et sociale du Sénégal avec des données détaillées par région et par secteur d'activité."
          backgroundImage="https://images.unsplash.com/photo-1543286386-713bdd548da4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMG1lZXRpbmclMjBzdGF0aXN0aWNzJTIwZWNvbm9taWNzfGVufDF8fHx8MTc1NDY1Mzg0MXww&ixlib=rb-4.1.0&q=80&w=1080"
          badge={{
            text: 'Rapport Annuel Officiel',
            icon: Award
          }}
          actions={heroActions}
          stats={heroStats}
          overlay="green"
        />

        {/* Rest of content */}
        <div className="py-8">
          <div className="container-custom">
            {/* Si aucune donnée n'est disponible pour l'année sélectionnée, afficher un message */}
            {!currentSESN && (
              <div className="mb-8">
                <p className="text-gray-600 text-xl text-center">
                  Aucune donnée SESN disponible pour l'année sélectionnée.
                </p>
              </div>
            )}

            {/* Sélecteur d'année et état actuel */}
            <div className="glassmorphism rounded-lg p-6 mb-8">
              <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
                <div className="flex items-center space-x-4">
                  <h2 className="text-[var(--senegal-green)]">SESN {selectedYear}</h2>
                  <Badge className="bg-[var(--senegal-green)] text-white">
                    {currentSESN ? currentSESN.status : 'Indisponible'}
                  </Badge>
                </div>

                <div className="flex items-center space-x-2">
                  {['2022', '2023'].map((year) => (
                    <Button
                      key={year}
                      variant={selectedYear === year ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedYear(year)}
                      className={selectedYear === year ? "bg-[var(--senegal-green)] text-white" : ""}
                    >
                      {year}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Détails de l'année sélectionnée : afficher uniquement si des données sont disponibles */}
              {currentSESN && (
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
                  <div className="text-center">
                    <Calendar className="h-8 w-8 mx-auto text-[var(--senegal-green)] mb-2" />
                    <div className="font-medium" style={{ fontSize: '0.875rem' }}>Date de publication</div>
                    <div className="text-gray-600" style={{ fontSize: '0.875rem' }}>
                      {new Date(currentSESN.publishDate).toLocaleDateString('fr-FR')}
                    </div>
                  </div>
                  <div className="text-center">
                    <FileText className="h-8 w-8 mx-auto text-[var(--senegal-green)] mb-2" />
                    <div className="font-medium" style={{ fontSize: '0.875rem' }}>{currentSESN.pages} pages</div>
                    <div className="text-gray-600" style={{ fontSize: '0.875rem' }}>Document complet</div>
                  </div>
                  <div className="text-center">
                    <Eye className="h-8 w-8 mx-auto text-[var(--senegal-green)] mb-2" />
                    <div className="font-medium" style={{ fontSize: '0.875rem' }}>
                      {/* Utiliser toLocaleString uniquement si downloads est un nombre */}
                      {typeof currentSESN.downloads === 'number' ? currentSESN.downloads.toLocaleString() : currentSESN.downloads}
                    </div>
                    <div className="text-gray-600" style={{ fontSize: '0.875rem' }}>Téléchargements</div>
                  </div>
                  <div className="text-center">
                    <Button className="bg-[var(--senegal-green)] text-white hover:bg-[var(--senegal-green-dark)]"
                      onClick={() => currentSESN.fileUrl && window.open(currentSESN.fileUrl, '_blank')}
                      disabled={!currentSESN.fileUrl}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Télécharger ({currentSESN.size})
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Indicateurs clés : affichés uniquement si la liste est non vide */}
            {currentSESN && currentSESN.highlights && currentSESN.highlights.length > 0 && (
              <div className="mb-8">
                <h2 className="text-[var(--senegal-green)] mb-6 text-center">Indicateurs Clés {selectedYear}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {currentSESN.highlights.map((highlight, index) => (
                    <Card key={index} className="text-center hover-lift">
                      <CardContent className="p-6">
                        <div className="text-[var(--senegal-green)] mb-2" style={{ fontSize: '1.875rem' }}>
                          {highlight.value}
                        </div>
                        <div className="font-medium mb-2">{highlight.label}</div>
                        <div className="flex items-center justify-center space-x-1 text-gray-600" style={{ fontSize: '0.875rem' }}>
                          <span>{highlight.change}</span>
                          <TrendingUp className={`h-4 w-4 ${highlight.change && highlight.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`} />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Sections thématiques */}
            <div id="sesn-sections">
              <h2 className="text-[var(--senegal-green)] mb-8 text-center">Sections Thématiques</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {sections.map((section) => (
                  <Card key={section.id} className="hover-lift">
                    <CardHeader>
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 rounded-full bg-[var(--senegal-green)] flex items-center justify-center">
                          <section.icon className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <CardTitle className="text-[var(--senegal-green)]">{section.title}</CardTitle>
                          <CardDescription>{section.description}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {section.keyIndicators.slice(0, 2).map((indicator, index) => (
                          <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                            <div>
                              <div className="font-medium" style={{ fontSize: '0.875rem' }}>{indicator.label}</div>
                              <div className="font-bold text-[var(--senegal-green)]" style={{ fontSize: '1rem' }}>
                                {indicator.value}
                              </div>
                            </div>
                            <div className="flex items-center">
                              {getTrendIcon(indicator.trend)}
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="flex space-x-2 pt-4">
                        <Button size="sm" className="flex-1 bg-[var(--senegal-green)] text-white hover:bg-[var(--senegal-green-dark)]">
                          <Download className="h-4 w-4 mr-2" />
                          Section
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1">
                          <Eye className="h-4 w-4 mr-2" />
                          Aperçu
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Archive : affichée uniquement si des années sont disponibles */}
            {Object.values(sesnData).length > 0 && (
              <div className="mt-16">
                <h2 className="text-[var(--senegal-green)] mb-8 text-center">Archives SESN</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {Object.values(sesnData).map((yearData) => (
                    <Card key={yearData.year} className="hover-lift">
                      <CardHeader className="text-center">
                        <CardTitle className="text-[var(--senegal-green)]">
                          SESN {yearData.year}
                        </CardTitle>
                        <CardDescription>
                          Publié le {new Date(yearData.publishDate).toLocaleDateString('fr-FR')}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="text-center space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <div className="font-bold text-[var(--senegal-green)]">{yearData.pages}</div>
                            <div className="text-gray-600" style={{ fontSize: '0.875rem' }}>Pages</div>
                          </div>
                          <div>
                            <div className="font-bold text-[var(--senegal-green)]">
                              {typeof yearData.downloads === 'number' ? yearData.downloads.toLocaleString() : yearData.downloads}
                            </div>
                            <div className="text-gray-600" style={{ fontSize: '0.875rem' }}>Téléchargements</div>
                          </div>
                        </div>
                        <Button size="sm" className="w-full bg-[var(--senegal-green)] text-white hover:bg-[var(--senegal-green-dark)]"
                          onClick={() => yearData.fileUrl && window.open(yearData.fileUrl, '_blank')}
                          disabled={!yearData.fileUrl}
                        >
                          <Download className="h-4 w-4 mr-2" />
                          Télécharger
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout> 
  );
}