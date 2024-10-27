import React, { useEffect } from "react";
import "./login.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { login } from "../../slices/userSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Récupérer les états d'authentification et rôle
  const { loading, error, isAuth, userInfo } = useSelector((state) => state.user);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Fonction de soumission du formulaire
  const loginInput = (data) => {
    dispatch(login(data)); // Envoie des informations de login
  };

  // Surveiller l'état d'authentification et rediriger en fonction du rôle
  useEffect(() => {
    if (isAuth) {
      const role = userInfo && userInfo.role;

      if (role === "admin") {
        navigate("/dashboards"); // Redirige vers le dashboard admin
      } else if (role === "RH") {
        navigate("/rh"); // Redirige vers la page RH
      } else if (role === "user") {
        navigate("/annonce"); // Redirige vers la page des annonces pour les utilisateurs
      }
    }
  }, [isAuth, userInfo, navigate]);

  return (
    <div id="login-wrap" className="login-wrap">
      <div className="login-form">
        <h1>Connexion</h1>
        <Form onSubmit={handleSubmit(loginInput)}>
          <Form.Group className="form-group">
            <Form.Label htmlFor="email" className="label">
              Adresse e-mail
            </Form.Label>
            <Form.Control
              {...register("email", { required: "Email is required" })}
              type="email"
              name="email"
              id="email"
              placeholder="Entrez votre Email."
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
            />
            {errors.email && (
              <Form.Text className="text-danger">
                {errors.email.message}
              </Form.Text>
            )}
          </Form.Group>

          <Form.Group className="form-group">
            <Form.Label htmlFor="password" className="label">
              Mot de passe
            </Form.Label>
            <Form.Control
              {...register("password", { required: "Password is required" })}
              type="password"
              name="password"
              id="password"
              placeholder="Entrez votre mot de passe."
              className={`form-control ${errors.password ? "is-invalid" : ""}`}
            />
            {errors.password && (
              <Form.Text className="text-danger">
                {errors.password.message}
              </Form.Text>
            )}
          </Form.Group>

          <div className="group">
            <Button
              type="submit"
              className="button"
              variant="outline-primary"
            >
              Se connecter
            </Button>
            {loading && <Spinner animation="border" />}
            {error && <p className="text-danger">{error.message}</p>}
          </div>
        </Form>
        <div className="hr"></div>
        <div className="foot-lnk">
          <Link to="/register">S'inscrire</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
