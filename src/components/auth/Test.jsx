import React, { useState, useEffect } from 'react';
import './Weather.css';
import clear from './clear.png';
import cloud from './cloud.png';
import drizzle from './drizzle.png';
import rain from './rain.png';
import snow from './snow.png';
import search from './search.png';
import humidity from './humidity.png';
import wind from './wind.png';

const Weather = () => {
    const [weatherData, setWeatherData] = useState(null);
    
    const allIcons = {
        "01d": clear,
        "01n": clear,
        "02d": cloud,
        "02n": cloud,
        "03d": cloud,
        "03n": cloud,
        "04d": drizzle,
        "04n": drizzle,
        "09d": rain,
        "09n": rain,
        "10d": rain,
        "10n": rain,
        "13d": snow,
        "13n": snow,
    };

    const search = async (city) => {
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;
            const response = await fetch(url);
            const data = await response.json();
            const icon = allIcons[data.weather[0].icon] || clear;
            setWeatherData({
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
                temperature: Math.floor(data.main.temp),
                location: data.name,
                icon: icon
            });
        } catch (error) {
           
        }
    };

    useEffect(() => {
        search("new york");
    }, []);

   

    return (
        <div className='weather'>
            <div className="search-bar">
                <input type="text" placeholder='Search' />
                <img src={search} alt="Search" />
            </div>
            <img src={weatherData.icon} className='weather-icon' alt="Weather Icon" />
            <p className="temperature">{weatherData.temperature} °C</p>
            <p className="location">{weatherData?.location}</p>
            <div className="weather-data">
                <div className="col">
                    <img src={humidity} alt="Humidity" />
                    <div>
                        <p>{weatherData.humidity} %</p>
                        <span>Humidity</span>
                    </div>
                </div>
                <div className="col">
                    <img src={wind} alt="Wind Speed" />
                    <div>
                        <p>{weatherData.windSpeed} km/h</p>
                        <span>Wind Speed</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Weather;