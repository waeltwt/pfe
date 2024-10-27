import React, { useState } from "react";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useParams } from "react-router-dom"; // Import de useParams
import Axios from "axios"; // Import d'Axios pour les requêtes HTTP
import "./FormPostuler.css";

function FormPostuler({ titre }) {
  const { id } = useParams(); // Récupération de l'ID de l'annonce depuis l'URL
  const [name, setName] = useState(""); // État pour le champ nom
  const [cv, setCv] = useState(null); // État pour le fichier CV

  // Fonction pour gérer le changement du champ nom
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  // Fonction pour gérer le changement de fichier CV
  const handleFileChange = (e) => {
    setCv(e.target.files[0]); // Récupère le fichier sélectionné
  };

  // Fonction pour gérer la soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault(); // Empêche le rechargement de la page

    // Création d'un objet FormData pour envoyer les données sous forme de multipart/form-data
    const formData = new FormData();
    formData.append("name", name); // Ajoute le nom
    formData.append("cv", cv); // Ajoute le fichier CV
    formData.append("annonceId", id); // Ajoute l'ID de l'annonce

    try {
      // Envoi des données au backend via une requête POST
      const response = await Axios.post("http://localhost:5000/api/postuler", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Affiche la réponse du serveur
      console.log(response.data);
      alert("Candidature envoyée avec succès !");

      // Réinitialisation des champs après l'envoi du formulaire
      setName(""); // Vide le champ nom
      setCv(null); // Vide le fichier CV
      document.getElementById("formFile").value = ""; // Réinitialise l'input file
    } catch (error) {
      console.error("Erreur lors de l'envoi de la candidature", error);
      alert("Erreur lors de l'envoi de la candidature");
    }
  };

  return (
    <Form className="formmm" onSubmit={handleSubmit}>
         <h3>Candidature pour l'annonce: {titre}</h3> {/* Affichage de l'ID de l'annonce */}
      
      {/* Champ en lecture seule pour l'ID de l'annonce */}
      <Form.Group className="mb-3" controlId="formAnnonceId">        
        <Form.Label>ID de l'annonce</Form.Label>
        <Form.Control
          type="text"
          name="annonceId"
          value={id} // Utilisation de l'ID récupéré via useParams
          readOnly // Champ en lecture seule
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label>Nom</Form.Label>
        <Form.Control
          type="text"
          name="name"
          placeholder="Entrez votre nom"
          value={name} // Lier le champ à l'état
          onChange={handleNameChange} // Mettre à jour l'état lors du changement
        />
      </Form.Group>

      <Form.Group controlId="formFile" className="mb-3">
        <Form.Label>Votre CV</Form.Label>
        <Form.Control
          type="file"
          name="cv"
          onChange={handleFileChange} // Mettre à jour l'état lors de la sélection d'un fichier
        />
      </Form.Group>

      <Button variant="outline-primary" type="submit">
        Postuler
      </Button>
    </Form>
  );
}

export default FormPostuler;