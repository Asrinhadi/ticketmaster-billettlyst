import { getImage } from '../assets/utils/helpers';
import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import '../styles/AttractionCard.scss';

export default function AttractionCard({ attraction, isInWishlist, onToggleWishlist }) {
    if (!attraction) return null;

    function handleHeartClick(e) {
        e.preventDefault();
        if (onToggleWishlist) {
            onToggleWishlist(attraction.id);
        }
    }

    return (
        <article className="attraction-card">
            <Link to={`/event/${attraction.id}`}>
                <img 
                    src={getImage(attraction)} 
                    alt={attraction.name} 
                />
                
                <button 
                    className={isInWishlist ? 'wishlist-btn active' : 'wishlist-btn'}
                    onClick={handleHeartClick}
                >
                    <Heart size={18} />
                </button>
                
                <h3>{attraction.name}</h3>
            </Link>
        </article>
    );
}
