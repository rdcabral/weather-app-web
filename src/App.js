import React, { useState, useEffect } from 'react';
import './css/index.css';
import { FaChevronRight, FaMapMarkerAlt } from 'react-icons/fa';

import Axios from 'axios';

export default function App() {

  let now = new Date();
  const initialCity = 'Rio de Janeiro';

  const [weather, setWeather] = useState('');
  const [degrees, setDegrees] = useState('');
  const [date, setDate] = useState('');
  const [changeCity, setChangeCity] = useState('');
  const [city, setCity] = useState(initialCity);

  const api = {
    key: 'key', // Generate your key in https://home.openweathermap.org
    baseUrl: 'http://api.openweathermap.org/data/2.5/'
  }

  const kelvinToCelcius = (kelvin) => {
    const conversion = kelvin - 273.15;
    return conversion.toFixed(0);
  }

  const dateBuilder = (d) => {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday ", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];

    return `${day}, ${date} ${month}`;
  }

  const WeatherApi = async () => {
    const response = await Axios.get(`${api.baseUrl}weather?q=${changeCity === '' ? 'Rio de Janeiro' : changeCity}&units=metrics&APPID=${api.key}`);
    const data = await response.data;
    const dataWeather = await response.data.weather[0];

    setWeather(dataWeather.main);
    setDegrees(kelvinToCelcius(data.main.temp));
    setDate((dateBuilder(now)));
  }

  const boxStyles = {
    background: 
    weather === 'Rain' ? 'linear-gradient(91.06deg, rgba(0, 0, 0, 0.71) 0%, #000000 100%)' : 
    weather === 'Clear' || weather === 'Clouds' ? 'linear-gradient(91.06deg, #19ABCB 0%, rgba(235, 255, 0, 0.71) 100%)' : 
    weather === 'Snow' ? 'linear-gradient(90.99deg, #413D3D 0%, rgba(153, 150, 150, 0.9) 60.35%)' :
    'linear-gradient(91.06deg, #19ABCB 0%, rgba(235, 255, 0, 0.71) 100%)'
  } 

  function handleSubmit(event) {
    event.preventDefault();

    setCity(changeCity);
    WeatherApi();
    setChangeCity('')
  }

  useEffect(() => {
    WeatherApi();
  }, [])


  return (
    <div className="container">
      <form>
        <input type="text" className="city-input" placeholder="Type a city" value={changeCity} onChange={e => setChangeCity(e.target.value)} />
        <button className="btn-search-city" onClick={handleSubmit}><FaChevronRight width={80} /></button>
      </form>
      <div className="weather-box" style={boxStyles}>
        <div className="text-box-1">
          <p className="weather">{weather}</p>
          <p className="degrees">{degrees}°</p>
        </div>
        <div className="text-box-2">
          <p className="day-month">{date}</p>
          <p><FaMapMarkerAlt /> <span className="city">{city}</span></p>
        </div>
      </div>
      <footer>Made by <a href="https://github.com/rdcabral">Rodrigo Cabral</a></footer>
    </div>
  )
}