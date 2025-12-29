import { Link } from 'react-router-dom';
import { MapPin, Calendar, Heart } from 'lucide-react';
import { getImage, formatDate } from '../assets/utils/helpers';
import '../styles/EventCard.scss';

export default function EventCard({ 
  event, 
  clickable = true,
  isInWishlist = false,
  onToggleWishlist
}) {
  
  if (!event) return null;
  const venue = event._embedded?.venues?.[0];
  const date = event.dates?.start?.localDate;

  function handleHeartClick(e) {
    e.preventDefault(); // så vi ikke navigerer når vi trykker hjertet
    
    if (onToggleWishlist) {
      onToggleWishlist(event.id);
    }
  }

  return (
    <article className="event-card">
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
            <MapPin size={16} />
            <span>
              {venue.name}
              {venue.city?.name && `, ${venue.city.name}`}
            </span>
          </p>
        )}
        
        {date && (
          <p className="event-date">
            <Calendar size={16} />
            <span>{formatDate(date)}</span>
          </p>
        )}
        
        {clickable && (
          <Link to={`/event/${event.id}`} className="details-link">
            Les mer
          </Link>
        )}
      </div>
    </article>
  );
}