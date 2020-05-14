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
    style: {
      dir: "ltr",
      borderRadiusSubmit: {
        borderTopRightRadius: "0.5rem",
        borderBottomRightRadius: "0.5rem",
      },
      borderRadiusField: {
        borderTopLeftRadius: "0.5rem",
        borderBottomLeftRadius: "0.5rem",
      },
    },
  },
  Persian: {
    searchTitle: "آخرین تغییرات آب و هوایی رو جست و جو کن",
    submit: "دریافت آب و هوا",
    style: {
      dir: "rtl",
      borderRadiusSubmit: {
        borderTopLeftRadius: "0.5rem",
        borderBottomLeftRadius: "0.5rem",
      },
      borderRadiusField: {
        borderTopRightRadius: "0.5rem",
        borderBottomRightRadius: "0.5rem",
      },
    },
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
        style={{ direction: languages[language.current].style.dir }}
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
                style={languages[language.current].style.borderRadiusField}
              />
              <input
                className="search-submit"
                type="submit"
                value={languages[language.current].submit}
                style={languages[language.current].style.borderRadiusSubmit}
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
