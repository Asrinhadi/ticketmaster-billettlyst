import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { CATEGORIES } from "../constants/categories";
import { getCategorySuggestions } from "../services/ticketmasterServices";
import EventCard from "./EventCard";
import VenueCard from "./VenueCard";
import FilterBar from "./FilterBar";
import "../styles/CategoryPage.scss";

export default function CategoryPage() {
    const { category } = useParams();
    
    
    const currentCategory = CATEGORIES.find(cat => cat.slug === category);
    const categoryName = currentCategory?.name || category;
    const segmentId = currentCategory?.id;

    const [data, setData] = useState({ events: [], attractions: [], venues: [] });
    const [loading, setLoading] = useState(true);
    const [filterQuery, setFilterQuery] = useState("");
    const [wishlist, setWishlist] = useState([]);

    useEffect(() => {
        if (!segmentId) return;
        
        hentData();
    }, [segmentId, filterQuery]);

    async function hentData() {
        setLoading(true);
        
        try {
            const result = await getCategorySuggestions(segmentId, filterQuery);
            console.log("hentet fra API:", result);
            setData(result);
        } catch (error) {
            console.log(error); 
        } finally {
            setLoading(false); 
        }
    }

    // fikser wishlist her må man bruke prev for å få riktig state
    // forklaringen hersånn https://react.dev/learn/state-as-a-snapshot
    // og her   https://react.dev/learn/queueing-a-series-of-state-updates
    function toggleWishlist(id) {
        setWishlist(prev => 
            prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
        );
    }

    return (
        <main className="category-page">
            <header>
                <h1>Kategori: {categoryName}</h1>
            </header>

            <FilterBar 
                onFilter={setFilterQuery} 
                setLoading={setLoading}
            />
            <section>
                <h2>Attractions</h2>
                {loading ? (
                    <p>Laster...</p>
                ) : data.attractions.length === 0 ? (
                    <p>Ingen attraksjoner funnet</p>
                ) : (
                    <ul className="card-grid">
                        {data.attractions.map(attraction => (
                            <li key={attraction.id}>
                                <EventCard
                                    event={attraction}
                                    clickable={false}
                                    isInWishlist={wishlist.includes(attraction.id)}
                                    onToggleWishlist={toggleWishlist}
                                />
                            </li>
                        ))}
                    </ul>
                )}
            </section>
            
            <section>
                <h2>Events</h2>
                {loading && <p>Laster events...</p>}
                
                {!loading && data.events.length === 0 && (
                    <p>Fant ingen arrangementer i denne kategorien</p>
                )}
                
                {!loading && data.events.length > 0 && (
                    <ul className="card-grid">
                        {data.events.map(event => (
                            <li key={event.id}>
                                <EventCard
                                    event={event}
                                    clickable={false}
                                    isInWishlist={wishlist.includes(event.id)}
                                    onToggleWishlist={toggleWishlist}
                                />
                            </li>
                        ))}
                    </ul>
                )}
            </section>
            <section>
                <h2>Spillesteder</h2>
                {loading ? <p>Laster...</p> : (
                    <>
                        {data.venues.length === 0 ? (
                            <p>Ingen spillesteder</p>
                        ) : (
                            <ul className="card-grid">
                                {data.venues.map(venue => (
                                    <li key={venue.id}>
                                        <VenueCard
                                            venue={venue}
                                            isInWishlist={wishlist.includes(venue.id)}
                                            onToggleWishlist={() => toggleWishlist(venue.id)}
                                        />
                                    </li>
                                ))}
                            </ul>
                        )}
                    </>
                )}
            </section>
        </main>
    );
}