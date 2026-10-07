import React, { useState } from 'react';
import { CloudSun, Search } from 'lucide-react';

export default function Weather() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Aap yahan apni OpenWeatherMap ki free API key daal sakti hain
  const API_KEY = 'YOUR_API_KEY_HERE'; 

  const fetchWeather = async (e) => {
    e.preventDefault();
    if (!city) return;

    setLoading(true);
    setError('');

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
      );
      const data = await response.json();

      if (response.ok) {
        setWeatherData(data);
      } else {
        setError(data.message || 'City not found');
        setWeatherData(null);
      }
    } catch (err) {
      setError('Something went wrong. Please check your network.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
        <CloudSun size={28} />
        <h2>Live Weather</h2>
      </div>

      <form onSubmit={fetchWeather} className="weather-search">
        <input
          type="text"
          placeholder="Enter city name (e.g., Lahore, London)..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button type="submit">
          <Search size={18} />
        </button>
      </form>

      {loading && <p>Loading weather...</p>}
      {error && <p style={{ color: '#ff6b6b' }}>{error}</p>}

      {weatherData && (
        <div className="weather-info">
          <div className="weather-details">
            <h2>{weatherData.name}, {weatherData.sys.country}</h2>
            <p>{weatherData.weather[0].description}</p>
            <p style={{ marginTop: '8px', fontSize: '0.9rem', opacity: 0.8 }}>
              Humidity: {weatherData.main.humidity}% | Wind: {weatherData.wind.speed} m/s
            </p>
          </div>
          <div className="temp">
            {Math.round(weatherData.main.temp)}°C
          </div>
        </div>
      )}
    </div>
  );
}