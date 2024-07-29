import "./PayWithdraw.css"
import jazzcash from "../assets/jazzcash.png"
import epaisa from "../assets/easypaisa.png"
import WithdrawCard from "./WithdrawCard";

export default function PayWithdraw() {

  return (
    <div id="pay-wd">
      <h1 className="content-heading">Withdraw funds</h1>
      <div id="wd-card-wrapper">
        <WithdrawCard
          cardTitle="JazzCash"
          cardImg={ jazzcash }
          cardLabel1="JazzCash"/>
        <WithdrawCard
          cardTitle="Easypaisa"
          cardImg={ epaisa }
          cardLabel1="JazzCash"/>
        <WithdrawCard
          cardTitle="Bank transfer"
          cardIconName="account_balance"
          cardLabel1="JazzCash"/>
      </div>
      <p>*Please expect a wait time of approximately 24 hours for your money to be transferred to your JazzCash, Easypaisa or Bank account</p>
    </div>
  );
}