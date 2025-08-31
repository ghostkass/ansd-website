// src/data/contact-data.js

export const contactsData = [
  {
    service: 'Direction Générale',
    responsable: 'Abdou DIOUF',
    titre: 'Directeur Général',
    email: 'dg@ansd.sn',
    phone: '+221 33 869 21 39',
    bureau: 'Bureau 001'
  },
  {
    service: 'Communication & Diffusion',
    responsable: 'Ousmane FALL',
    titre: 'Directeur Communication',
    email: 'communication@ansd.sn',
    phone: '+221 33 869 21 45',
    bureau: 'Bureau 105'
  },
  {
    service: 'Méthodologie & Coordination',
    responsable: 'Dr. Fatou DIAGNE',
    titre: 'Directrice Méthodologie',
    email: 'methodologie@ansd.sn',
    phone: '+221 33 869 21 42',
    bureau: 'Bureau 201'
  },
  {
    service: 'Systèmes d\'Information',
    responsable: 'Mamadou SOW',
    titre: 'Directeur SI',
    email: 'si@ansd.sn',
    phone: '+221 33 869 21 48',
    bureau: 'Bureau 301'
  },
  {
    service: 'Support Technique Open Data',
    responsable: 'Équipe Technique',
    titre: 'Support Utilisateurs',
    email: 'support@ansd.sn',
    phone: '+221 33 869 21 50',
    bureau: 'Bureau 305'
  }
];

export const horairesData = [
  { jour: 'Lundi - Jeudi', heures: '8h00 - 17h00' },
  { jour: 'Vendredi', heures: '8h00 - 12h30 / 15h00 - 17h30' },
  { jour: 'Samedi', heures: 'Fermé' },
  { jour: 'Dimanche', heures: 'Fermé' }
];

export const faqData = [
  {
    question: 'Comment accéder aux données ouvertes ?',
    reponse: 'Vous pouvez accéder à nos données ouvertes via notre plateforme dédiée à l\'adresse opendata.ansd.sn. Plus de 180 jeux de données sont disponibles gratuitement.'
  },
  {
    question: 'Comment obtenir des données non disponibles en ligne ?',
    reponse: 'Contactez notre service de diffusion à l\'adresse diffusion@ansd.sn en précisant vos besoins. Certaines données peuvent faire l\'objet d\'une demande spécifique.'
  },
  {
    question: 'Puis-je utiliser vos données pour ma recherche ?',
    reponse: 'Oui, nos données sont publiques et peuvent être utilisées pour des fins de recherche. Nous demandons simplement de citer la source ANSD dans vos publications.'
  },
  {
    question: 'Comment signaler une erreur dans les données ?',
    reponse: 'Vous pouvez signaler toute erreur via notre formulaire de contact ou directement à l\'adresse support@ansd.sn avec les détails précis.'
  },
  {
    question: 'Y a-t-il des formations sur l\'utilisation des données ?',
    reponse: 'Nous organisons régulièrement des sessions de formation. Consultez notre calendrier ou contactez-nous pour plus d\'informations.'
  }
];

export const socialLinks = [
  { icon: 'Facebook', url: 'https://facebook.com/ansd.senegal', color: 'bg-blue-600' },
  { icon: 'Twitter', url: 'https://twitter.com/ansd_senegal', color: 'bg-sky-500' },
  { icon: 'Linkedin', url: 'https://linkedin.com/company/ansd-senegal', color: 'bg-blue-800' },
  { icon: 'Youtube', url: 'https://youtube.com/@ansdsenegal', color: 'bg-red-600' }
];