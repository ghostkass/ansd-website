// src/components/LoginForm.js

import React, { useState } from 'react';
import { Eye, EyeOff, Lock, Mail, Shield, User, AlertCircle, RefreshCw, Crown } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Alert, AlertDescription } from './ui/alert';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/router';

export function LoginForm() {
  // L'utilisateur peut saisir soit un email, soit un nom d'utilisateur.
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // ajouté
  const auth = useAuth();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Envoie l'identifiant générique (email ou username) au contexte d'authentification
      await auth.login(identifier, password);
      // Redirection gérée par AuthContext
    } catch (err) {
      setError(err.message || 'Erreur de connexion.');
    } finally {
      setLoading(false);
    }
  };

  // Fonctions de test remplies pour éviter les erreurs
  const handleFillAgent = () => {
    setIdentifier('agent@ansd.sn');
    setPassword('agentpassword');
  };

  const handleFillAdmin = () => {
    setIdentifier('admin@ansd.sn');
    setPassword('adminpassword');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <Lock className="mx-auto h-12 w-12 text-[var(--senegal-green)] mb-4" />
          <CardTitle className="text-2xl font-bold text-[var(--senegal-green)]">Connexion Espace Privé</CardTitle>
          <CardDescription className="text-gray-600">
            Connectez-vous pour accéder à votre tableau de bord.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <Alert variant="destructive" className="bg-red-50 border-red-200 text-red-700">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div>
              <Label htmlFor="identifier">Email / Nom d'utilisateur</Label>
              <Input
                id="identifier"
                type="text"
                placeholder="Entrez votre identifiant"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                required
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="password">Mot de passe</Label>
              <div className="relative mt-1">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Entrez votre mot de passe"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 text-gray-400 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-[var(--senegal-green)] text-white hover:bg-[var(--senegal-green-dark)]"
              disabled={loading}
            >
              {loading ? <RefreshCw className="h-4 w-4 mr-2 animate-spin" /> : 'Se connecter'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600" style={{ fontSize: '0.875rem' }}>
              Accès réservé aux agents et administrateurs ANSD
            </p>
            <div className="flex flex-col sm:flex-row gap-2 items-center justify-center mt-4">
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="w-full sm:w-auto border-[var(--senegal-green)] text-[var(--senegal-green)] hover:bg-[var(--senegal-green)] hover:text-white"
                onClick={handleFillAgent}
              >
                <User className="h-4 w-4 mr-2" />
                Tester en tant qu'Agent
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="w-full sm:w-auto border-[var(--senegal-gold)] text-[var(--senegal-gold)] hover:bg-[var(--senegal-gold)] hover:text-black"
                onClick={handleFillAdmin}
              >
                <Crown className="h-4 w-4 mr-2" />
                Tester en tant qu'Admin
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
