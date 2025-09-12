// HomePage.tsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { City } from '../types';

interface HomePageProps {
  availableCities: City[];         // list of all predefined city options
  selectedCities: City[];          // list of cities currently added by user
  onAddCity: (city: City) => void;
  onRemoveCity: (cityName: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ availableCities, selectedCities, onAddCity, onRemoveCity }) => {
  // State to hold the selected option from dropdown
  const [selectedOption, setSelectedOption] = useState<string>("");

  // For custom city inputs:
  const [customName, setCustomName] = useState<string>("");
  const [customTZ, setCustomTZ] = useState<string>("");

  // Effect to default dropdown selection (optional: e.g., first city in list)
  useEffect(() => {
    if (availableCities.length > 0) {
      setSelectedOption(availableCities[0].timezone);
    }
  }, [availableCities]);

  const handleAddPredefined = () => {
    if (!selectedOption) return;
    // Find the City object by timezone or name in availableCities
    const city = availableCities.find(c => c.timezone === selectedOption);
    if (city) {
      onAddCity(city);
    }
  };

  const handleAddCustom = () => {
    if (!customName || !customTZ) return;
    const newCity: City = { name: customName, timezone: customTZ };
    onAddCity(newCity);
    // Reset custom inputs
    setCustomName("");
    setCustomTZ("");
  };

  // Function to get current time string for a given timezone (digital display)
  const getTimeString = (tz: string) => {
    const now = new Date();
    // Format time in that timezone as HH:MM:SS (or HH:MM if you prefer)
    return now.toLocaleTimeString(undefined, { timeZone: tz, hour12: false });
  };

  // We will use an interval to trigger re-renders every second
  useEffect(() => {
    const intervalId = setInterval(() => {
      // Force re-render by updating state (could use a dummy state if needed)
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);
  // (If you want to force re-render, you can use a dummy state or forceUpdate pattern)

  return (
    <div className="home-page">
      <h1>World Clock</h1>

      {/* Add City Section */}
      <div className="add-city">
        <h2>Add a City</h2>
        {/* Option 1: Select from common cities */}
        <div>
          <select value={selectedOption} onChange={e => setSelectedOption(e.target.value)}>
            {availableCities.map(city => (
              <option key={city.timezone} value={city.timezone}>
                {city.name} ({city.timezone})
              </option>
            ))}
          </select>
          <button onClick={handleAddPredefined}>Add City</button>
        </div>
        <p>— OR —</p>
        {/* Option 2: Add custom city */}
        <div>
          <input 
            type="text" 
            placeholder="City Name" 
            value={customName} 
            onChange={e => setCustomName(e.target.value)} 
          />
          <input 
            type="text" 
            placeholder="Time Zone (e.g. Continent/City)" 
            value={customTZ} 
            onChange={e => setCustomTZ(e.target.value)} 
          />
          <button onClick={handleAddCustom}>Add Custom City</button>
        </div>
      </div>

      {/* Selected Cities List */}
      <div className="city-list">
        <h2>Your Cities</h2>
        {selectedCities.length === 0 ? (
          <p>No cities added yet.</p>
        ) : (
          <ul>
            {selectedCities.map(city => (
              <li key={city.name}>
                {/* City name with link to detail page */}
                <Link to={`/city/${encodeURIComponent(city.name)}`}>
                  {city.name}
                </Link>
                {" – "}
                <span>{ getTimeString(city.timezone) }</span>
                {" "}
                <button onClick={() => onRemoveCity(city.name)}>✕</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default HomePage;
