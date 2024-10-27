import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // Importer useParams
import { Table } from "react-bootstrap";
import axios from "axios";
import "./Notifications.css";

const Notifications = () => {
  const { annonceId } = useParams(); // Récupérer l'annonceId depuis l'URL
  const [candidatures, setCandidatures] = useState([]);

  useEffect(() => {
    const fetchCandidatures = async () => {
      try {
        // Utilisez la route API pour récupérer les candidatures par annonceId
        const res = await axios.get(`http://localhost:5000/api/annonce/${annonceId}/candidatures`);
        setCandidatures(res.data); // Mettre à jour l'état avec les candidatures récupérées
      } catch (error) {
        console.error("Erreur lors de la récupération des candidatures :", error);
      }
    };

    fetchCandidatures();
  }, [annonceId]); // Ajoutez annonceId comme dépendance

  return (
    <div>
      <h3>Mes Candidatures</h3>
      <Table striped bordered hover variant="dark" className="candidatures-table">
        <thead>
          <tr>
            <th>Nom</th>
            <th>CV</th>
          </tr>
        </thead>
        <tbody>
          {candidatures.map((candidature) => (
            <tr key={candidature._id}>
              <td>{candidature.name}</td>
              <td>
                <a
                  href={`http://localhost:5000/uploads/${candidature.cv}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Télécharger le CV
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Notifications;
