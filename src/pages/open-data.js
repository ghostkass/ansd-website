// src/pages/open-data.js

import React, { useState, useEffect } from 'react';
import { Search, Filter, Download, Eye, Database, Tag, Calendar, FileType, Users, MapPin, BarChart3, TrendingUp, Globe, Code } from 'lucide-react';
import HeroSection from '../components/HeroSection';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import Layout from '../components/Layout'; // Import du composant Layout
import { usePublications } from '../hooks/useANSDApi'; // Import du hook

export default function OpenDataPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('toutes');
  const [selectedFormat, setSelectedFormat] = useState('tous');
  const [selectedRegion, setSelectedRegion] = useState('toutes');

  const { data: fetchedPublications, loading, error } = usePublications();

  const categories = [
    { id: 'toutes', label: 'Toutes catégories', count: 0, color: 'bg-gray-500' },
    { id: 'agriculture', label: 'Agriculture & Pêche', count: 0, color: 'bg-green-500' },
    { id: 'sante', label: 'Santé', count: 0, color: 'bg-red-500' },
    { id: 'education', label: 'Éducation', count: 0, color: 'bg-blue-500' },
    { id: 'emploi', label: 'Emploi & Formation', count: 0, color: 'bg-purple-500' },
    { id: 'demographie', label: 'Démographie', count: 0, color: 'bg-indigo-500' },
    { id: 'economie', label: 'Économie & Finances', count: 0, color: 'bg-yellow-500' },
    { id: 'environnement', label: 'Environnement', count: 0, color: 'bg-lime-500' },
    { id: 'commerce', label: 'Commerce & Industrie', count: 0, color: 'bg-orange-500' },
  ];

  const dataFormats = [
    { id: 'tous', label: 'Tous formats' },
    { id: 'csv', label: 'CSV' },
    { id: 'json', label: 'JSON' },
    { id: 'xml', label: 'XML' },
    { id: 'xlsx', label: 'XLSX' },
  ];

  const regions = [
    { id: 'toutes', label: 'Toutes régions' },
    { id: 'dakar', label: 'Dakar' },
    { id: 'thies', label: 'Thiès' },
    { id: 'diourbel', label: 'Diourbel' },
    { id: 'fatick', label: 'Fatick' },
    { id: 'kaffrine', label: 'Kaffrine' },
    { id: 'kaolack', label: 'Kaolack' },
    { id: 'kolda', label: 'Kolda' },
    { id: 'louga', label: 'Louga' },
    { id: 'matam', label: 'Matam' },
    { id: 'saint-louis', label: 'Saint-Louis' },
    { id: 'sedhiou', label: 'Sédhiou' },
    { id: 'tambacounda', label: 'Tambacounda' },
    { id: 'kedougou', label: 'Kédougou' },
    { id: 'ziguinchor', label: 'Ziguinchor' },
  ];

  const datasets = fetchedPublications ? fetchedPublications.map(pub => ({
    id: pub.id,
    title: pub.title,
    description: pub.content,
    category: pub.type === 'bulletin' ? 'economie' : // Example mapping
              pub.type === 'indicateur' ? 'economie' :
              pub.type === 'flash' ? 'economie' :
              pub.type === 'special' ? 'economie' : 'toutes',
    format: pub.fileUrl ? pub.fileUrl.split('.').pop() : 'N/A', // Extract format from fileUrl
    region: 'toutes', // No direct mapping, default to all regions
    downloads: 0, // No direct mapping, default to 0
    views: 0, // No direct mapping, default to 0
    lastUpdate: pub.publishedAt || pub.createdAt,
    tags: [pub.type], // Use publication type as a tag
    fileUrl: pub.fileUrl,
  })) : [];

  // Update category counts based on fetched data
  useEffect(() => {
    if (fetchedPublications) {
      const updatedCategories = categories.map(cat => {
        if (cat.id === 'toutes') {
          return { ...cat, count: fetchedPublications.length };
        }
        const count = datasets.filter(ds => ds.category === cat.id).length;
        return { ...cat, count };
      });
      // This would require a state for categories, which is not currently there.
      // For now, the counts in the `categories` array will remain static.
    }
  }, [fetchedPublications]);

  // Définition des jeux de données filtrés et des couleurs de catégories

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen py-8 flex items-center justify-center">
          <p className="text-gray-600 text-xl">Chargement des jeux de données...</p>
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


  const filteredDatasets = datasets.filter(dataset => {
    const matchesSearch = searchTerm === '' ||
                          dataset.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          dataset.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          dataset.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCategory = selectedCategory === 'toutes' || dataset.category === selectedCategory;
    const matchesFormat = selectedFormat === 'tous' || dataset.format === selectedFormat;
    const matchesRegion = selectedRegion === 'toutes' || dataset.region === selectedRegion; // Implémentation basique, à affiner si multi-régions

    return matchesSearch && matchesCategory && matchesFormat && matchesRegion;
  });

  const getCategoryColor = (categoryId) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.color : 'bg-gray-500';
  };

  return (
    <Layout> {/* Ajout du composant Layout ici */}
      <div className="min-h-screen">
        {/* Hero Section */}
        <HeroSection
          title="Open Data"
          subtitle="Accédez aux données officielles du Sénégal"
          description="Notre portail Open Data met à votre disposition un large éventail de jeux de données brutes et agrégées pour la recherche, l'innovation et l'aide à la décision."
          backgroundImage="https://images.unsplash.com/photo-1579782500077-802c67c0cc69?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRhJTIwYW5hbHlzaXMlMjBhZnJpY2F8ZW58MXx8fHwxNzU0NjU1NTE5fDA&ixlib=rb-4.1.0&q=80&w=1080"
          badge={{ text: 'Données Publiques & Libres', icon: Globe }}
          stats={[
            { value: '180+', label: 'Jeux de données', icon: Database },
            { value: '15+', label: 'Catégories', icon: Tag },
            { value: '50K+', label: 'Téléchargements', icon: Download },
            { value: 'Quotidien', label: 'Mises à jour', icon: Calendar },
          ]}
          actions={[
            {
              label: 'Explorer le Catalogue',
              onClick: () => {
                const element = document.getElementById('data-catalog');
                element?.scrollIntoView({ behavior: 'smooth' });
              },
              icon: Search
            },
            {
              label: 'Accès API',
              onClick: () => { alert('API Documentation future'); },
              variant: 'outline',
              icon: TrendingUp
            }
          ]}
          overlay="green"
        />

        {/* Categories Section */}
        <section className="py-16 bg-gray-50">
          <div className="container-custom">
            <h2 className="text-3xl font-bold text-center text-[var(--neutral-dark)] mb-12">
              Explorer par Catégorie
            </h2>
            <Tabs defaultValue="toutes" className="w-full">
              <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 bg-gray-200 p-1 rounded-md mb-8">
                {categories.map((category) => (
                  <TabsTrigger
                    key={category.id}
                    value={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className="data-[state=active]:bg-[var(--senegal-green)] data-[state=active]:text-white transition-all duration-200"
                  >
                    {category.label}
                  </TabsTrigger>
                ))}
              </TabsList>
              {/* Le contenu des TabsContent sera géré par le filtrage global */}
              <TabsContent value={selectedCategory}>
              <p className="text-center text-gray-700 mb-8 text-lg">
                Parcourez nos **{categories.find(cat => cat.id === selectedCategory)?.count || 0}** jeux de données dans la catégorie "{categories.find(cat => cat.id === selectedCategory)?.label}".
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {categories.slice(1).map((category) => ( // On ne mappe pas "toutes" ici
                  <Card key={category.id} className="hover-lift cursor-pointer border-[var(--senegal-gold-light)] border-2">
                    <CardContent className="p-6 text-center">
                      <div className={`w-16 h-16 rounded-full ${category.color} mx-auto mb-4 flex items-center justify-center`}>
                        <BarChart3 className="h-8 w-8 text-white" /> {/* Icône générique */}
                      </div>
                      <h3 className="font-semibold text-[var(--senegal-green)] mb-2">
                        {category.label}
                      </h3>
                      <p className="text-gray-600 mb-4" style={{ fontSize: '0.875rem' }}>
                        {category.count} jeux de données
                      </p>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedCategory(category.id)}
                        className="border-[var(--senegal-green)] text-[var(--senegal-green)] hover:bg-[var(--senegal-green)] hover:text-white"
                      >
                        Explorer
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
          </div>
        </section>

        {/* Data Catalog Section */}
        <section id="data-catalog" className="py-16 bg-white">
          <div className="container-custom">
            <h2 className="text-3xl font-bold text-center text-[var(--neutral-dark)] mb-12">
              Catalogue de Données
            </h2>
            <div className="flex flex-col md:flex-row gap-4 mb-8 items-center">
              <div className="relative w-full md:flex-grow">
                <Input
                  type="text"
                  placeholder="Rechercher un jeu de données..."
                  className="w-full pl-10 pr-4 py-2 border rounded-full focus:ring-2 focus:ring-[var(--senegal-gold)] focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              </div>
              <Select onValueChange={setSelectedFormat} value={selectedFormat}>
                <SelectTrigger className="w-full md:w-[180px] rounded-full">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Format" />
                </SelectTrigger>
                <SelectContent>
                  {dataFormats.map(format => (
                    <SelectItem key={format.id} value={format.id}>{format.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select onValueChange={setSelectedRegion} value={selectedRegion}>
                <SelectTrigger className="w-full md:w-[180px] rounded-full">
                  <MapPin className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Région" />
                </SelectTrigger>
                <SelectContent>
                  {regions.map(region => (
                    <SelectItem key={region.id} value={region.id}>{region.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDatasets.length > 0 ? (
                filteredDatasets.map(dataset => (
                  <Card key={dataset.id} className="hover-lift flex flex-col">
                    <CardHeader>
                      <Badge className={`${getCategoryColor(dataset.category)} text-white self-start mb-2`}>
                        <Database className="h-3 w-3 mr-1" /> {categories.find(c => c.id === dataset.category)?.label}
                      </Badge>
                      <CardTitle className="text-[var(--senegal-green)] text-lg mb-2">{dataset.title}</CardTitle>
                      <CardDescription>{dataset.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <div className="grid grid-cols-2 gap-2 text-sm text-gray-700 mb-4">
                        <p className="flex items-center"><Calendar className="h-4 w-4 mr-1" /> Màj: {new Date(dataset.lastUpdate).toLocaleDateString('fr-FR')}</p>
                        <p className="flex items-center"><FileType className="h-4 w-4 mr-1" /> Format: {dataset.format.toUpperCase()}</p>
                        <p className="flex items-center"><Eye className="h-4 w-4 mr-1" /> Vues: {dataset.views.toLocaleString()}</p>
                        <p className="flex items-center"><Download className="h-4 w-4 mr-1" /> DLs: {dataset.downloads.toLocaleString()}</p>
                      </div>
                      <div className="flex flex-wrap gap-1 mb-4">
                        {dataset.tags.map(tag => (
                          <Badge key={tag} variant="secondary" className="text-xs bg-gray-100 text-gray-600">{tag}</Badge>
                        ))}
                      </div>
                      <Button className="w-full bg-[var(--senegal-gold)] text-black hover:bg-[var(--senegal-gold-dark)]"
                        onClick={() => dataset.fileUrl && window.open(dataset.fileUrl, '_blank')}
                        disabled={!dataset.fileUrl}
                      >
                        <Download className="h-4 w-4 mr-2" /> Télécharger le jeu de données
                      </Button>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <p className="col-span-full text-center text-gray-600">Aucun jeu de données ne correspond à vos critères.</p>
              )}
            </div>
          </div>
        </section>

        {/* Call to Action for API */}
        <section className="bg-[var(--senegal-green)] py-16 text-white text-center">
          <div className="container-custom">
            <h2 className="text-3xl font-bold mb-4">Accédez à nos données via API</h2>
            <p className="text-lg mb-8 max-w-3xl mx-auto">
              Développeurs et chercheurs, intégrez nos jeux de données directement dans vos applications grâce à notre API robuste et documentée.
            </p>
            <Button
              size="lg"
              variant="secondary"
              className="bg-[var(--senegal-gold)] text-[var(--senegal-green)] hover:bg-[var(--senegal-gold-dark)]"
              onClick={() => { alert('Redirection vers la documentation API...'); }}
            >
              <Code className="h-5 w-5 mr-2" />
              Accéder à la Documentation API
            </Button>
          </div>
        </section>

      </div>
    </Layout> // Fermeture de la balise Layout
  );
}