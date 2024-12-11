import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

function RequireAuth({ Component }) {
  const myProfile = useSelector((state) => state?.auth?.profile);

  if (!myProfile) {
    return <Navigate to="/signin" />;
  }
  return <Component />;
}
export default RequireAuth;
