import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getSingleEvent } from "../services/sanityServices"; 
import { getEvent } from "../services/ticketmasterServices"; 
import "../styles/EventDetails.scss";

export default function EventDetails() {
  const { apiId } = useParams();
  
  const [sanityData, setSanityData] = useState(null);
  const [ticketmasterData, setTicketmasterData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function hentEvent() {
      try {
        const data = await getSingleEvent(apiId);
        setSanityData(data);
        console.log("hva fra sanity?", data); 
        
        
        const tm = await getEvent(apiId); 
        setTicketmasterData(tm);
        console.log("hva fra ticketmaster?", tm);
      } catch (err) {
        console.error("event hentes ikke", err);
      } finally {
        setLoading(false);
      }
    }
    
    hentEvent();
  }, [apiId]);

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
    </div>
  );
}