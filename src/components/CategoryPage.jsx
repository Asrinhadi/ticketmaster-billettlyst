import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { CATEGORIES } from "../constants/categories";
import { getCategorySuggestions } from "../services/ticketmasterServices";
import EventCard from "./EventCard";
import VenueCard from "./VenueCard";
import "../styles/CategoryPage.scss";

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
        <h1>Kategori: {categoryName}</h1>
      </header>

      <section>
        <h2>Attractions</h2>
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
                  isInWishlist={wishlist.includes(attraction.id)}
                  onToggleWishlist={() => toggleWishlist(attraction.id)}
                />
              </li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <h2>Events</h2>

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
                  isInWishlist={wishlist.includes(event.id)}
                  onToggleWishlist={() => toggleWishlist(event.id)}
                />
              </li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <h2>Venues</h2>

        {loading && <p>Laster...</p>}

        {!loading && venues.length === 0 ? (
          <p>Ingen spillesteder funnet</p>
        ) : (
          !loading && (
            <ul className="card-grid">
              {venues.map(venue => (
                <li key={venue.id}>
                  <VenueCard
                    venue={venue}
                    isInWishlist={wishlist.includes(venue.id)}
                    onToggleWishlist={() => toggleWishlist(venue.id)}
                  />
                </li>
              ))}
            </ul>
          )
        )}
      </section>
    </main>
  );
}
