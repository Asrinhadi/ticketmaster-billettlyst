import { convertDate, choseEventPhoto } from "../assets/utils/helpers";


export default function CityEventCard({ eventData }) {
  return (
    <article className="eventcard">
      <img
        src={choseEventPhoto(eventData, 300, 800, "16_9")}
        alt={eventData?.name || "Event"}
      />
      <section className="event-details">
        <h3>{eventData?.name || "Uten navn"}</h3>
        <p>{eventData?._embedded?.venues?.[0]?.country?.name || "Ukjent land"}</p>
        <p>{eventData?._embedded?.venues?.[0]?.city?.name || "Ukjent by"}</p>
        <p className="eventdate">{convertDate(eventData?.dates?.start?.localDate)}</p>
      </section>
    </article>
  );
}
