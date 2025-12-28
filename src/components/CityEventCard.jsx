import { formatDate, getImage } from "../assets/utils/helpers";
import "../styles/CityEventCard.scss";

export default function CityEventCard({ event }) {
  const venue = event?._embedded?.venues?.[0];

  return (
    <li className="city-card">
      <img
        src={getImage(event)}
        alt={event?.name || "Event"}
      />

      <section className="card-info">
        <h3>{event?.name || "Uten navn"}</h3>
        <p>{venue?.country?.name || "Ukjent land"}</p>
        <p>{venue?.city?.name || "Ukjent by"}</p>
        <p className="date">
          {formatDate(event?.dates?.start?.localDate)}
        </p>
      </section>
    </li>
  );
}


// (_embedded.venues[0]) fra Ticketmaster API
// Ref: https://developer.ticketmaster.com/products-and-docs/tutorials/events-search/search_events_with_discovery_api.html
