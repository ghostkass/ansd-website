// backend/src/app.js
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

// Charger les variables d'environnement
dotenv.config();

const app = express();
const publicationsRoute = require('./routes/publications');

// Middleware
app.use(express.json()); // Permet à Express de lire le JSON dans le corps des requêtes
app.use(cors()); // Autorise les requêtes Cross-Origin du frontend

// Routes

app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/publications', publicationsRoute);

// Ajoutez d'autres routes ici (par exemple, pour la gestion du contenu)

// Route de test simple
app.get('/', (req, res) => {
  res.send('API Backend ANSD en cours d\'exécution !');
});

const PORT = process.env.PORT || 5000; // Le backend tournera sur le port 5000 par défaut

app.listen(PORT, () => {
  console.log(`Serveur backend démarré sur le port ${PORT}`);
});