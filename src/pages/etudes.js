// src/pages/EtudesPage.js

import React, { useState } from 'react';
import { Search, Users, Briefcase, Home, Heart, Leaf, Building, TrendingUp, Download, Eye, Calendar, Database, CheckCircle, MapPin } from 'lucide-react'; // Ajout de CheckCircle
import HeroSection from '../components/HeroSection'; // Assurez-vous que le chemin est correct et que c'est un export default
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Progress } from '../components/ui/progress'; // Composant Progress de Shadcn/ui ou similaire
import Layout from '../components/Layout';

export default function EtudesPage() { // Changé en export default
  const [searchTerm, setSearchTerm] = useState('');

  const heroStats = [
    { value: '45+', label: 'Études réalisées', icon: Database },
    { value: '3', label: 'En cours', icon: TrendingUp },
    { value: '15K+', label: 'Participants', icon: Users },
    { value: '100%', label: 'Couverture nationale', icon: Home }
  ];

  const heroActions = [
    {
      label: 'Études disponibles',
      onClick: () => {
        const element = document.getElementById('studies-available');
        element?.scrollIntoView({ behavior: 'smooth' });
      },
      icon: Search
    },
    {
      label: 'Études en cours',
      onClick: () => {
        const element = document.getElementById('ongoing-studies');
        element?.scrollIntoView({ behavior: 'smooth' });
      },
      variant: 'outline', // Supprimé 'as const'
      icon: TrendingUp
    }
  ];

  const enquetesEnCours = [
    {
      id: 1,
      name: 'Enquête sur la Vulnérabilité Alimentaire',
      description: 'Évaluation de la sécurité alimentaire des ménages sénégalais',
      progress: 75,
      startDate: '2024-01-15',
      endDate: '2024-12-30',
      status: 'collecte',
      regions: 14,
      echantillon: 12000
    },
    {
      id: 2,
      name: 'Enquête Emploi Jeunes',
      description: 'Analyse de l\'insertion professionnelle des jeunes diplômés',
      progress: 45,
      startDate: '2024-03-01',
      endDate: '2024-11-30',
      status: 'collecte',
      regions: 8,
      echantillon: 8500
    },
    {
      id: 3,
      name: 'Recensement Agricole 2024',
      description: 'Recensement général des exploitations agricoles',
      progress: 90,
      startDate: '2023-10-01',
      endDate: '2024-09-30',
      status: 'analyse',
      regions: 14,
      echantillon: 45000
    }
  ];

  const enquetesDisponibles = [
    {
      id: 1,
      title: 'ENUPIS II - Enquête Unifiée sur les Petites Industries',
      description: 'Recensement des petites industries manufacturières et de services au Sénégal',
      icon: Building,
      dateRealisation: '2023',
      secteurs: ['Industrie', 'Services', 'Artisanat'],
      indicateurs: ['Production', 'Emploi', 'Investissement', 'Export'],
      echantillon: 15000,
      publications: 3,
      featured: true
    },
    {
      id: 2,
      title: 'EHCVM - Enquête Harmonisée sur les Conditions de Vie des Ménages',
      description: 'Analyse approfondie des conditions de vie et de la pauvreté',
      icon: Home,
      dateRealisation: '2023',
      secteurs: ['Social', 'Pauvreté', 'Consommation'],
      indicateurs: ['Revenus', 'Dépenses', 'Pauvreté', 'Inégalités'],
      echantillon: 18500,
      publications: 5,
      featured: true
    },
    {
      id: 3,
      title: 'ESEF - Enquête sur le Secteur de l\'Économie Familiale',
      description: 'État des lieux du secteur de l\'économie familiale et domestique',
      icon: Users,
      dateRealisation: '2022',
      secteurs: ['Économie familiale', 'Genre', 'Travail domestique'],
      indicateurs: ['Emploi féminin', 'Revenus', 'Formations'],
      echantillon: 8200,
      publications: 2,
      featured: true
    },
    {
      id: 4,
      title: 'Enquête Commerce Informel',
      description: 'Cartographie et analyse du secteur commercial informel',
      icon: Briefcase,
      dateRealisation: '2022',
      secteurs: ['Commerce', 'Informel', 'Microentreprises'],
      indicateurs: ['Chiffre d\'affaires', 'Emploi', 'Fiscalité'],
      echantillon: 12000,
      publications: 4,
      featured: false
    },
    {
      id: 5,
      title: 'Enquête sur la Santé de la Reproduction (ESR)',
      description: 'Évaluation des indicateurs de santé maternelle et infantile',
      icon: Heart,
      dateRealisation: '2021',
      secteurs: ['Santé', 'Maternité', 'Enfance'],
      indicateurs: ['Mortalité infantile', 'Taux de natalité', 'Accès aux soins'],
      echantillon: 10000,
      publications: 2,
      featured: false
    },
    {
      id: 6,
      title: 'Enquête sur l\'Agriculture Durable (EAD)',
      description: 'Analyse des pratiques agricoles durables et leur impact',
      icon: Leaf,
      dateRealisation: '2021',
      secteurs: ['Agriculture', 'Environnement', 'Développement rural'],
      indicateurs: ['Rendements', 'Utilisation de pesticides', 'Irrigation'],
      echantillon: 7500,
      publications: 3,
      featured: false
    }
  ];

  const filteredEnquetes = enquetesDisponibles.filter(enquete =>
    enquete.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    enquete.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    enquete.secteurs.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <Layout>
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection
        title="Études & Enquêtes"
        subtitle="Des données précises pour des décisions éclairées"
        description="L'ANSD mène des études et enquêtes rigoureuses pour fournir une image fidèle de la réalité socio-économique et démographique du Sénégal."
        backgroundImage="https://images.unsplash.com/photo-1549419137-9ae0014028ce?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZW5lZ2FsJTIwcmVzZWFyY2h8ZW58MXx8fHwxNzU0NjUzMjI1fDA&ixlib=rb-4.1.0&q=80&w=1080"
        badge={{ text: 'Recherche Statistique', icon: TrendingUp }}
        stats={heroStats}
        actions={heroActions}
        overlay="green"
      />

      {/* Enquêtes en Cours */}
      <section id="ongoing-studies" className="py-16 bg-gray-50">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-center text-[var(--neutral-dark)] mb-12">
            Enquêtes et Recensements en Cours
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {enquetesEnCours.map((enquete) => (
              <Card key={enquete.id} className="shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="text-[var(--senegal-green)] text-xl mb-2">{enquete.name}</CardTitle>
                  <CardDescription>{enquete.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center text-sm text-gray-600 mb-3">
                    <span className="flex items-center"><Calendar className="h-4 w-4 mr-1" /> {enquete.startDate} - {enquete.endDate}</span>
                    <Badge variant="secondary" className={`text-xs ${enquete.status === 'collecte' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>
                      {enquete.status === 'collecte' ? 'Collecte en cours' : 'Analyse en cours'}
                    </Badge>
                  </div>
                  <div className="mb-4">
                    <div className="flex justify-between text-sm font-medium text-gray-700 mb-1">
                      <span>Progression</span>
                      <span>{enquete.progress}%</span>
                    </div>
                    <Progress value={enquete.progress} className="h-2 bg-gray-200" indicatorClassName="bg-[var(--senegal-gold)]" />
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm text-gray-700">
                    <p className="flex items-center"><MapPin className="h-4 w-4 mr-1 text-[var(--senegal-green)]" /> {enquete.regions} Régions</p>
                    <p className="flex items-center"><Users className="h-4 w-4 mr-1 text-[var(--senegal-green)]" /> {enquete.echantillon.toLocaleString()} Échantillons</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Études disponibles */}
      <section id="studies-available" className="py-16 bg-white">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-center text-[var(--neutral-dark)] mb-12">
            Études et Rapports Disponibles
          </h2>
          <div className="flex justify-center mb-8">
            <div className="relative w-full max-w-lg">
              <Input
                type="text"
                placeholder="Rechercher une étude..."
                className="w-full pl-10 pr-4 py-2 border rounded-full focus:ring-2 focus:ring-[var(--senegal-gold)] focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEnquetes.length > 0 ? (
              filteredEnquetes.map((enquete) => (
                <Card key={enquete.id} className="shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
                  <CardHeader>
                    {enquete.featured && (
                      <Badge className="bg-[var(--senegal-gold)] text-black mb-2 self-start">
                        <CheckCircle className="h-4 w-4 mr-1" /> Mise en avant
                      </Badge>
                    )}
                    <CardTitle className="text-[var(--senegal-green)] text-xl mb-2">{enquete.title}</CardTitle>
                    <CardDescription>{enquete.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <div className="space-y-2 text-sm text-gray-700 mb-4">
                      <p className="flex items-center"><Calendar className="h-4 w-4 mr-1 text-[var(--senegal-gold)]" /> Réalisée en : {enquete.dateRealisation}</p>
                      <p className="flex items-center">
                        <Users className="h-4 w-4 mr-1 text-[var(--senegal-gold)]" /> Échantillon : {enquete.echantillon.toLocaleString()}
                      </p>
                      <p className="flex items-center">
                        <Database className="h-4 w-4 mr-1 text-[var(--senegal-gold)]" /> Secteurs : {enquete.secteurs.join(', ')}
                      </p>
                    </div>
                    <Button variant="outline" className="w-full border-[var(--senegal-green)] text-[var(--senegal-green)] hover:bg-[var(--senegal-green)] hover:text-white">
                      <Download className="h-4 w-4 mr-2" /> Télécharger l'étude
                    </Button>
                  </CardContent>
                </Card>
              ))
            ) : (
              <p className="text-center text-gray-600 col-span-full">Aucune étude ne correspond à votre recherche.</p>
            )}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-[var(--senegal-green)] py-16 text-white text-center">
        <div className="container-custom">
          <h2 className="text-3xl font-bold mb-4">Besoin de données spécifiques ?</h2>
          <p className="text-lg mb-8 max-w-3xl mx-auto">
            Notre équipe d'experts peut réaliser des études personnalisées pour répondre à vos besoins.
          </p>
          <Button
            size="lg"
            variant="secondary"
            className="bg-[var(--senegal-gold)] text-[var(--senegal-green)] hover:bg-[var(--senegal-gold-dark)]"
            onClick={() => { /* Logique pour rediriger vers la page contact ou un formulaire */ }}
          >
            Nous Contacter
          </Button>
        </div>
      </section>
    </div>
    </Layout>
  );
}