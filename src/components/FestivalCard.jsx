import { Link } from 'react-router-dom';
import { choseEventPhoto } from '../assets/utils/helpers';
import '../styles/FestivalCard.scss';

export default function FestivalCard({ festival }) {
  if (!festival) return null;

  const festivalImage = choseEventPhoto(festival, 300, 800, "16_9");

  return (
    <article className="festival-card">
      <img 
        src={festivalImage} 
        alt={festival.name}
        className="festival-image"
      />
      
      <div className="festival-info">
        <h3 className="festival-name">{festival.name}</h3>
        <Link to={`/event/${festival.id}`} className="read-more-btn">
          Les mer
        </Link>
      </div>
    </article>
  );
}
