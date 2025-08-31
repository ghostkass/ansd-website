// src/pages/contact.js

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, User, MessageSquare, Building, CheckCircle, AlertCircle, Loader, Facebook, Twitter, Linkedin, Youtube } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Alert, AlertDescription } from '../components/ui/alert';
import Layout from '../components/Layout';
import { contactsData, horairesData, socialLinks } from '../data/contact-data';

// Import the real validateEmail from src/utils/client.js
import { validateEmail } from '../utils/client';

// Mock for useFormSubmission (since the provided useANSDApi.ts does NOT contain it)
// Gardez ce mock tant que useFormSubmission n'est pas implémenté dans src/hooks/useANSDApi.js
const useFormSubmission = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const submitContact = async (formData) => {
    setLoading(true);
    setSuccess(false);
    setError(null);
    try {
      // Simuler un appel API
      await new Promise(resolve => setTimeout(resolve, 1500)); // Délai de 1.5s
      
      // Simuler une condition de succès/échec
      if (formData.email.includes('error')) { // Pour tester l'erreur
        throw new Error("Échec de l'envoi simulé.");
      }

      setSuccess(true);
      return true;
    } catch (err) {
      setError(err.message || "Une erreur est survenue lors de l'envoi.");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setSuccess(false);
    setError(null);
    setLoading(false);
  };

  return { loading, success, error, submitContact, reset };
};

// Import the NotificationSubscription component
import { NotificationSubscription } from '../components/NotificationSubscription';


export default function ContactPage() {
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    organisation: '',
    sujet: '',
    message: '',
    type: ''
  });

  const [validationErrors, setValidationErrors] = useState({});
  const { loading, success, error, submitContact, reset } = useFormSubmission();

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (validationErrors[field]) {
      setValidationErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.prenom.trim()) {
      errors.prenom = 'Le prénom est requis';
    }

    if (!formData.nom.trim()) {
      errors.nom = 'Le nom est requis';
    }

    if (!formData.email.trim()) {
      errors.email = 'L\'email est requis';
    } else if (!validateEmail(formData.email)) {
      errors.email = 'Format email invalide';
    }

    if (!formData.sujet.trim()) {
      errors.sujet = 'Le sujet est requis';
    }

    if (!formData.message.trim()) {
      errors.message = 'Le message est requis';
    } else if (formData.message.trim().length < 10) {
      errors.message = 'Le message doit contenir au moins 10 caractères';
    }

    if (!formData.type) {
      errors.type = 'Veuillez sélectionner le type de demande';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const submissionSuccess = await submitContact(formData);
    
    if (submissionSuccess) {
      setFormData({
        nom: '',
        prenom: '',
        email: '',
        organisation: '',
        sujet: '',
        message: '',
        type: ''
      });
      setValidationErrors({});
      
      setTimeout(() => {
        const successElement = document.getElementById('contact-success');
        if (successElement) {
          successElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 100);
    }
  };

  const handleReset = () => {
    reset();
    setValidationErrors({});
    setFormData({ nom: '', prenom: '', email: '', organisation: '', sujet: '', message: '', type: '' });
  };

  const getSocialIcon = (iconName) => {
    const icons = { Facebook, Twitter, Linkedin, Youtube };
    const Icon = icons[iconName];
    return Icon ? <Icon className="h-5 w-5" /> : null;
  };

  return (
    <Layout>
      <div className="min-h-screen py-8">
        <div className="container-custom">
          {/* En-tête */}
          <div className="text-center mb-12">
            <h1 className="text-[var(--senegal-green)] text-4xl font-bold mb-4">Contactez-nous</h1>
            <p className="text-gray-600 max-w-3xl mx-auto text-lg">
              L'ANSD est à votre écoute. Contactez-nous pour toute question, demande de données 
              ou assistance technique concernant nos services statistiques.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Formulaire de contact amélioré */}
            <Card className="hover-lift shadow-md">
              <CardHeader>
                <CardTitle className="text-[var(--senegal-green)] flex items-center text-2xl font-semibold">
                  <MessageSquare className="h-6 w-6 mr-3" />
                  Envoyez-nous un message
                </CardTitle>
                <CardDescription className="text-base">
                  Remplissez ce formulaire et nous vous répondrons dans les plus brefs délais
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* Messages de feedback */}
                {success && (
                  <Alert id="contact-success" className="border-green-200 bg-green-50 mb-6 text-base">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <AlertDescription className="text-green-800">
                      <strong>Message envoyé avec succès !</strong><br />
                      Nous avons bien reçu votre demande et vous répondrons dans les plus brefs délais.
                    </AlertDescription>
                  </Alert>
                )}
                
                {error && (
                  <Alert className="border-red-200 bg-red-50 mb-6 text-base">
                    <AlertCircle className="h-4 w-4 text-red-600" />
                    <AlertDescription className="text-red-800">
                      <strong>Erreur lors de l'envoi :</strong><br />
                      {error}
                    </AlertDescription>
                  </Alert>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 text-sm font-medium mb-1">
                        Prénom <span className="text-red-500">*</span>
                      </label>
                      <Input
                        value={formData.prenom}
                        onChange={(e) => handleInputChange('prenom', e.target.value)}
                        placeholder="Votre prénom"
                        className={`rounded-md ${validationErrors.prenom ? 'border-red-500' : ''}`}
                      />
                      {validationErrors.prenom && (
                        <p className="text-red-500 text-xs mt-1">
                          {validationErrors.prenom}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-gray-700 text-sm font-medium mb-1">
                        Nom <span className="text-red-500">*</span>
                      </label>
                      <Input
                        value={formData.nom}
                        onChange={(e) => handleInputChange('nom', e.target.value)}
                        placeholder="Votre nom"
                        className={`rounded-md ${validationErrors.nom ? 'border-red-500' : ''}`}
                      />
                      {validationErrors.nom && (
                        <p className="text-red-500 text-xs mt-1">
                          {validationErrors.nom}
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-1">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="votre.email@exemple.com"
                      className={`rounded-md ${validationErrors.email ? 'border-red-500' : ''}`}
                    />
                      {validationErrors.email && (
                      <p className="text-red-500 text-xs mt-1">
                        {validationErrors.email}
                      </p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-1">Organisation</label>
                    <Input
                      value={formData.organisation}
                      onChange={(e) => handleInputChange('organisation', e.target.value)}
                      placeholder="Nom de votre organisation (optionnel)"
                      className="rounded-md"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-1">
                      Type de demande <span className="text-red-500">*</span>
                    </label>
                    <Select value={formData.type} onValueChange={(value) => handleInputChange('type', value)}>
                      <SelectTrigger className={`rounded-md ${validationErrors.type ? 'border-red-500' : ''}`}>
                        <SelectValue placeholder="Sélectionnez le type de demande" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="donnees">Demande de données</SelectItem>
                        <SelectItem value="technique">Support technique</SelectItem>
                        <SelectItem value="partenariat">Partenariat</SelectItem>
                        <SelectItem value="formation">Formation</SelectItem>
                        <SelectItem value="media">Demande média</SelectItem>
                        <SelectItem value="autre">Autre</SelectItem>
                      </SelectContent>
                    </Select>
                    {validationErrors.type && (
                      <p className="text-red-500 text-xs mt-1">
                        {validationErrors.type}
                      </p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-1">
                      Sujet <span className="text-red-500">*</span>
                    </label>
                    <Input
                      value={formData.sujet}
                      onChange={(e) => handleInputChange('sujet', e.target.value)}
                      placeholder="Objet de votre message"
                      className={`rounded-md ${validationErrors.sujet ? 'border-red-500' : ''}`}
                    />
                    {validationErrors.sujet && (
                      <p className="text-red-500 text-xs mt-1">
                        {validationErrors.sujet}
                      </p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-1">
                      Message <span className="text-red-500">*</span>
                    </label>
                    <Textarea
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      placeholder="Décrivez votre demande en détail... (minimum 10 caractères)"
                      rows={5}
                      className={`rounded-md ${validationErrors.message ? 'border-red-500' : ''}`}
                    />
                    {validationErrors.message && (
                      <p className="text-red-500 text-xs mt-1">
                        {validationErrors.message}
                      </p>
                    )}
                    <p className="text-gray-500 text-xs mt-1">
                      {formData.message.length} caractères
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 pt-2">
                    <Button 
                      type="submit" 
                      disabled={loading}
                      className="flex-1 bg-[var(--senegal-green)] text-white hover:bg-[var(--senegal-green-dark)] rounded-md"
                    >
                      {loading ? (
                        <>
                          <Loader className="h-4 w-4 mr-2 animate-spin" />
                          Envoi en cours...
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4 mr-2" />
                          Envoyer le message
                        </>
                      )}
                    </Button>
                    
                    {(success || error) && (
                      <Button type="button" variant="outline" onClick={handleReset} className="rounded-md">
                        Nouveau message
                      </Button>
                    )}
                  </div>
                </form>
              </CardContent>
            </Card>

            {/* Informations de contact */}
            <div className="space-y-6">
              {/* Coordonnées principales */}
              <Card className="shadow-md">
                <CardHeader>
                  <CardTitle className="text-[var(--senegal-green)] flex items-center text-xl font-semibold">
                    <Building className="h-5 w-5 mr-2" />
                    ANSD Sénégal
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <MapPin className="h-5 w-5 text-[var(--senegal-green)] mt-1" />
                    <div>
                      <div className="font-medium text-base">Adresse</div>
                      <div className="text-gray-600 text-sm">
                        Rocade Fann Bel-Air, Cerf-Volant<br />
                        BP 116 Dakar RP, Sénégal
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-[var(--senegal-green)]" />
                    <div>
                      <div className="font-medium text-base">Téléphone</div>
                      <div className="text-gray-600 text-sm">+221 33 869 21 39</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-[var(--senegal-green)]" />
                    <div>
                      <div className="font-medium text-base">Email</div>
                      <div className="text-gray-600 text-sm">contact@ansd.sn</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Horaires */}
              <Card className="shadow-md">
                <CardHeader>
                  <CardTitle className="text-[var(--senegal-green)] flex items-center text-xl font-semibold">
                    <Clock className="h-5 w-5 mr-2" />
                    Horaires d'ouverture
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {horairesData.map((horaire, index) => (
                      <div key={index} className="flex justify-between text-sm">
                        <span>{horaire.jour}</span>
                        <span className="font-medium">{horaire.heures}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Réseaux sociaux */}
              <Card className="shadow-md">
                <CardHeader>
                  <CardTitle className="text-[var(--senegal-green)] text-xl font-semibold">Suivez-nous</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex space-x-3">
                    {socialLinks.map((social, index) => (
                      <Button
                        key={index}
                        size="icon"
                        className={`${social.color} text-white hover:opacity-90 rounded-full`}
                        asChild
                      >
                        <a href={social.url} target="_blank" rel="noopener noreferrer">
                          {getSocialIcon(social.icon)}
                        </a>
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Notifications */}
              <NotificationSubscription variant="compact" />

            </div>
          </div>

          {/* Contacts par service */}
          <div className="mb-12">
            <h2 className="text-[var(--senegal-green)] text-3xl font-bold mb-6 text-center">Contacts par Service</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {contactsData.map((contact, index) => (
                <Card key={index} className="hover-lift shadow-md">
                  <CardHeader className="text-center pb-4">
                    <div className="w-14 h-14 rounded-full bg-[var(--senegal-green)] mx-auto mb-3 flex items-center justify-center">
                      <User className="h-7 w-7 text-white" />
                    </div>
                    <CardTitle className="text-[var(--senegal-green)] text-lg font-semibold">
                      {contact.service}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="text-center">
                      <div className="font-medium text-base">{contact.responsable}</div>
                      <div className="text-gray-600 text-sm">{contact.titre}</div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 text-sm">
                        <Mail className="h-4 w-4 text-[var(--senegal-green)]" />
                        <a href={`mailto:${contact.email}`} className="text-blue-600 hover:underline">
                          {contact.email}
                        </a>
                      </div>
                      <div className="flex items-center space-x-2 text-sm">
                        <Phone className="h-4 w-4 text-[var(--senegal-green)]" />
                        <span>{contact.phone}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm">
                        <Building className="h-4 w-4 text-[var(--senegal-green)]" />
                        <span>{contact.bureau}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Carte (placeholder) */}
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="text-[var(--senegal-green)] text-center text-3xl font-bold">Notre Localisation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center p-4">
                <div className="text-center">
                  <MapPin className="h-16 w-16 mx-auto text-[var(--senegal-green)] mb-4" />
                  <p className="text-gray-700 text-lg font-medium mb-1">Carte interactive bientôt disponible</p>
                  <p className="text-gray-600 text-sm">Rocade Fann Bel-Air, Cerf-Volant, Dakar</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}