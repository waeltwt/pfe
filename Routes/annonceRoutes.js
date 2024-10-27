const express = require('express');
const { addAnnonce, getAnnonces } = require('../controllers/annonceControllers');
const router = express.Router();

// Routes sans middleware d'authentification
router.get('/', getAnnonces); 
router.post('/add', addAnnonce);

module.exports = router;
