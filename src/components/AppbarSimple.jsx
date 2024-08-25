import "./AppbarSimple.css"
import logo from "../assets/logo.png"
import { Link } from "react-router-dom";

export default function AppbarSimple() {
    return (
        <div className="appbar-simple">
          <div className="heading-pack-simple">
            <Link to="/">
              <img src={logo} alt="networking-owl logo" id="logo-simple"/>
            </Link>
            <h1 id="appbar-title-simple">The NetworkingOwl</h1>
          </div>
          <a href="mailto:networkingowlhelp@gmail.com" target="_blank"><button>need help ?</button></a>
        </div>
    );
}