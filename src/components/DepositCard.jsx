import { Link } from "react-router-dom";
import "./DepositCard.css"

export default function DepositCard({cardTitle, cardImg, cardIconName, accNum, slipNum}) {  
  return (
    <div id="dep-card">
      <div>
        <h3>{ cardTitle }</h3>
        {
          cardImg == null ?
            <span className="material-symbols-rounded">{ cardIconName }</span> :
            <img src={ cardImg } alt="" />
        }
      </div>
      <h3>{ accNum }</h3>
      <p className="pkg-desc">Pay total amount to above Bank number and send transaction slip to the number.</p>
      <h3>{ slipNum }</h3>
      <Link to="/dashboard/wallet"><button>Done</button></Link>
    </div>
  );
}