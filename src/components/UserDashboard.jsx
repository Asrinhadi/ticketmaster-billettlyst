import { useState, useEffect } from "react";
import { urlFor } from "../services/sanityServices";
import { fetchMultipleEventsById } from "../services/ticketmasterServices";
import EventCard from "./EventCard";


export default function UserDashboard({ myProfile, onLogout }) {
  
  const [wishlistData, setWishlistData] = useState([]);
  const [purchasedData, setPurchasedData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAllEvents() {
      setLoading(true);
      try {

        if (myProfile.wishlist?.length > 0) {
          const wishlistIds = myProfile.wishlist.map(wish => wish.apiId);
          const wishEvents = await fetchMultipleEventsById(wishlistIds);
          setWishlistData(wishEvents);
        }
        
        if (myProfile.previousPurchases?.length > 0) {
          const purchaseIds = myProfile.previousPurchases.map(purchase => purchase.apiId);
          const purchEvents = await fetchMultipleEventsById(purchaseIds);
          setPurchasedData(purchEvents);
        }
      } catch (err) {
        console.error("feil ved henting av events", err);
      } finally {
        setLoading(false);
      }
    }
    
    fetchAllEvents();
  }, [myProfile]);

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
          {myProfile.age && <p>Alder: {myProfile.age} år</p>}
          {myProfile.gender && <p>Kjønn: {myProfile.gender}</p>}
        </article>
      </section>
      {loading ? (
        <p className="loading">Laster events...</p>
      ) : (
        <>
        
          <section className="event-grid">
            <h2>Min ønskeliste ({myProfile.wishlist?.length || 0})</h2>
            {wishlistData.length > 0 ? (
              wishlistData.map((event, index) => (
                <EventCard 
                  key={`wish_${event?.id || index}`}
                  event={event}
                  linkToDetails="sanity-event"
                />
              ))
            ) : (
              <p className="empty-list">Ingen events i ønskelisten</p>
            )}
          </section>
          <section className="event-grid">
            <h2>Mine kjøpte billetter ({myProfile.previousPurchases?.length || 0})</h2>
            {purchasedData.length > 0 ? (
              purchasedData.map((event, index) => (
                <EventCard 
                  key={`purchased_${event?.id || index}`}
                  event={event}
                  linkToDetails="sanity-event"
                />
              ))
            ) : (
              <p className="empty-list">Ingen tidligere kjøp</p>
            )}
          </section>
        </>
      )}
    </>
  );
}
