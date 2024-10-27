import React, { useState } from "react";
import { Button, Spinner, Form, Col, Alert } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerNewUser } from "../../actions/userActions";
import Row from "react-bootstrap/Row";
import "./Register.css";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.user);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [registerInput, setRegisterInput] = useState({ role: "user" });

  const handleChange = (e) => {
    setRegisterInput({ ...registerInput, [e.target.name]: e.target.value });
    // console.log(registerInput);
  };
  const handleRoleChange = (e) => {
    setRegisterInput({
      ...registerInput,
      role: e.target.checked ? "RH" : "user",
    });
  };

  const inputInfo = () => {
    console.log("Submitting form with data:", registerInput);
    dispatch(registerNewUser(registerInput, navigate));
  };

  return (
    
      <div className="aa">
       
        <Col xs={4}>
          <Form className="formm" onSubmit={handleSubmit(inputInfo)}>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Nom</Form.Label>
              <Form.Control
                type="text"
                {...register("name", { required: "Nom obligatoire" })}
                name="name"
                onChange={handleChange}
                placeholder="Entrez votre nom"
                isInvalid={!!errors.name} // Ajout de la classe is-invalid si une erreur est détectée
              />
              <Form.Control.Feedback type="invalid">
                {errors.name && errors.name.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPhoneNumber">
              <Form.Label>Numéro de téléphone</Form.Label>
              <Form.Control
                type="number"
                {...register("phoneNumber", {
                  required: "Numéro de téléphone obligatoire",
                })}
                name="phoneNumber"
                onChange={handleChange}
                placeholder="Entrez votre numéro de téléphone"
                isInvalid={!!errors.phoneNumber} // Ajout de la classe is-invalid si une erreur est détectée
              />
              <Form.Control.Feedback type="invalid">
                {errors.phoneNumber && errors.phoneNumber.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicDescription">
              <Form.Label>Compétences</Form.Label>
              <Form.Control
                as="textarea"
                {...register("skill", { required: "Compétences obligatoires" })}
                name="skill"
                onChange={handleChange}
                placeholder="Entrez vos compétences"
                isInvalid={!!errors.skill} // Ajout de la classe is-invalid si une erreur est détectée
              />
              <Form.Control.Feedback type="invalid">
                {errors.skill && errors.skill.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Row>
              <Col xs={7}>
                <Form.Group className="mb-3" controlId="formCity">
                  <Form.Label>Ville</Form.Label>
                  <Form.Control
                    type="text"
                    {...register("city", { required: "Ville obligatoire" })}
                    name="city"
                    onChange={handleChange}
                    placeholder="Ville"
                    isInvalid={!!errors.city} // Ajout de la classe is-invalid si une erreur est détectée
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.city && errors.city.message}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col>
                <Form.Group className="mb-3" controlId="formState">
                  <Form.Label>État</Form.Label>
                  <Form.Control
                    type="text"
                    {...register("state", { required: "État obligatoire" })}
                    name="state"
                    onChange={handleChange}
                    placeholder="État"
                    isInvalid={!!errors.state} // Ajout de la classe is-invalid si une erreur est détectée
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.state && errors.state.message}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col>
                <Form.Group className="mb-3" controlId="formZip">
                  <Form.Label>Code postal</Form.Label>
                  <Form.Control
                    type="number"
                    {...register("zip", {
                      required: "Code postal obligatoire",
                    })}
                    name="zip"
                    onChange={handleChange}
                    placeholder="Code postal"
                    isInvalid={!!errors.zip} // Ajout de la classe is-invalid si une erreur est détectée
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.zip && errors.zip.message}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Adresse Email</Form.Label>
              <Form.Control
                type="email"
                {...register("email", {
                  required: "Email obligatoire",
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "Vous devez saisir une adresse e-mail valide",
                  },
                })}
                name="email"
                onChange={handleChange}
                placeholder="Entrez l'email"
                isInvalid={!!errors.email} // Ajout de la classe is-invalid si une erreur est détectée
              />
              <Form.Control.Feedback type="invalid">
                {errors.email && errors.email.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Mot de passe</Form.Label>
              <Form.Control
                type="password"
                {...register("password", {
                  required: "Mot de passe obligatoire",
                  minLength: {
                    value: 6,
                    message: "Mot de passe doit comporter 6 caractères minimum",
                  },
                })}
                name="password"
                onChange={handleChange}
                placeholder="Nouveau mot de passe"
                isInvalid={!!errors.password} // Ajout de la classe is-invalid si une erreur est détectée
              />
              <Form.Control.Feedback type="invalid">
                {errors.password && errors.password.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formRoleCheckbox">
              <Form.Check
                type="switch"
                label="S'inscrire en tant que ressource humaine"
                onChange={handleRoleChange}
              />
            </Form.Group>
            <Button className="button" variant="outline-primary" type="submit">
              {loading ? (
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              ) : (
                "S'inscrire"
              )}
            </Button>
          </Form>
        </Col>
      </div>
   
  );
};

export default Register;
