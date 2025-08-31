// src/context/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router'; // Pour les redirections si pas déjà fait

const AuthContext = createContext();

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000/api';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Au chargement de l'application, essayez de récupérer l'utilisateur via le token
  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          // Vérifier le token avec le backend
          const res = await axios.get(`${API_BASE_URL}/auth/me`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          setUser(res.data.user);
        } catch (error) {
          console.error('Erreur de validation du token:', error);
          localStorage.removeItem('token'); // Token invalide ou expiré
          setUser(null);
        }
      }
      setLoading(false);
    };
    loadUser();
  }, []);

  /**
   * Tente de connecter un utilisateur en utilisant un identifiant (email ou username) et un mot de passe.
   * L'argument `identifier` correspond à la valeur saisie par l'utilisateur.
   */
  const login = async (identifier, password) => {
    try {
      // Envoie l'identifiant générique au backend. Le backend se charge
      // d'interpréter s'il s'agit d'un email ou d'un nom d'utilisateur.
      const res = await axios.post(`${API_BASE_URL}/auth/login`, { identifier, password });
      localStorage.setItem('token', res.data.token);
      setUser(res.data.user);
      // Rediriger en fonction du rôle
      if (res.data.user.role === 'admin') {
        router.push('/admin');
      } else if (res.data.user.role === 'agent') {
        router.push('/agent');
      } else {
        // Gérer d'autres rôles ou une page par défaut
        router.push('/');
      }
      return res.data.user;
    } catch (error) {
      console.error("Erreur de connexion:", error.response?.data?.message || error.message);
      throw new Error(error.response?.data?.message || 'Échec de la connexion');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    router.push('/login');
  };

  // Fonctions pour la gestion des utilisateurs (Admin)
  const getUsers = async () => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error("Aucun token d'authentification.");
    try {
      const res = await axios.get(`${API_BASE_URL}/users`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return res.data;
    } catch (error) {
      console.error("Erreur de récupération des utilisateurs:", error.response?.data?.message || error.message);
      throw new Error(error.response?.data?.message || 'Échec de la récupération des utilisateurs');
    }
  };

  const createUser = async (userData) => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error("Aucun token d'authentification.");
    try {
      const res = await axios.post(`${API_BASE_URL}/users`, userData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return res.data;
    } catch (error) {
      console.error("Erreur de création d'utilisateur:", error.response?.data?.message || error.message);
      throw new Error(error.response?.data?.message || 'Échec de la création d\'utilisateur');
    }
  };

  const updateUser = async (userId, userData) => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error("Aucun token d'authentification.");
    try {
      const res = await axios.put(`${API_BASE_URL}/users/${userId}`, userData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return res.data;
    } catch (error) {
      console.error("Erreur de mise à jour d'utilisateur:", error.response?.data?.message || error.message);
      throw new Error(error.response?.data?.message || 'Échec de la mise à jour de l\'utilisateur');
    }
  };

  const deleteUser = async (userId) => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error("Aucun token d'authentification.");
    try {
      await axios.delete(`${API_BASE_URL}/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return true;
    } catch (error) {
      console.error("Erreur de suppression d'utilisateur:", error.response?.data?.message || error.message);
      throw new Error(error.response?.data?.message || 'Échec de la suppression de l\'utilisateur');
    }
  };


  // Ajoutez ici des fonctions pour la gestion du contenu (getContents, createContent, etc.)

  if (loading) {
    return <div>Chargement...</div>; // Ou un spinner de chargement
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, getUsers, createUser, updateUser, deleteUser, isAuthenticated: !!user, loading  }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}