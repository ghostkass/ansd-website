// src/pages/agent/index.js

import React from 'react';
import { AgentDashboard } from '../../components/AgentDashboard'; // Assurez-vous que le chemin est correct
import { PrivateRoute } from '../../components/PrivateRoute'; // Assurez-vous que le chemin est correct

// Ceci est la page pour la route /agent
export default function AgentPage() {
  return (
    <PrivateRoute allowedRoles={['agent', 'admin']}>
      {/* Le composant AgentDashboard sera rendu si l'utilisateur est agent ou admin */}
      <AgentDashboard />
    </PrivateRoute>
  );
}