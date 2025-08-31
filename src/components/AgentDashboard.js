// src/components/AgentDashboard.js

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  BarChart3,
  FileText,
  Database,
  Newspaper,
  TrendingUp,
  Users,
  Calendar,
  Plus,
  Settings,
  LogOut,
  Bell,
  Search,
  Filter,
  User,
  Shield,
  AlertCircle // <-- MODIFICATION : Ajout de l'import pour AlertCircle
} from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Input } from './ui/input';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { useAuth } from '../context/AuthContext';
// import { useNavigate } from 'react-router-dom'; // <-- SUPPRIMÉ : Inutile avec Next.js Router
// Import d'un gestionnaire de contenu. Si ce fichier n'existe pas encore, un composant minimal sera créé dans ContentManager.js
import { ContentManager } from './ContentManager';
import { usePublications } from '../hooks/useANSDApi'; // Import du hook usePublications

// Importations pour la création de publication via un modal
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import PublicationForm from './PublicationForm';

export function AgentDashboard() {
  const { user, logout, getUsers } = useAuth(); // Ajout de getUsers
  const router = useRouter(); // <-- MODIFICATION : Initialise le hook useRouter
  const [searchTerm, setSearchTerm] = useState('');

  const { data: fetchedPublications, loading: publicationsLoading, error: publicationsError } = usePublications();
  const [users, setUsers] = useState([]);
  const [usersLoading, setUsersLoading] = useState(true);
  const [usersError, setUsersError] = useState(null);

  useEffect(() => {
    const fetchUsersData = async () => {
      try {
        const fetchedUsers = await getUsers();
        setUsers(fetchedUsers);
      } catch (err) {
        setUsersError(err.message);
      } finally {
        setUsersLoading(false);
      }
    };
    fetchUsersData();
  }, []);

  // État pour l'ouverture du modal de création de publication
  const [isPublicationDialogOpen, setPublicationDialogOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    router.push('/login'); // <-- MODIFICATION : Utilise router.push
  };

  const totalPublications = fetchedPublications ? fetchedPublications.length : 0;
  const totalActualites = fetchedPublications ? fetchedPublications.filter(pub => pub.type === 'actualite').length : 0; // Assuming 'actualite' type
  const totalEtudes = fetchedPublications ? fetchedPublications.filter(pub => pub.type === 'etude').length : 0; // Assuming 'etude' type
  const totalUsers = users.length;

  const stats = [
    {
      title: 'Publications',
      value: totalPublications.toString(),
      change: '+3 ce mois', // Static for now
      trend: 'up',
      icon: FileText,
      color: 'bg-blue-500'
    },
    {
      title: 'Actualités',
      value: totalActualites.toString(),
      change: '+2 cette semaine', // Static for now
      trend: 'up',
      icon: Newspaper,
      color: 'bg-green-500'
    },
    {
      title: 'Études',
      value: totalEtudes.toString(),
      change: '+1 ce trimestre', // Static for now
      trend: 'up',
      icon: Database,
      color: 'bg-purple-500'
    },
    {
      title: 'Utilisateurs Actifs',
      value: totalUsers.toString(),
      change: '+10% aujourd\'hui', // Static for now
      trend: 'up',
      icon: Users,
      color: 'bg-orange-500'
    }
  ];

  // Ce contrôle de rôle devrait normalement être géré par PrivateRoute dans pages/agent/index.js
  // Mais c'est une bonne sécurité additionnelle.
  if (!user || (user.role !== 'agent' && user.role !== 'admin')) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Accès refusé. Vous n'avez pas les permissions d'agent ou d'administrateur.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  if (publicationsLoading || usersLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <Alert variant="default">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Chargement des données du tableau de bord...</AlertTitle>
          <AlertDescription>Veuillez patienter.</AlertDescription>
        </Alert>
      </div>
    );
  }

  if (publicationsError || usersError) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Erreur de chargement</AlertTitle>
          <AlertDescription>
            Erreur lors du chargement des données: {publicationsError || usersError}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* En-tête du tableau de bord */}
      <div className="bg-[var(--senegal-green)] text-white p-6 md:p-8 flex justify-between items-center">
        <h1 className="text-3xl font-bold flex items-center">
          <FileText className="h-8 w-8 mr-3" />
          Tableau de Bord Agent
        </h1>
        <div className="flex items-center space-x-4">
          <Badge variant="secondary" className="bg-white text-[var(--senegal-green)] px-3 py-1 text-sm">
            Connecté en tant que: {user.username || user.id} ({user.role})
          </Badge>
          <Button
            onClick={handleLogout}
            variant="ghost"
            className="text-white hover:bg-white/20"
          >
            <LogOut className="h-5 w-5 mr-2" />
            Déconnexion
          </Button>
        </div>
      </div>

      <div className="p-6 md:p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Colonne principale (Contenu et Statistiques) */}
        <div className="lg:col-span-2 space-y-8">
          {/* Statistiques générales */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {stats.map((stat, index) => (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                  <stat.icon className={`h-4 w-4 ${stat.color.replace('bg-', 'text-')}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-gray-500">{stat.change}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Gestion du contenu */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-[var(--senegal-green)]">Gestion des Publications & Données</CardTitle>
              <div className="flex items-center space-x-2">
                <Input
                  placeholder="Rechercher..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="max-w-xs"
                  // prefix={<Search className="h-4 w-4 text-gray-400" />} // Ce 'prefix' n'est pas une prop standard pour Input, gérer avec un wrapper div si besoin.
                />
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {/* Le ContentManager est intégré ici */}
              <ContentManager searchTerm={searchTerm} publications={fetchedPublications || []} />
            </CardContent>
          </Card>
        </div>

        {/* Colonne latérale (Actions rapides, Notifications, Profil) */}
        <div className="lg:col-span-1 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-[var(--senegal-green)]">Mon Profil</CardTitle>
              <CardDescription>Informations de votre compte.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center space-x-2">
                <User className="h-4 w-4 text-[var(--senegal-green)]" />
                <span className="font-medium">{user.username || user.id}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="h-4 w-4 text-[var(--senegal-green)]" />
                <Badge className={user.role === 'admin' ? 'bg-[var(--senegal-gold)] text-black' : 'bg-[var(--senegal-green)]'}>
                  {user.role}
                </Badge>
              </div>
              <Button variant="outline" className="w-full">
                <Settings className="h-4 w-4 mr-2" />
                Gérer le profil
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-[var(--senegal-green)]">Notifications Récentes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-sm text-gray-700">
                <div className="flex items-start">
                  <Bell className="h-4 w-4 mr-2 mt-1 text-blue-500" />
                  <div>
                    <p className="font-medium">Nouvelle publication : Rapport Économique 2023</p>
                    <p className="text-xs text-gray-500">Il y a 2 heures</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Bell className="h-4 w-4 mr-2 mt-1 text-green-500" />
                  <div>
                    <p className="font-medium">Mise à jour : Statistiques du marché du travail</p>
                    <p className="text-xs text-gray-500">Hier</p>
                  </div>
                </div>
                <Button variant="link" className="p-0 h-auto text-[var(--senegal-green)]">
                  Voir toutes les notifications
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-[var(--senegal-green)]">Actions Rapides</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {/* Bouton pour ouvrir le formulaire de création de publication */}
                <Dialog open={isPublicationDialogOpen} onOpenChange={setPublicationDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="w-full bg-[var(--senegal-green)] text-white hover:bg-[var(--senegal-green-dark)]">
                      <Plus className="h-4 w-4 mr-2" />
                      Nouvelle Publication
                    </Button>
                  </DialogTrigger>
                  {/* Ajout de la classe glassmorphism pour appliquer l'effet de flou et d'opacité */}
                  <DialogContent className="sm:max-w-[600px] p-6 bg-white">
                    <DialogHeader>
                      <DialogTitle>Créer une publication</DialogTitle>
                      <DialogDescription>
                        Remplissez les informations pour publier un nouveau contenu.
                      </DialogDescription>
                    </DialogHeader>
                    <PublicationForm onSuccess={() => setPublicationDialogOpen(false)} />
                  </DialogContent>
                </Dialog>

                {/* Autres actions rapides */}
                <Button variant="outline" className="w-full border-[var(--senegal-green)] text-[var(--senegal-green)] hover:bg-[var(--senegal-green)] hover:text-white">
                  <Plus className="h-4 w-4 mr-2" />
                  Nouvelle Actualité
                </Button>
                <Button variant="outline" className="w-full border-[var(--senegal-green)] text-[var(--senegal-green)] hover:bg-[var(--senegal-green)] hover:text-white">
                  <Plus className="h-4 w-4 mr-2" />
                  Nouvelle Étude
                </Button>
                <Button variant="outline" className="w-full border-[var(--senegal-green)] text-[var(--senegal-green)] hover:bg-[var(--senegal-green)] hover:text-white">
                  <Plus className="h-4 w-4 mr-2" />
                  Importer Données
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}