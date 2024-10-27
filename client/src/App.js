import React, { useEffect } from "react";
import "./App.css";
import Navbar from "./component/Navbar/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
// import { loadUser } from "./slices/userSlice"; 
import Login from "./component/Pages/Login";
import Register from "./component/Pages/Register";
import Home from "./component/Pages/Home";
import Dashboards from "./component/Pages/Dashboard";
import Details from "./component/Pages/resource/Details";
import Annonce from "./component/Pages/Annonce";
import HumanResources from "./component/Pages/HumanResources";
import FormPostuler from "./component/Pages/resource/FormPostuler";
import Notifications from "./component/Pages/resource/Notifications";
import { loadUserFromToken } from "./slices/userSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUserFromToken()); // Charger l'utilisateur depuis le token
  }, [dispatch]);

  return (
    <div className="App">
      <Router>
        <div>
          <Navbar />
        </div>
        <Routes>
          <Route path="/:id" element={<Details />} />
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/dashboards" element={<Dashboards />} />
          <Route path="/annonce" element={<Annonce />} />
          <Route path="/rh" element={<HumanResources />} />
          <Route path="/postuler/:id" element={<FormPostuler />} />
          <Route path="/annonce/:annonceId" element={<Notifications />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
