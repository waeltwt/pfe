const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postulerSchema = new Schema({
 
    name: {
        type: String,
        required: true,  // Le nom est obligatoire
    },
    cv: {
        type: String, // Ici, nous stockons le nom ou le chemin du fichier PDF
        required: true,
    },

    annonceId: { // Ajout de l'ID de l'annonce
        type: mongoose.Schema.Types.ObjectId, // Si l'ID est de type ObjectId
        required: true,
        ref: 'Annonce', // Référence à la collection des annonces si nécessaire
      },
    }, { timestamps: true });
    

module.exports = mongoose.model('postuler', postulerSchema);
