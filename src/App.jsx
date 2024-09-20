import React, { useState,useEffect } from 'react'
import './App.css'
import { assets } from './assets/assets';

import data from './key.json'
const App = () => {

  const [city,setCity] = useState("");
  const [weatherStatus,setWeatherStatus] = useState(null);
  
  const apiKey = data['api_key'];

  //Clear , Rain , Clouds, Snow
  const getImg = () =>{
    const desc = weatherStatus.weather[0].main;
    if(desc ==="Clouds"){
      return (
        <img src={assets.clouds} alt="" />
      )
    }
    else{
      if(desc ==="Clear"){
        return (
          <img src={assets.sunny} alt="" />
        )
      }
      else{
        if(desc === "Rain"){
          return(
            <img src={assets.rainy} alt=''/>
          )
        }
        else{
          if(desc === "Thunderstorm"){
            return(
              <img src={assets.thunderstorm} alt=''/>
            )
          }
          else{
            if(desc === "Snow"){
              return(
                <img src={assets.snowfall} alt=''/>
              )
            }
          }
        }
      }
    }
  }

  const getWeatherinfo = async(e) => {
    e.preventDefault();
    try{
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
      if(response.status == 404){
        alert(`City ${city} was not found.`);
        setCity("");
      }
      else{
        document.title = `Weather in ${city}`;
        const data = await response.json()
        setWeatherStatus(data);
      }

      
    }
    catch(error){
      console.log("wystapil blad")
    }
    
  }
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

 

  return (
    <div className='app'>
      <div className='container'>
          {
            weatherStatus !== null ?
            <>
              <div className='container-search-again'>
                <button onClick={() =>{setWeatherStatus(null);setCity("")}}>Back to start...</button>
              </div>
              <div className='container-result-img'>
              <h3>{capitalizeFirstLetter(city)}</h3>
                {getImg()}
              </div>
              <div className='container-city-result-info'>
                  <div className='container-city-result-info-temp'>
                    <img src={assets.temp} alt="" />
                    <p>{parseInt(weatherStatus.main.temp)}°</p>
                  </div>
                  <div className='container-city-result-multi-info'>
                    <div className='container-city-result-other-info'>
                      <p>MAX : {parseInt(weatherStatus.main.temp_max)}°</p>
                      <p>MIN : {parseInt(weatherStatus.main.temp_min)}°</p>
                    </div>
                    <div className='container-city-result-wind-info'>
                      <div className='description'>
                        <h3>Description:</h3>
                        <p>{weatherStatus.weather[0].main}</p>
                      </div>
                    
                    <div className='wind'>
                      <img src={assets.wind} alt="" />
                      <p>{weatherStatus.wind.speed} km/h</p>
                    </div>
                    </div>
                  </div>
                  
                  
                </div>
              </>
            :
            <form className="container-city-input" onSubmit={getWeatherinfo}>
            <p>Enter your city:</p>
            <input
            onChange={(e) => setCity(e.target.value)}
             value={city}
              type="text"
               required/>
            <button type='submit'>Submit</button>
            </form>
          }
          
      </div>
    </div>
  )
}

export default App