import "./BundlesBought.css"
import { user } from "../pojos/user";

export default function BundlesBought() {

  return (
    <div id="m-bundles">
      <table id="bun-table">
        <tbody>
          <tr>
            <th>Bundle</th>
            <th>Link</th>
            <th>Price</th>
          </tr>
          {
            user.bundles_bought != null && user.bundles_bought.length != 0 ?
              user.bundles_bought.map((bundle, index) => 
                <tr key={index}>
                  <td>{bundle.name}</td>
                  <td>{bundle.drive_link}</td>
                  <td>{bundle.price} PKR</td>
                </tr>) :
              <tr>
                <td>-</td>
                <td>-</td>
                <td>-</td>
              </tr>
          }
        </tbody>
      </table>
    </div>
  );
}