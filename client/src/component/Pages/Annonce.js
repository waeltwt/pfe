
import React, { useEffect, useState } from "react";
import "./Annonce.css";
import Card from "react-bootstrap/Card";
import axios from "axios";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Offcanvas from "react-bootstrap/Offcanvas";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
const Annonce = () => {
  const [annonces, setAnnonces] = useState([]);
  const [filteredAnnonces, setFilteredAnnonces] = useState([]);
  const [minSalaire, setMinSalaire] = useState(0); // Salaire minimum pour le filtre
  const [maxSalaire, setMaxSalaire] = useState(10000); // Salaire maximum pour le filtre
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate = useNavigate();
  useEffect(() => {
    const getAnnonces = async () => {
      try {
        const res = await axios.get("/api/annonce/");
        setAnnonces(res.data);
        setFilteredAnnonces(res.data); // Initialiser les annonces filtrées
      } catch (error) {
        console.error("Erreur lors de la récupération des annonces :", error);
      }
    };
    getAnnonces();
  }, []);

  // Fonction pour filtrer les annonces en fonction du salaire
  const handleFilterChange = () => {
    const annoncesFiltrees = annonces.filter(
      (annonce) =>
        annonce.salaire >= minSalaire && annonce.salaire <= maxSalaire
    );
    setFilteredAnnonces(annoncesFiltrees);
  };
 // Fonction pour gérer le clic sur "Postuler"
 const handlePostuler = (annonceId) => {
  // Rediriger vers la page du formulaire avec l'ID de l'annonce
  navigate(`/postuler/${annonceId}`);
};
  return (
    <div className="annonce-container">
      {/* Bouton pour afficher le filtre dans l'Offcanvas */}
      <div className="d-flex justify-content-end mb-3">
        <Button
          className="button"
          variant="outline-primary"
          onClick={handleShow}
        >
          Afficher les filtres
        </Button>
      </div>
      {/* Section Offcanvas pour le filtre par salaire */}
      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Filtrer par Salaire</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className="filter-section">
            <label>
              Salaire minimum:
              <input
                type="number"
                value={minSalaire}
                onChange={(e) => setMinSalaire(Number(e.target.value))}
              />
            </label>
            <label>
              Salaire maximum:
              <input
                type="number"
                value={maxSalaire}
                onChange={(e) => setMaxSalaire(Number(e.target.value))}
              />
            </label>
            <Button
              variant="outline-primary"
              className="button"
              style={{ height: "50px", marginTop: "30px" }}
              onClick={handleFilterChange}
            >
              Filtrer
            </Button>
          </div>
        </Offcanvas.Body>
      </Offcanvas>

      {/* Affichage des annonces filtrées */}
      {filteredAnnonces.length > 0 ? (
        <Row xs={1} md={2} className="g-4">
          {filteredAnnonces.map(
            ({ titre, name, description, salaire, phoneNumber, _id }) => (
              <Col key={_id}>
                <Card className="annonce-card" border="danger">
                  <Card.Header as="h5" style={{ textAlign: "center" }}>
                    {titre}
                  </Card.Header>
                  <Card.Body>
                    <Card.Text className="annonce-card-text">
                      <li>
                        <span className="red-text">Nom:</span> {name}
                      </li>
                      <li>
                        <span className="red-text">Description:</span>{" "}
                        {description}
                      </li>
                      <li>
                        <span className="red-text">Salaire:</span> {salaire}$
                      </li>
                      <li>
                        <span className="red-text">Phone number:</span>{" "}
                        {phoneNumber}
                      </li>
                    </Card.Text>
                    <Button variant="outline-primary" className="button"    onClick={() => handlePostuler(_id)} >
                      Postuler
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            )
          )}
        </Row>
      ) : (
        <p>Aucune annonce disponible pour le moment</p>
      )}
    </div>
  );
};

export default Annonce;
