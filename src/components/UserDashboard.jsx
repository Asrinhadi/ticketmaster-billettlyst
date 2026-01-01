import { useState, useEffect } from "react";
import { urlFor } from "../services/sanityServices";
import { getEvent } from "../services/ticketmasterServices";
import EventCard from "../components/EventCard";


export default function UserDashboard({ myProfile, onLogout }) {
  
  const [wishlistData, setWishlistData] = useState([]);
  const [purchasedData, setPurchasedData] = useState([]);

 
  useEffect(() => {
    async function fetchWishlistEvents() {
      const events = await Promise.all(
        myProfile.wishlist.map(wish => getEvent(wish.apiId))
      );
      setWishlistData(events);
    }
    
    if (myProfile.wishlist.length > 0) {
      fetchWishlistEvents();
    }
  }, [myProfile.wishlist]);

  useEffect(() => {
    async function fetchPurchasedEvents() {
      const events = await Promise.all(
        myProfile.previousPurchases.map(purchase => getEvent(purchase.apiId))
      );
      setPurchasedData(events);
    }
    
    if (myProfile.previousPurchases.length > 0) {
      fetchPurchasedEvents();
    }
  }, [myProfile.previousPurchases]);

  return (
    <>
      <section className="profile-overview">
        <div className="profile-header">
          <h1>Min side</h1>
          <button className="logout-btn" onClick={onLogout}>
            Logg ut
          </button>
        </div>

        <article className="profile-card">
          {myProfile.image && (
            <img 
              src={urlFor(myProfile.image).width(150).height(150).url()} 
              alt={myProfile.name} 
            />
          )}
          <h2>{myProfile.name}</h2>
          <p>E-post: {myProfile.email}</p>
        </article>
      </section>

      <section className="event-grid">
        <h2>Min ønskeliste ({myProfile.wishlist.length})</h2>
        {wishlistData.length > 0 ? (
          wishlistData.map((event, index) => (
            <EventCard 
              key={`wish_${index}`}
              event={event}
              linkToDetails="sanity-event"
            />
          ))
        ) : (
          <p>Ingen events i ønskelisten</p>
        )}
      </section>

      <section className="event-grid">
        <h2>Mine kjøpte billetter ({myProfile.previousPurchases.length})</h2>
        {purchasedData.length > 0 ? (
          purchasedData.map((event, index) => (
            <EventCard 
              key={`purchased_${index}`}
              event={event}
              linkToDetails="sanity-event"
            />
          ))
        ) : (
          <p>Ingen tidligere kjøp</p>
        )}
      </section>
    </>
  );
}