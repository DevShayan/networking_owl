import { Navigate } from "react-router-dom";
import { user } from "../pojos/user.js";

export default function UserProtected({ProtectedPage}) {
  if (user.type == "user") {
    return <ProtectedPage/>;
  }
  
  return <Navigate to="/login" />;
}
