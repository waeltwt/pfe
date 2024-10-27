import React, { useEffect, useState } from "react";
import InputGroup from "./InputGroup";
import { Button, Form, Col, Row } from "react-bootstrap";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
// import "../Dashboard.css";
function Details() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({});

  const onChangeHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    console.log(form);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    axios
      .put(`/api/User/update/${id}`, form)
      .then((res) => {
        navigate("/dashboards");
      })
      .catch((err) => setErrors(err.response.data));
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`/api/User/${id}`);
        setForm(res.data);
      } catch (err) {
        console.error(err); // Ajoutez un traitement des erreurs si nécessaire
      }
    };

    fetchUser(); // Appel de la fonction pour déclencher la requête
  }, [id]); // Ajoutez 'id' comme dépendance si vous souhaitez que l'effet se déclenche lorsque 'id' change

  return (
    <Col className="container mt-4" xs={12} lg={4}>
      <Form onSubmit={onSubmitHandler}>
        <InputGroup
          label="Nom"
          type="text"
          name="name"
          onChangeHandler={onChangeHandler}
          errors={errors.name}
          value={form.name}
        />
        <InputGroup
          label="Numéro de téléphone"
          type="number"
          name="phoneNumber"
          onChangeHandler={onChangeHandler}
          errors={errors.phoneNumber}
          value={form.phoneNumber}
        />

        <InputGroup
          label="Compétences"
          type="text"
          name="skill"
          onChangeHandler={onChangeHandler}
          errors={errors.skill}
          value={form.skill}
        />

        <Row>
          <Col xs={7}>
            <InputGroup
              label="Ville"
              type="text"
              name="city"
              onChangeHandler={onChangeHandler}
              errors={errors.city}
              value={form.city}
            />
          </Col>
          <Col>
            <InputGroup
              label="État"
              type="text"
              name="state"
              onChangeHandler={onChangeHandler}
              errors={errors.state}
              value={form.state}
            />
          </Col>
          <Col>
            <InputGroup
              label="code postal"
              type="number"
              name="zip"
              onChangeHandler={onChangeHandler}
              errors={errors.zip}
              value={form.zip}
            />
          </Col>
        </Row>

        <InputGroup
          label="Email address"
          type="email"
          name="email"
          onChangeHandler={onChangeHandler}
          errors={errors.email}
          value={form.email}
        />
        <InputGroup
          label="Mot de passe"
          type="password"
          name="password"
          onChangeHandler={onChangeHandler}
          errors={errors.password}
          value={form.password}
        />

        <Button className="button" variant="outline-primary" type="submit">
          Add user
        </Button>
      </Form>
    </Col>
  );
}

export default Details;
