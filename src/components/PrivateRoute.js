// src/components/PrivateRoute.js (Updated for Next.js)

import React, { useEffect } from 'react';
import { useRouter } from 'next/router'; // Use Next.js's router
import { useAuth } from '../context/AuthContext'; // Path to your AuthContext
import { Alert, AlertDescription } from './ui/alert';
import { AlertCircle } from 'lucide-react';

export function PrivateRoute({ children, allowedRoles }) { // PrivateRoute takes children as prop
  const { isAuthenticated, user, loading } = useAuth();
  const router = useRouter(); // Initialize Next.js router

  // Use useEffect to handle redirections after render
  useEffect(() => {
    if (loading) {
      // Still loading authentication state, do nothing yet
      return;
    }

    if (!isAuthenticated) {
      // Not authenticated, redirect to login
      router.replace('/login');
    } else if (allowedRoles && user && !allowedRoles.includes(user.role)) {
      // Authenticated but wrong role, redirect to a generic page or show access denied
      router.replace('/'); // Redirect to home or an access denied page
    }
  }, [isAuthenticated, user, loading, router, allowedRoles]); // Depend on relevant state/props

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <Alert variant="info" className="w-auto max-w-sm">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>Chargement de l'authentification...</AlertDescription>
        </Alert>
      </div>
    );
  }

  // If not authenticated, or wrong role, the useEffect will handle redirection,
  // so we render nothing (or a loader) until redirection takes place.
  // We only render children if all checks pass.
  if (!isAuthenticated || (allowedRoles && user && !allowedRoles.includes(user.role))) {
    // Return null or a simple loader while redirection is happening
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <Alert variant="destructive" className="w-auto max-w-sm">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Accès refusé. Redirection en cours...
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  // If authenticated and has the correct role, render the children (the actual page content)
  return <>{children}</>;
}