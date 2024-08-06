import "./OrderConfPopup.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import { buyPackage, getPackages } from "../database/api_call";
import { useRef, useState } from "react";
import { user } from "../pojos/user";
import { packages } from "../pojos/packages";

export default function PackOrderConfPopup() {
  const pid = useSearchParams()[0].get("pid");
  const [buyError, setBuyError] = useState();
  const confBtnRef = useRef();
  const navigate = useNavigate();
  const [, setReload] = useState(false);
  const [mpackage, setMPackage] = useState(packages.list?.find((pack) => pack._id == pid) ?? null);

  if (packages.list == null) {
    getPackages()
      .then((res) => {
        packages.list = res;
        setMPackage(packages.list.find((pack) => pack._id == pid));
        setReload((prev) => !prev);
      })
      .catch((err) => console.log(err));
  }

  function packBought() {
    confBtnRef.current.innerHTML = "Please wait...";
    console.log(mpackage._id);
    buyPackage(mpackage._id)
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
        mpackage !== undefined ?
          <div>
            <div id="oc-points">
              <h3>{ mpackage?.name ?? "Loading..." } Package</h3>
              <p className="b-points">{ mpackage?.description ?? "Loading..." }</p>
              <p>Price: <span>{ mpackage?.price ?? "Loading..." }</span></p>
              <p>*Please expect a wait time of approximately 24 hours for your order to be recieved</p>
              <button ref={confBtnRef} onClick={packBought}
              disabled = {
                mpackage != null ?
                  user.curr_package == mpackage._id :
                  false
              }>
                {
                  mpackage != null ?
                    user.curr_package == mpackage._id ?
                      "Already Bought" :
                      "Confirm" :
                    false
                }
              </button>
              <span className="err-msg">{buyError}</span>
            </div>
          </div> :
          <div><p>No package found</p></div>
      }
    </div>
  );
}