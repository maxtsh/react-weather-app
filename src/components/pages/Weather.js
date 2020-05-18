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
} from "../../actions/index";
import { fullWeatherContext } from "../../context/fullWeatherContext";
import { weatherContext } from "../../context/weatherContext";

// Components
import BackBtn from "../layouts/BackBtn";
import SelectSavedCities from "../forms/SelectSavedCities";
import Loader from "../layouts/Loader";
import ErrorBoundary from "../../ErrorBoundry/ErrorBoundary"; // For Thrown Errors
import ErrorHandler from "../../ErrorBoundry/ErrorHandler"; // For Async Catch

// Weather Styles
import "./Weather.css";

// Utilities
import { weekDays } from "../../utils/getDaily";
import { months } from "../../utils/getMonths";

// Images
import weatherDraw from "../../images/weather-draw.svg";
import berlin from "../../images/cities/berlin.jpg";
import france from "../../images/cities/france.jpg";
import newyork from "../../images/cities/newyork.jpg";
import london from "../../images/cities/london.jpg";

// Components With Lazy-Load
const WeatherDaily = lazy(() => import("../layouts/WeatherDaily.js"));
const WeatherHourly = lazy(() => import("../layouts/WeatherHourly.js"));

const time = new Date();

function Weather(props) {
  const { fullWeather, dispatch2 } = useContext(fullWeatherContext);
  const { weather, dispatch } = useContext(weatherContext);
  const [popup, setPopup] = useState({ show: false, message: "", type: "" });
  const { city, coord } = props.match.params;
  const lon = coord.split("&")[0];
  const lat = coord.split("&")[1];

  console.log("RENDER");
  console.log(weather);

  useEffect(() => {
    getFullWeather(dispatch2, lon, lat);

    return () => clearFullWeather(dispatch2);
  }, [dispatch2, lon, lat]);

  useEffect(() => {
    getWeather(dispatch, city);

    return () => clearWeather(dispatch);
  }, [dispatch, city]);

  useEffect(() => {
    let errTimeout = null;
    if (popup.show) {
      errTimeout = setTimeout(() => {
        setPopup({ ...popup, show: false });
      }, 5000);
    }
    return () => clearTimeout(errTimeout);
  }, [popup]);

  const handleCitySubmit = useCallback(
    (e) => {
      e.preventDefault();
      try {
        const result = saveCityToLs({ city, lon, lat });
        if (result) {
          setPopup({ show: true, message: result, type: "success" });
        }
      } catch (err) {
        setPopup({ show: true, message: err.message, type: "error" });
      }
    },
    [city, lon, lat]
  );

  if (!fullWeather.all || fullWeather.loading || !weather.weather) {
    return <Loader classes="main" />;
  } else if (fullWeather.error) {
    return (
      <ErrorHandler
        message={fullWeather.error.data.message}
        currentLang="English"
        type="error"
      />
    );
  } else if (weather.error) {
    return (
      <ErrorHandler
        message={weather.error.data.message}
        currentLang="English"
        type="error"
      />
    );
  } else if (
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

  const currentTemp = Math.round(fullWeather.all.current.temp);
  const feelsLike = Math.round(fullWeather.all.current.feels_like);
  const sunset = fullWeather.all.current.sunset;
  const sunrise = fullWeather.all.current.sunrise;

  return (
    <ErrorBoundary currentLang="English">
      {popup.show ? (
        <ErrorHandler
          currentLang="English"
          message={popup.message}
          type={popup.type}
        />
      ) : null}
      <div className="weather-container">
        <div className="weather-wrapper">
          <div className="weather-left">
            <div className="weather-left-container">
              <BackBtn />
              <SelectSavedCities />
              <div className="main-title-wrapper">
                <h1 className="main-title-text">
                  Weather <span className="main-title-text-bold">Forecast</span>
                </h1>
              </div>
              <div className="cities-list">
                <div className="city-item">
                  <img className="city-img" src={berlin} alt="berlin" />
                  <p className="city-name">Berlin, Germany</p>
                </div>
                <div className="city-item">
                  <img className="city-img" src={france} alt="france" />
                  <p className="city-name">Paris, France</p>
                </div>
                <div className="city-item">
                  <img className="city-img" src={newyork} alt="newyork" />
                  <p className="city-name">New York, USA</p>
                </div>
                <div className="city-item">
                  <img className="city-img" src={london} alt="london" />
                  <p className="city-name">London, Britain</p>
                </div>
                <div className="city-item">
                  <div className="city-add">
                    <i className="fas fa-plus"></i>
                    <form onSubmit={handleCitySubmit}>
                      <input
                        className="city-add-text"
                        type="submit"
                        value="Save City"
                      />
                    </form>
                  </div>
                </div>
              </div>
              <div className="daily">
                <div className="daily-title">
                  <h2 className="daily-title-text">
                    Week<div className="dot"></div>
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
            <img className="weather-draw" src={weatherDraw} alt="" />
            <div className="overview">
              <div className="overview-header">
                <div className="overview-header-today">
                  <h2 className="overview-header-today-title">Today</h2>
                  <p className="overview-header-today-date">
                    {`${weekDays[time.getDay()]}, ${time.getDate()} ${
                      months[time.getMonth()]
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
                  <p>{`Humidity ${fullWeather.all.current.humidity}%`}</p>
                  <i className="fas fa-tint"></i>
                </div>
                <div className="overview-dewpoint">
                  <p>{`Dew Point ${fullWeather.all.current.dew_point}°C`}</p>
                  <i className="fas fa-hand-holding-water"></i>
                </div>
              </div>
              <div className="overview-more-info">
                <p className="overview-more-info-feels-like">{`Feels Like ${feelsLike}°C
                            `}</p>
                <p className="overview-more-info-sunset">Sunset {sunset}</p>
                <p className="overview-more-info-sunrise">Sunrise {sunrise}</p>
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
