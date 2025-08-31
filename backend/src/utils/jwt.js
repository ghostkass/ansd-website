// backend/src/utils/jwt.js
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: '../.env' }); // Assurez-vous du chemin correct vers votre .env

const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }); // Token valide 1 heure
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return null; // Token invalide ou expiré
  }
};

module.exports = { generateToken, verifyToken };