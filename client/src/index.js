import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import axios from "axios";
import { Provider } from "react-redux";
import store from "./store";
import reportWebVitals from "./reportWebVitals";

axios.defaults.baseURL = "http://localhost:5000";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
  
    <Provider store={store}>
      <App />
    </Provider>
 
</React.StrictMode>
);

reportWebVitals();
