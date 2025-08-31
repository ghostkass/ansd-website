// src/pages/login.js

import React from 'react';
import { LoginForm } from '../components/LoginForm'; // Assurez-vous que le chemin est correct

// Chaque fichier dans le dossier 'pages' doit exporter un composant React par défaut
export default function LoginPage() {
  return (
    // Vous pouvez ajouter un conteneur si nécessaire, mais le LoginForm est déjà stylisé pour être centré
    <div className="flex items-center justify-center min-h-screen">
      <LoginForm />
    </div>
  );
}