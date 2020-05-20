import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Providers
import { WeatherProvider } from "./context/weatherContext";
import { FullWeatherProvider } from "./context/fullWeatherContext";
import { LanguageProvider } from "./context/languageContext";

// Pages
import Home from "./components/pages/Home";
import Weather from "./components/pages/Weather";
import NotFound from "./components/pages/NotFound";

function App() {
  return (
    <WeatherProvider>
      <LanguageProvider>
        <FullWeatherProvider>
          <Router>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/weather/:city/:coord" component={Weather} />
              <Route component={NotFound} />
            </Switch>
          </Router>
        </FullWeatherProvider>
      </LanguageProvider>
    </WeatherProvider>
  );
}
export default App;
