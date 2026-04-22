import { useState, useEffect } from 'react';
import CityEventCard from './CityEventCard';
import EventCard from './EventCard';
import { getCityEvents, getFestivals } from '../services/ticketmasterServices';
import { CITY_NAMES } from '../constants/cityLocations';
import { FESTIVAL_IDS } from '../constants/festivals';
import '../styles/Home.scss';

export default function Home() {
    const [festivals, setFestivals] = useState(null);
    const [events, setEvents] = useState([]);
    const [activeCity, setActiveCity] = useState("Oslo");

    async function loadFestivals() {
        const data = await getFestivals(FESTIVAL_IDS);
        setFestivals(data);
    }

    async function loadCityEvents(city) {
        setActiveCity(city);
        const data = await getCityEvents(city);
        setEvents(data);
    }

    useEffect(() => {
        loadFestivals();
        loadCityEvents("Stockholm");
    }, []);

    return (
        <main className="home-page">
            <h1 className="main-title">Hva skjer rundt omkring??</h1>
            
            <section className="festival-section">
                <h2>De kuleste festivalene!!!</h2>
                <ul className="festival-grid">
                    {festivals.length > 0 ? (
                        festivals.map(fest => (
                            <li key={fest.id}>
                                <EventCard 
                                    event={fest} 
                                    clickable={false}
                                    showReadMore
                                />
                            </li>
                        ))
                    ) : (
                        <p>Laster festivaler...</p>
                    )}
                </ul>
            </section>

            <section className="city-section">
                <h2>Oppdag uforglemmelige opplevelser rundt i verden!</h2>
                
                <ul className="city-buttons">
                    {CITY_NAMES.map(city => (
                        <li key={city}>
                            <button 
                                className={`location-btn ${activeCity === city ? 'active' : ''}`}
                                onClick={() => loadCityEvents(city)}
                            >
                                {city}
                            </button>
                        </li>
                    ))}
                </ul>
                
                <h2>Det som skjer i {activeCity}!</h2>
                <ul className="events-grid">
                    {events.length > 0 ? (
                        events.map(ev => (
                            <CityEventCard key={ev.id} event={ev} />
                        ))
                    ) : (
                        <p>Laster events for {activeCity}...</p>
                    )}
                </ul>
            </section>
        </main>
    );
}
