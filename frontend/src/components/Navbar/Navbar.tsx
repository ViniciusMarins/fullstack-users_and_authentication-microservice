import { Link } from "react-router-dom";
import "./Navbar.css";
import { CgProfile } from "react-icons/cg";

function Navbar() {
  return (
    <nav className="navbar">
      <ul className="navbar-links">
        <Link to="/home">
          <li>Home</li>
        </Link>
      </ul>
      <Link to="/profile">
        <CgProfile className="profile-icon" />
      </Link>
    </nav>
  );
}

export default Navbar;
