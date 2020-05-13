import React, { useEffect, useContext } from "react";

import { getFullWeather, clearFullWeather } from "../../actions/index";
import { fullWeatherContext } from "../../context/fullWeatherContext";

import WeatherDaily from "../layouts/WeatherDaily";
import WeatherHourly from "../layouts/WeatherHourly";
import ErrorHandler from "../../ErrorBoundry/ErrorHandler";

// Weather Styles
import "./Weather.css";

// import cloud from '../../images/cloud.svg'
import weatherDraw from "../../images/weather-draw.svg";
import berlin from "../../images/cities/berlin.jpg";
import france from "../../images/cities/france.jpg";
import newyork from "../../images/cities/newyork.jpg";
import london from "../../images/cities/london.jpg";

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const weekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const time = new Date();

function Weather(props) {
  const { fullWeather, dispatch } = useContext(fullWeatherContext);
  const { city, coord } = props.match.params;

  const lon = coord.split("&")[0];
  const lat = coord.split("&")[1];

  console.log("RENDER");
  console.log(fullWeather);

  useEffect(() => {
    getFullWeather(dispatch, lon, lat);

    return () => clearFullWeather(dispatch);
  }, [dispatch, lon, lat]);

  if (!fullWeather.all || fullWeather.loading) {
    return <h1>Loading...</h1>;
  } else if (fullWeather.error) {
    return (
      <ErrorHandler
        message={fullWeather.error.data.message}
        currentLang="English"
      />
    );
  }

  const currentTemp = Math.round(fullWeather.all.current.temp);
  const feelsLike = Math.round(fullWeather.all.current.feels_like);
  const sunset = fullWeather.all.current.sunset;
  const sunrise = fullWeather.all.current.sunrise;
  const cityName = city.split("");
  cityName.splice(0, 1, city.split("")[0].toUpperCase());

  return (
    <div className="weather-container">
      <div className="weather-wrapper">
        <div className="weather-left">
          <div className="form-wrapper">
            <form className="form">
              <div className="input-group">
                <i className="fas fa-search-location"></i>
                <input
                  className="search-input"
                  type="text"
                  name="cities"
                  placeholder="Search for saved cities"
                />
              </div>
              <input className="search-submit" type="submit" name="Find" />
            </form>
          </div>
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
                <p className="city-add-text">Add city</p>
              </div>
            </div>
          </div>
          <div className="daily">
            <div className="daily-title">
              <h2 className="daily-title-text">Week</h2>
              <WeatherDaily data={fullWeather.all.daily} />
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
              <h4 className="overview-country-text">{`${cityName.join(
                ""
              )}`}</h4>
            </div>
            <div className="overview-humiditydew">
              <div className="overview-humidity">
                <p>{`Humidity ${fullWeather.all.current.humidity}%`}</p>
                <i className="fas fa-humidity"></i>
              </div>
              <div className="overview-dewpoint">
                <p>{`Dew Point ${fullWeather.all.current.dew_point}°C`}</p>
                <i className="fas fa-dewpoint"></i>
              </div>
            </div>
            <div className="overview-more-info">
              <p className="overview-more-info-feels-like">{`Feels Like ${feelsLike}°C
                            `}</p>
              <p className="overview-more-info-sunset">Sunset {sunset}</p>
              <p className="overview-more-info-sunrise">Sunrise {sunrise}</p>
            </div>
          </div>
          <WeatherHourly data={fullWeather.all.hourly.slice(0, 24)} />
        </div>
      </div>
    </div>
  );
}
export default Weather;
