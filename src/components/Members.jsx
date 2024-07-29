import { useState } from "react";
import { getMembers } from "../database/api_call";
import { members } from "../pojos/members";
import dateFormat from "dateformat";
import "./Members.css"

export default function Members() {
  const [, setReload] = useState(false);

  if (members.list == null) {
    getMembers()
      .then((res) => {
        members.list = res;
        setReload((prev) => !prev);
      })
      .catch((err) => console.log(err));
  }

  return (
    <div id="members">
      <table id="members-table">
        <tbody>
          <tr>
            <th>Member</th>
            <th>Package bought</th>
            <th>Joining date</th>
          </tr>
          {
            members.list != null && members.list.length != 0 ?
              members.list.map((member) => 
                <tr key={Math.random()*100}>
                  <td>{member.name}</td>
                  <td>{member.curr_package?.name ?? "-"}</td>
                  <td>{dateFormat(member.date_joined, "d mmm, yyyy")}</td>
                </tr>
              ) :
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