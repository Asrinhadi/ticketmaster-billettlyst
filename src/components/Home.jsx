import '../styles/Home.scss';
import { useState, useEffect } from "react";
import { getTenEventsByCity } from "../services/ticketmasterServices";
import { CITY_NAMES } from "../constants/cityLocations";
import CityEventCard from "./CityEventCard";

export default function Home() {
  const [activeCity, setActiveCity] = useState("Oslo");
  const [events, setEvents] = useState([]);

  const handleCityClick = async (city) => {
    const data = await getTenEventsByCity(city);
    setEvents(data);
    setActiveCity(city);
  };

  useEffect(() => {
    handleCityClick("Oslo");
  }, []);

  return (
    <main>
      <h1>Oppdag uforglemmelige opplevelser rundt i verden!</h1>
      
      <section className="city-section">
        <h2>Hva skjer i {activeCity}?</h2>
        
        <nav className="city-buttons">
          {CITY_NAMES.map((city) => (
            <button 
              key={city}
              className={activeCity === city ? 'active' : ''}
              onClick={() => handleCityClick(city)}
            >
              {city}
            </button>
          ))}
        </nav>
      </section>

      <section className="event-grid">
        {events.map((event) => (
          <CityEventCard key={event.id} eventData={event} />
        ))}
      </section>
    </main>
  );
}
