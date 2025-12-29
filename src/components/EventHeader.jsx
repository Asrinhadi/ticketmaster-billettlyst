import { getImage, formatDate } from "../assets/utils/helpers";
import { MapPin, Calendar, Music, Tag, ExternalLink } from "lucide-react";
import "../styles/EventHeader.scss";

export default function EventHeader({ attraction, venue, date }) {
    if (!attraction) return null;
    
    const genres = attraction.classifications?.[0];
    
    return (
        <section className="event-header">
            
            <figure className="banner-image">
                <img 
                    src={getImage(attraction, 500, 1200)} 
                    alt={attraction.name} 
                />
                <div className="overlay"></div>
                
                <figcaption className="banner-content">
                    <h1>{attraction.name}</h1>
                    
                    <div className="quick-info">
                        {venue && (
                            <p className="location">
                                <MapPin size={18} />
                                <span>
                                    {venue.name}
                                    {venue.city?.name && `, ${venue.city.name}`}
                                    {venue.country?.name && `, ${venue.country.name}`}
                                </span>
                            </p>
                        )}
                        {date && (
                            <p className="date">
                                <Calendar size={18} />
                                <span>{formatDate(date)}</span>
                            </p>
                        )}
                    </div>
                </figcaption>
            </figure>

            
            <div className="info-bar">
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

                {attraction.externalLinks?.homepage && (
                    <a 
                        href={attraction.externalLinks.homepage[0].url} 
                        className="external-link"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <ExternalLink size={16} /> Besøk nettside
                    </a>
                )}
            </div>
        </section>
    );
}
