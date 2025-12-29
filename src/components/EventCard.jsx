import { Link } from 'react-router-dom';
import { MapPin, Calendar, Heart } from 'lucide-react';
import { getImage, formatDate } from '../assets/utils/helpers';
import '../styles/EventCard.scss';

export default function EventCard({ 
    event, 
    isInWishlist = false,
    onToggleWishlist
}) {
    if (!event) return null;
    
    const venue = event._embedded?.venues?.[0];
    const date = event.dates?.start?.localDate;

    function handleHeartClick(e) {
        e.preventDefault();
        e.stopPropagation();
        
        if (onToggleWishlist) {
            onToggleWishlist(event.id);
        }
    }

    return (
        <article className="event-card">
            <Link to={`/event/${event.id}`}>
                <img 
                    src={getImage(event)} 
                    alt={event.name}
                    className="event-image"
                />
                
                <button 
                    className={isInWishlist ? 'wishlist-btn active' : 'wishlist-btn'}
                    onClick={handleHeartClick}
                >
                    <Heart size={18} />
                </button>

                <div className="card-content">
                    <h3 className="event-title">{event.name}</h3>
                    
                    {venue && (
                        <p className="event-venue">
                            <MapPin size={14} />
                            <span>
                                {venue.name}
                                {venue.city?.name && `, ${venue.city.name}`}
                            </span>
                        </p>
                    )}
                    
                    {date && (
                        <p className="event-date">
                            <Calendar size={14} />
                            <span>{formatDate(date)}</span>
                        </p>
                    )}
                </div>
            </Link>
        </article>
    );
}
