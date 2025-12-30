
import { Link } from 'react-router-dom';
import { getImage } from '../assets/utils/helpers';
import '../styles/FestivalCard.scss';

export default function FestivalCard({ festival }) {
  if (!festival) return null;

  return (
    <li className="festival-card">
      <img src={getImage(festival)} alt={festival.name} className="festival-image" />
      
      <section className="festival-info">
        <h3>{festival.name}</h3>
        <Link to={`/event/${festival.id}`} className="read-more-btn">Les mer</Link>
      </section>
    </li>
  );
}
