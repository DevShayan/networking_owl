import "./EmailConfirmation.css"
import email from "../assets/email_confirm.png"

export default function EmailConfirmation() {
    return (
      <div id="email-conf">
        <img src={ email } alt="" />
        <h4>Confirm your email address</h4>
        <p>We sent an email to abc@gmail.com <br/> Click on the link to confirm your email address</p>
      </div>
    );
}