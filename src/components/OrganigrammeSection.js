// src/components/OrganigrammeSection.js

// Données de l'organigramme (peut être déplacé vers un fichier JSON ou une API plus tard)
const teamMembers = [
  {
    id: 1,
    name: 'M. Abdou Diouf',
    title: 'Directeur Général',
    role: 'Direction Générale',
    image: '/images/team/abdou-diouf.jpg', // Assurez-vous que l'image existe
    description: "Visionnaire et leader de l'ANSD, il guide l'institution vers l'excellence statistique.",
  },
  {
    id: 2,
    name: 'Mme Fatou Ndiaye',
    title: 'Directrice Générale Adjointe',
    role: 'Coordination et Opérations',
    image: '/images/team/fatou-ndiaye.jpg',
    description: "Assure la coordination des activités et l'efficacité opérationnelle de l'Agence.",
  },
  {
    id: 3,
    name: 'Dr. Alioune Sy',
    title: 'Directeur de la Méthodologie et des Études',
    role: 'Recherche et Qualité',
    image: '/images/team/alioune-sy.jpg',
    description: "Expert en méthodologie, il garantit la rigueur scientifique de nos productions.",
  },
  {
    id: 4,
    name: 'M. Omar Gaye',
    title: 'Directeur des Systèmes d\'Information',
    role: 'Technologie et Innovation',
    image: '/images/team/omar-gaye.jpg',
    description: "Pilote les infrastructures et solutions technologiques de l'ANSD.",
  },
  {
    id: 5,
    name: 'Mme Aïcha Diallo',
    title: 'Directrice des Ressources Humaines et de l\'Administration',
    role: 'Gestion Interne',
    image: '/images/team/aicha-diallo.jpg',
    description: "Responsable du développement des talents et de la gestion administrative.",
  },
];

export default function OrganigrammeSection() {
  return (
    <section className="bg-neutralLight p-8 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-neutralDark mb-8 text-center">
        Notre Équipe de Direction
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {teamMembers.map((member) => (
          <div key={member.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
            <div className="flex flex-col items-center text-center">
              {/* Image du membre de l'équipe */}
              <img
                src={member.image}
                alt={`Photo de ${member.name}`}
                className="w-32 h-32 rounded-full object-cover mb-4 border-4 border-senegalGold"
              />
              <h3 className="text-xl font-bold text-senegalGreen mb-1">
                {member.name}
              </h3>
              <p className="text-neutralDark text-lg font-semibold mb-2">
                {member.title}
              </p>
              <p className="text-gray-600 text-sm mb-4">
                {member.role}
              </p>
              <p className="text-sm text-gray-700 leading-relaxed">
                {member.description}
              </p>
            </div>
          </div>
        ))}
      </div>
      {/* Nous pourrions ajouter une représentation visuelle plus "organigramme" ici plus tard */}
    </section>
  );
}