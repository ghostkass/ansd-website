// src/components/AdminDashboard.js

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  Users,
  Shield,
  LogOut,
  Crown,
  Settings,
  UserPlus,
  Edit,
  Trash2,
  MoreHorizontal,
  Eye,
  Calendar,
  Activity,
  AlertCircle,
  BarChart3
  ,
  Plus
} from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Alert, AlertDescription, AlertTitle } from './ui/alert'; // Ajout de AlertTitle pour une meilleure erreur
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import { useAuth } from '../context/AuthContext';

// Importations pour la création de publication via un modal
import PublicationForm from './PublicationForm';

export function AdminDashboard() {
  // Déstructurez toutes les fonctions de gestion d'utilisateurs de useAuth
  const { user, logout, createUser, updateUser, deleteUser, getUsers } = useAuth();
  const router = useRouter();

  // État local pour les utilisateurs, initialement vide car nous allons les charger depuis le backend
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true); // État de chargement pour les données initiales
  const [error, setError] = useState(''); // État pour afficher les messages d'erreur

  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [isEditUserOpen, setIsEditUserOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newUserData, setNewUserData] = useState({ username: '', email: '', password: '', role: 'agent' });
  const [editUserData, setEditUserData] = useState({ username: '', email: '', role: '' });
  const [addEditLoading, setAddEditLoading] = useState(false); // Pour les opérations d'ajout/modification

  // État pour contrôler l'ouverture du modal de création de publication
  const [isPublicationDialogOpen, setPublicationDialogOpen] = useState(false);

  // Fonction pour charger les utilisateurs depuis le backend
  const fetchUsers = async () => {
    if (!user || user.role !== 'admin') {
      setLoading(false);
      return;
    }
    setLoading(true);
    setError('');
    try {
      const fetchedUsers = await getUsers();
      // Assurez-vous que les dates lastLogin sont correctement formatées pour l'affichage
      const formattedUsers = fetchedUsers.map(u => ({
        ...u,
        lastLogin: u.lastLogin ? new Date(u.lastLogin).toLocaleDateString() : 'N/A'
      }));
      setUsers(formattedUsers);
    } catch (err) {
      console.error("Erreur lors du chargement des utilisateurs:", err);
      setError(err.message || "Impossible de charger les utilisateurs.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Charge les utilisateurs au montage du composant si l'utilisateur est admin
    fetchUsers();
  }, [user]); // Déclenche le rechargement si l'objet 'user' change (ex: après connexion)

  const handleLogout = async () => {
    await logout();
    router.push('/login');
  };

  const handleNavigateToAgentDashboard = () => {
    router.push('/agent');
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    setError('');
    setAddEditLoading(true);
    try {
      const addedUser = await createUser(newUserData);
      // Formater la date si elle existe pour l'affichage
      const formattedAddedUser = {
        ...addedUser,
        lastLogin: addedUser.lastLogin ? new Date(addedUser.lastLogin).toLocaleDateString() : 'N/A'
      };
      setUsers([...users, formattedAddedUser]);
      setIsAddUserOpen(false);
      setNewUserData({ username: '', email: '', password: '', role: 'agent' });
    } catch (err) {
      console.error("Erreur lors de l'ajout d'utilisateur:", err);
      setError(err.message || "Échec de l'ajout de l'utilisateur.");
    } finally {
      setAddEditLoading(false);
    }
  };

  const handleEditUser = async (e) => {
    e.preventDefault();
    setError('');
    setAddEditLoading(true);
    try {
      const updatedUser = await updateUser(selectedUser.id, editUserData);
      // Formater la date si elle existe pour l'affichage
      const formattedUpdatedUser = {
        ...updatedUser,
        lastLogin: updatedUser.lastLogin ? new Date(updatedUser.lastLogin).toLocaleDateString() : 'N/A'
      };
      setUsers(users.map(u => u.id === formattedUpdatedUser.id ? formattedUpdatedUser : u));
      setIsEditUserOpen(false);
      setSelectedUser(null);
    } catch (err) {
      console.error("Erreur lors de la modification d'utilisateur:", err);
      setError(err.message || "Échec de la modification de l'utilisateur.");
    } finally {
      setAddEditLoading(false);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ? Cette action est irréversible.")) {
      setError('');
      try {
        await deleteUser(userId);
        setUsers(users.filter(u => u.id !== userId));
      } catch (err) {
        console.error("Erreur lors de la suppression de l'utilisateur:", err);
        setError(err.message || "Échec de la suppression de l'utilisateur.");
      }
    }
  };

  const openEditDialog = (userToEdit) => {
    setSelectedUser(userToEdit);
    setEditUserData({ username: userToEdit.username, email: userToEdit.email, role: userToEdit.role });
    setIsEditUserOpen(true);
  };

  // Ce contrôle de rôle est crucial et devrait être géré par un `PrivateRoute` ou `AuthGuard`
  // au niveau de `pages/admin/index.js` pour empêcher l'accès non autorisé au chemin.
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <Alert variant="default">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Chargement des données...</AlertTitle>
          <AlertDescription>Veuillez patienter pendant le chargement du tableau de bord.</AlertDescription>
        </Alert>
      </div>
    );
  }

  if (!user || user.role !== 'admin') {
    // Redirige si l'utilisateur n'est pas authentifié ou n'a pas le rôle admin
    // C'est une sécurité secondaire, la redirection principale doit être dans votre PrivateRoute
    if (!user) {
      router.push('/login');
    } else {
      router.push('/'); // Redirige les non-admins vers la page d'accueil ou leur tableau de bord
    }
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Accès refusé</AlertTitle>
          <AlertDescription>
            Vous n'avez pas les permissions d'administrateur pour accéder à cette page.
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
          <Crown className="h-8 w-8 mr-3" />
          Tableau de Bord Administrateur
        </h1>
        <div className="flex items-center space-x-4">
          <Badge variant="secondary" className="bg-white text-[var(--senegal-green)] px-3 py-1 text-sm">
            Connecté en tant que: {user.username || user.email} (Admin)
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

      <div className="p-6 md:p-8">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-4 bg-gray-200">
            <TabsTrigger value="overview">
              <BarChart3 className="h-4 w-4 mr-2" />
              Vue d'ensemble
            </TabsTrigger>
            <TabsTrigger value="users">
              <Users className="h-4 w-4 mr-2" />
              Gestion des Utilisateurs
            </TabsTrigger>
            <TabsTrigger value="content">
              <Shield className="h-4 w-4 mr-2" />
              Gestion du Contenu
            </TabsTrigger>
            <TabsTrigger value="settings">
              <Settings className="h-4 w-4 mr-2" />
              Paramètres
            </TabsTrigger>
          </TabsList>

          {/* Vue d'ensemble */}
          <TabsContent value="overview" className="space-y-6 mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Utilisateurs inscrits</CardTitle>
                  <Users className="h-4 w-4 text-gray-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{users.length}</div>
                  <p className="text-xs text-gray-500">+20% par rapport au mois dernier</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Activité récente</CardTitle>
                  <Activity className="h-4 w-4 text-gray-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">1,245 vues</div>
                  <p className="text-xs text-gray-500">+15% cette semaine</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Rapports générés</CardTitle>
                  <Calendar className="h-4 w-4 text-gray-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">58</div>
                  <p className="text-xs text-gray-500">2 nouveaux aujourd'hui</p>
                </CardContent>
              </Card>
            </div>
            {/* Vous pouvez ajouter d'autres cartes d'aperçu ici */}
          </TabsContent>

          {/* Gestion des Utilisateurs */}
          <TabsContent value="users" className="space-y-6 mt-6">
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Erreur</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-[var(--senegal-green)]">Liste des Utilisateurs</h2>
              <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-[var(--senegal-green)] text-white hover:bg-[var(--senegal-green-dark)]">
                    <UserPlus className="h-4 w-4 mr-2" />
                    Ajouter un Utilisateur
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px] p-6">
                  <DialogHeader>
                    <DialogTitle>Ajouter un nouvel utilisateur</DialogTitle>
                    <DialogDescription>
                      Remplissez les informations pour créer un nouveau compte.
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleAddUser} className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="new-username" className="text-right">Nom d'utilisateur</Label>
                      <Input id="new-username" value={newUserData.username} onChange={(e) => setNewUserData({ ...newUserData, username: e.target.value })} className="col-span-3" required />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="new-email" className="text-right">Email</Label>
                      <Input id="new-email" type="email" value={newUserData.email} onChange={(e) => setNewUserData({ ...newUserData, email: e.target.value })} className="col-span-3" required />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="new-password" className="text-right">Mot de passe</Label>
                      <Input id="new-password" type="password" value={newUserData.password} onChange={(e) => setNewUserData({ ...newUserData, password: e.target.value })} className="col-span-3" required />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="new-role" className="text-right">Rôle</Label>
                      <Select value={newUserData.role} onValueChange={(value) => setNewUserData({ ...newUserData, role: value })}>
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Sélectionner un rôle" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="admin">Administrateur</SelectItem>
                          <SelectItem value="agent">Agent</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex justify-end gap-2 mt-4">
                      <Button variant="outline" onClick={() => setIsAddUserOpen(false)} disabled={addEditLoading}>Annuler</Button>
                      <Button type="submit" className="bg-[var(--senegal-green)] text-white hover:bg-[var(--senegal-green-dark)]" disabled={addEditLoading}>
                        {addEditLoading ? 'Ajout en cours...' : 'Ajouter'}
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nom d'utilisateur</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Rôle</TableHead>
                  <TableHead>Dernière connexion</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-4 text-gray-500">
                      Aucun utilisateur trouvé.
                    </TableCell>
                  </TableRow>
                ) : (
                  users.map((u) => (
                    <TableRow key={u.id}>
                      <TableCell className="font-medium">{u.username}</TableCell>
                      <TableCell>{u.email}</TableCell>
                      <TableCell>
                        <Badge className={u.role === 'admin' ? 'bg-[var(--senegal-gold)] text-black' : 'bg-[var(--senegal-green)]'}>
                          {u.role}
                        </Badge>
                      </TableCell>
                      <TableCell>{u.lastLogin}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <span className="sr-only">Ouvrir le menu</span>
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => openEditDialog(u)}>
                              <Edit className="h-4 w-4 mr-2" />
                              Modifier
                            </DropdownMenuItem>
                            {/* Empêcher l'administrateur de supprimer son propre compte */}
                            {user.id !== u.id && (
                              <DropdownMenuItem onClick={() => handleDeleteUser(u.id)} className="text-red-600">
                                <Trash2 className="h-4 w-4 mr-2" />
                                Supprimer
                              </DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>

            {/* Edit User Dialog */}
            <Dialog open={isEditUserOpen} onOpenChange={setIsEditUserOpen}>
              <DialogContent className="sm:max-w-[425px] p-6">
                <DialogHeader>
                  <DialogTitle>Modifier l'utilisateur</DialogTitle>
                  <DialogDescription>
                    Mettez à jour les informations de l'utilisateur.
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleEditUser} className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="edit-username" className="text-right">Nom d'utilisateur</Label>
                    <Input id="edit-username" value={editUserData.username} onChange={(e) => setEditUserData({ ...editUserData, username: e.target.value })} className="col-span-3" required />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="edit-email" className="text-right">Email</Label>
                    <Input id="edit-email" type="email" value={editUserData.email} onChange={(e) => setEditUserData({ ...editUserData, email: e.target.value })} className="col-span-3" required />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="edit-role" className="text-right">Rôle</Label>
                    <Select value={editUserData.role} onValueChange={(value) => setEditUserData({ ...editUserData, role: value })}>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Sélectionner un rôle" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin">Administrateur</SelectItem>
                        <SelectItem value="agent">Agent</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex justify-end gap-2 mt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setIsEditUserOpen(false)}
                      disabled={addEditLoading}
                    >
                      Annuler
                    </Button>
                    <Button
                      type="submit"
                      className="bg-[var(--senegal-green)] text-white hover:bg-[var(--senegal-green-dark)]"
                      disabled={addEditLoading}
                    >
                      {addEditLoading ? 'Modification en cours...' : 'Modifier'}
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </TabsContent>

          {/* Gestion du contenu - Réutilise le ContentManager */}
          <TabsContent value="content" className="space-y-6 mt-6">
            <div className="text-center py-8 space-y-4">
              <Settings className="h-16 w-16 mx-auto text-gray-400 mb-4" />
              <h3 className="text-gray-600 mb-2">Gestion du Contenu</h3>
              <p className="text-gray-500 mb-4">
                Depuis cette interface, vous pouvez créer de nouvelles publications ou accéder à l'ensemble des outils de gestion de contenu.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4 mt-4">
                {/* Bouton pour ouvrir le formulaire de création de publication */}
                <Dialog open={isPublicationDialogOpen} onOpenChange={setPublicationDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-[var(--senegal-green)] text-white hover:bg-[var(--senegal-green-dark)]">
                      <Plus className="h-4 w-4 mr-2" />
                      Créer une Publication
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
                {/* Bouton pour accéder à la gestion avancée (agent dashboard) */}
                <Button
                  onClick={handleNavigateToAgentDashboard}
                  variant="outline"
                  className="border-[var(--senegal-green)] text-[var(--senegal-green)] hover:bg-[var(--senegal-green)] hover:text-white"
                >
                  <Shield className="h-4 w-4 mr-2" />
                  Accéder à la Gestion Avancée
                </Button>
              </div>
            </div>
          </TabsContent>

          {/* Paramètres */}
          <TabsContent value="settings" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-[var(--senegal-green)]">Paramètres Généraux</CardTitle>
                <CardDescription>Gérez les paramètres globaux de l'application.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="site-name">Nom du site</Label>
                  <Input id="site-name" defaultValue="ANSD Sénégal" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="admin-email">Email de contact administrateur</Label>
                  <Input id="admin-email" type="email" defaultValue="contact@ansd.sn" className="mt-1" />
                </div>
                <Button className="bg-[var(--senegal-green)] text-white hover:bg-[var(--senegal-green-dark)]">
                  Sauvegarder les Paramètres
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}