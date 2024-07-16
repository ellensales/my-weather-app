import { useEffect, useRef, useState } from 'react';
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
    <div className="weather">
        <div className = "search-bar">
            <input ref= {inputRef} type="text" placeholder="Search..."/>
            <button onClick = {() => search(inputRef.current.value)} >Search</button>
        </div>

        {weatherData? <>
            <img src={weatherData.icon} alt="weather icon"/>
            <div className="temperature">{weatherData.temperature}ºC</div>
            <div className="location">{weatherData.location}</div>
        </> : <></>}

    
    </div>

    )
}

export default Weather;