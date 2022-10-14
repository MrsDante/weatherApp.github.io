import React, { useState } from 'react';
import './App.css';

function App() {
  const api = {
    key: "ac141d909f3a6c7b97ef120ae484148a",
    url: "https://api.openweathermap.org/data/2.5/"
  };

  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = evt => {
   if (evt.key === 'Enter') {
     fetch(`${api.url}weather?q=${query}&appid=${api.key}&units=metric`)
     .then(res => res.json())
     .then(result => {
       setWeather(result);
       setQuery('');
       console.log(result)}
       );
   };
  }

  const searchOnClick = evt => {
      fetch(`${api.url}weather?q=${query}&appid=${api.key}&units=metric`)
      .then(res => res.json())
      .then(result => {
        setWeather(result);
        setQuery('');
        console.log(result)}
        );
   }

  const getTodaysDate = (d) => {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
 
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
 
     return `${day} ${date} ${month} ${year}`;
  }


  return  (
    <div className={(typeof weather.main != "undefined")
    ? ((weather.main.temp > 16)
    ? 'app warm' :'app') :'app'}>
      <main>
        <input 
          type="text" 
          className="search-bar" 
          placeholder="Enter your city"
          onChange={e => setQuery(e.target.value)}
          value={query}
          onKeyPress={search}>
        </input>
        <button onClick={searchOnClick} className="btn">Узнать!</button>
        {(typeof weather.main != "undefined") ? (
        <div>
        <div className="weather-container">
          <div className="weather">
        <div className="temp">{Math.round(weather.main.temp)}°C</div>
            <div className="condition">{weather.weather[0].main}</div>
            <div className="city">{weather.name}, {weather.sys.country}</div>
          <br></br>
          <div className="date">{getTodaysDate(new Date())}</div>
          <br></br>
          </div>
        </div>
        </div>
        ) :('')}
      </main>
    </div>
  );
}

export default App;
