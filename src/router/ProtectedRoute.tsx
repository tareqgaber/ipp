import { Navigate, useLocation } from "react-router";
import type { ReactNode } from "react";
import { useAuth } from "../hooks/useAuth";
import type { UserRole } from "../store/slices/authSlice";
import { LoadingOverlay } from "../components/LoadingSpinner";

interface ProtectedRouteProps {
  children: ReactNode;
  roles?: UserRole | UserRole[]; // Optional role-based access
  fallbackPath?: string; // Redirect path for unauthorized access
}

export function ProtectedRoute({
  children,
  roles,
  fallbackPath = "/unauthorized",
}: ProtectedRouteProps) {
  const { isAuthenticated, isLoading, hasRole } = useAuth();
  console.log({ isAuthenticated, isLoading, hasRole }, "ProtectedRoute");
  const location = useLocation();

  // Show loading state while checking authentication
  if (isLoading) {
    return <LoadingOverlay />;
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check role-based access if roles are specified
  if (roles && !hasRole(roles)) {
    return <Navigate to={fallbackPath} replace />;
  }

  return <>{children}</>;
}
