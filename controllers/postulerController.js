const Postuler = require('../Models/postulerSchema');

// Fonction pour ajouter une candidature
const addCandidature = async (req, res) => {
    try {
        const { name, annonceId } = req.body;
        const cv = req.file ? req.file.filename : null; // On suppose que le fichier est stocké dans `req.file.filename`

        // Vérification des champs obligatoires
        if (!name || !cv || !annonceId) {
            return res.status(400).json({ message: 'Tous les champs sont requis' });
        }

        // Création d'une nouvelle candidature
        const nouvelleCandidature = new Postuler({
            name,
            cv,
            annonceId,
        });

        // Enregistrement de la candidature dans la base de données
        const candidatureSauvegardée = await nouvelleCandidature.save();

        // Réponse de succès
        res.status(201).json({
            message: 'Candidature ajoutée avec succès',
            candidature: candidatureSauvegardée,
        });
    } catch (error) {
        console.error('Erreur lors de l\'ajout de la candidature:', error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
};

// Fonction pour récupérer toutes les candidatures
const getCandidatures = async (req, res) => {
    try {
        // Récupération de toutes les candidatures
        const candidatures = await Postuler.find();
        res.status(200).json(candidatures); // Répond avec les candidatures
    } catch (error) {
        console.error('Erreur lors de la récupération des candidatures:', error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
};

module.exports = {
    addCandidature,
    getCandidatures,
};