import { Link } from 'react-router-dom';
import { MapPin, Calendar } from 'lucide-react';
import { choseEventPhoto, convertDate } from '../assets/utils/helpers';
import '../styles/EventCard.scss';

export default function EventCard({ eventData }) {
  if (!eventData) return null;

  const eventImage = choseEventPhoto(eventData, 300, 800, "16_9");
  const venue = eventData._embedded?.venues?.[0];
  const dato = eventData.dates?.start?.localDate;

  return (
    <article className="event-card">
      <img 
        src={eventImage} 
        alt={eventData.name}
        className="event-image"
      />
      
      <section className="card-content">
        <h3 className="event-title">{eventData.name}</h3>
        
        {venue && (
          <p className="event-venue">
            <MapPin size={16} />
            <span>{venue.name}{venue.city?.name && `, ${venue.city.name}`}</span>
          </p>
        )}
        
        {dato && (
          <p className="event-date">
            <Calendar size={16} />
            <span>{convertDate(dato)}</span>
          </p>
        )}
        
        <Link to={`/event/${eventData.id}`} className="details-link">
          Les mer
        </Link>
      </section>
    </article>
  );
}