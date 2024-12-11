import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

function RolePermit({ Component }) {
  const myProfile = useSelector((state) => state?.auth?.profile);

  if (myProfile?.role !== "staff" && myProfile?.role !== "admin") {
    return <Navigate to="/dashboard" />;
  }
  return <Component />;
}
export default RolePermit;
