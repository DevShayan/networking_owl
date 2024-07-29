import { Link } from "react-router-dom";
import "./Footer.css"
import { user } from "../pojos/user";

export default function Footer() {
  return (
    <div id="footer">
      <div id="links">
        <div className="col">
          <Link to="/x">Need help?</Link>
          <a href="mailto:thenetworkingowl@gmail.com" target="_blank">thenetworkingowl@gmail.com</a>
          <a href="https://wa.me/923148764612" target="_blank">(+92) 314 8964612</a>
        </div>
        <div className="col">
          <Link to={ user.name == null ? "/login" : "/dashboard/profile" }>Login</Link>
          <Link to={ user.name == null ? "/register" : "/dashboard/profile" }>Register</Link>
          <Link to={ user.name == null ? "/register" : "/dashboard/profile" }>Become a member</Link>
        </div>
        <div className="col">
          <Link to="/about">About Us</Link>
          <Link to="/x">Work with us</Link>
        </div>
        <div className="col">
          <Link to="/x">Download Our App</Link>
          <Link to="/x">Payment Methods</Link>
        </div>
      </div>
      <hr />
      <p id="copyright">©2024, The Networking Owl | <Link to="/x">Terms and Conditions</Link> | <Link to="/x">Privacy Policy</Link></p>
    </div>
  );
}