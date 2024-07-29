import { Navigate } from "react-router-dom";
import { user } from "../pojos/user.js";

export default function UserProtected({ProtectedPage}) {
  if (user.name == null) {
    return <Navigate to="/login" />;
  }

  return <ProtectedPage/>;
}
