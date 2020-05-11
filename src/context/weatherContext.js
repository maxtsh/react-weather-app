import React, { createContext, useReducer } from 'react';
import weatherReducer from '../reducers/WeatherReducer';

const initialWeather = {
    weather: null,
    loading: true,
    error: null
};

export const weatherContext = createContext();

export function WeatherProvider (props) {
    const [weather, dispatch] = useReducer(weatherReducer, initialWeather);

    return(
        <weatherContext.Provider value={{weather, dispatch}}>
            {props.children}
        </weatherContext.Provider>
    )
};