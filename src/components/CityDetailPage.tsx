// CityDetailPage.tsx
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { City } from '../types';
import Clock from 'react-clock';  // analog clock component
import 'react-clock/dist/Clock.css';  // import default styles for the clock

interface CityDetailPageProps {
  cities: City[];  // list of all cities (to find the one to display)
}

const CityDetailPage: React.FC<CityDetailPageProps> = ({ cities }) => {
  const { name } = useParams();  // grab the city name from URL
  const [city, setCity] = useState<City | undefined>(undefined);

  // Find the city by name whenever the URL param changes or cities list changes
  useEffect(() => {
    const found = cities.find(c => c.name.toLowerCase() === (name || "").toLowerCase());
    setCity(found);
  }, [name, cities]);

  // State for current time in that city (as a Date object for analog clock)
  const [cityTime, setCityTime] = useState<Date>(new Date());
  
  useEffect(() => {
    if (!city) return;
    // Function to update cityTime state to current time in that timezone
    const updateCityTime = () => {
      const now = new Date();
      // Convert current time to the city's local time 
      const localeString = now.toLocaleString("en-US", { timeZone: city.timezone });
      const timeInCity = new Date(localeString);
      setCityTime(timeInCity);
    };
    // Initial call and then interval
    updateCityTime();
    const intervalId = setInterval(updateCityTime, 1000);
    return () => clearInterval(intervalId);
  }, [city]);

  if (!city) {
    return (
      <div className="city-detail">
        <p>City not found.</p>
        <Link to="/">Back to Home</Link>
      </div>
    );
  }

  return (
    <div className="city-detail" style={{ textAlign: 'center', padding: '20px' }}>
      <h1>{city.name}</h1>
      {city.country && <h2>{city.country}</h2>}
      <h3>{city.timezone}</h3>

      {/* Analog Clock Display */}
      <div className="clock-container" style={{ margin: '20px 0' }}>
        <Clock value={cityTime} size={200} />  {/* size prop to control clock diameter (px) */}
      </div>

      {/* Digital time and date for reference */}
      <p>Local time in {city.name}: {cityTime.toLocaleTimeString(undefined, { hour12: false })}</p>
      <p>Date: {cityTime.toLocaleDateString()}</p>

      <Link to="/">← Back to all cities</Link>
    </div>
  );
};

export default CityDetailPage;
