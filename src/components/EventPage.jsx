import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAttraction, getAttractionEvents } from "../services/ticketmasterServices";
import { formatDate } from "../assets/utils/helpers";
import { Calendar } from "lucide-react";
import EventHeader from "./EventHeader";
import ArtistCard from "./ArtistCard";
import "../styles/EventPage.scss";

export default function EventPage() {
    const { id } = useParams();
    const [attraction, setAttraction] = useState(null);
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadData() {
            setLoading(true);
            
            const attr = await getAttraction(id);
            setAttraction(attr);
            
            // hent alle billetter/events for denne attraksjonen
            const evs = await getAttractionEvents(id);
            setEvents(evs);
            setLoading(false);
        }
        loadData();
    }, [id]);

    if (loading) return <p className="loading">Laster...</p>;
    if (!attraction) return <p className="error">Fant ikke eventet</p>;

    const firstEvent = events[0];
    const venue = firstEvent?._embedded?.venues?.[0];
    const date = firstEvent?.dates?.start?.localDate;
    
    // hent artister fra alle events
    let allArtists = [];
    for (let ev of events) {
        const attr = ev._embedded?.attractions || [];
        allArtists = allArtists.concat(attr);
    }
    
    // fjern duplikater og hovedattraksjonen
    const seen = new Set();
    const artists = allArtists.filter(artist => {
        if (seen.has(artist.id) || artist.id === id) return false;
        seen.add(artist.id);
        return true;
    });

    return (
        <main className="event-page">
            <EventHeader 
                attraction={attraction} 
                venue={venue} 
                date={date} 
            />

            {events.length > 0 && (
                <section className="tickets-section">
                    <h2>Festivalpass og billetter</h2>
                    <ul className="ticket-list">
                        {events.map(ev => (
                            <li key={ev.id} className="ticket-item">
                                <div className="ticket-info">
                                    <h3>{ev.name}</h3>
                                    <p><Calendar size={14} /> {formatDate(ev.dates.start.localDate)}</p>
                                </div>
                                {ev.url && (
                                    <a href={ev.url} className="buy-btn">Kjøp billett</a>
                                )}
                            </li>
                        ))}
                    </ul>
                </section>
            )}

            {artists.length > 0 && (
                <section className="artists-section">
                    <h2>Artister</h2>
                    <ul className="artist-list">
                        {artists.map(artist => (
                            <ArtistCard key={artist.id} artist={artist} />
                        ))}
                    </ul>
                </section>
            )}
        </main>
    );
}
