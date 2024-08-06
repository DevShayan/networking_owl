import "./PayWithdraw.css"
import jazzcash from "../assets/jazzcash.webp"
import epaisa from "../assets/easypaisa.png"
import WithdrawCard from "./WithdrawCard";

export default function PayWithdraw() {

  return (
    <div id="pay-wd">
      <h1 className="content-heading">Withdraw funds</h1>
      <div id="wd-card-wrapper">
        <WithdrawCard
          cardTitle="jazzcash.webp"
          cardImg={ jazzcash }
          cardLabel1="JazzCash #"/>
        <WithdrawCard
          cardTitle="Easypaisa"
          cardImg={ epaisa }
          cardLabel1="EasyPaisa #"/>
        <WithdrawCard
          cardTitle="Bank transfer"
          CardSvg = { () =>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M200-280v-280h80v280h-80Zm240 0v-280h80v280h-80ZM80-120v-80h800v80H80Zm600-160v-280h80v280h-80ZM80-640v-80l400-200 400 200v80H80Zm178-80h444-444Zm0 0h444L480-830 258-720Z"/></svg>
          }
          cardLabel1="IBAN #"/>
      </div>
      <p>*Please expect a wait time of approximately 24 hours for your money to be transferred to your JazzCash, Easypaisa or Bank account</p>
    </div>
  );
}