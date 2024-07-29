import "./WithdrawCard.css"

export default function WithdrawCard({cardTitle, cardImg, cardLabel1, cardIconName}) {
  
  const sendToNumber = "923355136996";

  return (
    <div id="wd-card">
      <div>
        <h3>{ cardTitle }</h3>
        {
          cardImg == null ?
            <span className="material-symbols-rounded">{ cardIconName }</span> :
            <img src={ cardImg } alt="" />
        }
      </div>
      <label htmlFor="inp-num">{ cardLabel1 }</label>
      <input type="text" id="inp-num" />
      <label htmlFor="inp-amount">Amount</label>
      <input type="number" id="inp-amount" />
      <a href={`https://api.whatsapp.com/send?phone=${sendToNumber}&text=%2b923355136996%0AAmount%3A+XX%0A${cardTitle}`} target="_blank"><button>Request Withdraw</button></a>
    </div>
  );
}