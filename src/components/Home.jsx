import { useState, useEffect } from "react";
import { getTenEventsByCity } from "../services/ticketmasterServices";
import CityEventCard from "./CityEventCard";

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

      <section>
        {cityEvents.map((event) => (
          <CityEventCard key={event.id} eventData={event} />
        ))}
      </section>
    </main>
  );
}
