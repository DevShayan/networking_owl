import { NavLink } from "react-router-dom";
import "./DashboardHeader.css";
import { user } from "../pojos/user";

export default function AdDashboardHeader() {
  return (
    <div id="dash-header">
      <div id="header-upper-section">
        <h3 id="user-name">{ user.name }</h3>
      </div>
      <ul id="tab-menu">
        <li><NavLink to="balance-mod">Approve Payment</NavLink></li>
      </ul>
    </div>
  );
}