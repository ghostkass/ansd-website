// src/pages/actualites.js

import React, { useState, useEffect } from 'react';
import { Calendar, TrendingUp, Download, Eye, Filter, Search, BarChart3, AlertCircle, Clock, Tag } from 'lucide-react';
import { Button } from '../components/ui/button'; // Chemin ajusté
import { Input } from '../components/ui/input'; // Chemin ajusté
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'; // Chemin ajusté
import { Badge } from '../components/ui/badge'; // Chemin ajusté
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select'; // Chemin ajusté
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs'; // Chemin ajusté
import Layout from '../components/Layout'; // Import du composant Layout
import { usePublications } from '../hooks/useANSDApi'; // Import du hook

export default function ActualitesPage() { // Renommé et export par défaut
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('tous');
  const [selectedPeriod, setSelectedPeriod] = useState('tous');
  const [periods, setPeriods] = useState([{ id: 'tous', label: 'Toutes périodes' }]);

  const { data: fetchedPublications, loading, error } = usePublications();

  useEffect(() => {
    if (fetchedPublications && fetchedPublications.length > 0) {
      const uniquePeriods = new Set();
      fetchedPublications.forEach(pub => {
        const date = new Date(pub.publishedAt || pub.createdAt);
        const yearMonth = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`;
        uniquePeriods.add(yearMonth);
      });

      const sortedPeriods = Array.from(uniquePeriods)
        .sort((a, b) => b.localeCompare(a))
        .map(period => ({
          id: period,
          label: new Date(period).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long' })
        }));

      setPeriods([{ id: 'tous', label: 'Toutes périodes' }, ...sortedPeriods]);
    }
  }, [fetchedPublications]);

  const actualites = fetchedPublications ? fetchedPublications.map(pub => ({
    id: pub.id,
    type: pub.type, // Assuming pub.type matches the desired types (bulletin, indicateur, flash, special)
    title: pub.title,
    description: pub.content,
    date: pub.publishedAt || pub.createdAt, // Use publishedAt if available, otherwise createdAt
    category: pub.type === 'bulletin' ? 'Bulletin Mensuel' :
              pub.type === 'indicateur' ? 'Indicateur Sectoriel' :
              pub.type === 'flash' ? 'Note Flash' :
              pub.type === 'special' ? 'Note Spéciale' : 'Autre',
    highlights: [], // No direct mapping, keeping empty for now
    downloads: 0, // No direct mapping, keeping 0 for now
    priority: 'medium' // No direct mapping, setting to medium for now
  })) : [];


  const indicateursCles = [
    {
      nom: 'PIB (Croissance)',
      valeur: '+5.8%',
      periode: 'T2 2024',
      tendance: 'up',
      variation: '+0.3 pt',
      color: 'text-green-600'
    },
    {
      nom: 'Inflation (IPC)',
      valeur: '3.4%',
      periode: 'Juillet 2024',
      tendance: 'up',
      variation: '+0.1 pt',
      color: 'text-orange-600'
    },
    {
      nom: 'Taux de Chômage',
      valeur: '3.8%',
      periode: 'T2 2024',
      tendance: 'stable',
      variation: '0.0 pt',
      color: 'text-blue-600'
    },
    {
      nom: 'Exportations',
      valeur: '+12.5%',
      periode: 'T2 2024',
      tendance: 'up',
      variation: '+2.8 pt',
      color: 'text-green-600'
    },
    {
      nom: 'Production Industrielle',
      valeur: '+7.2%',
      periode: 'Juillet 2024',
      tendance: 'up',
      variation: '+1.5 pt',
      color: 'text-green-600'
    },
    {
      nom: 'Recettes Fiscales',
      valeur: '+8.9%',
      periode: 'Cumul 7 mois',
      tendance: 'up',
      variation: '+1.2 pt',
      color: 'text-green-600'
    }
  ];

  const types = [
    { id: 'tous', label: 'Tous types' },
    { id: 'bulletin', label: 'Bulletins Mensuels' },
    { id: 'indicateur', label: 'Indicateurs Sectoriels' },
    { id: 'flash', label: 'Notes Flash' },
    { id: 'special', label: 'Notes Spéciales' }
  ];

  // periods is managed by useState and useEffect above, no need to redeclare here

  const filteredActualites = actualites.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'tous' || item.type === selectedType;
    const matchesPeriod = selectedPeriod === 'tous' || new Date(item.date).getFullYear() + '-' + (new Date(item.date).getMonth() + 1).toString().padStart(2, '0') === selectedPeriod;
    return matchesSearch && matchesType && matchesPeriod;
  });

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen py-8 flex items-center justify-center">
          <p className="text-gray-600 text-xl">Chargement des actualités...</p>
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

  // Suppression des annotations de type ': string'
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'border-[var(--senegal-red)]';
      case 'medium': return 'border-[var(--senegal-gold)]';
      default: return 'border-gray-300';
    }
  };

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case 'high': return { label: 'Priorité Haute', class: 'bg-[var(--senegal-red)] text-white' };
      case 'medium': return { label: 'Priorité Moyenne', class: 'bg-[var(--senegal-gold)] text-black' };
      default: return { label: 'Priorité Normale', class: 'bg-gray-500 text-white' };
    }
  };

  const getTendanceIcon = (tendance) => {
    switch (tendance) {
      case 'up': return <TrendingUp className="h-4 w-4 text-green-600" />;
      case 'down': return <TrendingUp className="h-4 w-4 text-red-600 rotate-180" />;
      case 'stable': return <div className="h-4 w-4 bg-gray-400 rounded-full"></div>;
      default: return null;
    }
  };

  return (
    <Layout> {/* Ajout du composant Layout ici */}
      <div className="min-h-screen py-8">
        <div className="container-custom">
          {/* En-tête */}
          <div className="text-center mb-12">
            <h1 className="text-[var(--senegal-green)] text-4xl font-bold mb-4">Actualités & Indicateurs</h1> {/* Ajout de text-4xl font-bold */}
            <p className="text-gray-600 max-w-3xl mx-auto text-lg"> {/* Ajout de text-lg */}
              Restez informé des dernières évolutions économiques et sociales du Sénégal
              grâce à nos bulletins mensuels, notes flash et indicateurs sectoriels.
            </p>
          </div>

          {/* Indicateurs en temps réel */}
          <div className="glassmorphism rounded-lg p-6 mb-8 shadow-md"> {/* Ajout de shadow-md */}
            <h2 className="text-[var(--senegal-green)] text-3xl font-bold mb-6 text-center">Tableau de Bord des Indicateurs Clés</h2> {/* Ajout de text-3xl font-bold */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {indicateursCles.map((indicateur, index) => (
                <div key={index} className="bg-white rounded-lg p-4 shadow-sm hover-lift"> {/* Ajout de hover-lift */}
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-sm">{indicateur.nom}</h4> {/* Ajusté font-medium text-sm */}
                    {getTendanceIcon(indicateur.tendance)}
                  </div>
                  <div className={`font-bold ${indicateur.color} text-xl mb-1`}> {/* Ajusté text-xl */}
                    {indicateur.valeur}
                  </div>
                  <div className="flex items-center justify-between text-xs"> {/* Ajusté text-xs */}
                    <span className="text-gray-600">{indicateur.periode}</span>
                    <span className={indicateur.color}>{indicateur.variation}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Tabs defaultValue="toutes" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8 bg-gray-200 p-1 rounded-md"> {/* Ajusté p-1 rounded-md */}
              <TabsTrigger value="toutes" className="data-[state=active]:bg-[var(--senegal-green)] data-[state=active]:text-white transition-all duration-200">Toutes les Actualités</TabsTrigger>
              <TabsTrigger value="bulletins" className="data-[state=active]:bg-[var(--senegal-green)] data-[state=active]:text-white transition-all duration-200">Bulletins Mensuels</TabsTrigger>
              <TabsTrigger value="indicateurs" className="data-[state=active]:bg-[var(--senegal-green)] data-[state=active]:text-white transition-all duration-200">Indicateurs Sectoriels</TabsTrigger>
            </TabsList>

            {/* Toutes les actualités */}
            <TabsContent value="toutes" className="space-y-8">
              {/* Filtres */}
              <div className="glassmorphism rounded-lg p-6 shadow-md"> {/* Ajout de shadow-md */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Rechercher une actualité..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 rounded-full" // Ajout de rounded-full
                    />
                  </div>
                  <Select value={selectedType} onValueChange={setSelectedType}>
                    <SelectTrigger className="rounded-full"> {/* Ajout de rounded-full */}
                      <SelectValue placeholder="Type de publication" />
                    </SelectTrigger>
                    <SelectContent>
                      {types.map(type => (
                        <SelectItem key={type.id} value={type.id}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                    <SelectTrigger className="rounded-full"> {/* Ajout de rounded-full */}
                      <SelectValue placeholder="Période" />
                    </SelectTrigger>
                    <SelectContent>
                      {periods.map(period => (
                        <SelectItem key={period.id} value={period.id}>
                          {period.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Liste des actualités */}
              <div className="space-y-6">
                {filteredActualites.map((actualite) => (
                  <Card key={actualite.id} className={`hover-lift ${getPriorityColor(actualite.priority)} border-2 shadow-md`}> {/* Ajout de shadow-md */}
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <Badge className="bg-[var(--senegal-green)] text-white text-xs"> {/* Ajusté text-xs */}
                              {actualite.category}
                            </Badge>
                            <Badge className={`${getPriorityBadge(actualite.priority).class} text-xs`}> {/* Ajusté text-xs */}
                              {getPriorityBadge(actualite.priority).label}
                            </Badge>
                          </div>
                          <CardTitle className="text-[var(--senegal-green)] text-xl hover:text-[var(--senegal-green-dark)] transition-colors"> {/* Ajusté text-xl */}
                            {actualite.title}
                          </CardTitle>
                          <CardDescription className="mt-2 text-base"> {/* Ajusté text-base */}
                            {actualite.description}
                          </CardDescription>
                        </div>
                        <div className="flex space-x-2 flex-shrink-0 ml-4"> {/* Ajout de flex-shrink-0 ml-4 */}
                          <Button size="sm" variant="outline" className="text-[var(--senegal-green)] border-[var(--senegal-green)] hover:bg-[var(--senegal-green)] hover:text-white">
                            <Eye className="h-4 w-4 mr-2" />
                            Consulter
                          </Button>
                          {actualite.fileUrl && (
                            <a href={actualite.fileUrl} target="_blank" rel="noopener noreferrer">
                              <Button size="sm" className="bg-[var(--senegal-gold)] text-black hover:bg-[var(--senegal-gold-dark)]"> {/* Couleur ajustée */}
                                <Download className="h-4 w-4 mr-2" />
                                Télécharger
                              </Button>
                            </a>
                          )}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {/* Métadonnées */}
                        <div className="flex flex-wrap items-center justify-between text-gray-600 text-sm gap-2"> {/* Ajout de flex-wrap et gap-2 */}
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-1">
                              <Calendar className="h-4 w-4" />
                              <span>{new Date(actualite.date).toLocaleDateString('fr-FR')}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Clock className="h-4 w-4" />
                              <span>Publié il y a {Math.floor((Date.now() - new Date(actualite.date).getTime()) / (1000 * 60 * 60 * 24))} jours</span>
                            </div>
                          </div>
                          {actualite.downloads > 0 && (
                            <div className="flex items-center space-x-1">
                              <Download className="h-4 w-4" />
                              <span>{actualite.downloads.toLocaleString()} téléchargements</span>
                            </div>
                          )}
                        </div>
                        </div>
                      </CardContent>
                    </Card>
                ))}
                ))

                {filteredActualites.length === 0 && (
                  <div className="text-center py-12">
                    <Search className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                    <h3 className="text-gray-600 mb-2 text-xl">Aucune actualité trouvée</h3> {/* Ajusté text-xl */}
                    <p className="text-gray-500 text-base">Essayez de modifier vos critères de recherche</p> {/* Ajusté text-base */}
                  </div>
                )}
              </div>
            </TabsContent>

            {/* Bulletins Mensuels */}
            <TabsContent value="bulletins" className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-[var(--senegal-green)] text-3xl font-bold mb-4">Bulletins Mensuels des Statistiques</h2> {/* Ajusté text-3xl font-bold */}
                <p className="text-gray-600 text-lg"> {/* Ajusté text-lg */}
                  Synthèse mensuelle des principaux indicateurs économiques et sociaux du Sénégal
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {actualites.filter(item => item.type === 'bulletin').map((bulletin) => (
                  <Card key={bulletin.id} className="hover-lift border-[var(--senegal-green)] border-2 shadow-md"> {/* Ajout de shadow-md */}
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <Badge className="bg-[var(--senegal-green)] text-white text-xs"> {/* Ajusté text-xs */}
                          Bulletin Mensuel
                        </Badge>
                        <span className="text-gray-500 text-sm"> {/* Ajusté text-sm */}
                          {new Date(bulletin.date).toLocaleDateString('fr-FR')}
                        </span>
                      </div>
                      <CardTitle className="text-[var(--senegal-green)] text-xl"> {/* Ajusté text-xl */}
                        {bulletin.title}
                      </CardTitle>
                      <CardDescription className="text-base"> {/* Ajusté text-base */}
                        {bulletin.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex space-x-2">
                        {bulletin.fileUrl && (
                          <a href={bulletin.fileUrl} target="_blank" rel="noopener noreferrer" className="flex-1">
                            <Button size="sm" className="w-full bg-[var(--senegal-gold)] text-black hover:bg-[var(--senegal-gold-dark)]"> {/* Couleur ajustée */}
                              <Download className="h-4 w-4 mr-2" />
                              Télécharger PDF
                            </Button>
                          </a>
                        )}
                        <Button size="sm" variant="outline" className="flex-1 text-[var(--senegal-green)] border-[var(--senegal-green)] hover:bg-[var(--senegal-green)] hover:text-white">
                          <Eye className="h-4 w-4 mr-2" />
                          Consulter
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Indicateurs Sectoriels */}
            <TabsContent value="indicateurs" className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-[var(--senegal-green)] text-3xl font-bold mb-4">Indicateurs Sectoriels</h2> {/* Ajusté text-3xl font-bold */}
                <p className="text-gray-600 text-lg"> {/* Ajusté text-lg */}
                  Suivi mensuel des principaux secteurs économiques du Sénégal
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {actualites.filter(item => item.type === 'indicateur').map((indicateur) => (
                  <Card key={indicateur.id} className="hover-lift shadow-md"> {/* Ajout de shadow-md */}
                    <CardHeader className="text-center">
                      <div className="w-16 h-16 rounded-full bg-[var(--senegal-green)] mx-auto mb-4 flex items-center justify-center">
                        <BarChart3 className="h-8 w-8 text-white" />
                      </div>
                      <CardTitle className="text-[var(--senegal-green)] text-xl"> {/* Ajusté text-xl */}
                        {indicateur.title.split(' - ')[0]}
                      </CardTitle>
                      <CardDescription className="text-base"> {/* Ajusté text-base */}
                        {indicateur.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="text-center">
                        <div className="font-bold text-[var(--senegal-green)] text-lg"> {/* Ajusté text-lg */}
                          {/* Assuming the first highlight is the key value for indicators */}
                          {indicateur.highlights[0] || 'N/A'}
                        </div>
                        <div className="text-gray-600 text-sm"> {/* Ajusté text-sm */}
                          {new Date(indicateur.date).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}
                        </div>
                      </div>
                      {indicateur.fileUrl && (
                        <a href={indicateur.fileUrl} target="_blank" rel="noopener noreferrer">
                          <Button className="w-full bg-[var(--senegal-gold)] text-black hover:bg-[var(--senegal-gold-dark)]"> {/* Couleur ajustée */}
                            <Download className="h-4 w-4 mr-2" />
                            Télécharger les données
                          </Button>
                        </a>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>

          {/* Newsletter */}
          <div className="bg-gradient-to-r from-[var(--senegal-green)] to-[var(--senegal-green-light)] text-white rounded-lg p-8 mt-12 shadow-lg">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4">Abonnez-vous à nos Actualités</h2>
              <p className="text-lg mb-6 max-w-2xl mx-auto">
                Recevez directement dans votre boîte mail nos derniers bulletins, indicateurs et notes d'analyse.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                <Input
                  placeholder="Votre adresse email"
                  className="bg-white/20 border-white/30 text-white placeholder:text-white/70 rounded-full" // Ajout de rounded-full
                />
                <Button className="bg-[var(--senegal-gold)] text-black hover:bg-[var(--senegal-gold-dark)] rounded-full"> {/* Ajout de rounded-full */}
                  S'abonner
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}