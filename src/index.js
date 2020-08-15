import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "jquery/dist/jquery.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "styles.css";
import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
import * as serviceWorker from "./serviceWorker";
import UserContext from "globals/contexts/auth.context";

ReactDOM.render(
  <React.StrictMode>
    <UserContext>
      <App />
    </UserContext>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
