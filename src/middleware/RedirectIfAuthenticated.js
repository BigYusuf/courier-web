import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux"
// import { selectCurrentToken } from "../redux/slice/authSlice";

// import { selectCurrentToken } from "../state/slice/authSlice";
function RedirectIfAuthenticated({ Component }) {
  const myProfile = useSelector((state) => state?.auth?.profile);
  // const token = useSelector(selectCurrentToken)
 // const location = useLocation()
 
  if (myProfile) {
    return <Navigate to="/" />;
  }
  return <Component />;
}
export default RedirectIfAuthenticated;
