import React, { useState } from 'react';
import { CloudSun, Search, History, MapPin } from 'lucide-react';

interface WeatherData {
  name: string;
  sys: { country: string };
  weather: Array<{ description: string }>;
  main: { temp: number; humidity: number };
  wind: { speed: number };
}

export default function Weather() {
  const [city, setCity] = useState<string>('');
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [recentCities, setRecentCities] = useState<string[]>([]);

  const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

  const fetchWeather = async (searchCity?: string) => {
    const targetCity = searchCity || city;
    if (!targetCity) return;

    setLoading(true);
    setError('');

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${targetCity}&units=metric&appid=${API_KEY}`
      );
      const data = await response.json();

      if (response.ok) {
        setWeatherData(data);
        if (!recentCities.includes(data.name)) {
          setRecentCities([data.name, ...recentCities.slice(0, 4)]);
        }
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
        <h2>Live Weather & Map</h2>
      </div>

      <form onSubmit={(e) => { e.preventDefault(); fetchWeather(); }} className="weather-search">
        <input
          type="text"
          placeholder="Enter city name (e.g., Lahore, Multan)..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button type="submit">
          <Search size={18} />
        </button>
      </form>

      {/* Recent Cities */}
      {recentCities.length > 0 && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '10px 0', flexWrap: 'wrap' }}>
          <History size={14} style={{ opacity: 0.7 }} />
          <span style={{ fontSize: '0.85rem', opacity: 0.8 }}>Recent:</span>
          {recentCities.map((recCity, index) => (
            <button
              key={index}
              onClick={() => { setCity(recCity); fetchWeather(recCity); }}
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                padding: '3px 8px',
                borderRadius: '12px',
                fontSize: '0.8rem',
                cursor: 'pointer',
                color: 'inherit'
              }}
            >
              {recCity}
            </button>
          ))}
        </div>
      )}

      {loading && <p>Loading weather...</p>}
      {error && <p style={{ color: '#ff6b6b' }}>{error}</p>}

      {weatherData && (
        <>
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

          {/* Embedded Google Map */}
          <div style={{ marginTop: '15px', borderRadius: '8px', overflow: 'hidden', border: '1px solid rgba(255, 255, 255, 0.2)' }}>
            <div style={{ padding: '6px 10px', background: 'rgba(0, 0, 0, 0.2)', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem' }}>
              <MapPin size={14} />
              <span>Location Map: {weatherData.name}</span>
            </div>
            <iframe
              title="city-map"
              width="100%"
              height="180"
              style={{ border: 0, display: 'block' }}
              loading="lazy"
              src={`https://maps.google.com/maps?q=${encodeURIComponent(weatherData.name)}&t=&z=11&ie=UTF8&iwloc=&output=embed`}
            ></iframe>
          </div>
        </>
      )}
    </div>
  );
}