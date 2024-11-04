import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux"

import { selectCurrentUser } from "../redux/slice/authSlice";
// import { selectCurrentUser } from "../state/slice/authSlice";

function RolePermit({ Component }) {

  const user = useSelector(selectCurrentUser)
  if (user.role ==="user") {
    return <Navigate to="/" />;
  }
  return <Component />;
}
export default RolePermit;
