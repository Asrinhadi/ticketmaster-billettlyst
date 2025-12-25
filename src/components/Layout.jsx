import { Link } from "react-router-dom";
import Header from "./Header";
import "../styles/Layout.scss";

export default function Layout({ children }) {
  return (
    <>
      <a href="#main" className="main-link">Trykk her for å gå tilbake til hovedinnhold</a>
      <Header />
      
      <main id="main">
        {children}
      </main>

      <footer>
        
        <Link to="https://developer.ticketmaster.com/">Ticketmaster</Link>
      </footer>
    </>
  );
}
