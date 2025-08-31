// src/components/PublicationForm.js

import React, { useState } from 'react';
import axios from 'axios';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { useAuth } from '../context/AuthContext';

export default function PublicationForm({ onSuccess, onCancel }) {
  const { user } = useAuth();
  // Champs du formulaire
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [type, setType] = useState('publication');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Gestion de l'envoi du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      // Préparation du FormData pour inclure un fichier
      const formData = new FormData();
      formData.append('title', title);
      formData.append('content', content);
      formData.append('type', type);
      if (file) {
        formData.append('file', file);
      }

      // Récupérer le token JWT stocké dans localStorage par le contexte d'authentification
      const token = localStorage.getItem('token');

      await axios.post('http://localhost:5000/api/publications', formData, {
        headers: {
          Authorization: token ? `Bearer ${token}` : undefined,
          'Content-Type': 'multipart/form-data',
        },
      });

      // Nettoyer les champs après succès
      setTitle('');
      setContent('');
      setType('publication');
      setFile(null);

      // Notifier le parent
      if (onSuccess) onSuccess();
    } catch (err) {
      // Extraire le message d'erreur retourné par le backend si disponible
      const message =
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.message ||
        "Une erreur est survenue lors de la création de la publication.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  // Si l'utilisateur n'est pas connecté, ne pas afficher le formulaire
  if (!user) {
    return null;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="text-red-600 text-sm">{error}</div>
      )}
      <div>
        <Input
          type="text"
          placeholder="Titre de la publication"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <Textarea
          placeholder="Contenu de la publication"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={6}
          required
        />
      </div>
      <div>
        {/* Sélection du type de publication */}
        <Select value={type} onValueChange={setType}>
          <SelectTrigger>
            <SelectValue placeholder="Type de publication" />
          </SelectTrigger>
          <SelectContent className='bg-white'>
            <SelectItem value="publication">Publication</SelectItem>
            <SelectItem value="etude">Étude & Enquête</SelectItem>
            <SelectItem value="sesn">SESN</SelectItem>
            <SelectItem value="openData">Open Data</SelectItem>
            <SelectItem value="actualite">Actualité</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        {/* Champ de fichier optionnel */}
        <Input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
        />
      </div>
      <div className="flex justify-end space-x-2">
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel} disabled={loading}>
            Annuler
          </Button>
        )}
        <Button type="submit" disabled={loading} className="bg-[var(--senegal-green)] text-white hover:bg-[var(--senegal-green-dark)]">
          {loading ? 'Envoi en cours...' : 'Créer la publication'}
        </Button>
      </div>
    </form>
  );
}