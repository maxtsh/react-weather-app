import React, { createContext, useReducer, useMemo } from "react";
import weatherReducer from "../reducers/WeatherReducer";

const initialWeather = {
  weather: null,
  loading: true,
  error: null,
};

export const weatherContext = createContext();
export const WDispatchContext = createContext();

export function WeatherProvider(props) {
  const [weather, dispatch] = useReducer(weatherReducer, initialWeather);

  const weatherValue = useMemo(() => weather, [weather]);
  const dispValue = useMemo(() => dispatch, []);

  return (
    <weatherContext.Provider value={weatherValue}>
      <WDispatchContext.Provider value={dispValue}>
        {props.children}
      </WDispatchContext.Provider>
    </weatherContext.Provider>
  );
}
