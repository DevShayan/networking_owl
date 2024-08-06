import "./PayDeposit.css"
import jazzcash from "../assets/jazzcash.webp"
import epaisa from "../assets/easypaisa.png"
import DepositCard from "./DepositCard";

export default function PayDeposit() {
  return (
    <div id="pay-dep">
      <h1 className="content-heading">Deposit funds</h1>
      <div id="dep-card-wrapper">
        <DepositCard
          cardTitle="jazzcash.webp"
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
          CardSvg = { () =>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M200-280v-280h80v280h-80Zm240 0v-280h80v280h-80ZM80-120v-80h800v80H80Zm600-160v-280h80v280h-80ZM80-640v-80l400-200 400 200v80H80Zm178-80h444-444Zm0 0h444L480-830 258-720Z"/></svg>
          }
          accNum="03355136996"
          slipNum="03355136996"/>
      </div>
      <p>*Your payment won&apos;t get approved if you haven&apos;t sent the transaction screenshot to the given WhatsApp number <br /> *Please expect a wait time of approximately 24 hours for your money to be transferred to your wallet</p>
    </div>
  );
}