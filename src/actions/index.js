import axios from 'axios';

export async function getWeather(dispatch, city){
    const API_KEY = "8830cd81f73deb943fa440272e6cb704";
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