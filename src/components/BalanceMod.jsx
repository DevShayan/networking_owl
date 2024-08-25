import { useRef, useState } from "react";
import { getUser, modifyBalance } from "../database/api_call";
import "./BalanceMod.css"
import { useSearchParams } from "react-router-dom";

export default function BalanceMod() {
  const [balError, setBalError] = useState("");

  const uidRef = useRef();
  const amountRef = useRef();

  const userBalRef = useRef();
  const userNameRef = useRef();
  const userEmailRef = useRef();

  const checkBalRef = useRef();
  const depRef = useRef();
  const withRef = useRef();

  const uid = useSearchParams()[0].get("uid");
  const amount = useSearchParams()[0].get("amount");


  function transBtnPressed(event) {
    const isWithdraw = event.target.innerHTML == "Withdraw";
    var error = false;

    uidRef.current.childNodes[2].innerHTML = "";
    amountRef.current.childNodes[2].innerHTML = "";

    const uidInput = uidRef.current.childNodes[1].value;
    var amountInput = amountRef.current.childNodes[1].value;

    if (uidInput == "") {
      uidRef.current.childNodes[2].innerHTML = "Required";
      error = true;
    }

    if (amountInput == "") {
      amountRef.current.childNodes[2].innerHTML = "Required";
      error = true;
    }
    
    if (!amountInput.match(/^[^-+.]*$/)) {
      amountRef.current.childNodes[2].innerHTML = "Invalid";
      error = true;
    }

    if (!error) {

      if (isWithdraw) {
        amountInput = -(parseInt(amountInput));
        withRef.current.innerHTML = "Updating...";
        withRef.current.disabled = true;
      }
      else {
        depRef.current.innerHTML = "Updating...";
        depRef.current.disabled = true;
      }

      modifyBalance(uidInput, amountInput)
      .then(() => {
        depRef.current.innerHTML = "Deposit";
        depRef.current.disabled = false;
        withRef.current.innerHTML = "Withdraw";
        withRef.current.disabled = false;

        userBalRef.current.value = "";
      })
      .catch((err) => {
        depRef.current.innerHTML = "Deposit";
        depRef.current.disabled = false;
        withRef.current.innerHTML = "Withdraw";
        withRef.current.disabled = false;

        console.log(err);
        typeof err === "string" ? setBalError(err) : setBalError(err.message);
      });
    }
  }

  function checkBalClicked() {
    userBalRef.current.value = "";
    userNameRef.current.value = "";
    userEmailRef.current.value = "";

    uidRef.current.childNodes[2].innerHTML = "";

    const uidInput = uidRef.current.childNodes[1].value;

    if (uidInput == "") {
      uidRef.current.childNodes[2].innerHTML = "Required";
    }

    if (uidInput != "") {
    checkBalRef.current.innerHTML = "Please wait...";

      getUser(uidInput)
        .then((res) => {
          userBalRef.current.value = res.balance;
          userNameRef.current.value = res.name;
          userEmailRef.current.value = res.email;

          checkBalRef.current.innerHTML = "Get User Info";
          checkBalRef.current.disabled = false;
        })
        .catch((err) => {
          console.log(err);
          checkBalRef.current.innerHTML = "Get User Info";
          checkBalRef.current.disabled = false;
          typeof err === "string" ? setBalError(err) : setBalError(err.message);
        });
    }
  }

  return (
    <div id="b-mod">
      <div id="cols-wrapper">
        <div>
          <div className="mod-inp-wrapper" ref={uidRef}>
            <label htmlFor="uid">User ID</label>
            <input type="text" id="uid" defaultValue={uid} />
            <span className="err-msg"></span>
          </div>
          <div className="mod-inp-wrapper" ref={amountRef}>
            <label htmlFor="amt">Amount</label>
            <input type="number" id="amt" defaultValue={amount} />
            <span className="err-msg"></span>
          </div>
          {/* Buttons */}
          <div id="btn-wrapper">
            <button ref={checkBalRef} onClick={checkBalClicked}>Get User Info</button>
            <button ref={depRef} onClick={transBtnPressed}>Deposit</button>
            <button ref={withRef} onClick={transBtnPressed}>Withdraw</button>
          </div>
        </div>
        <div>
          <div className="mod-inp-wrapper">
            <label htmlFor="uid">User balance</label>
            <input ref={userBalRef} type="number" id="uid" disabled={true} />
            <span className="err-msg"></span>
          </div>
          <div className="mod-inp-wrapper">
            <label htmlFor="uid">User name</label>
            <input ref={userNameRef} type="text" id="uid" disabled={true} />
            <span className="err-msg"></span>
          </div>
          <div className="mod-inp-wrapper">
            <label htmlFor="uid">User email</label>
            <input ref={userEmailRef} type="email" id="uid" disabled={true} />
            <span className="err-msg"></span>
          </div>
        </div>
      </div>
      <span className="err-msg">{balError}</span>
    </div>
  );
}