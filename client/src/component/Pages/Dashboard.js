import axios from "axios";
import React, { useEffect, useState } from "react";
import RowDetails from "./resource/RowDetails";
import "./Dashboard.css";
import InputGroup from "./resource/InputGroup";
import { Button, Form, Table, Row, Col } from "react-bootstrap";
import Alerte from "./resource/Alert";

const Dashboards = () => {
  const [users, setUsers] = useState([]);
  const [alertMessage, setAlertMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    email: "",
    name: "",
    password: "",
    phoneNumber: "",
    skill: "",
    city: "",
    state: "",
    zip: "",
    role: "",
  });

  // AJOUTER USER DEPUIT LE FORUM + ALERT MSG
  const onChangeHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    axios
      .post("/api/user/register", form)
      .then((res) => {
        setAlertMessage(res.data.msg);
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
        }, 4000);

        setForm({
          email: "",
          name: "",
          password: "",
          phoneNumber: "",
          skill: "",
          city: "",
          state: "",
          zip: "",
          role: "",
        });
        setErrors({});
      })
      .catch((err) => {
        setErrors(err.response.data);
      });
  };

  // DELETE USER
  const OnDelete = (id__) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?")) {
      axios.delete(`/api/User/deleteuser/${id__}`).then((res) => {
        setAlertMessage(res.data.msg);
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
        }, 4000);
        setUsers(users.filter(user => user._id !== id__));
      });
    }
  }

  // IMPORTATION DU DATA AU TABLEAU
  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/user/user");
        setUsers(res.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    getUsers();
  }, []);

  return (
    <Row className="p-4">
      {showAlert && (
        <Alerte
          message={alertMessage}
          show={showAlert}
          setShow={setShowAlert}
        />
      )}
      <Col xs={12} lg={4}>
        <div className="form-container"> {/* Ajoutez cette div */}
          <Form onSubmit={onSubmitHandler}>
            <InputGroup
              label="Nom"
              type="text"
              name="name"
              onChangeHandler={onChangeHandler}
              errors={errors.name}
              value={form.name || ""}
              required={true}
            />

            <InputGroup
              label="Numéro de téléphone"
              type="number"
              name="phoneNumber"
              onChangeHandler={onChangeHandler}
              errors={errors.phoneNumber}
              value={form.phoneNumber || ""}
              isInvalid={!!errors.phoneNumber} 
              required={true}
            />

            <InputGroup
              label="Compétences"
              type="text"
              name="skill"
              onChangeHandler={onChangeHandler}
              errors={errors.skill}
              value={form.skill || ""}
              isInvalid={!!errors.skill} 
              required={true}
            />

            <Row>
              <Col xs={7}>
                <InputGroup
                  label="Ville"
                  type="text"
                  name="city"
                  onChangeHandler={onChangeHandler}
                  errors={errors.city}
                  value={form.city || ""}
                  isInvalid={!!errors.city} 
                  required={true}
                />
              </Col>

              <Col>
                <InputGroup
                  label="État"
                  type="text"
                  name="state"
                  onChangeHandler={onChangeHandler}
                  errors={errors.state}
                  value={form.state || ""}
                  isInvalid={!!errors.state} 
                  required={true}
                />
              </Col>
            </Row>

            <InputGroup
              label="Code postal"
              type="number"
              name="zip"
              onChangeHandler={onChangeHandler}
              errors={errors.zip}
              value={form.zip || ""}
              isInvalid={!!errors.zip}  
              required={true}
            />

            <InputGroup
              label="Adresse Email"
              type="email"
              name="email"
              onChangeHandler={onChangeHandler}
              errors={errors.email}
              value={form.email || ""}
              required={true}
            />

            <InputGroup
              label="Mot de passe"
              type="password"
              name="password"
              onChangeHandler={onChangeHandler}
              errors={errors.password}
              value={form.password || ""}
              isInvalid={!!errors.password}  
              required={true}
            />

            <Button className="button mt-3" variant="outline-primary" type="submit">
              Ajouter un utilisateur
            </Button>
          </Form>
        </div> {/* Fermez la div ici */}
      </Col>

      <Col xs={12} lg={7}>
        <Table className="table table-striped table-bordered table-hover">
          <thead>
            <tr>
              <th scope="col">Email</th>
              <th scope="col">Nom</th>
              <th scope="col">Numéro de téléphone</th>
              <th scope="col">Compétences</th>
              <th scope="col">Ville</th>
              <th scope="col">État</th>
              <th scope="col">Code postal</th>
              <th scope="col">Rôle</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(({ email, name, phoneNumber, zip, state, city, skill, _id, role }) => (
              <RowDetails
                key={_id}
                email={email}
                name={name}
                phoneNumber={phoneNumber}
                skill={skill}
                city={city}
                state={state}
                zip={zip}
                role={role}
                Id={_id}
                OnDelete={OnDelete}
              />
            ))}
          </tbody>
        </Table>
      </Col>
    </Row>
  );
};

export default Dashboards;
