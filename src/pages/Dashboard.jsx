import "./Dashboard.css"
import Navbar from "../components/Navbar.jsx";
import DashboardHeader from "../components/DashboardHeader.jsx";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import { reloadContext } from "../contexts/reloadContext.js";

export default function Dashboard() {
  const [, setReload] = useState();
  window.scrollTo(0, 0);

    return (
      <reloadContext.Provider value={setReload}>
        <div id="nav-wrapper">
          <Navbar />
          <div id="d-content">
            <DashboardHeader />
            <Outlet/>
          </div>
        </div>
      </reloadContext.Provider>
    );
}