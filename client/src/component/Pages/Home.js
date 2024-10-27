import React from "react";
// import 'bootstrap/dist/css/bootstrap.min.css';
import Carousel from 'react-bootstrap/Carousel';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import image1 from './images/Designer (3).jpeg';
import image2 from './images/Designer (7).jpeg';
import image3 from './images/Designer.jpeg';
import smallImage from './images/Designer-removebg-preview.png';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="container">
      <div className="text-home">
        <h1>Bienvenue sur notre plateforme</h1>
        <div className="carousel-container">
          <Carousel data-bs-theme="dark">
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={image1}
                alt="First slide"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={image2}
                alt="Second slide"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={image3}
                alt="Third slide"
              />
            </Carousel.Item>
          </Carousel>
        </div>
        <div className="text-with-image">
          <p>
            Bienvenue sur notre plateforme, l'outil idéal pour mettre en relation les entreprises et les femmes de ménage qualifiées !<br/>
            Notre mission est de faciliter la recherche d'opportunités d'emploi stables pour les femmes de ménage tout en permettant aux recruteurs de publier des annonces efficacement. Grâce à notre plateforme, les entreprises peuvent rapidement trouver le personnel de ménage dont elles ont besoin, tandis que les candidates peuvent explorer et postuler à de nombreuses offres en toute simplicité. Inscrivez-vous dès maintenant pour commencer à postuler et gérer vos candidatures facilement !
          </p>
          <img src={smallImage} alt="Petite icône" className="small-image" />
        </div>
        <div className="cta-section">
          <button onClick={() => navigate('/register')}>S'inscrire maintenant</button>
        </div>
      </div>
    </div>
  );
};

export default Home;
