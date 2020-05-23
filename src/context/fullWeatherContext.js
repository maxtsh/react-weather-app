import React, { createContext, useReducer, useMemo } from "react";
import fullWeatherReducer from "../reducers/FullWeatherReducer";

const initialWeather = {
  all: null,
  loading: true,
  error: null,
};

export const fullWeatherContext = createContext();
export const FWDispatchContext = createContext();

export function FullWeatherProvider(props) {
  const [fullWeather, dispatch2] = useReducer(
    fullWeatherReducer,
    initialWeather
  );

  const fullWeatherValue = useMemo(() => fullWeather, [fullWeather]);
  const dispValue = useMemo(() => dispatch2, []);

  return (
    <fullWeatherContext.Provider value={fullWeatherValue}>
      <FWDispatchContext.Provider value={dispValue}>
        {props.children}
      </FWDispatchContext.Provider>
    </fullWeatherContext.Provider>
  );
}
