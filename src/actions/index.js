import axios from 'axios';

const API_KEY = "8830cd81f73deb943fa440272e6cb704";

// Current Weather
export async function getWeather(dispatch, city){
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

    try{
        const res = await axios.get(url);

        dispatch({
            type: "GET_WEATHER",
            payload: res.data
        });

    }catch(err){
        dispatch({
            type: "WEATHER_ERROR",
            payload: err.response
        });
    };
};
export function clearWeather(dispatch){
    dispatch({
        type: "CLEAR_WEATHER"
    });
};

// Full One Call Weather
export async function getFullWeather(dispatch, lon, lat){
    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;

    try{
        const res = await axios.get(url);
        dispatch({
            type: "GET_FULL_WEATHER",
            payload: res.data
        });

    }catch(err){
        dispatch({
            type: "FULL_WEATHER_ERROR"
        })
    }
};
export function clearFullWeather(dispatch){
    dispatch({
        type: "CLEAR_FULL_WEATHER"
    });
};