import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { City } from './types';
import cityData from './data/cityTimezones.json';
import './App.css';

import HomePage from './components/HomePage';
import CityDetailPage from './components/CityDetailPage';
const App: React.FC = () => {
  // Load initial city list from localStorage or fall back to an empty list
  const initialCities: City[] = [];

  // Try to load saved cities from localStorage
  try {
    const saved = localStorage.getItem('worldClockCities');
    if (saved) {
      const parsed = JSON.parse(saved);
      // Basic type checking to ensure parsed data matches our City[] shape
      if (Array.isArray(parsed)) {
        // We might do deeper checks for each item being a City
        initialCities.push(...parsed);
      }
    }
  } catch (e) {
    console.error("Failed to load cities from localStorage", e);
  }

  const [cities, setCities] = useState<City[]>(initialCities);
  
  // Save to localStorage whenever cities state changes
  useEffect(() => {
    localStorage.setItem('worldClockCities', JSON.stringify(cities));
  }, [cities]);

  // Handler to add a new city to the list
  const addCity = (city: City) => {
    setCities(prev => {
      // Avoid duplicates (if a city with same name already exists)
      if (prev.find(c => c.name.toLowerCase() === city.name.toLowerCase())) {
        return prev; // already exists, do nothing or alert user
      }
      return [...prev, city];
    });
  };

  // Handler to remove a city 
  const removeCity = (cityName: string) => {
    setCities(prev => prev.filter(c => c.name !== cityName));
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <HomePage 
            availableCities={cityData as City[]} 
            selectedCities={cities} 
            onAddCity={addCity} 
            onRemoveCity={removeCity} 
          />
        } />
        <Route path="/city/:name" element={
          <CityDetailPage cities={cities} />
        } />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
