import React from "react";
import { Navigate } from "react-router-dom";

// for front-end route protect
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
