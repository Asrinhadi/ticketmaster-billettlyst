import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getPlace, getType, getDate } from "../assets/utils/helpers";
import { getSanityEventWithUsers } from "../services/sanityServices";
import { getEvent } from "../services/ticketmasterServices";

export default function SanityEventDetails() {
  const { id } = useParams();
  
  const [sanityData, setSanityData] = useState(null);
  const [ticketmasterData, setTicketmasterData] = useState(null);

  useEffect(() => {
 
    async function hentEvent() {
      const sanity = await getSanityEventWithUsers(id);
      setSanityData(sanity);
      console.log("sanity", sanity);
      
      const tm = await getEvent(id);
      setTicketmasterData(tm);
      console.log("ticketmaster", tm);
    }
    
    hentEvent();
  }, [id]);


  if (!sanityData) return null;

  const place = getPlace(ticketmasterData);
  const type = getType(ticketmasterData);
  const date = getDate(ticketmasterData);

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
        {sanityData.wishlistUsers.length > 0 ? (
          <ul>
            {sanityData.wishlistUsers.map((user) => (
              <li key={user._id}>{user.name}</li>
            ))}
          </ul>
        ) : (
          <p>Ingen har dette i ønskelisten</p>
        )}
      </section>
      
      <section className="purchase-section">
        <h2>Tidligere kjøp</h2>
        {sanityData.purchaseUsers.length > 0 ? (
          <ul>
            {sanityData.purchaseUsers.map((user) => (
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