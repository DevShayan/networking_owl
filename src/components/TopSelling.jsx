import "./TopSelling.css"
import Bundle from "./Bundle";
import empty from "../assets/empty.jpg"
import { bundles } from "../pojos/bundles";
import { getBundles } from "../database/api_call";
import { useState } from "react";
import { user } from "../pojos/user";

export default function TopSelling() {
  const [, setReload] = useState(false);

  if (bundles.list == null) {
    getBundles()
      .then((res) => {
        bundles.list = res;
        setReload((prev) => !prev);
      })
      .catch((err) => console.log(err));
  }

  return (
    <div id="top-selling">
      <h1 className="content-heading">our top selling bundles</h1>
      <div id="grid">
        {
          // first 3 bundles
          bundles.list != null && bundles.list.length != 0 ?
            bundles.list.slice(0, 3).map((bundle, index) =>
              <Bundle
                key={index}
                img={bundle.image_link ?? empty}
                title={bundle.name}
                l1={bundle.description_points[0]}
                l2={bundle.description_points[1]}
                l3={bundle.description_points[2]}
                l4={bundle.description_points[3]}
                price={bundle.price}
                bid={bundle._id}
                disabled={user.bundles_bought?.find((i) => i._id == bundle._id) ?? false}/>) :
            <div></div>
        }
      </div>
    </div>
  );
}