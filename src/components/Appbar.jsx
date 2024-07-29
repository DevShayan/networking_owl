import "./Appbar.css"
import logo from "../assets/logo.png"
import profile from "../assets/blank_profile.png"
import { Link, NavLink } from "react-router-dom";
import { user } from "../pojos/user";

export default function Appbar() {
  return (
    <div id="appbar">
      <div className="heading-pack">
        <Link to="/"><img src={logo} alt="networking-owl logo" id="logo"/></Link>
        <h1 id="appbar-title">The Networking Owl</h1>
      </div>
      <ul id="action-buttons">
        <li><NavLink id="ab-links" to="/">Home</NavLink></li>
        <li><NavLink id="ab-links" to="/bundles">Bundles</NavLink></li>
        <li><NavLink id="ab-links" to="/packages">Packages</NavLink></li>
        <li><NavLink id="ab-links" to="/contact">Contact Us</NavLink></li>
        <li><NavLink id="ab-links" to="/about">About</NavLink></li>
        {
          user.name != null ?
            <Link to="/dashboard/profile">
              <img src={user.image_link ?? profile} alt="networking-owl logo" id="u-prof"/>
            </Link> :
            <Link to="/login"><button>login</button></Link>
        }
          
      </ul>
    </div>
  );
}

