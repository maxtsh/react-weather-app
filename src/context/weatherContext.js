import React, { createContext, useReducer, useMemo } from "react";
import weatherReducer from "../reducers/WeatherReducer";

const initialWeather = {
  weather: null,
  loading: true,
  error: null,
};

export const weatherContext = createContext();

export function WeatherProvider(props) {
  const [weather, dispatch] = useReducer(weatherReducer, initialWeather);

  const value = useMemo(() => ({ weather, dispatch }), [weather]);

  return (
    <weatherContext.Provider value={value}>
      {props.children}
    </weatherContext.Provider>
  );
}
