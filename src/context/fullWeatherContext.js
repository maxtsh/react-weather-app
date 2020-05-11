import React, { createContext, useReducer } from 'react';
import fullWeatherReducer from '../reducers/FullWeatherReducer';

const initialWeather = {
    all: null,
    loading: true,
    error: null
};

export const fullWeatherContext = createContext();

export function FullWeatherProvider(props) {
    const [all, dispatch2] = useReducer(fullWeatherReducer, initialWeather);

    return(
        <fullWeatherContext.Provider value={{all, dispatch2}}>
            {props.children}
        </fullWeatherContext.Provider>
    )
};