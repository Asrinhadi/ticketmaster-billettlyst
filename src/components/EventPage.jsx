import { useParams } from "react-router-dom";

export default function EventPage() {
  const { id } = useParams();

  return (
    <section className="event-page">
      <h1>Event detaljer</h1>
      <p>Event med id: {id}</p>
      <p>Her kommer innholdet snart...</p>
    </section>
  );
}
