import { useState, useEffect } from "react";
import { getTenEventsByCity } from "../services/ticketmasterServices";

export default function Home() {
  const cities = ["Oslo", "Berlin", "London"];
  const [selectedCity, setSelectedCity] = useState("Oslo");
  const [cityEvents, setCityEvents] = useState([]);

  const loadCityEvents = async (cityName) => {
    const events = await getTenEventsByCity(cityName);
    setCityEvents(events);
    setSelectedCity(cityName);
  };

  useEffect(() => {
    loadCityEvents("Oslo");
  }, []);

  return (
    <main>
      <h1>Det som skjer i {selectedCity}!</h1>

      <section>
        {cities.map((city) => (
          <button key={city} onClick={() => loadCityEvents(city)}>
            {city}
          </button>
        ))}
      </section>

      <ul>
        {cityEvents.map((event) => (
          <li key={event.id}>{event.name}</li>
        ))}
      </ul>
    </main>
  );
}
