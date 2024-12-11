import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

function ForStaffsOnly({ Component }) {
  const staffProfile = useSelector((state) => state?.auth?.profile);

  if (staffProfile?.role !== "staff") {
    return <Navigate to="/" />;
  }
  return <Component />;
}
export default ForStaffsOnly;
