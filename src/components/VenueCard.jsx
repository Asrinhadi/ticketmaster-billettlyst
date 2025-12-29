import { getImage } from '../assets/utils/helpers';
import { Heart, MapPin } from 'lucide-react';
import '../styles/VenueCard.scss';

export default function VenueCard({ venue, isInWishlist, onToggleWishlist }) {
    if (!venue) return null;

    function handleHeartClick(e) {
        e.preventDefault();
        if (onToggleWishlist) {
            onToggleWishlist(venue.id);
        }
    }

    return (
        <article className="venue-card">
            <img 
                src={getImage(venue)} 
                alt={venue.name} 
            />
            
            <button 
                className={isInWishlist ? 'wishlist-btn active' : 'wishlist-btn'}
                onClick={handleHeartClick}
            >
                <Heart size={18} />
            </button>
            
            <div className="venue-info">
                <h3>{venue.name}</h3>
                {venue.city?.name && (
                    <p><MapPin size={14} /> {venue.city.name}</p>
                )}
            </div>
        </article>
    );
}
