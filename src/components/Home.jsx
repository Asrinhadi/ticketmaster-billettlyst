import { useState } from "react";

export default function Home() {
  const cities = ["Oslo", "Berlin", "London"];
  const [selectedCity, setSelectedCity] = useState(cities[0]);

  return (
    <main>
      <h1>Det som skjer i {selectedCity}!</h1>

      <section>
        {cities.map((city) => (
          <button key={city} onClick={() => setSelectedCity(city)}>
            {city}
          </button>
        ))}
      </section>

      <section>
        <p>Kommer snart…</p>
      </section>
    </main>
  );
}
