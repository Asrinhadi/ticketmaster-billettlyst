import { Link, NavLink } from "react-router-dom";
import "../styles/Header.scss";

export default function Header() {
  return (
    <header>
      <Link to="/" className="site-logo">Billettlyst</Link>
      
      <nav>
        <NavLink to="/category/sports">Sport</NavLink>
        <NavLink to="/category/music">Musikk</NavLink>
        <NavLink to="/category/arts">Kultur & Teater</NavLink>
        <NavLink to="/dashboard" className="login-btn">Logg inn</NavLink>
      </nav>
    </header>
  );
}
