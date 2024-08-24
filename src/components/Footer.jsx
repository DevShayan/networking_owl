import { Link } from "react-router-dom";
import "./Footer.css"
import { user } from "../pojos/user";

export default function Footer() {

  function getLink(path) {
    if (user.type == null)
      return path
    if (user.type == "user")
      return "/dashboard/profile"
    if (user.type == "admin")
      return "/admin-dashboard/balance-mod"
  }

  return (
    <div id="footer">
      <div id="links">
        <div className="col">
          <Link to="/x">Need help?</Link>
          <a href="mailto:thenetworkingowl@gmail.com" target="_blank">thenetworkingowl@gmail.com</a>
          <a href="https://wa.me/923148764612" target="_blank">(+92) 314 8964612</a>
        </div>
        <div className="col">
          <Link to={ getLink("/login") }>Login</Link>
          <Link to={ getLink("/register") }>Register</Link>
          <Link to="/packages">Become a member</Link>
        </div>
        <div className="col">
          <Link to="/about">About Us</Link>
          <Link to="/about">Work with us</Link>
        </div>
        <div className="col">
          <Link to="/deposit">Payment Methods</Link>
          <Link to="/terms-conditions">Terms and Conditions</Link>
          <Link to="/privacy-policy">Privacy Policy</Link>
        </div>
      </div>
      <hr />
      <p id="copyright">©2024, The Networking Owl | <Link to="/terms-conditions">Terms and Conditions</Link> | <Link to="/privacy-policy">Privacy Policy</Link></p>
    </div>
  );
}