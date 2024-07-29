import "./PayDeposit.css"
import jazzcash from "../assets/jazzcash.png"
import epaisa from "../assets/easypaisa.png"
import DepositCard from "./DepositCard";

export default function PayDeposit() {
  return (
    <div id="pay-dep">
      <h1 className="content-heading">Deposit funds</h1>
      <div id="dep-card-wrapper">
        <DepositCard
          cardTitle="JazzCash"
          cardImg={ jazzcash }
          accNum="03355136996"
          slipNum="03355136996"/>
        <DepositCard
          cardTitle="Easypaisa"
          cardImg={ epaisa }
          accNum="03355136996"
          slipNum="03355136996"/>
        <DepositCard
          cardTitle="bank transfer"
          cardIconName="account_balance"
          accNum="03355136996"
          slipNum="03355136996"/>
      </div>
      <p>*Your payment won&apos;t get approved if you haven&apos;t sent the transaction screenshot to the given WhatsApp number <br /> *Please expect a wait time of approximately 24 hours for your money to be transferred to your wallet</p>
    </div>
  );
}