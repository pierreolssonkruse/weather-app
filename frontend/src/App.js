import React, { useState, useRef } from 'react';
import { Button, TextField, Typography, Paper, Container } from '@mui/material';
import './App.css';

function App() {
  const [location, setLocation] = useState('');
  const [weather, setWeather] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
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

  const dateTimeToString = (unixTimestamp, type = 'both') => {
    const date = new Date(unixTimestamp * 1000);
    const formatOptions = {
      date: { month: 'short', day: 'numeric' },
      time: { hour: 'numeric', minute: 'numeric' },
      both: { month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' }
    };
    return date.toLocaleString('en-GB', formatOptions[type]);
  }

  const fetchWeather = async () => {
    try {
      const response = await fetch(`/api/weather/${location}`);
      if (!response.ok) {
        throw new Error('Location not found or other error occurred');
      }
      const data = await response.json();
      setWeather(data);
      setErrorMessage(null);
    } catch (error) {
      setErrorMessage(error.message);
    }
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
        {errorMessage && (
          <Typography variant="body1" color="error">
            {errorMessage}
          </Typography>
        )}
        {weather && weather.main && (
          <div className="weather-info">
            <Typography variant="body1">
              Date: {dateTimeToString(weather.dt)}
            </Typography>
            <Typography variant="body1">
              Sunrise: {dateTimeToString(weather.sys.sunrise, 'time')}
            </Typography>
            <Typography variant="body1">
              Sunset: {dateTimeToString(weather.sys.sunset, 'time')}
            </Typography>
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
              Feels Like: {kelvinToCelsius(weather.main.feels_like).toFixed(1)}°C
            </Typography>
            <Typography variant="body1">
              Max Temperature: {kelvinToCelsius(weather.main.temp_max).toFixed(1)}°C
            </Typography>
            <Typography variant="body1">
              Min Temperature: {kelvinToCelsius(weather.main.temp_min).toFixed(1)}°C
            </Typography>
            <Typography variant="body1">
              Pressure: {weather.main.pressure} hPa
            </Typography>
            <Typography variant="body1">
              Humidity: {weather.main.humidity}%
            </Typography>
            <Typography variant="body1">
              Visibility: {weather.visibility / 1000} km
            </Typography>
            <Typography variant="body1">
              Wind: <span className="wind-arrow" style={{ transform: `rotate(${degreeToRotation(weather.wind.deg)}deg)` }}>
                →
              </span> {weather.wind.speed} m/s
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
