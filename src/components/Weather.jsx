import React, { useEffect, useRef, useState } from 'react'
import './Weather.css'
import humidity_icon from '../assets/humidity.png'
import wind_icon from '../assets/wind.png'
import search_icon from '../assets/search.png'
import allIcons from '../Constants'

const Weather = () => {
    const inputRef=useRef()
    const [weatherData,setWeatherData] = useState(false)
    const search = async (city) => {
        if (city === "") {
            alert("Add a City name");
            return 
        }
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}
            &appid=${import.meta.env.VITE_API_KEY}&units=metric`
            
            const res = await fetch(url);
            const data = await res.json();
            if (!res.ok) {
                alert(data.message)
                return
            }
            console.log(data);
            const icon = allIcons[data.weather[0].icon]
            setWeatherData({
                humidity:data.main.humidity,
                windSpeed:data.wind.speed,
                temperature:Math.floor(data.main.temp),
                location: data.name,
                icon:icon
            })
        } catch (error) {
            setWeatherData(false)
            console.error("Error in fetching data:",error.message);
        }
       
    }
    useEffect(() => {
        search("London"); 
    }, [])
    
  return (
      <div className='weather'>
          <div className="search-bar">
            <input ref={inputRef} type="text" placeholder="Search" />
            <img className='search-icon' src={search_icon} alt="" onClick={()=>search(inputRef.current.value)}/>
          </div>
          {weatherData ? <>
              <img src={weatherData.icon} alt="" className='clear-icon' />
              <p className='temperature'>{weatherData.temperature}°C</p>
              <p className='location'>{weatherData.location}</p>
              <div className="weather-data">
                  <div className="col">
                      <img src={humidity_icon} alt="" className='weather-icon' />
                      <div>
                          <p>{weatherData.humidity}%</p>
                          <span>Humidity</span>
                      </div>
                  </div>
                  <div className="col">
                      <img src={wind_icon} alt="" className='weather-icon' />
                      <div>
                          <p>{weatherData.windSpeed} Km/h</p>
                          <span>Wind</span>
                      </div>
                  </div>
              </div>
          </> : <></>}
      </div>
  )
}

export default Weather
