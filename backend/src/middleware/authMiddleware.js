// backend/src/middleware/authMiddleware.js
const { verifyToken } = require('../utils/jwt');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = verifyToken(token);

      if (!decoded) {
        return res.status(401).json({ message: 'Non autorisé, token invalide' });
      }

      req.user = await prisma.user.findUnique({ where: { id: decoded.id } });

      if (!req.user) {
        return res.status(401).json({ message: 'Non autorisé, utilisateur non trouvé' });
      }

      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'Non autorisé, token échoué' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Non autorisé, aucun token' });
  }
};

const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: `Accès refusé. Rôle ${req.user.role} non autorisé.` });
    }
    next();
  };
};

module.exports = { protect, authorizeRoles };