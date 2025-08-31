// src/hooks/useANSDApi.js

import { useState, useEffect } from 'react';
import { ansdApi } from '../utils/client'; // Import the configured axios instance

// Generic API state structure
/**
 * @typedef {object} ApiDataState
 * @property {any | null} data
 * @property {boolean} loading
 * @property {string | null} error
 */

// Hook pour les publications
export function usePublications(params = {}) {
  const [state, setState] = useState({
    data: null,
    loading: true,
    error: null
  });

  useEffect(() => {
    const fetchPublications = async () => {
      setState(prev => ({ ...prev, loading: true, error: null }));
      try {
        const response = await ansdApi.get('/publications', { params });
        setState({ data: response.data, loading: false, error: null });
      } catch (err) {
        setState({ data: null, loading: false, error: err.message || 'Erreur de chargement des publications' });
      }
    };

    fetchPublications();
  }, [params.page, params.limit, params.category, params.search]); // Dépendances pour re-fetch

  return state;
}

// Hook pour une publication spécifique
export function useOnePublication(id) {
  const [state, setState] = useState({
    data: null,
    loading: true,
    error: null
  });

  useEffect(() => {
    if (!id) {
      setState({ data: null, loading: false, error: 'ID de publication manquant' });
      return;
    }

    const fetchOnePublication = async () => {
      setState(prev => ({ ...prev, loading: true, error: null }));
      try {
        const response = await ansdApi.get(`/publications/${id}`);
        setState({ data: response.data, loading: false, error: null });
      } catch (err) {
        setState({ data: null, loading: false, error: err.message || `Erreur de chargement de la publication ${id}` });
      }
    };

    fetchOnePublication();
  }, [id]);

  return state;
}
