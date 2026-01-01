import { useState, useEffect } from "react";
import { getAllEvents, getAllUsers, getUserByEmail, urlFor } from "../services/sanityServices";
import UserDashboard from "../components/UserDashboard";
import "../styles/Dashboard.scss";

export default function Dashboard() {
  
  const [loggedInUser, setLoggedInUser] = useState(
    JSON.parse(localStorage.getItem("loggedInUser"))
  );
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("loggedInUser"));

 
  const [myProfile, setMyProfile] = useState(null); 
  const [allEvents, setAllEvents] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [showAllUsers, setShowAllUsers] = useState(false); 

  async function handleSubmit(e) {
    e.preventDefault();
    
    const email = e.target.emailInput.value;
    const user = await getUserByEmail(email);
    
    if (user) {
      const userData = { _id: user._id, name: user.name, email: user.email };
      localStorage.setItem("loggedInUser", JSON.stringify(userData));
      setLoggedInUser(userData);
      setIsLoggedIn(true);
    } else {
      alert("Fant ingen bruker med denne e-posten");
    }
  }

  function handleLogout() {
    localStorage.removeItem("loggedInUser");
    setLoggedInUser(null);
    setIsLoggedIn(false);
    setMyProfile(null);
  }

  useEffect(() => {
    if (!isLoggedIn) return;

    async function fetchData() {
      const myData = await getUserByEmail(loggedInUser.email);
      setMyProfile(myData);
      
      const events = await getAllEvents();
      setAllEvents(events);
      
      const users = await getAllUsers();
      setAllUsers(users);
    }

    fetchData();
  }, [isLoggedIn]);

  return (
    isLoggedIn && myProfile ? (
      <main className="dashboard">
        <UserDashboard 
          myProfile={myProfile} 
          onLogout={handleLogout}
        />

       
        <section className="events-section">
          <h3>Alle events i Sanity:</h3>
          <ul>
            {allEvents.map((evnt) => (
              <li key={evnt._id}>
                {evnt.title} ({evnt.category})
              </li>
            ))}
          </ul>
        </section>

      
        <section className="users-section">
          <h3 
            className="collapsible-header" 
            onClick={() => setShowAllUsers(!showAllUsers)}
          >
            Alle brukere i Sanity
          </h3>
          
          {showAllUsers && allUsers.map((user) => (
            <div key={user._id} className="user-item">
              <p><strong>{user.name}</strong></p>
              
              {user.image && (
                <img 
                  src={urlFor(user.image).width(100).height(100).url()} 
                  alt={user.name} 
                />
              )}
              
              <p>Wishlist: {user.wishlist.length} events</p>
              <p>Purchases: {user.previousPurchases.length} events</p>
      
              <ul>
                {user.wishlist.map((wish) => (
                  <li key={wish._id}>Wishlist: {wish.title}</li>
                ))}
                {user.previousPurchases.map((purchase) => (
                  <li key={purchase._id}>Purchased: {purchase.title}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      </main>
    ) : (
      <main className="dashboard">
        <h1>Dashboard</h1>
        <section className="login-card">
          <h2>Logg inn</h2>
          <form className="login-form" onSubmit={handleSubmit}>
            <label htmlFor="emailInput">E-post</label>
            <input type="email" id="emailInput" required />
            
            <label htmlFor="passwordInput">Passord</label>
            <input type="password" id="passwordInput" required />
            
            <button type="submit">Logg inn</button>
          </form>
        </section>
      </main>
    )
  );
}