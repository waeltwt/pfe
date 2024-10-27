const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const annonceSchema = new Schema({
    titre: {
        type: String,
        required: true,  // Le titre est obligatoire
        trim: true       // Supprime les espaces avant et après
    },
    name: {
        type: String,
        required: true,  // Le nom est obligatoire
        trim: true
    },
    description: {
        type: String,
        required: true,  // La description est obligatoire
        trim: true
    },
    salaire: {
        type: Number,
        required: true,  // Le salaire est obligatoire
        min: 0           // Le salaire doit être un nombre positif
    },
    phoneNumber: {
        type: String,    // Utilisez String pour prendre en compte les préfixes
        required: true,  // Le numéro de téléphone est obligatoire
// Regex pour valider un numéro de téléphone
    },
}, {
    timestamps: true // Ajoute les champs createdAt et updatedAt automatiquement
});

module.exports = mongoose.model('Annonce', annonceSchema);