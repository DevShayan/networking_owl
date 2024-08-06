import { Link } from "react-router-dom";
import "./PackagesPricing.css"
import { packages } from "../pojos/packages";
import { getPackages } from "../database/api_call";
import { useState } from "react";
import { user } from "../pojos/user";

export default function PackagesPricing() {
  const [, setReload] = useState(false);
  
  if (packages.list == null) {
    getPackages()
    .then((res) => {
      packages.list = res;
      setReload((prev) => !prev);
    })
    .catch((err) => console.log(err));
  }

  return (
    <div className="packages-pricing">
      <h1 className="content-heading">Packages Pricing</h1>
      <div className="packages-wrapper">
        {
          packages.list != null ?
            packages.list.map((pack, index) => 
              <div key={index} className="package">
                <h3>{pack.name}</h3>
                <p className="pkg-desc">{pack.description}</p>
                <p className="pkg-price"><b>Fixed price:</b> {pack.price} PKR</p>
                <Link to={`/pack-order-conf?pid=${pack._id}`}><button disabled={
                  user.curr_package == pack._id
                }>
                  {
                    user.curr_package == pack._id ?
                      "Already Bought" :
                      "Buy now"
                  }
                </button></Link>
              </div>) :
            <div></div>
        }
      </div>
    </div>
  );
}