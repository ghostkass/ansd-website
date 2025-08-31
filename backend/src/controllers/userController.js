// backend/src/controllers/userController.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { hashPassword } = require('../utils/password');

const getUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: { id: true, username: true, email: true, role: true, createdAt: true, lastLogin: true }
    });
    res.json(users);
  } catch (error) {
    console.error("Erreur lors de la récupération des utilisateurs:", error);
    res.status(500).json({ message: 'Erreur serveur.' });
  }
};

const createUser = async (req, res) => {
    const { username, email, password, role } = req.body;
    try {
        const hashedPassword = await hashPassword(password);
        const user = await prisma.user.create({
            data: { username, email, password: hashedPassword, role },
            select: { id: true, username: true, email: true, role: true, createdAt: true, lastLogin: true }
        });
        res.status(201).json(user);
    } catch (error) {
        console.error("Erreur lors de la création de l'utilisateur:", error);
        res.status(400).json({ message: 'Impossible de créer l\'utilisateur.' });
    }
};

const updateUser = async (req, res) => {
    const { id } = req.params;
    const { username, email, role } = req.body;
    try {
        const user = await prisma.user.update({
            where: { id },
            data: { username, email, role },
            select: { id: true, username: true, email: true, role: true, createdAt: true, lastLogin: true }
        });
        res.json(user);
    } catch (error) {
        console.error("Erreur lors de la mise à jour de l'utilisateur:", error);
        res.status(400).json({ message: 'Impossible de mettre à jour l\'utilisateur.' });
    }
};

const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.user.delete({ where: { id } });
        res.status(204).send(); // No Content
    } catch (error) {
        console.error("Erreur lors de la suppression de l'utilisateur:", error);
        res.status(400).json({ message: 'Impossible de supprimer l\'utilisateur.' });
    }
};

module.exports = { getUsers, createUser, updateUser, deleteUser };