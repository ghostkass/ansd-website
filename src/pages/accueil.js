// src/pages/index.js
import React from "react";
import { useRouter } from 'next/router'; // Importation du router de Next.js

import {
  ArrowRight,
  BarChart3,
  Download,
  Database,
  TrendingUp,
  Users,
  Globe,
  FileText,
  Play, // Play n'est pas utilisé dans le code fourni, peut être supprimé
  Award,
  Target,
  Zap,
  Shield,
  Clock, // Clock n'est pas utilisé
  Calendar,
  PieChart,
  Activity,
  Building,
  BookOpen, // BookOpen n'est pas utilisé
  MapPin,
  CheckCircle,
} from "lucide-react";

// Assure-toi que ces chemins sont corrects si tu n'as pas Shadcn/ui
// Si tu utilises Shadcn/ui, ces imports sont corrects si tu as généré les composants.
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { ImageWithFallback } from "../components/figma/ImageWithFallback"; // Assure-toi de l'emplacement

import Layout from '../components/Layout'; // Notre composant Layout

export default function AccueilPage() {
  const router = useRouter(); // Initialisation du router Next.js

  // Fonction pour changer de page via le router
  const onPageChange = (pagePath) => {
    router.push(`/${pagePath}`);
  };

  const statsData = [
    {
      label: "Publications",
      value: "250+",
      icon: FileText,
      color: "text-blue-400",
    },
    {
      label: "Enquêtes",
      value: "45",
      icon: Database,
      color: "text-green-400",
    },
    {
      label: "Utilisateurs",
      value: "15K+",
      icon: Users,
      color: "text-purple-400",
    },
    {
      label: "Données ouvertes",
      value: "180",
      icon: Globe,
      color: "text-orange-400",
    },
  ];

  const featuredPublications = [
    {
      title: "Situation Économique et Sociale 2023",
      description:
        "Rapport complet sur l'état socio-économique du Sénégal avec analyses sectorielles détaillées",
      date: "15 Mars 2024",
      category: "SESN",
      downloadCount: "2.5K",
      featured: true,
    },
    {
      title: "Bilan Exportations/Importations - Juin 2024",
      description:
        "Analyse détaillée des flux commerciaux du Sénégal au premier semestre 2024",
      date: "8 Août 2024",
      category: "Commerce",
      downloadCount: "1.8K",
      featured: true,
    },
    {
      title: "Recensement Général 5ème RGPH",
      description:
        "Résultats préliminaires du recensement de la population et de l'habitat",
      date: "22 Février 2024",
      category: "Démographie",
      downloadCount: "5.2K",
      featured: true,
    },
  ];

  const keyIndicators = [
    {
      label: "PIB 2023",
      value: "+5.8%",
      trend: "up",
      description: "Croissance annuelle",
      previousValue: "+5.0%",
      change: "+0.8 pt",
    },
    {
      label: "Population",
      value: "18.2M",
      trend: "up",
      description: "Habitants (2024)",
      previousValue: "17.7M",
      change: "+2.8%",
    },
    {
      label: "Inflation",
      value: "3.4%",
      trend: "up",
      description: "Taux annuel",
      previousValue: "2.5%",
      change: "+0.9 pt",
    },
    {
      label: "Exportations",
      value: "+12.5%",
      trend: "up",
      description: "Évolution T2 2024",
      previousValue: "+9.7%",
      change: "+2.8 pt",
    },
  ];

  const services = [
    {
      title: "Open Data",
      description:
        "Plus de 180 jeux de données ouverts et accessibles librement",
      icon: Globe,
      color: "bg-blue-500",
      page: "catalogue-donnees", // Modifié pour correspondre à la route Next.js
    },
    {
      title: "Publications",
      description:
        "Rapports officiels, bulletins mensuels et études sectorielles",
      icon: FileText,
      color: "bg-green-500",
      page: "publications",
    },
    {
      title: "Études & Enquêtes",
      description:
        "Enquêtes thématiques et travaux de recherche approfondis",
      icon: BarChart3,
      color: "bg-purple-500",
      page: "etudes-enquetes", // Modifié
    },
    {
      title: "SESN",
      description:
        "Situation Économique et Sociale du Sénégal - Publication phare",
      icon: Award,
      color: "bg-orange-500",
      page: "sesn",
    },
  ];

  const regions = [
    { name: "Dakar", value: "4.2M", growth: "+3.2%" },
    { name: "Thiès", value: "2.1M", growth: "+2.8%" },
    { name: "Kaolack", value: "1.8M", growth: "+2.1%" },
    { name: "Saint-Louis", value: "1.4M", growth: "+1.9%" },
  ];

  const recentActivities = [
    {
      title: "Publication du Bulletin Mensuel Août 2024",
      date: "15 Août 2024",
      type: "Bulletin",
      icon: Calendar,
    },
    {
      title: "Lancement de l'enquête sur l'emploi des jeunes",
      date: "10 Août 2024",
      type: "Enquête",
      icon: Activity,
    },
    {
      title: "Mise à jour des données sur les prix",
      date: "5 Août 2024",
      type: "Données",
      icon: TrendingUp,
    },
    {
      title: "Nouveau jeu de données : Infrastructure de santé",
      date: "1 Août 2024",
      type: "Open Data",
      icon: Database,
    },
  ];

  return (
    <Layout title="Accueil - ANSD Sénégal : Données fiables pour un Sénégal éclairé">
      <div className="min-h-screen">
        {/* Hero Section avec background image */}
        <section
          className="relative min-h-screen flex items-center bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 133, 61, 0.85), rgba(0, 107, 49, 0.85)), url('https://images.unsplash.com/photo-1646428792927-ec1ddd480cd4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZW5lZ2FsJTIwZGFrYXIlMjBza3lsaW5lJTIwbW9kZXJufGVufDF8fHx8MTc1NDY1MzQ4NXww&ixlib=rb-4.1.0&q=80&w=1080')`,
          }}
        >
          <div className="absolute inset-0 bg-dots-pattern opacity-20"></div>

          <div className="relative container-custom w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8 animate-fade-in-up">
                <div className="space-y-6">
                  <Badge
                    variant="secondary"
                    className="bg-[var(--senegal-gold)] text-black px-4 py-2"
                  >
                    <Shield className="h-4 w-4 mr-2" />
                    Données Officielles du Sénégal
                  </Badge>
                  <h1
                    className="leading-tight text-white"
                    style={{ fontSize: "3.5rem" }}
                  >
                    Des données fiables pour un
                    <span className="text-[var(--senegal-gold)] block mt-2">
                      Sénégal éclairé
                    </span>
                  </h1>
                  <p
                    className="text-white/90 leading-relaxed max-w-2xl"
                    style={{ fontSize: "1.375rem" }}
                  >
                    L'Agence Nationale de la Statistique et de la
                    Démographie vous donne accès aux données
                    officielles pour éclairer vos décisions et
                    comprendre l'évolution socio-économique du
                    Sénégal.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    size="lg"
                    className="bg-[var(--senegal-gold)] text-black hover:bg-[var(--senegal-gold-dark)] group px-8 py-4"
                    onClick={() => onPageChange("catalogue-donnees")} // Modifié
                  >
                    <Globe className="mr-3 h-5 w-5" />
                    Explorer les Données
                    <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white text-white hover:bg-white hover:text-[var(--senegal-green)] px-8 py-4"
                    onClick={() => onPageChange("publications")}
                  >
                    <Download className="mr-3 h-5 w-5" />
                    Publications Récentes
                  </Button>
                </div>

                {/* Statistiques rapides dans le hero */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-8">
                  {statsData.map((stat, index) => (
                    <div
                      key={index}
                      className="glassmorphism rounded-xl p-6 text-center backdrop-blur-md"
                    >
                      <stat.icon
                        className={`h-8 w-8 mx-auto mb-3 ${stat.color}`}
                      />
                      <div
                        className="text-white mb-1"
                        style={{ fontSize: "1.75rem" }}
                      >
                        {stat.value}
                      </div>
                      <div
                        className="text-white/80"
                        style={{ fontSize: "0.875rem" }}
                      >
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative animate-slide-in-right">
                <div className="glassmorphism rounded-3xl p-8 backdrop-blur-md">
                  <div className="relative">
                    <ImageWithFallback
                      src="/api/placeholder/600/400"
                      alt="Tableau de bord statistiques Sénégal"
                      className="w-full h-80 object-cover rounded-xl"
                    />
                    <div className="absolute -bottom-6 -right-6 bg-[var(--senegal-gold)] text-black p-6 rounded-xl shadow-2xl">
                      <PieChart className="h-10 w-10" />
                    </div>
                    <div className="absolute -top-4 -left-4 bg-[var(--senegal-red)] text-white p-4 rounded-lg shadow-xl">
                      <TrendingUp className="h-6 w-6" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
              <div className="w-6 h-10 border-2 border-white/50 rounded-full p-1">
                <div className="w-1 h-3 bg-white/70 rounded-full mx-auto animate-pulse"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Services principaux */}
        <section className="py-20 bg-gray-50">
          <div className="container-custom">
            <div className="text-center mb-16">
              <h2 className="mb-6">Nos Services Statistiques</h2>
              <p
                className="text-gray-600 max-w-3xl mx-auto"
                style={{ fontSize: "1.125rem" }}
              >
                Découvrez l'écosystème complet des données
                statistiques du Sénégal à travers nos différents
                services spécialisés et plateformes dédiées.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {services.map((service, index) => (
                <Card
                  key={index}
                  className="hover-lift cursor-pointer group border-0 shadow-lg hover:shadow-xl transition-all duration-300"
                  onClick={() => onPageChange(service.page)}
                >
                  <CardContent className="p-8 text-center">
                    <div
                      className={`w-16 h-16 ${service.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform`}
                    >
                      <service.icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="mb-3 group-hover:text-[var(--senegal-green)] transition-colors">
                      {service.title}
                    </h3>
                    <p
                      className="text-gray-600 mb-4"
                      style={{ fontSize: "0.875rem" }}
                    >
                      {service.description}
                    </p>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="group-hover:bg-[var(--senegal-green)] group-hover:text-white transition-all"
                    >
                      En savoir plus
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Indicateurs Clés avec plus de détails */}
        <section className="py-20">
          <div className="container-custom">
            <div className="text-center mb-16">
              <h2 className="mb-6">
                Indicateurs Économiques en Temps Réel
              </h2>
              <p
                className="text-gray-600 max-w-2xl mx-auto"
                style={{ fontSize: "1.125rem" }}
              >
                Suivez l'évolution des principaux indicateurs
                économiques et sociaux du Sénégal
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {keyIndicators.map((indicator, index) => (
                <Card
                  key={index}
                  className="hover-lift cursor-pointer border-l-4 border-l-[var(--senegal-green)] shadow-lg"
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div
                        className={`p-3 rounded-full ${
                          indicator.trend === "up"
                            ? "bg-green-100 text-green-600"
                            : "bg-red-100 text-red-600"
                        }`}
                      >
                        <TrendingUp
                          className={`h-6 w-6 ${indicator.trend === "down" ? "rotate-180" : ""}`}
                        />
                      </div>
                      <Badge
                        variant="secondary"
                        className="text-xs"
                      >
                        {indicator.change}
                      </Badge>
                    </div>

                    <div className="space-y-2">
                      <div
                        className="text-[var(--senegal-green)]"
                        style={{ fontSize: "2rem" }}
                      >
                        {indicator.value}
                      </div>
                      <div className="font-medium">
                        {indicator.label}
                      </div>
                      <div
                        className="text-gray-500"
                        style={{ fontSize: "0.875rem" }}
                      >
                        {indicator.description}
                      </div>
                      <div
                        className="text-gray-400"
                        style={{ fontSize: "0.75rem" }}
                      >
                        Précédent: {indicator.previousValue}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Répartition régionale */}
        <section className="py-20 bg-gradient-to-br from-[var(--senegal-green-light)] to-[var(--senegal-green)] text-white">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="mb-6">
                  Répartition Démographique Régionale
                </h2>
                <p
                  className="text-white/90 mb-8"
                  style={{ fontSize: "1.125rem" }}
                >
                  Découvrez la distribution de la population
                  sénégalaise par région avec les dernières
                  données du Recensement Général de la Population
                  et de l'Habitat.
                </p>
                <Button
                  size="lg"
                  className="bg-[var(--senegal-gold)] text-black hover:bg-[var(--senegal-gold-dark)]"
                  onClick={() => onPageChange("etudes-enquetes")} // Modifié
                >
                  <MapPin className="mr-2 h-5 w-5" />
                  Explorer par Région
                </Button>
              </div>

              <div className="space-y-4">
                {regions.map((region, index) => (
                  <div
                    key={index}
                    className="glassmorphism rounded-xl p-6 backdrop-blur-md"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-white mb-1">
                          {region.name}
                        </h4>
                        <div
                          className="text-white/80"
                          style={{ fontSize: "0.875rem" }}
                        >
                          {region.value} habitants
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge className="bg-green-500/20 text-green-200 border-green-300">
                          {region.growth}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Publications Featured avec plus de détails */}
        <section className="py-20">
          <div className="container-custom">
            <div className="flex items-center justify-between mb-16">
              <div>
                <h2 className="mb-4">Publications Phares</h2>
                <p
                  className="text-gray-600"
                  style={{ fontSize: "1.125rem" }}
                >
                  Découvrez nos dernières études et rapports
                  statistiques les plus consultés
                </p>
              </div>
              <Button
                variant="outline"
                onClick={() => onPageChange("publications")}
                className="border-[var(--senegal-green)] text-[var(--senegal-green)] hover:bg-[var(--senegal-green)] hover:text-white"
              >
                Toutes les Publications
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredPublications.map((pub, index) => (
                <Card
                  key={index}
                  className="hover-lift cursor-pointer group shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between mb-3">
                      <Badge className="bg-[var(--senegal-gold-light)] text-[var(--senegal-green)] border-[var(--senegal-gold)]">
                        {pub.category}
                      </Badge>
                      {pub.featured && (
                        <Badge className="bg-[var(--senegal-red)] text-white">
                          <Award className="h-3 w-3 mr-1" />
                          Phare
                        </Badge>
                      )}
                    </div>
                    <CardTitle className="group-hover:text-[var(--senegal-green)] transition-colors line-clamp-2">
                      {pub.title}
                    </CardTitle>
                    <CardDescription className="line-clamp-3">
                      {pub.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between mb-4">
                      <div
                        className="flex items-center space-x-2 text-gray-500"
                        style={{ fontSize: "0.875rem" }}
                      >
                        <Calendar className="h-4 w-4" />
                        <span>{pub.date}</span>
                      </div>
                      <div
                        className="flex items-center space-x-2 text-gray-500"
                        style={{ fontSize: "0.875rem" }}
                      >
                        <Download className="h-4 w-4" />
                        <span>{pub.downloadCount}</span>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      className="w-full bg-[var(--senegal-green)] text-white hover:bg-[var(--senegal-green-dark)] group-hover:scale-105 transition-all"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Télécharger
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Activités récentes */}
        <section className="py-20 bg-gray-50">
          <div className="container-custom">
            <div className="text-center mb-16">
              <h2 className="mb-6">
                Actualités & Activités Récentes
              </h2>
              <p
                className="text-gray-600 max-w-2xl mx-auto"
                style={{ fontSize: "1.125rem" }}
              >
                Restez informé de nos dernières publications,
                enquêtes et mises à jour de données
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {recentActivities.map((activity, index) => (
                <Card
                  key={index}
                  className="hover-lift cursor-pointer group"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="bg-[var(--senegal-green)] text-white p-3 rounded-full flex-shrink-0 group-hover:scale-110 transition-transform">
                        <activity.icon className="h-6 w-6" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <Badge
                            variant="secondary"
                            className="text-xs"
                          >
                            {activity.type}
                          </Badge>
                          <span
                            className="text-gray-500"
                            style={{ fontSize: "0.75rem" }}
                          >
                            {activity.date}
                          </span>
                        </div>
                        <h4 className="group-hover:text-[var(--senegal-green)] transition-colors mb-2">
                          {activity.title}
                        </h4>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="p-0 h-auto"
                        >
                          En savoir plus
                          <ArrowRight className="ml-1 h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center mt-12">
              <Button
                variant="outline"
                onClick={() => onPageChange("actualites")}
                className="border-[var(--senegal-green)] text-[var(--senegal-green)] hover:bg-[var(--senegal-green)] hover:text-white"
              >
                Voir Toutes les Actualités
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>

        {/* Call to Action amélioré */}
        <section className="py-20 bg-gradient-to-r from-[var(--senegal-green)] via-[var(--senegal-green-light)] to-[var(--senegal-green-dark)] text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-dots-pattern opacity-20"></div>
          <div className="container-custom relative">
            <div className="text-center max-w-4xl mx-auto space-y-8">
              <h2 style={{ fontSize: "2.5rem" }}>
                Explorez l'Écosystème Complet des Données du
                Sénégal
              </h2>
              <p
                className="text-white/90"
                style={{ fontSize: "1.375rem" }}
              >
                Accédez à plus de 180 jeux de données ouverts,
                consultez nos études approfondies, suivez nos
                indicateurs en temps réel et découvrez les
                plateformes dédiées aux statistiques sénégalaises.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                <div className="glassmorphism rounded-xl p-6 text-center backdrop-blur-md">
                  <CheckCircle className="h-12 w-12 mx-auto mb-4 text-[var(--senegal-gold)]" />
                  <h4 className="mb-2">Données Fiables</h4>
                  <p
                    className="text-white/80"
                    style={{ fontSize: "0.875rem" }}
                  >
                    Sources officielles certifiées
                  </p>
                </div>
                <div className="glassmorphism rounded-xl p-6 text-center backdrop-blur-md">
                  <Zap className="h-12 w-12 mx-auto mb-4 text-[var(--senegal-gold)]" />
                  <h4 className="mb-2">Mise à Jour Continue</h4>
                  <p
                    className="text-white/80"
                    style={{ fontSize: "0.875rem" }}
                  >
                    Données actualisées régulièrement
                  </p>
                </div>
                <div className="glassmorphism rounded-xl p-6 text-center backdrop-blur-md">
                  <Target className="h-12 w-12 mx-auto mb-4 text-[var(--senegal-gold)]" />
                  <h4 className="mb-2">Accès Libre</h4>
                  <p
                    className="text-white/80"
                    style={{ fontSize: "0.875rem" }}
                  >
                    Consultation et téléchargement gratuits
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8">
                <Button
                  size="lg"
                  className="bg-[var(--senegal-gold)] text-black hover:bg-[var(--senegal-gold-dark)] px-8 py-4"
                  onClick={() => onPageChange("catalogue-donnees")} // Modifié
                >
                  <Database className="mr-3 h-5 w-5" />
                  Catalogue Open Data
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-[var(--senegal-green)] px-8 py-4"
                  onClick={() => onPageChange("acces-bases-donnees")} // Modifié
                >
                  <Building className="mr-3 h-5 w-5" />
                  Bases de Données
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-[var(--senegal-green)] px-8 py-4"
                  onClick={() => onPageChange("contact")}
                >
                  <Users className="mr-3 h-5 w-5" />
                  Nous Contacter
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}