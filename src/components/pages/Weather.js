import React, { useEffect, useContext } from 'react';
import {getWeather, clearWeather} from '../../actions/index';
import { weatherContext } from '../../context/weatherContext';

// Weather Styles
import './Weather.css';

import cloud from '../../images/cloud.svg'
import weatherDraw from '../../images/weather-draw.svg'


const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const weekDays = ["Sunday","Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const time = new Date();

function Weather(props){
    const {weather, dispatch } = useContext(weatherContext);
    const { city } = props.match.params;

    console.log(weather);

    useEffect(() => {
        getWeather(dispatch, city);

        return () => clearWeather;
    }, [dispatch, city]);

    if(!weather.weather || weather.loading){
        return(
            <h1>Loading...</h1>
        )
    }

    const currentTemp = Math.round(weather.weather.main.temp);
    const feelsLike = Math.round(weather.weather.main.feels_like);
    const sunset = weather.weather.sys.sunset;
    const sunrise = weather.weather.sys.sunrise;

    return(
        <div className="weather-container">
            <div className="weather-wrapper">
                <div className="weather-left">
                    <h1>left</h1>
                </div>
                <div className="weather-right">
                    {/* <img className="cloud-1" src={cloud} alt=""/> */}
                    <img className="weather-draw" src={weatherDraw} alt=""/>
                    <div className="overview">
                        <div className="overview-header">
                            <div className="overview-header-today">
                                <h2 className="overview-header-today-title">Today</h2>
                                <p className="overview-header-today-date">
                                    {`${weekDays[time.getDay()]}, ${time.getDate()} ${months[time.getMonth()]} ${time.getFullYear()}`}
                                </p>
                            </div>
                        </div>
                        <div className="overview-header-icon">
                                <img src={`https://openweathermap.org/img/w/${weather.weather.weather[0].icon}.png`} alt=""/>
                        </div>
                        <div className="overview-temp">
                            <h1 className="overview-temp-current">{currentTemp}</h1>
                            <span className="over-view-temp-sign">°C</span>
                        </div>
                        <div className="overview-country">
                            <h4 className="overview-country-text">{`${weather.weather.name}, ${weather.weather.sys.country}`}</h4>
                        </div>
                        <div className="overview-more-info">
                            <p className="overview-more-info-feels-like">{`Feels Like ${feelsLike}°C
                            `}</p>
                            <p className="overview-more-info-sunset">Sunset {sunset}</p>
                            <p className="overview-more-info-sunrise">Sunrise {sunrise}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};
export default Weather;