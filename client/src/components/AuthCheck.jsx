import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import React from "react";

const AuthCheck = ({ allowedRoles }) => {
  const { authUser, role } = useAuth();
  const location = useLocation();

  return allowedRoles.find((role) => role.includes(role)) ? (
    <Outlet />
  ) : authUser?.email ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
};

export default AuthCheck;
