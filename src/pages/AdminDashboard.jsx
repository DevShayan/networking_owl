import "./Dashboard.css"
import Navbar from "../components/Navbar.jsx";
import AdDashboardHeader from "../components/AdDashboardHeader.jsx";
import { Outlet } from "react-router-dom";

export default function AdminDashboard() {
  window.scrollTo(0, 0);

    return (
      <div id="nav-wrapper">
        <Navbar />
        <div id="d-content">
          <AdDashboardHeader />
          <Outlet/>
        </div>
      </div>
    );
}