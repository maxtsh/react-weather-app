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

export function saveCityToLs(cityData) {
  let cities;
  if (!localStorage.getItem("cities")) {
    cities = [];
  } else if (
    JSON.parse(localStorage.getItem("cities")).find(
      (item) => item.city === cityData.city
    )
  ) {
    const error = new Error("current city is already saved!");
    throw error;
  } else {
    cities = JSON.parse(localStorage.getItem("cities"));
  }
  cities.push({ ...cityData, id: uuidv4() });
  localStorage.setItem("cities", JSON.stringify(cities));

  return "Successfully Done.";
}

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
