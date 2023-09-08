import React, { useState, useRef } from 'react';
import { Button, TextField, Typography, Paper, Container } from '@mui/material';
import './App.css';

function App() {
  const [location, setLocation] = useState('');
  const [weather, setWeather] = useState(null);
  const textInputRef = useRef(null);

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      fetchWeather();
    }
  };

  function kelvinToCelsius(kelvin) {
    return kelvin - 273.15;
  }

  const degreeToRotation = (degree) => {
    return degree;
  }

  const fetchWeather = () => {
    fetch(`/api/weather/${location}`)
      .then(response => response.json())
      .then(data => setWeather(data));
  };

  return (
    <Container className="app-container">
      <Paper className="app-paper">
        <Typography variant="h4" gutterBottom className="app-title">
          Weather App
        </Typography>
        <TextField
          fullWidth
          variant="outlined"
          value={location}
          onChange={e => setLocation(e.target.value)}
          placeholder="Enter location"
          label="Location"
          className="app-input"
          inputProps={{
            ref: textInputRef,
            onKeyDown: handleKeyDown,
          }}
        />
        <Button variant="contained" color="primary" onClick={fetchWeather} className="app-button">
          Get Weather
        </Button>
        {weather && weather.main && (
          <div className="weather-info">
            <Typography variant="h5">
              {weather.name + ", " + weather.sys.country}
              {weather.weather[0].icon && (
                <img
                  src={`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`}
                  alt={weather.weather[0].description}
                  className="weather-icon"
                />
              )}
            </Typography>
            <Typography variant="body1">
              Temperature: {kelvinToCelsius(weather.main.temp).toFixed(1)}°C
            </Typography>
            <Typography variant="body1">
              Pressure: {weather.main.pressure} hPa
            </Typography>
            <Typography variant="body1">
              Humidity: {weather.main.humidity}%
            </Typography>
            <Typography variant="body1">
              Wind Speed: {weather.wind.speed} m/s
            </Typography>
            <Typography variant="body1">
              Wind Direction:
              <span className="wind-arrow" style={{ transform: `rotate(${degreeToRotation(weather.wind.deg)}deg)` }}>
                →
              </span>
            </Typography>
            <Typography variant="body1">
              Conditions: {weather.weather[0].description}
            </Typography>
          </div>
        )}
      </Paper>
    </Container>
  );
}

export default App;
