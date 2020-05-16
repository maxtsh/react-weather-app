import React, { useState, useCallback, useEffect, useContext } from "react";

// Custom Hooks
import { useForm } from "../../hooks/useForm";

// Context API
import { getWeather, clearWeather } from "../../actions/index";
import { weatherContext } from "../../context/weatherContext";
import { languageContext } from "../../context/languageContext";

// Components
import Header from "../layouts/Header";
import ErrorHandler from "../../ErrorBoundry/ErrorHandler";

// Styles
import "./Home.css";

// Languages Data
import { homeLanguages } from "../../utils/languageData";

function Home() {
  const { weather, dispatch } = useContext(weatherContext);
  const { language } = useContext(languageContext);
  const [userForm, change] = useForm({ city: "" });
  const [errUI, setErrUI] = useState(false);

  // This useEffect will cleanUp API data after each component mounting
  useEffect(() => {
    return () => clearWeather(dispatch);
  }, [dispatch]);

  // If there is any error from API then this useEffect will
  // trigger ErrorUI to be shown for a limited time
  useEffect(() => {
    if (weather.error) {
      setErrUI(true);
    }
    // Error timeout which will turn off errUI after 3seconds
    const errTimeout = setTimeout(() => {
      setErrUI(false);
    }, 3000);
    return () => clearTimeout(errTimeout);
  }, [weather.error]);

  // Handle Change Callback Optimization
  const handleChange = useCallback((e) => change(e), [change]);
  // Handle Submit Callback Optimization
  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      getWeather(dispatch, userForm.city);
    },
    [dispatch, userForm.city]
  );

  // If there is no error and the weather for submited city exists then redirect to Weather.js
  if (!weather.error && weather.weather) {
    window.location.assign(
      `/weather/${userForm.city}/${weather.weather.coord.lon}&${weather.weather.coord.lat}`
    );
  }

  return (
    <>
      <Header />
      <div
        style={{ direction: homeLanguages[language.current].style.dir }}
        className="home-container"
      >
        <div className="search-container">
          <div className="form-container">
            <h1 className="search-title">
              {homeLanguages[language.current].searchTitle}
            </h1>
            <form className="form" onSubmit={handleSubmit}>
              <input
                className="search-field"
                type="text"
                name="city"
                value={userForm.city}
                onChange={handleChange}
                style={homeLanguages[language.current].style.borderRadiusField}
              />
              <input
                className="search-submit"
                type="submit"
                value={homeLanguages[language.current].submit}
                style={homeLanguages[language.current].style.borderRadiusSubmit}
              />
            </form>
            {errUI ? (
              <ErrorHandler
                message={weather.error.data.message}
                currentLang={language.current}
              />
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
}
export default Home;
