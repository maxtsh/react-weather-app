import React, { useEffect, useContext } from 'react';
import { useForm } from '../../hooks/useForm';
import Header from '../layouts/Header';

import { getWeather, clearWeather } from '../../actions/index';
import { weatherContext } from '../../context/weatherContext';
import { languageContext } from '../../context/languageContext';

// Home Styles
import './Home.css';

const languages = {
    English: {
        searchTitle: "Search for latest weather updates",
        errMessage: "We are sorry about this but"
    },
    Persian: {
        searchTitle: "آخرین تغییرات آب و هوایی رو جست و جو کنید",
        errMessage: "متاسفانه خطایی رخ داده است که"
    }
};

function Home() {
    const { weather, dispatch } = useContext(weatherContext);
    const { language } = useContext(languageContext);

    const [userForm, change] = useForm({ city: ""});


    console.log("RENDER!");

    useEffect(() => {

        return () => clearWeather(dispatch);
    }, [dispatch]);

    function handleSubmit(e){
        e.preventDefault();
        getWeather(dispatch, userForm.city);
    };

    if(!weather.error && weather.weather){
        console.log(userForm.city);
        window.location.assign(`/weather/${userForm.city}`);
    }

    return (
        <>
        <Header />
        <div className="home-container">
            <div className="search-container">
                <div className="form-container">            
                    <h1 className="search-title">{languages[language.current].searchTitle }</h1>
                    <form className="form" onSubmit={handleSubmit}>
                        <input 
                            className="search-field" 
                            type="text" 
                            name="city" 
                            value={userForm.city}
                            onChange={change} />
                        <input className="search-submit" type="submit" value="Get Weather" />
                    </form>
                    {weather.error ? (
                        <div className="error-wrapper">
                            <i className="fas fa-exclamation-circle"></i>
                            <h3 className="error-message">{languages[language.current].errMessage + " " +  weather.error.data.message}!</h3>
                        </div>
                    ) 
                    : null}
                </div>
            </div>
        </div>
        </>
    )
};
export default Home;