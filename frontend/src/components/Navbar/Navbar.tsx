import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { CgProfile } from "react-icons/cg";
import { RiLogoutCircleLine } from "react-icons/ri";
import { useContext } from "react";
import AppContext from "../../context/AppContext";
import { FaUserAlt } from "react-icons/fa";

function Navbar() {
  const { setIsUserLogged, setToken } = useContext(AppContext);

  const navigate = useNavigate();

  function logOut() {
    setIsUserLogged(false);
    setToken("");
    navigate("/login");
  }

  return (
    <nav className="navbar">
      <ul className="navbar-links">
        <Link to="/home">
          <li>Home</li>
        </Link>
        <Link to="/management">
          <li>Management</li>
        </Link>
      </ul>
      <div className="container-profile-icon">
        <Link to="/profile">
          <CgProfile className="profile-icon" />
        </Link>
        <span className="wrapper">
          <div
            className="wrapper-item"
            onClick={() => {
              navigate("/profile");
            }}
          >
            <FaUserAlt style={{ marginTop: "2.5px" }} />
            Perfil
          </div>
          <div className="wrapper-item" onClick={logOut}>
            <RiLogoutCircleLine style={{ marginTop: "2.5px" }} />
            Logout
          </div>
        </span>
      </div>
    </nav>
  );
}

export default Navbar;
