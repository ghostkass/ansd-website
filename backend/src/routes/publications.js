const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const multer = require('multer');
const path = require('path');
const { createPublication, getPublications } = require('../controllers/publicationController');

// Configure multer pour stocker les fichiers dans un dossier local
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, '../../uploads')),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  },
});
const upload = multer({ storage });

const router = express.Router();

router.get('/', getPublications);
// Seule une personne connectée peut créer une publication
router.post('/', protect, upload.single('file'), createPublication);

module.exports = router;
