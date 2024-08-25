import "./Info.css"
import model from "../assets/modelf1.webp"
import { Link } from "react-router-dom";

export default function Info() {

  return (
    <div id="info">
      <img src={model} alt="model" id="modelf1" />
      <div id="info-content">
        <h1 id="info-heading">Introducing<br/> the NetworkingOwl</h1>
        <p id="para">Your premier destination for cutting-edge digital marketing solutions along side apps,courses,tools and other digital products. Our platform is maticulously crafted with your needs in mind boasting a user experience that&apos;s easy to use, intuitive and accessible.</p>
        <div id="info-btn-wrapper">
          <Link to="/dashboard/profile"><button>get started</button></Link>
          <Link to="/about"><button>about us</button></Link>
        </div>
      </div>
    </div>
  );
}

