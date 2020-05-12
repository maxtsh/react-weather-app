import React, { createContext, useReducer, useMemo } from "react";
import fullWeatherReducer from "../reducers/FullWeatherReducer";

const initialWeather = {
  all: null,
  loading: true,
  error: null,
};

export const fullWeatherContext = createContext();

export function FullWeatherProvider(props) {
  const [fullWeather, dispatch] = useReducer(
    fullWeatherReducer,
    initialWeather
  );

  const value = useMemo(() => ({ fullWeather, dispatch }), [fullWeather]);

  return (
    <fullWeatherContext.Provider value={value}>
      {props.children}
    </fullWeatherContext.Provider>
  );
}
