import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getSanityEventWithUsers } from "../services/sanityServices";
import { getEvent } from "../services/ticketmasterServices";


export default function SanityEventDetails() {
  const { id } = useParams(); 
  
  const [sanityData, setSanityData] = useState(null);
  const [ticketmasterData, setTicketmasterData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function hentEvent() {
      setLoading(true);
      try {

        const sanity = await getSanityEventWithUsers(id);
        const tm = await getEvent(id);
        
        setSanityData(sanity);
        setTicketmasterData(tm);
        
        console.log("fra sanity?", sanity);
        console.log("fra ticketmaster?", tm);
      } catch (err) {
        console.error("fikk ikke hentet event", err);
      } finally {
        setLoading(false);
      }
    }
    
    hentEvent();
  }, [id]);

  if (loading) return <p>Laster...</p>;
  
  if (!sanityData) return <p>Fant ikke eventet</p>;

 
  const venue = ticketmasterData?._embedded?.venues?.[0];
  const city = venue?.city?.name;
  const country = venue?.country?.name;
  
  let place = "Ukjent sted";
  if (city && country) {
    place = `${city}, ${country}`;
  } else if (venue?.name) {
    place = venue.name;
  }
  
  const date = ticketmasterData?.dates?.start?.localDate || "Ukjent dato";
  
  let type = "Ukjent type";
  if (ticketmasterData?.classifications?.[0]?.segment?.name) {
    type = ticketmasterData.classifications[0].segment.name;
  } else if (ticketmasterData?.classifications?.[0]?.genre?.name) {
    type = ticketmasterData.classifications[0].genre.name;
  }

  const wishlistUsers = sanityData.wishlistUsers || [];
  const purchaseUsers = sanityData.purchaseUsers || [];

  return (
    <div className="event-details">
      <Link to="/dashboard">← Tilbake</Link>
      
      <h1>{sanityData.title}</h1>
      <p>Kategori (Sanity): {sanityData.category}</p>
      
      <h2>ticketmaster info</h2>
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