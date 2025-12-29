import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { CATEGORIES } from "../constants/categories";
import { getCategorySuggestions } from "../services/ticketmasterServices";
import EventCard from "./EventCard";

export default function CategoryPage() {
  const { category } = useParams();
  const currentCategory = CATEGORIES.find(cat => cat.slug === category);
  const categoryName = currentCategory?.name || category;
  const segmentId = currentCategory?.id;

  const [events, setEvents] = useState([]);
  const [attractions, setAttractions] = useState([]);
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(false);
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    async function hentData() {
      if (!segmentId) {
        return;
      }

      setLoading(true);
      console.log("hva for noe data som blir henta her", categoryName);

      try {
        const data = await getCategorySuggestions(segmentId);

        setEvents(data.events || []);
        setAttractions(data.attractions || []);
        setVenues(data.venues || []);
      } catch (error) {
        console.error("noe feil ved henting", error);
      }

      setLoading(false);
    }

    hentData();
  }, [segmentId, categoryName]);

  function toggleWishlist(id) {
    setWishlist(prev => {
      if (prev.includes(id)) {
        return prev.filter(x => x !== id);
      }
      return [...prev, id];
    });
  }

  return (
    <main className="category-page">
      <header>
        <h1>{categoryName}</h1>
      </header>

      <section>
        <h2>Attraksjoner</h2>
        {loading ? (
          <p>Laster...</p>
        ) : attractions.length === 0 ? (
          <p>Ingen attraksjoner funnet</p>
        ) : (
          <ul className="card-grid">
            {attractions.map(attraction => (
              <li key={attraction.id}>
                <EventCard
                  event={attraction}
                  clickable={false}
                  isInWishlist={wishlist.includes(attraction.id)}
                  onToggleWishlist={() => toggleWishlist(attraction.id)}
                />
              </li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <h2>Arrangementer</h2>

        {loading && <p>Laster...</p>}

        {!loading && events.length === 0 && (
          <p>Ingen arrangementer funnet</p>
        )}

        {!loading && events.length > 0 && (
          <ul className="card-grid">
            {events.map(event => (
              <li key={event.id}>
                <EventCard
                  event={event}
                  clickable={false}
                  isInWishlist={wishlist.includes(event.id)}
                  onToggleWishlist={() => toggleWishlist(event.id)}
                />
              </li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <h2>Spillesteder</h2>

        {loading && <p>Laster...</p>}

        {!loading && venues.length === 0 ? (
          <p>Ingen spillesteder funnet</p>
        ) : (
          !loading && (
            <ul>
              {venues.map(venue => (
                <li key={venue.id}>
                  <strong>{venue.name}</strong>
                  {venue.city?.name && ` - ${venue.city.name}`}
                  {venue.country?.name && `, ${venue.country.name}`}
                </li>
              ))}
            </ul>
          )
        )}
      </section>
    </main>
  );
}
