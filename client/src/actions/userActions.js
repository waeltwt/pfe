import axios from "axios";
import { jwtDecode } from 'jwt-decode';

import {
  USER_REGISTER_FAILED, USER_REGISTER_LOADING, USER_REGISTER_SUCCESS,
  USER_LOGIN_FAILED, USER_LOGIN_LOADING, USER_LOGIN_SUCCESS, USER_LOGOUT, SET_USER
} from "../constants/userConstants";

export const registerNewUser = (userInfo, navigate) => async (dispatch) => {
  try {
    dispatch({ type: USER_REGISTER_LOADING });
    
    const res = await axios.post('http://localhost:5000/api/user/register', userInfo);
    
    dispatch({ type: USER_REGISTER_SUCCESS });

    const { token } = res.data;
    if (token) {
      localStorage.setItem("token", token);
      const decoded = jwtDecode(token);
      dispatch({ type: SET_USER, payload: decoded });
    }
    navigate('/login');  
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAILED, 
      payload: error.response && error.response.data.msg 
        ? error.response.data.msg 
        : error.message 
    });
  }
};

export const loginUser = (userInfo, navigate) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_LOADING });
    
    const res = await axios.post('http://localhost:5000/api/user/login', userInfo);
    
    const { token } = res.data;

    // Stocker le token dans le localStorage
    localStorage.setItem('token', token);

    // Décoder le token JWT pour obtenir les informations utilisateur
    const decodedToken = jwtDecode(token);

    // Met à jour l'état utilisateur dans Redux
    dispatch(setUser(decodedToken));
    dispatch({ type: USER_LOGIN_SUCCESS });

    // Rediriger l'utilisateur selon son rôle
    const role = decodedToken.role;
    if (role === 'admin') {
      navigate('/dashboards');
    } else if (role === 'RH') {
      navigate('/rh');
    } else if (role === 'user') {
      navigate('/annonce');
    } else {
      navigate('/home');
    }

  } catch (error) {
    // Gestion des erreurs
    dispatch({ type: USER_LOGIN_FAILED, payload: error.message });
  }
};

export const logoutUser = (navigate) => (dispatch) => {
  localStorage.removeItem('token'); // Corrigé ici pour supprimer le bon élément
  navigate('/login');

  dispatch({
    type: USER_LOGOUT
  });
};

export const setUser = (user) => ({
  type: SET_USER,
  payload: user
});
