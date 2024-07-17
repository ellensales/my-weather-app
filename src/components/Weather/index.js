import { useRef, useState } from 'react';
import windIcon from '../../icons/cloud-wind-icon.svg'
import humidityIcon from '../../icons/drop-humidity-icon.svg'
import searchIcon from '../../icons/search-icon.svg'
import './style.css'

const Weather = () => {
    const inputRef = useRef(null);
    const [weatherData, setWeatherData] = useState(false);

    const search = async (city) => {
        const API_KEY = process.env.REACT_APP_API_KEY;
        
        if(city === ""){
            alert("Please, enter a city name.")
            return;
        }

        try{
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
            const response = await fetch(url);
            const data = await response.json();
            console.log(data);
            setWeatherData({
                humidity: data.main.humidity,
                temperature: Math.floor(data.main.temp),
                location: data.name,
                windSpeed: data.wind.speed,
                icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`});
        } catch (error){
            setWeatherData(false);
        }
    }

    return (
    <div className="weather-app">
        <div className = "search-bar">
            <input ref= {inputRef} type="text" placeholder="Search..." className="search-input"/>
            <button onClick = {() => search(inputRef.current.value)} ><img src={searchIcon} className="search-icon"/></button>
        </div>

        {weatherData? 
        <div classname = "weather-info">
            <div className = "first-info">
                <img src={weatherData.icon} alt="weather icon"/>
                <div className="first-info-data">
                    <div className="location">{weatherData.location}</div>
                    <div className="temperature">
                        <p className="temperature-number">{weatherData.temperature}</p>
                        <p className="temperature-symbol">ºC</p>
                    </div>
                </div>
            </div>
            <div className = "second-info">
                <div className="humidity-wrapper">
                    <p className="humidity-title">Humidity:</p>
                    <div className="humidity-info">
                        <img src={humidityIcon} alt="humidity icon" className="humidity-icon"/>
                        <p>{weatherData.humidity}%</p>
                    </div>
                </div>
                <div className="windspeed-wrapper">
                    <p className="windspeed-title">Wind Speed:</p>
                    <div className="windspeed-info">
                        <img src={windIcon} alt="wind icon" className="wind-icon"/>
                        <p>{weatherData.windSpeed} km/h</p>
                    </div>
                </div>
            </div>
        </div> : <></>}

    
    </div>

    )
}

export default Weather;