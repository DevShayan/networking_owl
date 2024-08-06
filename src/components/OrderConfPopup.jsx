import "./OrderConfPopup.css";
import empty from "../assets/empty.jpg";
import { useNavigate, useSearchParams } from "react-router-dom";
import { bundles } from "../pojos/bundles";
import { buyBundle, getBundles } from "../database/api_call";
import { useRef, useState } from "react";
import { user } from "../pojos/user";

export default function OrderConfPopup() {
  const bid = useSearchParams()[0].get("bid");
  const [buyError, setBuyError] = useState();
  const confBtnRef = useRef();
  const navigate = useNavigate();
  const [bundle, setBundle] = useState(bundles.list?.find((bun) => bun._id == bid) ?? null);

  if (bundles.list == null) {
    getBundles()
      .then((res) => {
        bundles.list = res;
        setBundle(bundles.list.find((bun) => bun._id == bid));
      })
      .catch((err) => console.log(err));
  }

  function bunBought() {
    confBtnRef.current.innerHTML = "Please wait...";

    buyBundle(bundle._id)
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
      {
        bundle !== undefined ?
          <div>
            <img src={bundle?.image_link ?? empty} alt="" />
            <div id="oc-points">
              <h3>{ bundle?.name ?? "Loading..." } Bundle</h3>
              <p className="b-points">{ bundle?.description_points[0] ?? "Loading..." }</p>
              <p className="b-points">{ bundle?.description_points[1] ?? "Loading..." }</p>
              <p className="b-points">{ bundle?.description_points[2] ?? "Loading..." }</p>
              <p className="b-points">{ bundle?.description_points[3] ?? "Loading..." }</p>
              <p>Price: <span>{ bundle?.price ?? "Loading..." }</span></p>
              <p>*Please expect a wait time of approximately 24 hours for your order to be recieved</p>
              <button ref={confBtnRef} onClick={bunBought}
              disabled = {
                bundle != null ?
                  user.bundles_bought?.find((i) => i._id == bundle._id) ?? false :
                  false
              }>
                {
                  bundle != null ?
                    user.bundles_bought?.find((i) => i._id == bundle._id) !== undefined ?
                      "Already Bought" :
                      "Confirm" :
                    false
                }
              </button>
              <span className="err-msg">{buyError}</span>
            </div>
          </div> :
          <div><p>No bundle found</p></div>
      }
    </div>
  );
}