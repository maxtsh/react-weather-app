import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

// Global Style
import "./styles/global.css";
import "./styles/css/style.css";
// Page styles
import "./styles/components/pages/Home.css";
import "./styles/components/pages/Weather.css";
import "./styles/components/pages/NotFound.css";
// Layout Styles
import "./styles/components/layouts/header.css";
import "./styles/components/layouts/WeatherDaily.css";
import "./styles/components/layouts/WeatherHourly.css";
import "./styles/components/layouts/CitiesList.css";
import "./styles/components/layouts/BackBtn.css";
// Form styles
import "./styles/components/forms/SelectSavedCities.css";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
