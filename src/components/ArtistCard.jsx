import { getImage } from '../assets/utils/helpers';

export default function ArtistCard({ artist }) {
    if (!artist) return null;

    return (
        <li className="artist-item">
            <img src={getImage(artist, 100, 300)} alt={artist.name} />
            <span>{artist.name}</span>
        </li>
    );
}
