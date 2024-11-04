import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux"
import { selectCurrentUser } from "../redux/slice/authSlice";
// import { selectCurrentUser } from "../state/slice/authSlice";

function ForUsersOnly({ Component }) {

  const user = useSelector(selectCurrentUser)
  if (user.role =="seller") {
    return <Navigate to="/" />;
  }
  return <Component />;
}
export default ForUsersOnly;
