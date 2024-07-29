import "./Navbar.css";
import logo from "../assets/logo.png";
import { NavLink, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  function logout() {
    // logout here
    //

    navigate("/login");
  }

  return (
    <div id="navbar">
      <div className="list-tiles-divider">
        <img src={ logo } alt="logo" id="navbar-logo"/>
        <NavLink to="/dashboard/profile">
          <div className="list-tile">
            <span className="material-symbols-rounded">dashboard</span>
            <span className="tile-title">Dashboard</span>
          </div>
        </NavLink>
        <NavLink to="/">
          <div className="list-tile">
            <span className="material-symbols-rounded">home</span>
            <span className="tile-title">Home</span>
          </div>
        </NavLink>
        <NavLink to="/bundles">
          <div className="list-tile">
            <span className="material-symbols-rounded">deployed_code</span>
            <span className="tile-title">Bundles</span>
          </div>
        </NavLink>
        <NavLink to="/packages">
          <div className="list-tile">
            <span className="material-symbols-rounded">inventory_2</span>
            <span className="tile-title">Packages</span>
          </div>
        </NavLink>
        <NavLink to="/about">
          <div className="list-tile">
            <span className="material-symbols-rounded">info</span>
            <span className="tile-title">About</span>
          </div>
        </NavLink>
      </div>
      <div className="list-tiles-divider">
        <NavLink to="/help">
          <div className="list-tile">
            <span className="material-symbols-rounded">help</span>
            <span className="tile-title">Help</span>
          </div>
        </NavLink>
        <a onClick={logout}>
          <div className="list-tile">
            <span className="material-symbols-rounded">logout</span>
            <span className="tile-title">Logout</span>
          </div>
        </a>
      </div>
    </div>
  );
}