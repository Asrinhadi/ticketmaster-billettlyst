import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAttraction, getAttractionEvents } from "../services/ticketmasterServices";
import { getImage, formatDate } from "../assets/utils/helpers";
import { MapPin, Calendar, Music, Tag, ExternalLink } from "lucide-react";
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

    const genres = attraction.classifications?.[0];
    const firstEvent = events[0];
    const venue = firstEvent?._embedded?.venues?.[0];
    
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
            <figure className="banner">
                <img src={getImage(attraction, 500, 1200)} alt={attraction.name} />
                <figcaption>
                    <h1>{attraction.name}</h1>
                </figcaption>
            </figure>

            <section className="event-details">
                {genres && (
                    <ul className="genre-tags">
                        {genres.segment?.name && genres.segment.name !== "Undefined" && (
                            <li><Tag size={16} /> {genres.segment.name}</li>
                        )}
                        {genres.genre?.name && genres.genre.name !== "Undefined" && (
                            <li><Music size={16} /> {genres.genre.name}</li>
                        )}
                        {genres.subGenre?.name && genres.subGenre.name !== "Undefined" && (
                            <li>{genres.subGenre.name}</li>
                        )}
                    </ul>
                )}

                {venue && (
                    <p className="venue-info">
                        <MapPin size={18} />
                        <span>{venue.name}, {venue.city?.name}, {venue.country?.name}</span>
                    </p>
                )}

                {firstEvent?.dates?.start?.localDate && (
                    <p className="date-info">
                        <Calendar size={18} />
                        <span>{formatDate(firstEvent.dates.start.localDate)}</span>
                    </p>
                )}

                {attraction.externalLinks?.homepage && (
                    <a href={attraction.externalLinks.homepage[0].url} className="external-link">
                        <ExternalLink size={16} /> Besøk nettside
                    </a>
                )}
            </section>

            {events.length > 0 && (
                <section className="tickets-section">
                    <h2>Festivalpass og billetter</h2>
                    <ul className="ticket-list">
                        {events.map(ev => (
                            <li key={ev.id} className="ticket-item">
                                <section className="ticket-info">
                                    <h3>{ev.name}</h3>
                                    <p><Calendar size={14} /> {formatDate(ev.dates.start.localDate)}</p>
                                </section>
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
