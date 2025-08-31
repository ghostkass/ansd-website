// src/components/NotificationSubscription.js

import React, { useState } from 'react';
import { Bell, Mail, Check, X, Settings, Loader, Send } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Checkbox } from './ui/checkbox';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
// Badge est importé mais non utilisé directement ici, peut être retiré si pas besoin
// import { Badge } from './ui/badge';
import { Alert, AlertDescription } from './ui/alert';

// --- Mocks temporaires pour NotificationSubscription.js ---
// Ces mocks sont ici car useFormSubmission n'est pas dans le useANSDApi.js fourni.
// Une fois le vrai hook disponible, supprimez ces mocks et décommentez les imports ci-dessous.

// Mock pour validateEmail (si non importé globalement ou pour autonomie du composant)
const mockValidateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
};

// Mock pour useFormSubmission
const mockUseFormSubmission = () => {
  const [mockLoading, setMockLoading] = useState(false);
  const [mockSuccess, setMockSuccess] = useState(false);
  const [mockError, setMockError] = useState(null);

  const mockSubmitContact = async (formData) => {
    setMockLoading(true);
    setMockSuccess(false);
    setMockError(null);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      if (formData.email.includes('error')) {
        throw new Error("Échec de l'envoi simulé du NofiticationSubscription.");
      }
      setMockSuccess(true);
      return true;
    } catch (err) {
      setMockError(err.message || "Une erreur est survenue lors de l'abonnement.");
      return false;
    } finally {
      setMockLoading(false);
    }
  };

  const mockReset = () => {
    setMockSuccess(false);
    setMockError(null);
    setMockLoading(false);
  };

  return { loading: mockLoading, success: mockSuccess, error: mockError, submitContact: mockSubmitContact, reset: mockReset };
};
// --- Fin des mocks temporaires ---

// Remplacez les lignes ci-dessus par les vrais imports si vos hooks sont disponibles:
// import { useFormSubmission } from '../hooks/useANSDApi'; // Si useFormSubmission est ajouté à useANSDApi.js
// import { validateEmail } from '../utils/client'; // Si validateEmail est dans src/utils/client.js

export function NotificationSubscription({ variant = 'compact', className = '' }) {
  const [email, setEmail] = useState('');
  const [preferences, setPreferences] = useState({
    publications: true,
    actualites: true,
    enquetes: true,
    indicateurs: true,
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [emailError, setEmailError] = useState('');

  // Utilisation des mocks pour le moment
  const { loading, success, error, submitContact, reset } = mockUseFormSubmission();
  const validateEmailFn = mockValidateEmail; // Renommé pour éviter un conflit si validateEmail est un autre import

  const handleSubscribe = async () => {
    setEmailError('');
    if (!email.trim()) {
      setEmailError('L\'adresse email est requise.');
      return;
    }
    if (!validateEmailFn(email)) { // Utilisation de validateEmailFn
      setEmailError('Veuillez entrer une adresse email valide.');
      return;
    }

    const submissionData = { email, preferences };
    const successResult = await submitContact(submissionData);
    if (successResult) {
      setEmail('');
      setPreferences({
        publications: true,
        actualites: true,
        enquetes: true,
        indicateurs: true,
      });
      // Garder la boîte de dialogue ouverte ou la fermer selon le cas
    }
  };

  const handlePreferenceChange = (key, checked) => {
    setPreferences(prev => ({ ...prev, [key]: checked }));
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    reset(); // Réinitialiser l'état de soumission du formulaire lorsque la boîte de dialogue se ferme
    setEmailError('');
  };

  const notificationOptions = [
    { key: 'publications', label: 'Nouvelles Publications & Rapports' },
    { key: 'actualites', label: 'Dernières Actualités & Annonces' },
    { key: 'enquetes', label: 'Résultats d\'Enquêtes & Études' },
    { key: 'indicateurs', label: 'Mises à Jour d\'Indicateurs Clés' },
  ];

  if (variant === 'compact') {
    return (
      <Card className={`bg-white rounded-lg p-6 shadow-md text-center ${className}`}>
        <Bell className="h-10 w-10 text-[var(--senegal-green)] mx-auto mb-4" />
        <CardTitle className="text-[var(--senegal-green)] text-2xl font-bold mb-2">Restez Informé !</CardTitle>
        <CardDescription className="mb-4 text-base">
          Abonnez-vous à nos notifications pour ne rien manquer de nos actualités et publications.
        </CardDescription>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[var(--senegal-green)] text-white hover:bg-[var(--senegal-green-dark)] rounded-md">
              <Mail className="h-4 w-4 mr-2" /> S'abonner aux notifications
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]" onEscapeKeyDown={handleDialogClose} onPointerDownOutside={handleDialogClose}>
            <DialogHeader>
              <DialogTitle className="text-[var(--senegal-green)] flex items-center">
                <Mail className="h-5 w-5 mr-2" /> Abonnement aux notifications
              </DialogTitle>
              <DialogDescription>
                Entrez votre email et choisissez les types de notifications que vous souhaitez recevoir.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              {success ? (
                <Alert className="border-green-200 bg-green-50 text-base">
                  <Check className="h-4 w-4 text-green-600" />
                  <AlertDescription className="text-green-800">
                    <strong>Abonnement réussi !</strong><br />
                    Vous êtes maintenant abonné à nos notifications.
                  </AlertDescription>
                </Alert>
              ) : error ? (
                <Alert className="border-red-200 bg-red-50 text-base">
                  <X className="h-4 w-4 text-red-600" />
                  <AlertDescription className="text-red-800">
                    <strong>Erreur d'abonnement :</strong><br />
                    {error}
                  </AlertDescription>
                </Alert>
              ) : (
                <>
                  <div className="flex flex-col space-y-2">
                    <label htmlFor="email" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Email
                    </label>
                    <Input
                      id="email"
                      placeholder="votre.email@exemple.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={emailError ? 'border-red-500' : ''}
                      disabled={loading}
                    />
                    {emailError && <p className="text-red-500 text-xs mt-1">{emailError}</p>}
                  </div>
                  <div className="space-y-3">
                    <p className="text-sm font-medium leading-none">Types de notifications :</p>
                    {notificationOptions.map((option) => (
                      <div key={option.key} className="flex items-center space-x-2">
                        <Checkbox
                          id={option.key}
                          checked={preferences[option.key]}
                          onCheckedChange={(checked) => handlePreferenceChange(option.key, checked)}
                          disabled={loading}
                        />
                        <label
                          htmlFor={option.key}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {option.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
            <div className="flex justify-end gap-2 pt-4">
              {success || error ? (
                <Button onClick={handleDialogClose} className="bg-gray-300 text-gray-800 hover:bg-gray-400 rounded-md">
                  Fermer
                </Button>
              ) : (
                <Button onClick={handleSubscribe} disabled={loading} className="bg-[var(--senegal-green)] text-white hover:bg-[var(--senegal-green-dark)] rounded-md">
                  {loading ? (
                    <>
                      <Loader className="h-4 w-4 mr-2 animate-spin" /> Envoi...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" /> S'abonner
                    </>
                  )}
                </Button>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </Card>
    );
  }

  // Variante 'full' si vous décidez de l'utiliser ailleurs
  return (
    <Card className={`shadow-md ${className}`}>
      <CardHeader>
        <div className="flex items-center space-x-3 mb-2">
          <Bell className="h-6 w-6 text-[var(--senegal-green)]" />
          <CardTitle className="text-[var(--senegal-green)] text-xl font-semibold">Abonnez-vous à nos notifications</CardTitle>
        </div>
        <CardDescription className="text-base">
          Recevez les dernières mises à jour directement dans votre boîte de réception.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {success ? (
          <Alert className="border-green-200 bg-green-50 text-base">
            <Check className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">
              <strong>Abonnement réussi !</strong><br />
              Vous êtes maintenant abonné à nos notifications.
            </AlertDescription>
          </Alert>
        ) : error ? (
          <Alert className="border-red-200 bg-red-50 text-base">
            <X className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800">
              <strong>Erreur d'abonnement :</strong><br />
              {error}
            </AlertDescription>
          </Alert>
        ) : (
          <>
            <div className="space-y-2">
              <label htmlFor="email-full" className="text-sm font-medium leading-none">Email</label>
              <Input
                id="email-full"
                placeholder="votre.email@exemple.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={emailError ? 'border-red-500' : ''}
                disabled={loading}
              />
              {emailError && <p className="text-red-500 text-xs mt-1">{emailError}</p>}
            </div>
            <div className="space-y-3">
              <p className="text-sm font-medium leading-none">Types de notifications :</p>
              {notificationOptions.map((option) => (
                <div key={option.key} className="flex items-center space-x-2">
                  <Checkbox
                    id={`${option.key}-full`}
                    checked={preferences[option.key]}
                    onCheckedChange={(checked) => handlePreferenceChange(option.key, checked)}
                    disabled={loading}
                  />
                  <label
                    htmlFor={`${option.key}-full`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {option.label}
                  </label>
                </div>
              ))}
            </div>
          </>
        )}
        <div className="flex justify-end gap-2 pt-2">
          {success || error ? (
            <Button onClick={reset} variant="outline" className="rounded-md">
              Nouvel abonnement
            </Button>
          ) : (
            <Button onClick={handleSubscribe} disabled={loading} className="bg-[var(--senegal-green)] text-white hover:bg-[var(--senegal-green-dark)] rounded-md">
              {loading ? (
                <>
                  <Loader className="h-4 w-4 mr-2 animate-spin" /> Envoi...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" /> S'abonner
                </>
              )}
            </Button>
          )}
        </div>
        <div className="flex justify-end mt-4">
          <Button variant="ghost" className="text-gray-600 hover:text-gray-800 rounded-md">
            <Settings className="h-4 w-4 mr-2" /> Gérer mes préférences
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}