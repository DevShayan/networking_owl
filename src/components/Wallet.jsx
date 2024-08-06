import "./Wallet.css"
import { user } from "../pojos/user";
import { Link } from "react-router-dom";
import { useState } from "react";
import { transactions } from "../pojos/transactions";
import { getTransactions } from "../database/api_call";

export default function Wallet() {
  const [, setReload] = useState(false);

  if (transactions.list == null) {
    getTransactions()
      .then((res) => {
        transactions.list = res;
        setReload((prev) => !prev);
      })
      .catch((err) => console.log(err));
  }

  return (
    <div id="wallet">
      <div id="bal-wrapper">
        <div>
          <p>available balance</p>
          <h1>{ user.balance.toFixed(1) } PKR</h1>
        </div>
        <div id="w-btn-wrapper">
          <Link to="/deposit"><button id="dep-btn">Deposit</button></Link>
          <Link to="/withdraw"><button id="wit-btn">Withdraw</button></Link>
        </div>
      </div>
      <table id="trans-table">
        <tbody>
          <tr>
            <th>Transaction Details</th>
            <th>Amount</th>
          </tr>
          {
            transactions.list != null && transactions.list.length != 0 ?
              transactions.list.map((transaction, index) => 
                <tr key={index}>
                  <td>{transaction.description}</td>
                  <td>{transaction.amount} PKR</td>
                </tr>) :
              <tr>
                <td>-</td>
                <td>-</td>
              </tr>
          }
          <tr>
            <td>Total Amount</td>
            <td>{user.balance.toFixed(1)} PKR</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}