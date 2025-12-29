import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { CATEGORIES } from "../constants/categories";
import { getCategorySuggestions } from "../services/ticketmasterServices";
import EventCard from "./EventCard";  

export default function CategoryPage() {
  const { category } = useParams(); 
  
  const currentCategory = CATEGORIES.find(cat => cat.slug === category);
  const displayName = currentCategory?.name || category;
  const segmentId = currentCategory?.id || null;

  const [suggestions, setSuggestions] = useState({
    events: [],
    attractions: [],
    venues: [],
  });
  const [loading, setLoading] = useState(false);
  
  const [wishlist, setWishlist] = useState([]);

  const toggleWishlist = (eventId) => {
    const finnes = wishlist.includes(eventId);
    if (finnes) {
      const nyListe = wishlist.filter(id => id !== eventId);
      setWishlist(nyListe);
    } else {
      setWishlist([...wishlist, eventId]);
    }
  };

  useEffect(() => {
    async function loadSuggestions() {
      if (!segmentId) {
        console.log("mangler segmentId");
        return;
      }
      
      setLoading(true);
      const data = await getCategorySuggestions(segmentId);
      setSuggestions(data);
      setLoading(false);
    }
    
    loadSuggestions();
  }, [segmentId]);
  
  return (
    <section className="category-page">
      <header className="category-header">
        <h1>Kategori: {displayName}</h1>
        
        {segmentId && (
          <p className="category-meta">
            Ticketmaster segmentid <code>{segmentId}</code>
          </p>
        )}
      </header>

      <section className="category-section">
        <h2>Attraksjoner</h2>
        {loading ? (
          <p>Laster attraksjoner...</p>
        ) : suggestions.attractions.length === 0 ? (
          <p>Ingen attraksjoner lasta inn enda</p>
        ) : (
          <div className="card-grid">
            {suggestions.attractions.map((attraction) => (
              <EventCard
                key={attraction.id}
                event={attraction}
                clickable={false}
              />
            ))}
          </div>
        )}
      </section>

      <section className="category-section">
        <h2>Arrangementer</h2>
        {loading ? (
          <p>Laster arrangementer...</p>
        ) : suggestions.events.length === 0 ? (
          <p>Ingen arrangementer er lasta inn enda</p>
        ) : (
          <div className="card-grid">
            {suggestions.events.map((event) => (
              <EventCard 
                key={event.id} 
                event={event} 
                clickable={false} 
              />
            ))}
          </div>
        )}
      </section>

      <section className="category-section">
        <h2>Spillesteder og eventsteder</h2>
        {loading ? (
          <p>Laster spillesteder...</p>
        ) : suggestions.venues.length === 0 ? (
          <p>Ingen spillesteder ennå</p>
        ) : (
          <ul>
            {suggestions.venues.map((venue) => (
              <li key={venue.id}>
                {venue.name}
                {venue.city?.name && `, ${venue.city.name}`}
                {venue.country?.name && ` (${venue.country.name})`}
              </li>
            ))}
          </ul>
        )}
      </section>
    </section>
  );
}
