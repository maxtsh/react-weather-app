import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const API_KEY = "8830cd81f73deb943fa440272e6cb704";

// Current Weather
export async function getWeather(dispatch, city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

  try {
    const res = await axios.get(url);

    dispatch({
      type: "GET_WEATHER",
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: "WEATHER_ERROR",
      payload: err.response,
    });
  }
}
export function clearWeather(dispatch) {
  dispatch({
    type: "CLEAR_WEATHER",
  });
}

// Full One Call Weather
export async function getFullWeather(dispatch, lon, lat) {
  const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;

  try {
    const res = await axios.get(url);
    dispatch({
      type: "GET_FULL_WEATHER",
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: "FULL_WEATHER_ERROR",
    });
  }
}
export function clearFullWeather(dispatch) {
  dispatch({
    type: "CLEAR_FULL_WEATHER",
  });
}

// Saving current city to localStorage
export function saveCityToLs(cityData) {
  let cities;
  if (!localStorage.getItem("cities")) {
    cities = [];
  } else if (
    JSON.parse(localStorage.getItem("cities")).find(
      (item) => item.lon === cityData.lon
    )
  ) {
    const error = new Error();
    throw error;
  } else {
    cities = JSON.parse(localStorage.getItem("cities"));
  }
  const cityName = cityData.city.split("");
  cityName.splice(0, 1, cityData.city.split("")[0].toUpperCase());
  cities.push({ ...cityData, city: cityName.join(""), id: uuidv4() });

  localStorage.setItem("cities", JSON.stringify(cities));
}

// Deleting current city from localStorage
export function deleteCityFromLs(cityId) {
  const allCities = loadCitiesFromLs();
  if (
    JSON.parse(localStorage.getItem("cities")).find(
      (item) => item.id === cityId
    )
  ) {
    const savedCity = JSON.parse(localStorage.getItem("cities")).find(
      (item) => item.id === cityId
    );
    const filtered = allCities.filter((city) => city.id !== savedCity.id);

    localStorage.setItem("cities", JSON.stringify(filtered));
  } else {
    const error = new Error();
    throw error;
  }
}

// Clearing all cities from localStorage
export function clearAllCities() {
  if (localStorage.getItem("cities")) {
    localStorage.removeItem("cities");
  } else {
    const err = new Error();
    throw err;
  }
}

// Loading all the cities from localStorage
export function loadCitiesFromLs() {
  if (
    !localStorage.getItem("cities") ||
    localStorage.getItem("cities") === ""
  ) {
    return null;
  } else {
    return JSON.parse(localStorage.getItem("cities"));
  }
}
