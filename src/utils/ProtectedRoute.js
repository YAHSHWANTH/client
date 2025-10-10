import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, role }) => {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

  // If no token, send to login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // If role is specified (like "admin"), check it
  if (role && userRole !== role) {
    return <Navigate to="/user-home" replace />;
  }

  return children;
};

export default ProtectedRoute;
