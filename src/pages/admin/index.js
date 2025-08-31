// src/pages/admin/index.js

import React from 'react';
import { AdminDashboard } from '../../components/AdminDashboard'; // Assurez-vous que le chemin est correct
import { PrivateRoute } from '../../components/PrivateRoute'; // Assurez-vous que le chemin est correct

// Ceci est la page pour la route /admin
export default function AdminPage() {
  return (
    <PrivateRoute allowedRoles={['admin']}>
      {/* Le composant AdminDashboard sera rendu si l'utilisateur est admin */}
      <AdminDashboard />
    </PrivateRoute>
  );
}