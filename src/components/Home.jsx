import { useState, useEffect } from 'react';
import CityEventCard from './CityEventCard';
import FestivalCard from './FestivalCard';
import { getTenEventsByCity, getFestivalsByIds } from '../services/ticketmasterServices';
import { CITY_NAMES } from '../constants/cityLocations';
import { MAIN_FESTIVALS } from '../constants/festivals';
import '../styles/Home.scss';

export default function Home() {
    const [festivals, setFestivals] = useState([]);
    const [events, setEvents] = useState([]);
    const [selectedCity, setSelectedCity] = useState("Oslo");

    const fetchFestivals = async () => {
        try {
            const data = await getFestivalsByIds(MAIN_FESTIVALS);
            setFestivals(data || []);
        } catch (error) {
            console.error("kunne ikke hente festivaler", error);
        }
    };

    const fetchCityEvents = async (city) => {
        try {
            const data = await getTenEventsByCity(city);
            setEvents(data || []);
            setSelectedCity(city);
        } catch (error) {
            console.error("kunne ikke hente events for byen", error);
            setEvents([]);
        }
    };

    useEffect(() => {
        fetchFestivals();
        fetchCityEvents("Oslo");
    }, []);

    return (
        <main className="home-page">
            <h1 className="main-title">Hva skjer rundt omkring??</h1>
            
            <section className="festival-section">
                <h2>De kuleste festivalene!!!</h2>
                <div className="festival-grid">
                    {festivals.length > 0 ? (
                        festivals.map((festival) => (
                            <FestivalCard 
                                key={festival.id} 
                                festival={festival} 
                            />
                        ))
                    ) : (
                        <p>Laster festivaler...</p>
                    )}
                </div>
            </section>

            <section className="city-section">
                <h2>Oppdag uforglemmelige opplevelser rundt i verden!</h2>
                
                <ul className="city-buttons">
                    {CITY_NAMES.map((city) => (
                        <li key={city}>
                            <button 
                                className={`location-btn ${selectedCity === city ? 'active' : ''}`}
                                onClick={() => fetchCityEvents(city)}
                            >
                                {city}
                            </button>
                        </li>
                    ))}
                </ul>
                
                <h2>Det som skjer i {selectedCity}!</h2>
                <div className="events-grid">
                    {events.length > 0 ? (
                        events.map((event) => (
                            <CityEventCard 
                                key={event.id} 
                                eventData={event} 
                            />
                        ))
                    ) : (
                        <p>Laster events for {selectedCity}...</p>
                    )}
                </div>
            </section>
        </main>
    );
}
