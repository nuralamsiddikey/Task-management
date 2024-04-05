import React from "react";
import { Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./context/auth";

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuthContext();
  console.log(isAuthenticated)

  if (!isAuthenticated) return <Navigate to="/signin" replace />;

  return <>{children}</>;
};

export default PrivateRoute;
