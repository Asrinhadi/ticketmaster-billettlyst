import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllEvents, getAllUsers, getUserByEmail, urlFor } from "../services/sanityServices";
import "../styles/Dashboard.scss";

export default function Dashboard() {
  
  const [loggedInUser, setLoggedInUser] = useState(() => {
    const saved = localStorage.getItem("loggedInUser");
    return saved ? JSON.parse(saved) : null;
  });
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem("loggedInUser") !== null;
  });
  const [loginError, setLoginError] = useState("");
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  // BRAVET DATA FRA SANITY
  const [myProfile, setMyProfile] = useState(null); 
  const [allEvents, setAllEvents] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAllUsers, setShowAllUsers] = useState(false); 
  function handleChange(e) {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoginError("");
    
  
    const user = await getUserByEmail(formValues.email);
    
    if (user) {
      
      const userData = { _id: user._id, name: user.name, email: user.email };
      localStorage.setItem("loggedInUser", JSON.stringify(userData));
      setLoggedInUser(userData);
      setIsLoggedIn(true);
      console.log("hvem er logga ?", user.name);
    } else {
      setLoginError("Fant ingen bruker med denne e-posten");
    }
  }

  function handleLogout() {
    localStorage.removeItem("loggedInUser");
    setLoggedInUser(null);
    setIsLoggedIn(false);
    setFormValues({ email: "", password: "" });
  }

  
  useEffect(() => {
    if (!isLoggedIn) return;

    async function fetchData() {
      setLoading(true);
      try {
        const [events, users, myData] = await Promise.all([
          getAllEvents(),
          getAllUsers(),
          getUserByEmail(loggedInUser.email) 
        ]);
        
        setAllEvents(events);
        setAllUsers(users);
        setMyProfile(myData);
        
        console.log("eventsene", events.length);
        console.log("brukerne?", users.length);
        console.log("min profil", myData);
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
            {loginError && <p className="login-error">{loginError}</p>}
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
        <p className="logged-in-user">Logget inn som: {loggedInUser?.name}</p>
        <button className="logout-btn" onClick={handleLogout}>
          Logg ut
        </button>
      </div>

      <section className="my-profile-section">
        <h2>Min profil</h2>
        {myProfile ? (
          <div className="my-profile">
            {myProfile.image && (
              <img 
                src={urlFor(myProfile.image).width(120).height(120).url()} 
                alt={myProfile.name}
                className="profile-image"
              />
            )}
            <p><strong>{myProfile.name}</strong></p>
            <p>{myProfile.email}</p>
            
            <div className="my-lists">
              <div className="my-wishlist">
                <h3>Min ønskeliste ({myProfile.wishlist?.length || 0})</h3>
                {myProfile.wishlist?.length > 0 ? (
                  <ul>
                    {myProfile.wishlist.map((wish) => (
                      <li key={wish._id}>
                        <Link to={`/dashboard/event/${wish.apiId}`}>{wish.title}</Link>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="empty-list">Ingen events i ønskelisten</p>
                )}
              </div>
              
              <div className="my-purchases">
                <h3>Mine kjøp ({myProfile.previousPurchases?.length || 0})</h3>
                {myProfile.previousPurchases?.length > 0 ? (
                  <ul>
                    {myProfile.previousPurchases.map((purchase) => (
                      <li key={purchase._id}>
                        <Link to={`/dashboard/event/${purchase.apiId}`}>{purchase.title}</Link>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="empty-list">Ingen tidligere kjøp</p>
                )}
              </div>
            </div>
          </div>
        ) : (
          <p>Laster profil...</p>
        )}
      </section>

      {/* BKRAVet alle events i Sanity */}
      <section className="events-section">
        <h3>Alle events i Sanity:</h3>
        {allEvents.length > 0 ? (
          <ul>
            {allEvents.map((evnt) => (
              <li key={evnt._id}>
                <Link to={`/dashboard/event/${evnt.apiId}`}>
                  {evnt.title} ({evnt.category})
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p>Ingen events funnet</p>
        )}
      </section>

      {/* BKARVET ALLE brukere med wishlist og purchases */}
      <section className="users-section">
        <h3 
          className="collapsible-header" 
          onClick={() => setShowAllUsers(!showAllUsers)}
        >
          {showAllUsers ? '▼' : '▶'} Alle brukere i Sanity (B-krav)
        </h3>
        
        {showAllUsers && (
          allUsers.length > 0 ? (
            allUsers.map((user) => (
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
      
              {user.wishlist?.length > 0 ? (
                <ul>
                  {user.wishlist.map((wish) => (
                    <li key={wish._id}>
                      Wishlist: <Link to={`/dashboard/event/${wish.apiId}`}>{wish.title}</Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="empty-list">Ingen events i ønskelisten</p>
              )}
              
              {user.previousPurchases?.length > 0 ? (
                <ul>
                  {user.previousPurchases.map((purchase) => (
                    <li key={purchase._id}>
                      Purchased: <Link to={`/dashboard/event/${purchase.apiId}`}>{purchase.title}</Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="empty-list">Ingen tidligere kjøp</p>
              )}
            </div>
          ))
          ) : (
            <p>Ingen brukere funnet</p>
          )
        )}
      </section>
    </main>
  );
}
