/* src/components/ProtectedRoute.tsx */
import React from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../utils/auth";

export const ProtectedRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/auth/login" replace />;
  }
  return children;
};
