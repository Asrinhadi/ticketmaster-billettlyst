import { convertDate, choseEventPhoto } from "../assets/utils/helpers";
import "../styles/CityEventCard.scss";

export default function CityEventCard({ eventData }) {
 
  const venue = eventData?._embedded?.venues?.[0];
  const country = venue?.country?.name || "Ukjent land";
  const city = venue?.city?.name || "Ukjent by";
  const date = convertDate(eventData?.dates?.start?.localDate);

  return (
    <article className="city-card">
      <img
        src={choseEventPhoto(eventData, 300, 800, "16_9")}
        alt={eventData?.name || "Event"}
      />
      <section className="card-info">
        <h3>{eventData?.name || "Uten navn"}</h3>
        <p>{country}</p>
        <p>{city}</p>
        <p className="date">{date}</p>
      </section>
    </article>
  );
}




