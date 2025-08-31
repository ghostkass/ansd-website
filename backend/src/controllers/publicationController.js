// backend/src/controllers/publicationController.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Création d’une publication avec fichier optionnel
exports.createPublication = async (req, res) => {
  try {
    const { title, content, type } = req.body;
    const file = req.file; // fourni par multer
    const fileUrl = file ? `/uploads/${file.filename}` : null;

    const publication = await prisma.publication.create({
      data: {
        title,
        content,
        type,
        fileUrl,
        authorId: req.user.id,       // l’utilisateur connecté (via middleware protect)
        publishedAt: new Date(),     // date de publication automatique
      },
    });
    res.status(201).json(publication);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de la création de la publication." });
  }
};

// Récupérer toutes les publications avec filtres facultatifs
exports.getPublications = async (req, res) => {
  const { type } = req.query;
  const where = {};

  if (type && type !== 'toutes') {
    where.type = type;
  }

  const publications = await prisma.publication.findMany({
    where,
    orderBy: { publishedAt: 'desc' },
  });
  res.json(publications);
};
