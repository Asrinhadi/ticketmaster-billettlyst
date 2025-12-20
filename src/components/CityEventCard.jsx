export default function CityEventCard({ eventData }) {
  const imageUrl = eventData?.images?.[0]?.url || "https://placehold.co/600x400?text=Billettlyst";
  const venue = eventData?._embedded?.venues?.[0];
  const country = venue?.country?.name || "Ukjent land";
  const city = venue?.city?.name || "Ukjent by";
  const date = eventData?.dates?.start?.localDate || "Ukjent dato";

  return (
    <article>
      <img src={imageUrl} alt={eventData?.name || "Event"} />
      <section>
        <h3>{eventData?.name || "Uten navn"}</h3>
        <p>{country}</p>
        <p>{city}</p>
        <p>{date}</p>
      </section>
    </article>
  );
}
