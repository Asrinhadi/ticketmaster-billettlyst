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

  console.log("Kategori fra URL:", category);
  console.log("Fant kategori:", currentCategory);

  const [events, setEvents] = useState([]);
  const [attractions, setAttractions] = useState([]);
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(false);
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    async function hentData() {
      if (!segmentId) {
        console.log("segmentId mangler");
        return;
      }

      setLoading(true);

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
  }, [segmentId]);

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
        {segmentId && (
          <p>
            <small>
              Ticketmaster ID <code>{segmentId}</code>
            </small>
          </p>
        )}
      </header>

      <section aria-labelledby="attractions-heading">
        <h2 id="attractions-heading">Attraksjoner</h2>

        {loading && <p>Laster attraksjoner...</p>}

        {!loading && attractions.length === 0 && (
          <p>Ingen attraksjoner funnet</p>
        )}

        {!loading && attractions.length > 0 && (
          <ul className="card-grid" role="list">
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

      <section aria-labelledby="events-heading">
        <h2 id="events-heading">Arrangementer</h2>

        {loading && <p>Laster arrangementer...</p>}

        {!loading && events.length === 0 && (
          <p>Ingen arrangementer funnet</p>
        )}

        {!loading && events.length > 0 && (
          <ul className="card-grid" role="list">
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

      <section aria-labelledby="venues-heading">
        <h2 id="venues-heading">Spillesteder</h2>

        {loading && <p>Laster spillesteder...</p>}

        {!loading && venues.length === 0 && (
          <p>Ingen spillesteder funnet</p>
        )}

        {!loading && venues.length > 0 && (
          <ul>
            {venues.map(venue => (
              <li key={venue.id}>
                <strong>{venue.name}</strong>
                {venue.city?.name && <span> - {venue.city.name}</span>}
                {venue.country?.name && (
                  <span> ({venue.country.name})</span>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
