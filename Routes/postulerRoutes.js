const express = require('express');
const router = express.Router();
const { addCandidature, getCandidatures } = require('../controllers/postulerController');
const multer = require('multer');
const Postuler = require('../Models/postulerSchema');



// Configuration de Multer pour gérer le téléchargement des fichiers
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Répertoire où les fichiers seront stockés
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); // Nom du fichier avec un horodatage
    }
});

const upload = multer({ storage });

// Route pour ajouter une candidature
router.post('/postuler', upload.single('cv'), async (req, res) => {
  try {
      const { name, annonceId } = req.body;
      const cv = req.file ? req.file.filename : null;

      if (!name || !cv || !annonceId) {
          return res.status(400).json({ message: 'Tous les champs sont requis' });
      }

      const nouvelleCandidature = new Postuler({
          name,
          cv,
          annonceId,
      });

      const candidatureSauvegardée = await nouvelleCandidature.save();
      res.status(201).json({
          message: 'Candidature ajoutée avec succès',
          candidature: candidatureSauvegardée,
      });
  } catch (error) {
      console.error('Erreur lors de l\'ajout de la candidature:', error);
      res.status(500).json({ message: 'Erreur serveur' });
  }
});

// Route pour récupérer toutes les candidatures
router.get('/postuler', async (req, res) => {
  try {
      const candidatures = await Postuler.find();
      res.status(200).json(candidatures);
  } catch (error) {
      console.error('Erreur lors de la récupération des candidatures:', error);
      res.status(500).json({ message: 'Erreur serveur' });
  }
});

// Route pour récupérer les candidatures par annonceId
router.get('/annonce/:id/candidatures', async (req, res) => {
  try {
      const candidatures = await Postuler.find({ annonceId: req.params.id });

      if (!candidatures.length) {
          return res.status(404).json({ message: 'Aucune candidature trouvée pour cette annonce.' });
      }

      res.status(200).json(candidatures);
  } catch (error) {
      console.error('Erreur lors de la récupération des candidatures :', error);
      res.status(500).json({ message: 'Erreur lors de la récupération des candidatures', error });
  }
});

module.exports = router;