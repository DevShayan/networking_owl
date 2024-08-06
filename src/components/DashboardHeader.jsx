import { NavLink } from "react-router-dom";
import "./DashboardHeader.css";
import { user } from "../pojos/user";
import profile from "../assets/blank_profile.png";

export default function DashboardHeader() {
  return (
    <div id="dash-header">
      <div id="header-upper-section">
        <h3 id="user-name">{ user.name }</h3>
        <img src={user.image_link ?? profile} alt="profile" />
      </div>
      <ul id="tab-menu">
        <li><NavLink to="profile">Profile</NavLink></li>
        <li><NavLink to="tree">My Trees</NavLink></li>
        <li><NavLink to="members">Member details</NavLink></li>
        <li><NavLink to="bundles-bought">My Bundles</NavLink></li>
        <li><NavLink to="wallet">My Wallet</NavLink></li>
      </ul>
    </div>
  );
}