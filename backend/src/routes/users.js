// backend/src/routes/users.js
const express = require('express');
const { getUsers, createUser, updateUser, deleteUser } = require('../controllers/userController');
const { protect, authorizeRoles } = require('../middleware/authMiddleware');
const router = express.Router();

// Protéger toutes les routes de gestion des utilisateurs
router.use(protect);
// Seuls les admins peuvent gérer les utilisateurs
router.use(authorizeRoles('admin'));

router.get('/', getUsers);
router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;