import "./OrderConfPopup.css";
import bun1 from "../assets/b1.png";
import { useNavigate, useSearchParams } from "react-router-dom";
import { bundles } from "../pojos/bundles";
import { buyBundle } from "../database/api_call";
import { useRef, useState } from "react";

export default function OrderConfPane() {
  const index = useSearchParams()[0].get("index");
  const [buyError, setBuyError] = useState();
  const confBtnRef = useRef();
  const navigate = useNavigate();

  function bunBought() {
    confBtnRef.current.innerHTML = "Please wait...";

    buyBundle(bundles.list[index]._id)
      .then(() => {
        confBtnRef.current.innerHTML = "Confirm";
        navigate("/dashboard/wallet");
      })
      .catch((err) => {
        confBtnRef.current.innerHTML = "Confirm";
        typeof err === "string" ? setBuyError(err) : setBuyError(err.message);
        console.log(err);
      });
  }

  return (
    <div id="order-conf">
      <h2>Please confirm your order</h2>
      <div>
        <img src={bun1} alt="" />
        <div id="oc-points">
          <h3>{ bundles.list[index].name } Bundle</h3>
          <p className="b-points">{ bundles.list[index].description_points[0] }</p>
          <p className="b-points">{ bundles.list[index].description_points[1] }</p>
          <p className="b-points">{ bundles.list[index].description_points[2] }</p>
          <p className="b-points">{ bundles.list[index].description_points[3] }</p>
          <p>Price: <span>{ bundles.list[index].price }</span></p>
          <p>*Please expect a wait time of approximately 24 hours for your order to be recieved</p>
          <button ref={confBtnRef} onClick={bunBought}>Confirm</button>
          <span className="err-msg">{buyError}</span>
        </div>
      </div>
    </div>
  );
}