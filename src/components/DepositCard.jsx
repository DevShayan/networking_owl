import { clientBaseURL } from "../constants/urls";
import { user } from "../pojos/user";
import "./DepositCard.css"

export default function DepositCard({cardTitle, cardImg, CardSvg, accNum, slipNum}) {

  const adminLink = `${clientBaseURL}/admin-dashboard/balance-mod?uid=${user.id}`;
  const whatsappLink = `https://api.whatsapp.com/send?phone=${slipNum}&text=${adminLink}`;

  return (
    <div id="dep-card">
      <div>
        <h3>{ cardTitle }</h3>
        {
          cardImg == null ?
            <CardSvg/> :
            <img src={ cardImg } alt="" />
        }
      </div>
      <h3>{ accNum }</h3>
      <p className="pkg-desc">Pay total amount to above number and send transaction slip and below link to the number below.</p>
      <div id="inp-wrapper">
        <input type="url" defaultValue={adminLink} disabled={true}/>
        <button onClick={ () => navigator.clipboard.writeText(adminLink) }><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M360-240q-33 0-56.5-23.5T280-320v-480q0-33 23.5-56.5T360-880h360q33 0 56.5 23.5T800-800v480q0 33-23.5 56.5T720-240H360Zm0-80h360v-480H360v480ZM200-80q-33 0-56.5-23.5T120-160v-520q0-17 11.5-28.5T160-720q17 0 28.5 11.5T200-680v520h400q17 0 28.5 11.5T640-120q0 17-11.5 28.5T600-80H200Zm160-240v-480 480Z"/></svg></button>
      </div>
      <h3>{ slipNum }</h3>
      <a href={whatsappLink} target="_blank"><button>Send slip</button></a>
    </div>
  );
}