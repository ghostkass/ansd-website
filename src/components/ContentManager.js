// src/components/ContentManager.js

import React, { useState, useEffect } from 'react';
import {
  FileText,
  Newspaper,
  BarChart3,
  Database,
  Plus,
  Edit,
  Trash2,
  Eye,
  Calendar,
  Tag,
  Download,
  Users
} from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Switch } from './ui/switch';

export function ContentManager({ searchTerm }) {
  const [activeTab, setActiveTab] = useState('publications');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  // Mock data - In real app, this would come from API and be managed by state/hooks
  const initialPublications = [
    { id: 'pub1', title: 'Rapport Annuel 2023', description: 'Vue d\'ensemble de l\'économie sénégalaise en 2023.', category: 'Économie', date: '2024-01-15', downloads: 1200, featured: true },
    { id: 'pub2', title: 'Statistiques Démographiques', description: 'Analyse de la population et des mouvements migratoires.', category: 'Démographie', date: '2023-11-20', downloads: 850, featured: false },
    { id: 'pub3', title: 'Indicateurs Sociaux', description: 'Données sur l\'éducation, la santé et le bien-être.', category: 'Social', date: '2024-03-01', downloads: 600, featured: true },
  ];

  const initialActualites = [
    { id: 'act1', title: 'Lancement du portail Open Data', description: 'Le nouveau portail est en ligne !', date: '2024-07-25', featured: true },
    { id: 'act2', title: 'Conférence sur le PIB', description: 'Résultats préliminaires du PIB 2024.', date: '2024-07-18', featured: false },
  ];

  const initialEtudes = [
    { id: 'etd1', title: 'Enquête Ménages 2022', description: 'Résultats détaillés sur les conditions de vie.', date: '2023-09-01', status: 'terminée' },
    { id: 'etd2', title: 'Projet Recensement Général', description: 'Préparation du prochain recensement national.', date: '2024-06-10', status: 'en cours' },
  ];

  const initialDatasets = [
    { id: 'data1', name: 'Population par Région', value: '17M', category: 'Démographie', region: 'Nationale', date: '2023-12-31' },
    { id: 'data2', name: 'PIB par Secteur', value: 'XOF', category: 'Économie', region: 'Nationale', date: '2023-06-30' },
  ];

  const [publications, setPublications] = useState(initialPublications);
  const [actualites, setActualites] = useState(initialActualites);
  const [etudes, setEtudes] = useState(initialEtudes);
  const [datasets, setDatasets] = useState(initialDatasets);


  const filteredPublications = publications.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const filteredActualites = actualites.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const filteredEtudes = etudes.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const filteredDatasets = datasets.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );


  const handleAddItem = (e) => {
    e.preventDefault();
    // Logic to add item based on activeTab
    console.log(`Ajout d'un nouvel élément dans l'onglet ${activeTab}`);
    // Ici, vous devrez implémenter la logique d'ajout réelle pour chaque type de contenu
    setIsCreateDialogOpen(false);
  };

  const handleEditItem = (e) => {
    e.preventDefault();
    // Logic to edit item based on activeTab
    console.log(`Modification de l'élément dans l'onglet ${activeTab}:`, selectedItem);
    // Ici, vous devrez implémenter la logique de modification réelle
    setIsEditDialogOpen(false);
    setSelectedItem(null);
  };

  const handleDeleteItem = (id) => {
    console.log(`Suppression de l'élément ${id} dans l'onglet ${activeTab}`);
    if (activeTab === 'publications') setPublications(publications.filter(p => p.id !== id));
    else if (activeTab === 'actualites') setActualites(actualites.filter(a => a.id !== id));
    else if (activeTab === 'etudes') setEtudes(etudes.filter(e => e.id !== id));
    else if (activeTab === 'datasets') setDatasets(datasets.filter(d => d.id !== id));
  };

  const openEditDialog = (item) => {
    setSelectedItem(item);
    setIsEditDialogOpen(true);
  };

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 bg-gray-200">
        <TabsTrigger value="publications">
          <FileText className="h-4 w-4 mr-2" />
          Publications
        </TabsTrigger>
        <TabsTrigger value="actualites">
          <Newspaper className="h-4 w-4 mr-2" />
          Actualités
        </TabsTrigger>
        <TabsTrigger value="etudes">
          <BarChart3 className="h-4 w-4 mr-2" />
          Études
        </TabsTrigger>
        <TabsTrigger value="datasets">
          <Database className="h-4 w-4 mr-2" />
          Données
        </TabsTrigger>
      </TabsList>

      {/* Bouton Ajouter Contenu (à rendre dynamique selon l'onglet actif) */}
      <div className="flex justify-end mt-4">
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[var(--senegal-gold)] text-black hover:bg-[var(--senegal-gold-dark)]">
              <Plus className="h-4 w-4 mr-2" />
              Ajouter Contenu
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px] p-6">
            <DialogHeader>
              <DialogTitle>Ajouter une nouvelle {activeTab.slice(0, -1)}</DialogTitle>
              <DialogDescription>
                Remplissez les informations pour ajouter un nouvel élément.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleAddItem} className="grid gap-4 py-4">
              {/* Formulaire dynamique selon activeTab */}
              {activeTab === 'publications' && (
                <>
                  <Label htmlFor="title">Titre</Label>
                  <Input id="title" placeholder="Titre de la publication" required />
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" placeholder="Courte description" />
                  <Label htmlFor="category">Catégorie</Label>
                  <Input id="category" placeholder="Catégorie (ex: Économie)" />
                  <Label htmlFor="date">Date de publication</Label>
                  <Input id="date" type="date" required />
                  <div className="flex items-center space-x-2">
                    <Switch id="featured" />
                    <Label htmlFor="featured">Mis en avant</Label>
                  </div>
                </>
              )}
              {activeTab === 'actualites' && (
                <>
                  <Label htmlFor="title">Titre de l'actualité</Label>
                  <Input id="title" placeholder="Titre de l'actualité" required />
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" placeholder="Contenu de l'actualité" />
                  <Label htmlFor="date">Date de publication</Label>
                  <Input id="date" type="date" required />
                  <div className="flex items-center space-x-2">
                    <Switch id="featured" />
                    <Label htmlFor="featured">Mis en avant</Label>
                  </div>
                </>
              )}
              {activeTab === 'etudes' && (
                <>
                  <Label htmlFor="title">Titre de l'étude</Label>
                  <Input id="title" placeholder="Titre de l'étude" required />
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" placeholder="Description de l'étude" />
                  <Label htmlFor="date">Date de début</Label>
                  <Input id="date" type="date" required />
                  <Label htmlFor="status">Statut</Label>
                  <Select>
                    <SelectTrigger><SelectValue placeholder="Sélectionner un statut" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en cours">En cours</SelectItem>
                      <SelectItem value="terminée">Terminée</SelectItem>
                      <SelectItem value="planifiée">Planifiée</SelectItem>
                    </SelectContent>
                  </Select>
                </>
              )}
              {activeTab === 'datasets' && (
                <>
                  <Label htmlFor="name">Nom du jeu de données</Label>
                  <Input id="name" placeholder="Nom du jeu de données" required />
                  <Label htmlFor="value">Valeur principale</Label>
                  <Input id="value" placeholder="Ex: 17M, 3.5%" />
                  <Label htmlFor="category">Catégorie</Label>
                  <Input id="category" placeholder="Catégorie (ex: Santé, Agriculture)" />
                  <Label htmlFor="region">Région</Label>
                  <Input id="region" placeholder="Région (ex: Dakar, Nationale)" />
                  <Label htmlFor="date">Date des données</Label>
                  <Input id="date" type="date" />
                </>
              )}
              <div className="flex justify-end gap-2 mt-4">
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>Annuler</Button>
                <Button type="submit" className="bg-[var(--senegal-gold)] text-black hover:bg-[var(--senegal-gold-dark)]">Ajouter</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Publications */}
      <TabsContent value="publications" className="space-y-6 mt-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Titre</TableHead>
              <TableHead>Catégorie</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Téléchargements</TableHead>
              <TableHead>Mis en avant</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPublications.map((pub) => (
              <TableRow key={pub.id}>
                <TableCell className="font-medium">{pub.title}</TableCell>
                <TableCell>{pub.category}</TableCell>
                <TableCell>{new Date(pub.date).toLocaleDateString('fr-FR')}</TableCell>
                <TableCell>{pub.downloads.toLocaleString()}</TableCell>
                <TableCell>
                  <Badge variant={pub.featured ? 'default' : 'secondary'} className={pub.featured ? 'bg-[var(--senegal-gold)] text-black' : 'bg-gray-200 text-gray-700'}>
                    {pub.featured ? 'Oui' : 'Non'}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm" onClick={() => openEditDialog(pub)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700" onClick={() => handleDeleteItem(pub.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TabsContent>

      {/* Actualités */}
      <TabsContent value="actualites" className="space-y-6 mt-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Titre</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Mis en avant</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredActualites.map((act) => (
              <TableRow key={act.id}>
                <TableCell className="font-medium">{act.title}</TableCell>
                <TableCell>{act.description.substring(0, 50)}...</TableCell>
                <TableCell>{new Date(act.date).toLocaleDateString('fr-FR')}</TableCell>
                <TableCell>
                  <Badge variant={act.featured ? 'default' : 'secondary'} className={act.featured ? 'bg-[var(--senegal-gold)] text-black' : 'bg-gray-200 text-gray-700'}>
                    {act.featured ? 'Oui' : 'Non'}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm" onClick={() => openEditDialog(act)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700" onClick={() => handleDeleteItem(act.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TabsContent>

      {/* Études */}
      <TabsContent value="etudes" className="space-y-6 mt-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Titre</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredEtudes.map((etude) => (
              <TableRow key={etude.id}>
                <TableCell className="font-medium">{etude.title}</TableCell>
                <TableCell>{etude.description.substring(0, 50)}...</TableCell>
                <TableCell>{new Date(etude.date).toLocaleDateString('fr-FR')}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={etude.status === 'en cours' ? 'border-blue-500 text-blue-700' : 'border-green-500 text-green-700'}>
                    {etude.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm" onClick={() => openEditDialog(etude)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700" onClick={() => handleDeleteItem(etude.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TabsContent>

      {/* Données (Datasets) */}
      <TabsContent value="datasets" className="space-y-6 mt-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nom</TableHead>
              <TableHead>Valeur</TableHead>
              <TableHead>Catégorie</TableHead>
              <TableHead>Région</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredDatasets.map((data) => (
              <TableRow key={data.id}>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <Database className="h-4 w-4 text-[var(--senegal-green)]" />
                    <span className="font-medium">{data.name}</span>
                  </div>
                </TableCell>
                <TableCell className="font-semibold text-[var(--senegal-green)]">
                  {data.value}
                </TableCell>
                <TableCell>{data.category}</TableCell>
                <TableCell>{data.region}</TableCell>
                <TableCell>{new Date(data.date).toLocaleDateString('fr-FR')}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm" onClick={() => openEditDialog(data)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700" onClick={() => handleDeleteItem(data.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TabsContent>

      {/* Dialog d'édition (peut être rendu dynamique ou dupliqué pour chaque type) */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px] p-6">
          <DialogHeader>
            <DialogTitle>Modifier l'élément</DialogTitle>
            <DialogDescription>
              Mettez à jour les informations de l'élément sélectionné.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleEditItem} className="grid gap-4 py-4">
            {/* Contenu du formulaire d'édition basé sur selectedItem */}
            {selectedItem && (
              <>
                <Label htmlFor="edit-title">Titre</Label>
                <Input
                  id="edit-title"
                  defaultValue={selectedItem.title || selectedItem.name}
                  onChange={(e) => setSelectedItem({ ...selectedItem, title: e.target.value, name: e.target.value })}
                  required
                />
                {/* Ajoutez d'autres champs de modification ici selon le type de selectedItem */}
                {/* Exemple pour les publications/actualités */}
                {(activeTab === 'publications' || activeTab === 'actualites') && (
                  <>
                    <Label htmlFor="edit-description">Description</Label>
                    <Textarea
                      id="edit-description"
                      defaultValue={selectedItem.description}
                      onChange={(e) => setSelectedItem({ ...selectedItem, description: e.target.value })}
                    />
                    <Label htmlFor="edit-date">Date</Label>
                    <Input
                      id="edit-date"
                      type="date"
                      defaultValue={selectedItem.date}
                      onChange={(e) => setSelectedItem({ ...selectedItem, date: e.target.value })}
                      required
                    />
                     <div className="flex items-center space-x-2">
                      <Switch
                        id="edit-featured"
                        checked={selectedItem.featured}
                        onCheckedChange={(checked) => setSelectedItem({ ...selectedItem, featured: checked })}
                      />
                      <Label htmlFor="edit-featured">Mis en avant</Label>
                    </div>
                  </>
                )}
                {/* Exemple pour les études */}
                {activeTab === 'etudes' && (
                  <>
                     <Label htmlFor="edit-description">Description</Label>
                    <Textarea
                      id="edit-description"
                      defaultValue={selectedItem.description}
                      onChange={(e) => setSelectedItem({ ...selectedItem, description: e.target.value })}
                    />
                    <Label htmlFor="edit-date">Date de début</Label>
                    <Input id="edit-date" type="date" defaultValue={selectedItem.date} onChange={(e) => setSelectedItem({ ...selectedItem, date: e.target.value })} required />
                    <Label htmlFor="edit-status">Statut</Label>
                    <Select value={selectedItem.status} onValueChange={(value) => setSelectedItem({ ...selectedItem, status: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner un statut" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en cours">En cours</SelectItem>
                        <SelectItem value="terminée">Terminée</SelectItem>
                        <SelectItem value="planifiée">Planifiée</SelectItem>
                      </SelectContent>
                    </Select>
                  </>
                )}
                 {/* Exemple pour les datasets */}
                {activeTab === 'datasets' && (
                  <>
                    <Label htmlFor="edit-value">Valeur principale</Label>
                    <Input
                      id="edit-value"
                      defaultValue={selectedItem.value}
                      onChange={(e) => setSelectedItem({ ...selectedItem, value: e.target.value })}
                    />
                    <Label htmlFor="edit-category">Catégorie</Label>
                    <Input
                      id="edit-category"
                      defaultValue={selectedItem.category}
                      onChange={(e) => setSelectedItem({ ...selectedItem, category: e.target.value })}
                    />
                    <Label htmlFor="edit-region">Région</Label>
                    <Input
                      id="edit-region"
                      defaultValue={selectedItem.region}
                      onChange={(e) => setSelectedItem({ ...selectedItem, region: e.target.value })}
                    />
                    <Label htmlFor="edit-data-date">Date des données</Label>
                    <Input
                      id="edit-data-date"
                      type="date"
                      defaultValue={selectedItem.date}
                      onChange={(e) => setSelectedItem({ ...selectedItem, date: e.target.value })}
                    />
                  </>
                )}
              </>
            )}
            <div className="flex justify-end gap-2 mt-4">
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Annuler</Button>
              <Button type="submit" className="bg-[var(--senegal-gold)] text-black hover:bg-[var(--senegal-gold-dark)]">Modifier</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </Tabs>
  );
}