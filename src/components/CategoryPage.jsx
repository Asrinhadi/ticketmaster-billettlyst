import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { CATEGORIES } from "../constants/categories";
import { getCategorySuggestions } from "../services/ticketmasterServices";
import EventCard from "./EventCard";  

export default function CategoryPage() {
  const { category } = useParams(); 
  
  // fra constantsmappen finner riktig kat 
  const currentCategory = CATEGORIES.find(cat => cat.slug === category);
  const displayName = currentCategory?.name || category;
  const segmentId = currentCategory?.id || null;

  const [suggestions, setSuggestions] = useState({
    events: [],
    attractions: [],
    venues: [],
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadSuggestions() {
      if (!segmentId) {
        console.log("mangler segmentId, skipper henting");
        return;
      }
      
      setLoading(true);
      const data = await getCategorySuggestions(segmentId);
      //console.log("Hentet data for kategori:", data); 
      setSuggestions(data);
      setLoading(false);
    }
    
    loadSuggestions();
  }, [segmentId]);

  // implementer attractions og venues også
  
  return (
    <section className="category-page">
      <header className="category-header">
        <h1>Kategori: {displayName}</h1>
        
        {/* NBNBNBNB-->fjern denne placeholdereksten når alt er ferdig */}
        <p>hent nødvendige info fra ticketmaster og vise det her muligens !!</p>
        
        {segmentId && (
          <p className="category-meta">
            Ticketmaster segmentid <code>{segmentId}</code>
          </p>
        )}
      </header>

      <section className="category-section">
        <h2>Attraksjoner</h2>
        {/* får fikse attractionene senere */}
        <p>Ingen attraksjoner lasta inn enda</p>
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
        <p>Ingen spillesteder ennå</p>
        {/*  mappe over suggestions.venues når den er klar */}
      </section>
    </section>
  );
}