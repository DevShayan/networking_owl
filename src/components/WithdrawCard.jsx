import { useRef } from "react";
import "./WithdrawCard.css"
import { user } from "../pojos/user";
import { clientBaseURL } from "../constants/urls";

export default function WithdrawCard({cardTitle, cardImg, cardLabel1, CardSvg}) {
  const numbRef = useRef();
  const amountRef = useRef();
  const errBtnRef = useRef();

  const sendToNumber = "03355136996";

  function onReqPress() {
    numbRef.current.childNodes[2].innerHTML = "";
    amountRef.current.childNodes[2].innerHTML = "";
    errBtnRef.current.innerHTML = "";

    var isError = false;

    const numbInput = numbRef.current.childNodes[1].value;
    const amountInput = amountRef.current.childNodes[1].value;

    if (numbInput == "") {
      numbRef.current.childNodes[2].innerHTML = "Required";
      isError = true;
    }

    if (!amountInput.match(/^[^-+.]*$/)) {
      amountRef.current.childNodes[2].innerHTML = "Invalid";
      isError = true;
    }
    else if (parseInt(amountInput) > user.balance) {
      amountRef.current.childNodes[2].innerHTML = "Insufficient balance";
      isError = true;
    }


    if (!isError) {
      const adminLink = `${clientBaseURL}/admin-dashboard/balance-mod?uid=${user.id}%26amount=${amountInput}`;

      const whatsappLink = `https://api.whatsapp.com/send?phone=${sendToNumber}&text=${cardTitle}%3a+${numbInput}%0Aurl%3a+${adminLink}`;

      console.log(whatsappLink);
      window.open(whatsappLink, "_blank");
    }
  }

  return (
    <div id="wd-card">
      <div>
        <h3>{ cardTitle }</h3>
        {
          cardImg == null ?
            <CardSvg/> :
            <img src={ cardImg } alt="" />
        }
      </div>
      <div ref={numbRef}>
        <label htmlFor="inp-num">{ cardLabel1 }</label>
        <input type="text" id="inp-num" />
        <span className="err-msg"></span>
      </div>
      <div ref={amountRef}>
        <label htmlFor="inp-amount">Amount</label>
        <input type="number" id="inp-amount" />
        <span className="err-msg"></span>
      </div>
      <button onClick={onReqPress}>Request Directly</button>
      <p id="w-info">OR</p>
      <div id="inp-wrapper">
        <input type="url" defaultValue={user.id} disabled={true}/>
        <button onClick={ () => navigator.clipboard.writeText(user.id) }><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M360-240q-33 0-56.5-23.5T280-320v-480q0-33 23.5-56.5T360-880h360q33 0 56.5 23.5T800-800v480q0 33-23.5 56.5T720-240H360Zm0-80h360v-480H360v480ZM200-80q-33 0-56.5-23.5T120-160v-520q0-17 11.5-28.5T160-720q17 0 28.5 11.5T200-680v520h400q17 0 28.5 11.5T640-120q0 17-11.5 28.5T600-80H200Zm160-240v-480 480Z"/></svg></button>
      </div>
      <p id="w-info">Send above code, amount to withdraw and your {cardLabel1} to below number</p>
      <h3>{sendToNumber}</h3>
      <span ref={errBtnRef} className="err-msg"></span>
    </div>
  );
}