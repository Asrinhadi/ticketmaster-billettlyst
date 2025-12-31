import { useState, useEffect } from "react";
import { getAllEvents, getAllUsers, urlFor } from "../services/sanityServices";
import "../styles/Dashboard.scss";

export default function Dashboard() {
    const [events, setEvents] = useState([]);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function hentData() {
            setLoading(true);
            try {
                const [eventsData, usersData] = await Promise.all([
                    getAllEvents(),
                    getAllUsers()
                ]);
                setEvents(eventsData);
                setUsers(usersData);
            } catch (err) {
                console.error('Feil ved henting fra Sanity:', err);
            } finally {
                setLoading(false);
            }
        }
        
        hentData();
    }, []);

    if (loading) {
        return <p className="loading">Laster data fra Sanity...</p>;
    }

    return (
        <main className="dashboard">
            <h1>Dashboard</h1>
           
            <section className="events-section">
                <h2>Alle Events ({events.length})</h2>
                <ul className="events-list">
                    {events.map(ev => (
                        <li key={ev._id} className="event-item">
                            <span className="event-title">{ev.title}</span>
                            <span className="event-category">{ev.category}</span>
                        </li>
                    ))}
                </ul>
            </section>

           
            <section className="users-section">
                <h2>Brukere ({users.length})</h2>
                <ul className="users-list">
                    {users.map(user => (
                        <li key={user._id} className="user-card">
                            <div className="user-header">
                                {user.image ? (
                                    <img 
                                        src={urlFor(user.image).width(80).height(80).url()} 
                                        alt={user.name}
                                        className="user-image"
                                    />
                                ) : (
                                    <div className="user-image placeholder">
                                        {user.name?.charAt(0)}
                                    </div>
                                )}
                                <div className="user-info">
                                    <h3>{user.name}</h3>
                                    <p className="user-email">{user.email}</p>
                                    <p className="user-stats">
                                        <span>Ønskeliste: {user.wishlist?.length || 0}</span>
                                        <span>Kjøpt: {user.previousPurchases?.length || 0}</span>
                                    </p>
                                </div>
                            </div>

                           
                            <div className="user-events">
                                {user.wishlist?.length > 0 && (
                                    <div className="wishlist">
                                        <h4>Ønskeliste</h4>
                                        <ul>
                                            {user.wishlist.map(ev => (
                                                <li key={ev._id}>{ev.title}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                                
                                {user.previousPurchases?.length > 0 && (
                                    <div className="purchases">
                                        <h4>Tidligere kjøp</h4>
                                        <ul>
                                            {user.previousPurchases.map(ev => (
                                                <li key={ev._id}>{ev.title}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </li>
                    ))}
                </ul>
            </section>
        </main>
    );
}
