import React from "react";
import image from './Design_sans_titre__2_-removebg-preview.png';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../slices/userSlice'; 
import './Navbar.css';
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

const Navbare = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Récupérer l'état de l'utilisateur et le statut d'authentification depuis Redux
  const { isAuth, userInfo } = useSelector(state => state.user);

  // Récupérer le rôle de l'utilisateur
  const role = userInfo && userInfo.role ? userInfo.role : null;

  // Fonction pour gérer la déconnexion
  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <header className='header'>
      <a href="/" className="logo">
        <img src={image} alt="Logo" />
      </a>
      <ul className='navbar'>
        <li>
          <NavLink 
            to="/home" 
            className={({ isActive }) => isActive ? 'items active' : 'items'}
          >
            HOME
          </NavLink>
        </li>

        {/* Liens visibles uniquement si non authentifié */}
        {!isAuth && <li><NavLink to="/register" className='items'>Register</NavLink></li>}
        {!isAuth && <li><NavLink to="/login" className='items'>Login</NavLink></li>}

        {/* Liens pour les admins */}
        {isAuth && role === 'admin' && (
          <>
            <li><NavLink to="/dashboards" className={({ isActive }) => isActive ? 'items active' : 'items'}>Dashboard</NavLink></li>
            <li><NavLink to="/rh" className={({ isActive }) => isActive ? 'items active' : 'items'}>Human Resources</NavLink></li>
            <li><NavLink to="/annonce" className={({ isActive }) => isActive ? 'items active' : 'items'}>Annonce</NavLink></li>
          </>
        )}

        {/* Liens pour les RH */}
        {isAuth && role === 'RH' && (
          <>
            <li><NavLink to="/rh" className={({ isActive }) => isActive ? 'items active' : 'items'}>Human Resources</NavLink></li>
            <li><NavLink to="/annonce" className={({ isActive }) => isActive ? 'items active' : 'items'}>Annonce</NavLink></li>
          </>
        )}

        {/* Liens pour les utilisateurs */}
        {isAuth && role === 'user' && (
          <li><NavLink to="/annonce" className={({ isActive }) => isActive ? 'items active' : 'items'}>Annonce</NavLink></li>
        )}

        {/* Bouton de déconnexion pour tous les rôles */}
        {isAuth && (
          <li>
            <button onClick={handleLogout} className='items logout-btn'>Logout</button>
          </li>
        )}
      </ul>
    </header>
  );
};

export default Navbare;
