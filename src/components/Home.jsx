import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CityEventCard from './CityEventCard';
import { getTenEventsByCity } from '../services/ticketmasterServices';
import '../styles/Home.scss';

//////Bare testingg nååååå
const FESTIVAL_DATA = [
    {
        id: "neon-festival",
        name: "NEON Festival",
        image: "https://s1.ticketm.net/dam/a/c62/c0f1f62a-c4b3-4d59-9d23-f89c6e1a1c62_RECOMENDATION_16_9.jpg",
        url: "https://www.ticketmaster.no/artist/neon-festival-billetter/1117273"
    },
    {
        id: "skeikampenfestivalen",
        name: "Skeikampenfestivalen",
        image: "https://s1.ticketm.net/dam/a/c62/c0f1f62a-c4b3-4d59-9d23-f89c6e1a1c62_RECOMENDATION_16_9.jpg",
        url: "https://www.ticketmaster.no/artist/skeikampenfestivalen-billetter/1018941"
    },
    {
        id: "tons-of-rock",
        name: "Tons of Rock",
        image: "https://s1.ticketm.net/dam/a/c62/c0f1f62a-c4b3-4d59-9d23-f89c6e1a1c62_RECOMENDATION_16_9.jpg",
        url: "https://www.ticketmaster.no/artist/tons-of-rock-/935524"
    },
    {
        id: "findings-festival",
        name: "Findings Festival",
        image: "https://s1.ticketm.net/dam/a/c62/c0f1f62a-c4b3-4d59-9d23-f89c6e1a1c62_RECOMENDATION_16_9.jpg",
        url: "https://www.ticketmaster.no/artist/findings-festival-billetter/953636"
    }
];

export default function Home() {
    const [cityEvents, setCityEvents] = useState([]);
    const [selectedCity, setSelectedCity] = useState("Oslo");

    const loadCityEvents = async (cityName) => {
        try {
            const data = await getTenEventsByCity(cityName);
            setCityEvents(data || []);
            setSelectedCity(cityName);
        } catch (error) {
            console.error("Kunne ikke hente byevents", error);
            setCityEvents([]);
        }
    };

    useEffect(() => {
        loadCityEvents("Oslo");
    }, []);

    const cities = ["Oslo", "Stockholm", "Berlin", "London", "Edinburgh"];

    return (
        <main className="home-page">
            <h1 className="main-title">Hva skjer rundt omkring??</h1>
            
            <section className="festival-section">
                <h2>De kuleste festivalene!!!</h2>
                <section className="festival-grid">
                    {FESTIVAL_DATA.map((festival) => (
                        <article key={festival.id} className="festival-card">
                            <img src={festival.image} alt={festival.name} />
                            <h3>{festival.name}</h3>
                            <a 
                                href={festival.url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="festival-link"
                            >
                                Les mer
                            </a>
                        </article>
                    ))}
                </section>
            </section>

            <section className="city-section">
                <h2>Oppdag uforglemmelige opplevelser rundt i verden!</h2>
                
                <ul className="city-buttons">
                    {cities.map((city) => (
                        <li key={city}>
                            <button 
                                className={`location-btn ${selectedCity === city ? 'active' : ''}`}
                                onClick={() => loadCityEvents(city)}
                            >
                                {city}
                            </button>
                        </li>
                    ))}
                </ul>
                
                <h2>Det som skjer i {selectedCity}!</h2>
                <section className="events-grid">
                    {cityEvents.length > 0 ? (
                        cityEvents.map((event) => (
                            <CityEventCard 
                                key={event.id} 
                                eventData={event} 
                            />
                        ))
                    ) : (
                        <p>Laster events for {selectedCity}...</p>
                    )}
                </section>
            </section>
        </main>
    );
}