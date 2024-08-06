import { Navigate } from "react-router-dom";
import { user } from "../pojos/user.js";

export default function AdminProtected({ProtectedPage}) {
  if (user.type == "admin") {
    return <ProtectedPage/>;
  }

  return <Navigate to="/" />
}
