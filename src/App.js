import React, { useState } from 'react';
import './App.css';

const api = {
  key: "56697804e2a89ec0004330b8c5ebf55c",
  base: "http://api.openweathermap.org/data/2.5/weather/"
}

function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});
  
  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}?q=${query}&units=metric&appid=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result)
          setQuery("")
          console.log(result);
        });
    }
  }
  
  function dateBuilder(d) {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const day = days[d.getDay()];
    const date = d.getDate();
    const month = months[d.getMonth()];
    const year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }

  function getClassForTemperature(){
  if (!weather.main) {
    return "App"
  }
  let name;
  if (weather.main.temp > 28) {
    name = "app-summer"
  }else if (weather.main.temp> 19){
    name = "App"
  }else if (weather.main.temp > 10){
    name = "app-autumn"
  }else {
    name = "app-winter"
  }
  return name;
  };

  return (
    <div className= {getClassForTemperature()}>
      <main className="weatherApp">
        <div className="searchBox">
          <input
            className="search"
            type="text"
            placeholder="Search City.."
            onChange={evt => setQuery(evt.target.value)}
            value={query}
            onKeyPress={search} />
        </div>
        <div>
          {(typeof weather.main != "undefined") ? (
            <div>
              <div className="place">{weather.name},{weather.sys.country}</div>
              <div className="date">{dateBuilder(new Date())}</div>
              <div>
                <div className="temp">{Math.round(weather.main.temp)}°C</div>
                <div className="weatherText">{weather.weather[0].main}</div>
              </div>
            </div>
          ) : ("")}
        </div>
      </main>
    </div>
  );
}

export default App;