import React, { useEffect, useContext } from "react";
import { useForm } from "../../hooks/useForm";

import { getWeather, clearWeather } from "../../actions/index";
import { weatherContext } from "../../context/weatherContext";
import { languageContext } from "../../context/languageContext";

import Header from "../layouts/Header";
import ErrorHandler from "../../ErrorBoundry/ErrorHandler";

// Home Styles
import "./Home.css";

const languages = {
  English: {
    searchTitle: "Search for latest weather updates",
    submit: "Get Weather",
    direction: "ltr",
  },
  Persian: {
    searchTitle: "آخرین تغییرات آب و هوایی رو جست و جو کنید",
    submit: "دریافت آب و هوا",
    direction: "rtl",
  },
};

function Home() {
  const { weather, dispatch } = useContext(weatherContext);
  const { language } = useContext(languageContext);

  const [userForm, change] = useForm({ city: "" });

  console.log("RENDER!");

  useEffect(() => {
    return () => clearWeather(dispatch);
  }, [dispatch]);

  function handleSubmit(e) {
    e.preventDefault();
    getWeather(dispatch, userForm.city);
  }

  if (!weather.error && weather.weather) {
    console.log(userForm.city);
    window.location.assign(
      `/weather/${userForm.city}/${weather.weather.coord.lon}&${weather.weather.coord.lat}`
    );
  }

  return (
    <>
      <Header />
      <div
        style={{ direction: languages[language.current].direction }}
        className="home-container"
      >
        <div className="search-container">
          <div className="form-container">
            <h1 className="search-title">
              {languages[language.current].searchTitle}
            </h1>
            <form className="form" onSubmit={handleSubmit}>
              <input
                className="search-field"
                type="text"
                name="city"
                value={userForm.city}
                onChange={change}
              />
              <input
                className="search-submit"
                type="submit"
                value={languages[language.current].submit}
              />
            </form>
            {weather.error ? (
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
