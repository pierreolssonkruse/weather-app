import React, { useState } from 'react';
import './App.css';

function App() {
  const [location, setLocation] = useState('');
  const [weather, setWeather] = useState(null);

  const kelvinToCelsius = (kelvin) => {
    return kelvin - 273.15;
  };

  const fetchWeather = () => {
    fetch(`/api/weather/${location}`)
      .then(response => response.json())
      .then(data => setWeather(data));
  };

  return (
    <div className="App">
      <input 
        value={location} 
        onChange={e => setLocation(e.target.value)} 
        placeholder="Enter location" 
      />
      <button onClick={fetchWeather}>Get Weather</button>

      {weather && weather.main && (
        <div>
          <h2>{weather.name}</h2>
          <p>Temperature: {kelvinToCelsius(weather.main.temp).toFixed(2)}°C</p>
          <p>Conditions: {weather.weather[0].description}</p>
        </div>
      )}
    </div>
  );
}

export default App;
