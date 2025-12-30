import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAttraction, getAttractionEvents } from "../services/ticketmasterServices";
import EventHeader from "./EventHeader";
import EventCard from "./EventCard";
import ArtistCard from "./ArtistCard";
import "../styles/EventPage.scss";

export default function EventPage() {
    const { id } = useParams();
    const [attraction, setAttraction] = useState(null);
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [wishlist, setWishlist] = useState([]);

    useEffect(() => {
        async function loadData() {
            setLoading(true);
            setError(null);
            
            try {
                const attr = await getAttraction(id);
                setAttraction(attr);
                
                const evs = await getAttractionEvents(id);
                setEvents(evs);
            } catch (err) {
                console.error('Feil ved lasting:', err);
                setError('Kunne ikke laste data');
            } finally {
                setLoading(false);
            }
        }
        
        loadData();
    }, [id]);

    // hent unike artister fra alle events (bruker Map for å unngå duplikater)
    function getUniqueArtists() {
        const artistMap = new Map();
        
        events.forEach(event => {
            const attractions = event._embedded?.attractions || [];
            attractions.forEach(artist => {
                if (artist.id !== id && !artistMap.has(artist.id)) {
                    artistMap.set(artist.id, artist);
                }
            });
        });
        
        return Array.from(artistMap.values());
    }

    if (loading) return <p className="loading">Laster...</p>;
    if (error) return <p className="error">{error}</p>;
    if (!attraction) return <p className="error">Fant ikke eventet</p>;

    const firstEvent = events[0];
    const venue = firstEvent?._embedded?.venues?.[0];
    const date = firstEvent?.dates?.start?.localDate;
    const time = firstEvent?.dates?.start?.localTime;
    const city = venue?.city?.name;
    const country = venue?.country?.name;
    const statusCode = firstEvent?.dates?.status?.code;
    
    // prøver å finne beskrivelse
    const description = firstEvent?.info || firstEvent?.pleaseNote || firstEvent?.description;
    
    const otherArtists = getUniqueArtists();

    // toggle wishlist - legger til eller fjerner fra favoritter
    function toggleWishlist(id) {
        setWishlist(prev => 
            prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
        );
    }

    return (
        <main className="event-page">
            <EventHeader 
                attraction={attraction} 
                venue={venue} 
                date={date}
                time={time}
                city={city}
                country={country}
                statusCode={statusCode}
            />

            {/* Detaljer om event */}
            <section className="event-details">
                <h2>Detaljer</h2>
                <ul className="details-list">
                    <li>
                        <strong>Sted:</strong> {venue?.name || "Ukjent sted"}
                        {city && `, ${city}`}
                        {country && `, ${country}`}
                    </li>
                    <li>
                        <strong>Dato:</strong> {date || "Ukjent dato"}
                        {time && ` kl. ${time}`}
                    </li>
                    <li>
                        <strong>Status:</strong> {statusCode || "Ikke oppgitt"}
                    </li>
                </ul>
                
                {description && (
                    <p className="event-description">
                        <strong>Info:</strong> {description}
                    </p>
                )}
            </section>

            {/* Festivalpass - alle events */}
            {events.length > 0 && (
                <section className="events-section">
                    <h2>Festivalpass ({events.length})</h2>
                    <ul className="events-grid">
                        {events.map(ev => (
                            <li key={ev.id}>
                                <EventCard 
                                    event={ev} 
                                    clickable={false}
                                    showTicketLink
                                    isInWishlist={wishlist.includes(ev.id)}
                                    onToggleWishlist={toggleWishlist}
                                />
                            </li>
                        ))}
                    </ul>
                </section>
            )}

            {/* Andre artister */}
            {otherArtists.length > 0 && (
                <section className="artists-section">
                    <h2>Artister ({otherArtists.length})</h2>
                    <ul className="artist-list">
                        {otherArtists.map(artist => (
                            <ArtistCard key={artist.id} artist={artist} />
                        ))}
                    </ul>
                </section>
            )}
        </main>
    );
}
