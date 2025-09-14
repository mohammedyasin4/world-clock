// HomePage.tsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { City } from "../types";

interface HomePageProps {
  availableCities: City[];                // Förvalda städer (från JSON)
  selectedCities: City[];                 // Städer som användaren har lagt till
  onAddCity: (city: City) => void;        // Lägg till stad
  onRemoveCity: (cityName: string) => void; // Ta bort stad (via namn)
}

const HomePage: React.FC<HomePageProps> = ({
  availableCities,
  selectedCities,
  onAddCity,
  onRemoveCity,
}) => {
  // Dropdown-val: välj första staden om det finns någon, annars fallback
  const [valdTidszon, setValdTidszon] = useState<string>(
    availableCities[0]?.timezone ?? "Europe/Stockholm"
  );

  // Fält för egen stad (manuell inmatning)
  const [egenStad, setEgenStad] = useState<string>("");
  const [egenTidszon, setEgenTidszon] = useState<string>("");

  // Enkel klock-tick för att rita om komponenten varje sekund (så tider uppdateras)
  const [tick, setTick] = useState<number>(0);
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 1000);
    return () => clearInterval(id);
  }, []);
  // (tick används inte direkt, den finns bara för att trigga omritning)

  // Hämta aktuell tid (HH:MM:SS) för en viss tidszon
  const getTid = (tz: string): string => {
    const nu = new Date();
    return nu.toLocaleTimeString(undefined, { timeZone: tz, hour12: false });
  };

  // Lägg till förvald stad från listan
  const läggTillFörvald = () => {
    if (!valdTidszon) return;
    const stad = availableCities.find((c) => c.timezone === valdTidszon);
    if (!stad) return;
    onAddCity(stad);
  };

  // Lägg till egen stad (namn + tidszon)
  const läggTillEgen = () => {
    if (!egenStad.trim() || !egenTidszon.trim()) return;
    const ny: City = { name: egenStad.trim(), timezone: egenTidszon.trim() };
    onAddCity(ny);
    setEgenStad("");
    setEgenTidszon("");
  };

  return (
    <div className="home-page">
      <h1>Världsklocka</h1>

      {/* Sektion: lägg till stad */}
      <div className="add-city">
        <h2>Lägg till stad</h2>

        {/* Alternativ 1: välj från lista */}
        <div>
          <label>
            Välj från lista:&nbsp;
            <select
              value={valdTidszon}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                setValdTidszon(e.target.value)
              }
            >
              {availableCities.map((city) => (
                <option key={city.timezone} value={city.timezone}>
                  {city.name} ({city.timezone})
                </option>
              ))}
            </select>
          </label>
          <button onClick={läggTillFörvald}>Lägg till</button>
        </div>

        <p style={{ margin: "8px 0" }}>— eller —</p>

        {/* Alternativ 2: lägg till egen stad */}
        <div>
          <input
            type="text"
            placeholder="Stadens namn"
            value={egenStad}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEgenStad(e.target.value)
            }
          />
          <input
            type="text"
            placeholder="Tidszon (t.ex. Europe/Stockholm)"
            value={egenTidszon}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEgenTidszon(e.target.value)
            }
          />
          <button onClick={läggTillEgen}>Lägg till egen stad</button>
        </div>
      </div>

      {/* Lista: valda städer */}
      <div className="city-list" style={{ marginTop: 24 }}>
        <h2>Dina städer</h2>

        {selectedCities.length === 0 ? (
          <p>Inga städer tillagda ännu.</p>
        ) : (
          <ul>
            {selectedCities.map((city) => (
              <li key={city.name}>
                {/* Stadens namn länkar till detaljsidan */}
                <Link to={`/city/${encodeURIComponent(city.name)}`}>
                  {city.name}
                </Link>
                {" – "}
                <span>{getTid(city.timezone)}</span>
                {" "}
                <button
                  aria-label={`Ta bort ${city.name}`}
                  onClick={() => onRemoveCity(city.name)}
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default HomePage;
