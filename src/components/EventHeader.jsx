import { getImage, formatDate } from "../assets/utils/helpers";
import { MapPin, Calendar, Music, Tag, ExternalLink, Info } from "lucide-react";
import "../styles/EventHeader.scss";

export default function EventHeader({ 
    attraction, 
    venue, 
    date, 
    time, 
    city, 
    country, 
    statusCode 
}) {
    if (!attraction) return null;
    
    // hent sjangerinfo
    const genre = attraction.classifications?.[0];
    const segment = genre?.segment?.name;
    const mainGenre = genre?.genre?.name;
    const subGenre = genre?.subGenre?.name;
    
    const homepage = attraction.externalLinks?.homepage?.[0]?.url;
    
    return (
        <header className="event-header">
            
            <section className="banner-image">
                <img 
                    src={getImage(attraction, 500, 1200)} 
                    alt={attraction.name} 
                />
                <span className="overlay"></span>
                
                <hgroup className="banner-content">
                    <h1>{attraction.name}</h1>
                    
                    <aside className="quick-info">
                        {venue && (
                            <p className="location">
                                <MapPin size={18} />
                                {venue.name}
                                {city && `, ${city}`}
                                {country && `, ${country}`}
                            </p>
                        )}
                        {date && (
                            <p className="date">
                                <Calendar size={18} />
                                {formatDate(date)}
                                {time && ` kl. ${time}`}
                            </p>
                        )}
                        {statusCode && (
                            <p className="status">
                                <Info size={18} />
                                Status: {statusCode}
                            </p>
                        )}
                    </aside>
                </hgroup>
            </section>

            
            <nav className="info-bar">
                {genre && (
                    <ul className="genre-tags">
                        {segment && segment !== "Undefined" && (
                            <li><Tag size={16} /> {segment}</li>
                        )}
                        {mainGenre && mainGenre !== "Undefined" && (
                            <li><Music size={16} /> {mainGenre}</li>
                        )}
                        {subGenre && subGenre !== "Undefined" && (
                            <li>{subGenre}</li>
                        )}
                    </ul>
                )}

                {homepage && (
                    <a 
                        href={homepage} 
                        className="external-link"
                    >
                        <ExternalLink size={16} /> Besøk nettside
                    </a>
                )}
            </nav>
        </header>
    );
}