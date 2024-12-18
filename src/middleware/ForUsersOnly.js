import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

function ForUsersOnly({ Component }) {
  const userProfile = useSelector((state) => state?.auth?.profile);

  if (userProfile?.role !== "user") {
    return <Navigate to="/" />;
  }
  return <Component />;
}
export default ForUsersOnly;
