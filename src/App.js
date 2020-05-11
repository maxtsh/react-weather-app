import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// Providers
import { WeatherProvider } from './context/weatherContext';
import { FullWeatherProvider } from './context/fullWeatherContext';
import { LanguageProvider } from './context/languageContext';

// Pages
import Home from './components/pages/Home';
import Weather from './components/pages/Weather';
import About from './components/pages/About';

import ErrorBoundary from './ErrorBoundry/ErrorBoundary';

// Global Style
import './styles/global.css';



function App() {
  return (
    <Router>
      <Switch>
        <FullWeatherProvider>
        <WeatherProvider>
        <LanguageProvider>

          <ErrorBoundary>
            <Route exact path="/" component={Home} />
          </ErrorBoundary>

          <ErrorBoundary>
          <Route exact path="/weather/:city/:coord" component={Weather} />
          </ErrorBoundary>

          <Route exact path="/about" component={About} />

        </LanguageProvider>
        </WeatherProvider>
        </FullWeatherProvider>
      </Switch>
    </Router>
  );
};
export default App;