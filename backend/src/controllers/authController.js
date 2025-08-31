// backend/src/controllers/authController.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { hashPassword, comparePassword } = require('../utils/password');
const { generateToken } = require('../utils/jwt');

const registerUser = async (req, res) => {
  const { username, email, password, role } = req.body;
  try {
    const hashedPassword = await hashPassword(password);
    const user = await prisma.user.create({
      data: { username, email, password: hashedPassword, role: role || 'agent' },
    });
    const token = generateToken({ id: user.id, role: user.role });
    res.status(201).json({ user: { id: user.id, username: user.username, email: user.email, role: user.role }, token });
  } catch (error) {
    console.error("Erreur lors de l'enregistrement de l'utilisateur:", error);
    res.status(400).json({ message: 'Utilisateur ou email déjà existant.' });
  }
};

const loginUser = async (req, res) => {
  /*
    Permet à l'utilisateur de se connecter en utilisant soit son email,
    soit son nom d'utilisateur. Le champ « identifier » est privilégié,
    mais pour compatibilité avec d'anciens clients, « email » peut encore
    être utilisé. Le mot de passe est comparé via la fonction comparePassword.
  */
  const { identifier, email, password } = req.body;
  // Détermine l'identifiant de connexion : email ou username
  const loginId = identifier || email;
  try {
    // Recherche par email OU par nom d'utilisateur
    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { email: loginId },
          { username: loginId }
        ],
      },
    });
    // Si aucun utilisateur n'est trouvé, renvoie une erreur générique
    if (!user) {
      return res.status(400).json({ message: 'Identifiants invalides.' });
    }

    // Vérifie le mot de passe
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Identifiants invalides.' });
    }

    // Met à jour la date de dernière connexion
    await prisma.user.update({
      where: { id: user.id },
      data: { lastLogin: new Date() },
    });

    // Génère le token et renvoie les informations essentielles de l'utilisateur
    const token = generateToken({ id: user.id, role: user.role });
    return res.json({
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
        lastLogin: new Date(),
      },
      token,
    });
  } catch (error) {
    console.error("Erreur lors de la connexion de l'utilisateur:", error);
    return res.status(500).json({ message: 'Erreur serveur.' });
  }
};

const getMe = async (req, res) => {
    // req.user est défini par le middleware `protect`
    res.json({ user: { id: req.user.id, username: req.user.username, email: req.user.email, role: req.user.role } });
};

module.exports = { registerUser, loginUser, getMe };