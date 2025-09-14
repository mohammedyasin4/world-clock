// App.tsx
import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import type { City } from "./types";
import cityData from "./data/cityTimezones.json";
import "./App.css";

import HomePage from "./components/HomePage";
import CityDetailPage from "./components/CityDetailPage";

const App: React.FC = () => {
  // Försök hämta sparade städer från localStorage, annars börja tomt
  let startStäder: City[] = [];
  try {
    const sparat = localStorage.getItem("worldClockCities");
    if (sparat) {
      const parsed = JSON.parse(sparat);
      if (Array.isArray(parsed)) {
        startStäder = parsed;
      }
    }
  } catch (e) {
    console.error("Kunde inte läsa från localStorage", e);
  }

  const [städer, setStäder] = useState<City[]>(startStäder);

  // Spara varje gång listan ändras
  useEffect(() => {
    localStorage.setItem("worldClockCities", JSON.stringify(städer));
  }, [städer]);

  // Lägg till ny stad (om den inte redan finns)
  const läggTillStad = (stad: City) => {
    setStäder((prev) => {
      if (prev.find((c) => c.name.toLowerCase() === stad.name.toLowerCase())) {
        return prev; // redan finns, gör inget
      }
      return [...prev, stad];
    });
  };

  // Ta bort stad
  const taBortStad = (namn: string) => {
    setStäder((prev) => prev.filter((c) => c.name !== namn));
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              availableCities={cityData as City[]}
              selectedCities={städer}
              onAddCity={läggTillStad}
              onRemoveCity={taBortStad}
            />
          }
        />
        <Route path="/city/:name" element={<CityDetailPage cities={städer} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
