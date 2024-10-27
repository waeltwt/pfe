import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row, Table } from "react-bootstrap";
import axios from "axios";
import InputGroup from "react-bootstrap/InputGroup";
import { useNavigate } from "react-router-dom";  // Assurez-vous d'importer useNavigate
import "./HumanResources.css";

const HumanResources = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    titre: "",
    name: "",
    description: "",
    salaire: "",
    phoneNumber: "",
  });

  const [users, setUsers] = useState([]);
  const [annonces, setAnnonces] = useState([]);

  // Gérer les changements dans les champs du formulaire
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Gérer la soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/annonce/add",
        formData
      );
      if (res.status === 201) {
        alert("Annonce ajoutée avec succès !");
        setFormData({
          titre: "",
          name: "",
          description: "",
          salaire: "",
          phoneNumber: "",
        });
      }
    } catch (error) {
      console.error("Erreur lors de l'ajout de l'annonce :", error);
      alert("Erreur lors de l'ajout de l'annonce");
    }
  };

  // Récupérer les utilisateurs à partir de l'API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersRes, annoncesRes] = await Promise.all([
          axios.get("http://localhost:5000/api/user/user"),
          axios.get("http://localhost:5000/api/annonce/"),
        ]);
  
        setUsers(usersRes.data);
        setAnnonces(annoncesRes.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
        alert("Erreur lors de la récupération des utilisateurs ou des annonces.");
      }
    };
  
    fetchData();
  }, []);
  

  // Récupérer les annonces
  // useEffect(() => {
  //   const getAnnonces = async () => {
  //     try {
  //       const res = await axios.get("/api/annonce/");
  //       setAnnonces(res.data); // Mettre à jour l'état avec les annonces récupérées
  //     } catch (error) {
  //       console.error("Erreur lors de la récupération des annonces :", error);
  //     }
  //   };
  //   getAnnonces();
  // }, []);

  // Gestion de la navigation vers la page de notifications
  const handleNotificationClick = (annonceId) => {
    navigate(`/annonce/${annonceId}`); 
  };
  return (
    <div className="cc">
      <Row>
        {/* Formulaire à gauche */}
        <Col xs={12} lg={4}>
          <Form className="form-container" onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicTitre">
              <Form.Label>Titre du poste</Form.Label>
              <Form.Control
                type="text"
                name="titre"
                value={formData.titre}
                onChange={handleChange}
                placeholder="Enter le titre du poste"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Nom de l'entreprise</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter le nom de la société"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                type="text"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter votre description"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicSalaire">
              <Form.Label>Salaire</Form.Label>
              <InputGroup>
                <Form.Control
                  type="number"
                  name="salaire"
                  value={formData.salaire}
                  onChange={handleChange}
                  placeholder="Entrez votre salaire"
                />
                <InputGroup.Text>$</InputGroup.Text>
              </InputGroup>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPhoneNumber">
              <Form.Label>Numéro de téléphone</Form.Label>
              <InputGroup>
                <Form.Control
                  type="number"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder="Entrez votre numéro de téléphone"
                />
              </InputGroup>
            </Form.Group>

            <Button className="button" variant="outline-primary" type="submit">
            Ajouter une annonce
            </Button>
          </Form>
        </Col>

        {/* Tableau des utilisateurs à droite */}
        <Col xs={12} lg={8}>
          <div className="user-table">
            <h3>Liste des utilisateurs</h3>
            <Table
              className="table table-striped table-bordered table-hover"
              
            >
              <thead>
                <tr>
                  <th>Email</th>
                  <th>Name</th>
                  <th>Phone Number</th>
                  <th>Skill</th>
                  <th>Ville</th>
                  <th>État</th>
                  <th>Code postal</th>
                  <th>role</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id}>
                    <td>{user.email}</td>
                    <td>{user.name}</td>
                    <td>{user.phoneNumber}</td>
                    <td>{user.skill}</td>
                    <td>{user.city}</td>
                    <td>{user.state}</td>
                    <td>{user.zip}</td>
                    <td>{user.role}</td>
                  </tr>
                ))}
              </tbody>
            </Table>

            <h3>Liste des annonces</h3>
            <Table
              className="table table-striped table-bordered table-hover"
              
            >
              <thead>
                <tr>
                  <th>Titre</th>
                  <th>Nom de l'entreprise</th>
                  <th>Description</th>
                  <th>Salaire($)</th>
                  <th>Téléphone</th>
                  <th>Liste</th>
                </tr>
              </thead>
              <tbody>
                {annonces.map((annonce) => (
                  <tr key={annonce._id}>
                    <td>{annonce.titre}</td>
                    <td>{annonce.name}</td>
                    <td>{annonce.description}</td>
                    <td>{annonce.salaire}</td>
                    <td>{annonce.phoneNumber}</td>
                    <td>
                      <Button
                        className="btn btn-primary"
                        onClick={() => handleNotificationClick(annonce._id)} 
                      >
                        liste de candidature
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default HumanResources;