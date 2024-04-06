import React from "react";
import { Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./context/auth";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  if (!token) return <Navigate to="/signin" replace />;

  return <>{children}</>;
};

export default PrivateRoute;
