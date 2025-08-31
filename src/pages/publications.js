// src/pages/publications.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';
import HeroSection from '../components/HeroSection';
import {
  Download,
  Search,
  TrendingUp,
  FileText,
  BarChart3,
  Users,
  BookOpen,
  ArrowRight,
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';

/**
 * Page des publications dynamiques. Cette version récupère la liste des publications
 * via l'API backend et met à jour les filtres (catégories, années) en fonction des
 * données disponibles. Les utilisateurs peuvent rechercher par titre ou contenu,
 * filtrer par catégorie ou année, et consulter des publications phares si elles
 * possèdent la propriété `featured`.
 */
export default function PublicationsPage() {
  const [publications, setPublications] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('toutes');
  const [selectedYear, setSelectedYear] = useState('toutes');
  const [categories, setCategories] = useState([{ id: 'toutes', label: 'Toutes les catégories' }]);
  const [years, setYears] = useState(['toutes']);

  // Chargement des publications à partir du backend
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get('http://localhost:5000/api/publications');
        const data = res.data;
        setPublications(data);

        // Extraire dynamiquement les catégories et années disponibles
        const catSet = new Set();
        const yearSet = new Set();
        data.forEach((pub) => {
          if (pub.type) catSet.add(pub.type);
          if (pub.publishedAt) {
            const year = pub.publishedAt.slice(0, 4);
            yearSet.add(year);
          }
        });
        const catArr = Array.from(catSet).map((cat) => ({
          id: cat,
          label: cat.charAt(0).toUpperCase() + cat.slice(1).replace(/-/g, ' '),
        }));
        setCategories([{ id: 'toutes', label: 'Toutes les catégories' }, ...catArr]);
        setYears(['toutes', ...Array.from(yearSet).sort((a, b) => b.localeCompare(a))]);
      } catch (error) {
        console.error('Erreur lors du chargement des publications:', error);
      }
    }
    fetchData();
  }, []);

  // Filtrer les publications selon la recherche et les filtres
  const filteredPublications = publications.filter((pub) => {
    const matchesSearch =
      pub.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (pub.content && pub.content.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'toutes' || pub.type === selectedCategory;
    const matchesYear =
      selectedYear === 'toutes' || (pub.publishedAt && pub.publishedAt.startsWith(selectedYear));
    return matchesSearch && matchesCategory && matchesYear;
  });

  // Sélectionner les publications marquées comme "featured"
  const featuredPublications = publications.filter((pub) => pub.featured);

  // Statistiques dynamiques pour la section Hero
  const heroStats = [
    { value: `${publications.length}`, label: 'Publications', icon: FileText },
    {
      value: `${publications.reduce((acc, p) => acc + (p.downloads || 0), 0)}`,
      label: 'Téléchargements',
      icon: Download,
    },
    { value: `${categories.length - 1}`, label: 'Catégories', icon: BarChart3 },
    { value: '100%', label: 'Accès libre', icon: Users },
  ];

  const heroActions = [
    {
      label: 'Explorer le catalogue',
      onClick: () => {
        const element = document.getElementById('publications-catalog');
        element?.scrollIntoView({ behavior: 'smooth' });
      },
      icon: Search,
    },
    {
      label: 'Publications phares',
      onClick: () => {
        const element = document.getElementById('featured-publications');
        element?.scrollIntoView({ behavior: 'smooth' });
      },
      variant: 'outline',
      icon: TrendingUp,
    },
  ];

  // Obtenir le label d'une catégorie par son id
  const getCategoryLabel = (categoryId) => {
    const found = categories.find((c) => c.id === categoryId);
    return found ? found.label : categoryId;
  };

  return (
    <Layout title="Publications - ANSD Sénégal">
      <div className="min-h-screen">
        {/* Section d'introduction avec statistiques dynamiques */}
        <HeroSection
          title="Publications Statistiques"
          subtitle="Rapports officiels & études sectorielles"
          description="Découvrez l'ensemble de nos publications officielles : rapports sectoriels, études thématiques, bulletins statistiques et analyses économiques pour éclairer la prise de décision au Sénégal."
          backgroundImage="https://images.unsplash.com/photo-1741795746633-6536a0d4d4a5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsaWJyYXJ5JTIwYm9va3MlMjByZXNlYXJjaCUyMGRhdGElMjBhbmFseXNpc3xlbnwxfHx8fDE3NTQ2NTM2NTZ8MA&ixlib=rb-4.1.0&q=80&w=1080"
          badge={{ text: 'Accès libre et gratuit', icon: BookOpen }}
          actions={heroActions}
          stats={heroStats}
          overlay="green"
        />

        {/* Contenu principal */}
        <div className="py-8">
          <div className="container-custom">
            <Tabs defaultValue="toutes" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger value="toutes">Toutes les Publications</TabsTrigger>
                <TabsTrigger value="featured">Publications Phares</TabsTrigger>
                <TabsTrigger value="categories">Par Catégorie</TabsTrigger>
              </TabsList>

              {/* Onglet Toutes les publications */}
              <TabsContent value="toutes" className="space-y-8" id="publications-catalog">
                <div className="glassmorphism rounded-lg p-6">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="md:col-span-2">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          placeholder="Rechercher une publication..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-10"
                        />
                      </div>
                    </div>
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                      <SelectTrigger>
                        <SelectValue placeholder="Catégorie" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((cat) => (
                          <SelectItem key={cat.id} value={cat.id}>
                            {cat.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Select value={selectedYear} onValueChange={setSelectedYear}>
                      <SelectTrigger>
                        <SelectValue placeholder="Année" />
                      </SelectTrigger>
                      <SelectContent>
                        {years.map((year) => (
                          <SelectItem key={year} value={year}>
                            {year === 'toutes' ? 'Toutes les années' : year}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                {/* Liste des publications filtrées */}
                <div className="grid md:grid-cols-2 gap-6">
                  {filteredPublications.map((pub) => (
                    <Card
                      key={pub.id}
                      className="shadow-lg hover:shadow-xl transition-shadow duration-200"
                    >
                      <CardHeader>
                        <CardTitle className="text-lg font-semibold">{pub.title}</CardTitle>
                        <CardDescription className="text-sm text-gray-500">
                          {pub.publishedAt
                            ? new Date(pub.publishedAt).toLocaleDateString()
                            : ''}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-sm text-gray-700 line-clamp-3">{pub.content}</p>
                        <div className="flex flex-wrap items-center gap-2">
                          <Badge>{getCategoryLabel(pub.type)}</Badge>
                          {pub.pages && <Badge variant="secondary">{pub.pages} pages</Badge>}
                          {pub.size && <Badge variant="secondary">{pub.size}</Badge>}
                          {pub.format && <Badge variant="secondary">{pub.format}</Badge>}
                          {pub.downloads && (
                            <Badge variant="secondary">
                              <Download className="inline h-3 w-3 mr-1" />
                              {pub.downloads}
                            </Badge>
                          )}
                        </div>
                        {pub.fileUrl && (
                          <div>
                            <a
                              href={`http://localhost:5000${pub.fileUrl}`}
                              className="text-sm text-[var(--senegal-green)] hover:underline flex items-center"
                              download
                            >
                              <Download className="h-4 w-4 mr-2" /> Télécharger
                            </a>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                  {filteredPublications.length === 0 && <p>Aucune publication trouvée.</p>}
                </div>
              </TabsContent>

              {/* Onglet Publications phares */}
              <TabsContent value="featured" className="space-y-8" id="featured-publications">
                <div className="grid md:grid-cols-2 gap-6">
                  {featuredPublications.map((pub) => (
                    <Card
                      key={pub.id}
                      className="shadow-lg hover:shadow-xl transition-shadow duration-200 border-green-500"
                    >
                      <CardHeader>
                        <CardTitle className="text-lg font-semibold">{pub.title}</CardTitle>
                        <CardDescription className="text-sm text-gray-500">
                          {pub.publishedAt
                            ? new Date(pub.publishedAt).toLocaleDateString()
                            : ''}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-sm text-gray-700 line-clamp-3">{pub.content}</p>
                        <div className="flex flex-wrap items-center gap-2">
                          <Badge>{getCategoryLabel(pub.type)}</Badge>
                          {pub.pages && <Badge variant="secondary">{pub.pages} pages</Badge>}
                          {pub.size && <Badge variant="secondary">{pub.size}</Badge>}
                          {pub.format && <Badge variant="secondary">{pub.format}</Badge>}
                          {pub.downloads && (
                            <Badge variant="secondary">
                              <Download className="inline h-3 w-3 mr-1" />
                              {pub.downloads}
                            </Badge>
                          )}
                        </div>
                        {pub.fileUrl && (
                          <div>
                            <a
                              href={`http://localhost:5000${pub.fileUrl}`}
                              className="text-sm text-[var(--senegal-green)] hover:underline flex items-center"
                              download
                            >
                              <Download className="h-4 w-4 mr-2" /> Télécharger
                            </a>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                  {featuredPublications.length === 0 && (
                    <p>Aucune publication phare disponible.</p>
                  )}
                </div>
              </TabsContent>

              {/* Onglet Par catégorie */}
              <TabsContent value="categories" className="space-y-8">
                <div className="grid md:grid-cols-2 gap-6">
                  {categories
                    .filter((cat) => cat.id !== 'toutes')
                    .map((cat) => {
                      const items = publications.filter((pub) => pub.type === cat.id);
                      return (
                        <Card
                          key={cat.id}
                          className="shadow-lg hover:shadow-xl transition-shadow duration-200"
                        >
                          <CardHeader>
                            <CardTitle className="text-lg font-semibold">{cat.label}</CardTitle>
                            <CardDescription className="text-sm text-gray-500">
                              {items.length} publications
                            </CardDescription>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            {items.slice(0, 3).map((pub) => (
                              <div key={pub.id} className="border-b pb-2 mb-2">
                                <p className="font-medium text-sm">{pub.title}</p>
                                <p className="text-xs text-gray-600 line-clamp-2">
                                  {pub.content}
                                </p>
                                {pub.publishedAt && (
                                  <p className="text-xs text-gray-400">
                                    {new Date(pub.publishedAt).toLocaleDateString()}
                                  </p>
                                )}
                              </div>
                            ))}
                            {items.length > 3 && (
                              <a
                                href="#publications-catalog"
                                onClick={() => {
                                  setSelectedCategory(cat.id);
                                  setSelectedYear('toutes');
                                }}
                                className="text-sm text-[var(--senegal-green)] hover:underline flex items-center"
                              >
                                <ArrowRight className="h-4 w-4 mr-1" /> Voir toutes les publications
                              </a>
                            )}
                          </CardContent>
                        </Card>
                      );
                    })}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </Layout>
  );
}