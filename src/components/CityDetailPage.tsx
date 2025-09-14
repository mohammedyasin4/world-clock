// CityDetailPage.tsx
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import type { City } from "../types";
import Clock from "react-clock";        // analog klocka
import "react-clock/dist/Clock.css";    // standardstilar för klockan

interface CityDetailPageProps {
  cities: City[];   // Lista med städer att leta i
}

const CityDetailPage: React.FC<CityDetailPageProps> = ({ cities }) => {
  const { name } = useParams(); // Hämtar stadens namn från URL
  const [stad, setStad] = useState<City | undefined>(undefined);

  // Hitta rätt stad när sidan laddas eller URL ändras
  useEffect(() => {
    const funnen = cities.find(
      (c) => c.name.toLowerCase() === (name || "").toLowerCase()
    );
    setStad(funnen);
  }, [name, cities]);

  // Tid i vald stad (används för både digital och analog visning)
  const [stadTid, setStadTid] = useState<Date>(new Date());

  useEffect(() => {
    if (!stad) return;

    const uppdateraTid = () => {
      const nu = new Date();
      // Gör om tiden till rätt tidszon
      const lokalStr = nu.toLocaleString("en-US", { timeZone: stad.timezone });
      setStadTid(new Date(lokalStr));
    };

    uppdateraTid(); // kör direkt
    const id = setInterval(uppdateraTid, 1000); // uppdatera varje sekund
    return () => clearInterval(id);
  }, [stad]);

  // Om ingen stad hittas
  if (!stad) {
    return (
      <div className="city-detail">
        <p>Staden kunde inte hittas.</p>
        <Link to="/">Tillbaka</Link>
      </div>
    );
  }

  return (
    <div className="city-detail" style={{ textAlign: "center", padding: "20px" }}>
      <h1>{stad.name}</h1>
      {stad.country && <h2>{stad.country}</h2>}
      <h3>{stad.timezone}</h3>

   

      {/* Digital tid + datum */}
      <p>Lokal tid: {stadTid.toLocaleTimeString(undefined, { hour12: false })}</p>
      <p>Datum: {stadTid.toLocaleDateString()}</p>

      <Link to="/">← Tillbaka till alla städer</Link>
    </div>
  );
};

export default CityDetailPage;
