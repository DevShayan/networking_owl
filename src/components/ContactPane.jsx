import "./ContactPane.css";
import facebook from "../assets/facebook.webp";
import instagram from "../assets/instagram.webp";
import gmail from "../assets/gmail.webp";
import whatsapp from "../assets/whatsapp.webp";

export default function ContactPane() {
  return (
    <div id="con-us">
      <h3 className="content-heading">Contact Us</h3>
      <ul>
        <li><a href="https://www.facebook.com/the.networking.owl" target="_blank"><img src={facebook} alt="facebook link" /></a></li>
        <li><a href="https://www.instagram.com/the_networking_owl/" target="_blank"><img src={instagram} alt="instagram link" /></a></li>
        <li><a href="" target="_blank"><img src={gmail} alt="gmail link" /></a></li>
        <li><a href="https://api.whatsapp.com/send?phone=923148964612" target="_blank"><img src={whatsapp} alt="whatsapp link" /></a></li>
      </ul>
    </div>
  );
}