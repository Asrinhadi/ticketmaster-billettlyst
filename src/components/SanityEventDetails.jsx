import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getSingleEvent, getUsersByWishlist } from "../services/sanityServices"; 
import { getEvent } from "../services/ticketmasterServices"; 
import "../styles/EventDetails.scss";

export default function SanityEventDetails() {
  const { id } = useParams();
  
  const [sanityData, setSanityData] = useState(null);
  const [ticketmasterData, setTicketmasterData] = useState(null);
  const [wishlistUsers, setWishlistUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function hentEvent() {
      try {
        const data = await getSingleEvent(id);
        setSanityData(data);
        console.log("hva fra sanity?", data); 
        
        const tm = await getEvent(id); 
        setTicketmasterData(tm);
        console.log("hva fra ticketmaster?", tm);
        
        const users = await getUsersByWishlist(id);
        setWishlistUsers(users);
        console.log("hvem har dette i wishlist?", users);
      } catch (err) {
        console.error("event hentes ikke", err);
      } finally {
        setLoading(false);
      }
    }
    
    hentEvent();
  }, [id]);

  if (loading) return <p>Laster...</p>;
  
  if (!sanityData) return <p>Fant ikke eventet</p>;

  return (
    <div className="event-details">
      <h1>{sanityData.title}</h1>
      <p>Kategori: {sanityData.category}</p>
      
      {ticketmasterData && (
        <>
          <p>Dato: {ticketmasterData.dates?.start?.localDate}</p>
          <p>Sted: {ticketmasterData._embedded?.venues?.[0]?.name}</p>
        </>
      )}
      
      <section className="wishlist-section">
        <h2>Hvem vil gå på dette?</h2>
        {wishlistUsers.length > 0 ? (
          <ul>
            {wishlistUsers.map(user => (
              <li key={user._id}>{user.name}</li>
            ))}
          </ul>
        ) : (
          <p>Ingen har dette i ønskelisten enda</p>
        )}
      </section>
    </div>
  );
}