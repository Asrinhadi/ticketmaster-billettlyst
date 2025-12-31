import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllEvents, getAllUsers, urlFor } from "../services/sanityServices";
import "../styles/Dashboard.scss";

export default function Dashboard() {
  
  const [isLoggedIn, setIsLoggedIn] = useState(true);/////// huske å forandre på denne til false igjen..................
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  // BRAVET DATA FRA SANITY
  const [allEvents, setAllEvents] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    // Må jeg egentlgi legge til  ekte autentisering???
    setIsLoggedIn(true);
  }

  function handleLogout() {
    setIsLoggedIn(false);
    setFormValues({ email: "", password: "" });
  }

  
  useEffect(() => {
    if (!isLoggedIn) return;

    async function fetchData() {
      setLoading(true);
      try {
        const [events, users] = await Promise.all([
          getAllEvents(),
          getAllUsers()
        ]);
        
        setAllEvents(events);
        setAllUsers(users);
        
        console.log("eventsene", events.length);
        console.log("brukerne?", users.length);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [isLoggedIn]);

  // hvis ikke logget inn vis loginn skjemaert
  if (!isLoggedIn) {
    return (
      <main className="dashboard">
        <h1>Dashboard</h1>
        <section className="login-card">
          <h2>Logg inn</h2>
          <form className="login-form" onSubmit={handleSubmit}>
            <label>
              E-post
              <input
                type="email"
                name="email"
                value={formValues.email}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Passord
              <input
                type="password"
                name="password"
                value={formValues.password}
                onChange={handleChange}
                required
              />
            </label>
            <button type="submit">Logg inn</button>
          </form>
        </section>
      </main>
    );
  }

  if (loading) {
    return <p className="loading">Laster data fra Sanity...</p>;
  }

  // Bkrav vis alle events og brukere fra Sanity
  return (
    <main className="dashboard">
      <div className="dashboard-top">
        <h1>Min side</h1>
        <button className="logout-btn" onClick={handleLogout}>
          Logg ut
        </button>
      </div>

      {/* BKRAVet alle events i Sanity */}
      <section className="events-section">
        <h3>Alle events i Sanity:</h3>
        <ul>
          {allEvents.map((evnt) => (
            <li key={evnt._id}>
              <Link to={`/dashboard/event/${evnt.apiId}`}>
                {evnt.title} ({evnt.category})
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* BKARVET ALLE brukere med wishlist og purchases */}
      <section className="users-section">
        <h3>Alle brukere i Sanity:</h3>
        {allUsers.map((user) => (
          <div key={user._id} className="user-item">
            <p><strong>{user.name}</strong></p>
            
            {user.image && (
              <img 
                src={urlFor(user.image).width(100).height(100).url()} 
                alt={user.name} 
              />
            )}
            
            <p>Wishlist: {user.wishlist?.length || 0} events</p>
            <p>Purchases: {user.previousPurchases?.length || 0} events</p>
    
            {user.wishlist?.length > 0 && (
              <ul>
                {user.wishlist.map((wish) => (
                  <li key={wish._id}>
                    Wishlist: <Link to={`/dashboard/event/${wish.apiId}`}>{wish.title}</Link>
                  </li>
                ))}
              </ul>
            )}
            
            {user.previousPurchases?.length > 0 && (
              <ul>
                {user.previousPurchases.map((purchase) => (
                  <li key={purchase._id}>
                    Purchased: <Link to={`/dashboard/event/${purchase.apiId}`}>{purchase.title}</Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </section>
    </main>
  );
}
