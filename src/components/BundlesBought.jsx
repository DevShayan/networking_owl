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
                  <td><a href={bundle.drive_link} target="_blank">{bundle.drive_link}</a></td>
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
      <p>*If you do&apos;t have Google Drive access, please click <a href={`https://api.whatsapp.com/send?phone=923148964612&text=uid%3a+${user.id}%0Aemail%3a+${user.email}`} target="_blank">here</a> to send a WhatsApp message requesting access, along with a screenshot of this page.</p>
    </div>
  );
}