const Annonce = require('../Models/annonceSchema')




const addAnnonce = async (req, res) => {
    try {
        const { titre, name, description, salaire,  phoneNumber } = req.body;

        // Vérification des champs obligatoires
        if (!titre || !name || !description || !salaire || !phoneNumber) {
            return res.status(400).json({ message: 'Tous les champs sont requis' });
        }

        // Création d'une nouvelle annonce
        const nouvelleAnnonce = new Annonce({
            titre,
            name,
            description,
            salaire,
            phoneNumber,
        });

        // Enregistrement de l'annonce dans la base de données
        const annonceSauvegardée = await nouvelleAnnonce.save();

        // Réponse de succès
        res.status(201).json({
            message: 'Annonce ajoutée avec succès',
            annonce: annonceSauvegardée,
        });
    } catch (error) {
        console.error('Erreur lors de l\'ajout de l\'annonce:', error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
};

const getAnnonces = async (req, res) => {
    try {
        // Récupération de toutes les annonces
        const annonces = await Annonce.find();
        res.status(200).json(annonces); // Répond avec les annonces
    } catch (error) {
        console.error('Erreur lors de la récupération des annonces:', error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
};

module.exports = {
    addAnnonce,
    getAnnonces,
};