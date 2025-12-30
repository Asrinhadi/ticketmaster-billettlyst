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

    useEffect(() => {
        async function loadData() {
            setLoading(true);
            setError(null);
            
            try {
                const attr = await getAttraction(id);
                setAttraction(attr);
                
                // hent alle events for denne attraksjonen
                const evs = await getAttractionEvents(id);
                setEvents(evs);
            } catch (err) {
                console.error('no feil ved lasting', err);
                setError('kunne ikke laste data');
            } finally {
                setLoading(false);
            }
        }
        
        loadData();
    }, [id]);

    
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
    const statusCode = firstEvent?.dates?.status?.code;
    
    // henter by og land fra venue
    const city = venue?.city?.name;
    const country = venue?.country?.name;
    
    // ekstra info fra api - pleaseNote har ofte viktig info om aldersgrense osv
    const pleaseNote = firstEvent?.pleaseNote;
    // priceRanges viser min/max pris hvis tilgjengelig
    const priceRange = firstEvent?.priceRanges?.[0];
    
    const otherArtists = getUniqueArtists();

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
                info={firstEvent?.info}
            />

            {/* ekstra detaljer som ikke passer i header */}
            {(pleaseNote || priceRange) && (
                <section className="extra-info">
                    {priceRange && (
                        <p className="price-info">
                            <strong>Pris:</strong> {priceRange.min} - {priceRange.max} {priceRange.currency}
                        </p>
                    )}
                    {pleaseNote && (
                        <p className="please-note">
                            <strong>Obs:</strong> {pleaseNote}
                        </p>
                    )}
                </section>
            )}

            <section className="events-section">
                <h2>Festivalpass {events.length > 0 && `(${events.length})`}</h2>
                {events.length > 0 ? (
                    <ul className="events-grid">
                        {events.map(ev => (
                            <li key={ev.id}>
                                <EventCard 
                                    event={ev} 
                                    clickable={false}
                                    showTicketLink
                                />
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Ingen festivalpass funnet</p>
                )}
            </section>

            {otherArtists.length > 0 && (
                <section className="artists-section">
                    <h2>Andre artister</h2>
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
