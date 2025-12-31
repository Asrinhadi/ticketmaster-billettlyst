import { useState, useEffect } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { getPlace, getType, getDate } from "../assets/utils/helpers";
import { getSanityEventWithUsers } from "../services/sanityServices";
import { getEvent } from "../services/ticketmasterServices";

export default function SanityEventDetails() {
  const { id } = useParams();
  
  // route guard - sjekk om bruker er logget inn
  const isLoggedIn = localStorage.getItem("loggedInUser") !== null;
  
  const [sanityData, setSanityData] = useState(null);
  const [ticketmasterData, setTicketmasterData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isLoggedIn) return;
    
    async function hentEvent() {
      setLoading(true);
      try {
        const sanity = await getSanityEventWithUsers(id);
        setSanityData(sanity);
        console.log("sanity", sanity);
        
        const tm = await getEvent(id);
        setTicketmasterData(tm);
        console.log("ticketmaster", tm);
      } catch (err) {
        console.error("feil ved henting", err);
      } finally {
        setLoading(false);
      }
    }
    
    hentEvent();
  }, [id, isLoggedIn]);

  // redirect til dashboard hvis ikke logget inn
  if (!isLoggedIn) {
    return <Navigate to="/dashboard" replace />;
  }

  if (loading) return <p>Laster event...</p>;
  
  if (!sanityData) return <p>Fant ikke eventet</p>;

  const place = getPlace(ticketmasterData);
  const type = getType(ticketmasterData);
  const date = getDate(ticketmasterData);

  const wishlistUsers = sanityData.wishlistUsers || [];
  const purchaseUsers = sanityData.purchaseUsers || [];

  return (
    <div className="event-details">
      <Link to="/dashboard">← Tilbake</Link>
      
      <h1>{sanityData.title}</h1>
      <p>Kategori: {sanityData.category}</p>
      
      <h2>Ticketmaster info</h2>
      <p>Dato: {date}</p>
      <p>Sted: {place}</p>
      <p>Type: {type}</p>
      
      <section className="wishlist-section">
        <h2>Ønskeliste</h2>
        {wishlistUsers.length > 0 ? (
          <ul>
            {wishlistUsers.map((user) => (
              <li key={user._id}>{user.name}</li>
            ))}
          </ul>
        ) : (
          <p>Ingen har dette i ønskelisten</p>
        )}
      </section>
      
      <section className="purchase-section">
        <h2>Tidligere kjøp</h2>
        {purchaseUsers.length > 0 ? (
          <ul>
            {purchaseUsers.map((user) => (
              <li key={user._id}>{user.name}</li>
            ))}
          </ul>
        ) : (
          <p>Ingen har dette i tidligere kjøp</p>
        )}
      </section>
    </div>
  );
}