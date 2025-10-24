/* src/components/ProtectedRoute.tsx */
import type { FC, ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../utils/auth";

export const ProtectedRoute: FC<{ children: ReactNode }> = ({ children }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/auth/login" replace />;
  }
  return children;
};
