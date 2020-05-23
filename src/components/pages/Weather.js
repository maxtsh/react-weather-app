import React, {
  useState,
  useEffect,
  useCallback,
  useContext,
  Suspense,
  lazy,
} from "react";

// Context API
import {
  getWeather,
  clearWeather,
  getFullWeather,
  clearFullWeather,
  saveCityToLs,
  deleteCityFromLs,
} from "../../actions/index";
import {
  fullWeatherContext,
  FWDispatchContext,
} from "../../context/fullWeatherContext";
import { weatherContext, WDispatchContext } from "../../context/weatherContext";
import {
  languageContext,
  dispatchContext,
} from "../../context/languageContext";

// Components
import LiveClock from "../layouts/LiveClock";
import CitiesList from "../layouts/CitiesList";
import BackBtn from "../layouts/BackBtn";
import SelectSavedCities from "../forms/SelectSavedCities";
import Loader from "../layouts/Loader";
import ErrorBoundary from "../../ErrorBoundry/ErrorBoundary"; // For Thrown Errors
import ErrorHandler from "../../ErrorBoundry/ErrorHandler"; // For Async Catch

// Utilities
import { getWeekDays } from "../../utils/getDaily";
import getMonths from "../../utils/getMonths";

// Images
import weatherDraw from "../../images/weather-draw.svg";

// Languages Data
import { weatherLangs } from "../../utils/languageData";

// Components With Lazy-Load
const WeatherDaily = lazy(() => import("../layouts/WeatherDaily.js"));
const WeatherHourly = lazy(() => import("../layouts/WeatherHourly.js"));

const time = new Date();

function Weather(props) {
  const [popup, setPopup] = useState({ show: false, message: "", type: "" });
  // Language Context & Dispatch
  const language = useContext(languageContext);
  const langDispatch = useContext(dispatchContext);
  // Weather Context & Dispatch
  const weather = useContext(weatherContext);
  const dispatch = useContext(WDispatchContext);
  // Full Weather Context & Dispatch
  const fullWeather = useContext(fullWeatherContext);
  const dispatch2 = useContext(FWDispatchContext);

  const { city, coord } = props.match.params;
  const lon = coord.split("&")[0];
  const lat = coord.split("&")[1];

  console.log("RENDER");

  // Fetching full weather data
  useEffect(() => {
    getFullWeather(dispatch2, lon, lat);

    return () => clearFullWeather(dispatch2);
  }, [dispatch2, lon, lat]);

  // Fetching current weather data
  useEffect(() => {
    getWeather(dispatch, city);

    return () => clearWeather(dispatch);
  }, [dispatch, city]);

  // Side effect timeout for PopUp on UI
  useEffect(() => {
    let popupTimeout = null;

    if (popup.show) {
      popupTimeout = setTimeout(() => {
        setPopup({ ...popup, show: false });
      }, 5000);
    }
    return () => clearTimeout(popupTimeout);
  }, [popup]);

  // Adding current city to the localstorage event handler
  const handleCitySubmit = useCallback(
    (e) => {
      e.preventDefault();
      try {
        const result = saveCityToLs({ city, lon, lat });
        setPopup({ show: true, message: result, type: "success" });
      } catch (err) {
        setPopup({ show: true, message: err.message, type: "error" });
      }
    },
    [city, lon, lat]
  );

  // Deleting current city from the localstorage event handler
  const handleCityDelete = useCallback((e, id) => {
    e.preventDefault();
    try {
      const result = deleteCityFromLs(id);
      setPopup({ show: true, message: result, type: "success" });
    } catch (err) {
      setPopup({ show: true, message: err.message, type: "error" });
    }
  }, []);

  // Togle Language Change
  function toggleLanguage(e) {
    langDispatch({
      type: "CHANGE_LANGUAGE",
      payload: e.target.checked ? "Persian" : "English",
    });
  }

  // If data is not fetched then show the loading screen
  if (
    !fullWeather.all ||
    fullWeather.loading ||
    !weather.weather ||
    weather.loading
  ) {
    return <Loader classes="main" />;
  } else if (fullWeather.error) {
    // if any error happens from fullWeather-fetch then show it on popup
    return (
      <ErrorHandler
        message={fullWeather.error.data.message}
        currentLang="English"
        type="error"
      />
    );
  } else if (weather.error) {
    // if any error happens from weather-fetch then show it on popup
    return (
      <>
        <BackBtn />
        <ErrorHandler
          message={weather.error.data.message}
          currentLang="English"
          type="error"
        />
      </>
    );
  } else if (
    // if the user changes city-name in the url then check the lon and lat to weather-fetch
    // if there is mis-match then show it on popup
    weather.weather.coord.lon !== Number(lon) ||
    weather.weather.coord.lat !== Number(lat)
  ) {
    return (
      <>
        <BackBtn />
        <ErrorHandler
          message="Coordinations doesn't match the city name!"
          currentLang="English"
          type="error"
        />
      </>
    );
  }

  // Simple calculations
  const currentTemp = Math.round(fullWeather.all.current.temp);
  const feelsLike = Math.round(fullWeather.all.current.feels_like);
  // const sunset = fullWeather.all.current.sunset;
  // const sunrise = fullWeather.all.current.sunrise;

  return (
    <ErrorBoundary currentLang={language.current}>
      {popup.show ? (
        <ErrorHandler
          currentLang="English"
          message={popup.message}
          type={popup.type}
        />
      ) : null}
      <div
        style={{ direction: weatherLangs[language.current].style.dir }}
        className="weather-container"
      >
        <div className="weather-wrapper">
          <div className="weather-left">
            <div className="weather-left-container">
              <div className="buttons-group">
                <div className="button r" id="button-3">
                  <input
                    type="checkbox"
                    className="checkbox"
                    onChange={toggleLanguage}
                  />
                  <div className="knobs"></div>
                  <div className="layer"></div>
                </div>
              </div>
              <BackBtn />
              <SelectSavedCities />
              <div className="main-title-wrapper">
                <h1 className="main-title-text">
                  {weatherLangs[language.current].mainTitle.normal}{" "}
                  <span className="main-title-text-bold">
                    {weatherLangs[language.current].mainTitle.bold}
                  </span>
                </h1>
              </div>
              <p>{weatherLangs[language.current].leading}</p>
              <CitiesList
                currentCityLon={lon}
                saveCity={handleCitySubmit}
                deleteCity={handleCityDelete}
              />
              <div className="daily">
                <div className="daily-title">
                  <h2 className="daily-title-text">
                    {weatherLangs[language.current].week}
                    <div className="dot"></div>
                  </h2>
                  <Suspense fallback={<Loader classes="fall" />}>
                    <WeatherDaily data={fullWeather.all.daily} />
                  </Suspense>
                </div>
              </div>
            </div>
          </div>
          <div className="weather-right">
            <i className="fas fa-cloud cloud-1"></i>
            <i className="fas fa-cloud cloud-2"></i>
            <LiveClock />
            <img className="weather-draw" src={weatherDraw} alt="" />
            <div className="overview">
              <div className="overview-header">
                <div className="overview-header-today">
                  <h2 className="overview-header-today-title">
                    {weatherLangs[language.current].today}
                  </h2>
                  <p className="overview-header-today-date">
                    {`${
                      getWeekDays(language.current)[time.getDay()]
                    }, ${time.getDate()} ${
                      getMonths(language.current)[time.getMonth()]
                    } ${time.getFullYear()}`}
                  </p>
                </div>
              </div>
              <div className="overview-header-icon">
                <img
                  src={`https://openweathermap.org/img/w/${fullWeather.all.current.weather[0].icon}.png`}
                  alt=""
                />
              </div>
              <div className="overview-temp">
                <h1 className="overview-temp-current">{currentTemp}</h1>
                <span className="over-view-temp-sign">°C</span>
              </div>
              <div className="overview-country">
                <h4 className="overview-country-cityname">
                  {weather.weather.name}
                </h4>
                <small className="overview-country-timezone">
                  {fullWeather.all.timezone}
                </small>
              </div>
              <div className="overview-humiditydew">
                <div className="overview-humidity">
                  <p>{`${weatherLangs[language.current].humidity} ${
                    fullWeather.all.current.humidity
                  }%`}</p>
                  <i className="fas fa-tint"></i>
                </div>
                <div className="overview-dewpoint">
                  <p>{`${weatherLangs[language.current].dewPoint} ${
                    fullWeather.all.current.dew_point
                  }°C`}</p>
                  <i className="fas fa-hand-holding-water"></i>
                </div>
              </div>
              <div className="overview-more-info">
                <p className="overview-more-info-feels-like">{`${
                  weatherLangs[language.current].feelsLike
                } ${feelsLike}°C
                            `}</p>
                {/* <p className="overview-more-info-sunset">Sunset {sunset}</p>
                <p className="overview-more-info-sunrise">Sunrise {sunrise}</p> */}
              </div>
            </div>
            <Suspense fallback={<Loader classes="fall-back" />}>
              <WeatherHourly data={fullWeather.all.hourly} />
            </Suspense>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
}
export default Weather;
