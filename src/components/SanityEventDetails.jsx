import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../styles/EventDetails.scss";

export default function EventDetails() {
  const { apiId } = useParams(); // hent ID fra URL
  
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("eventid fra url", apiId); 
    
    setLoading(false);
  }, []);

  if (loading) {
    return <p>Laster event...</p>;
  }

  return (
    <div className="event-details">
      <h1>Event Details</h1>
      <p>Event ID {apiId}</p>
    </div>
  );
}