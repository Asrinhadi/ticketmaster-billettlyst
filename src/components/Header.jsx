import { Link } from "react-router-dom";

function Header() {
  return (
    <header>
      <Link to="/" className="site-logo">Billettlyst</Link>
    </header>
  );
}

export default Header;
