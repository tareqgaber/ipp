import { Navigate } from "react-router";
import type { ReactNode } from "react";
import { useAuth } from "../hooks/useAuth";
import { LoadingOverlay } from "../components/LoadingSpinner";

interface GuestRouteProps {
  children: ReactNode;
  redirectTo?: string; // Where to redirect authenticated users
}

/**
 * Route wrapper for pages that should only be accessible to non-authenticated users
 * (e.g., login, signup, forgot password)
 * Redirects authenticated users to the specified path (default: /admin)
 */
export function GuestRoute({
  children,
  redirectTo = "/admin",
}: GuestRouteProps) {
  const { isAuthenticated, isLoading } = useAuth();

  // Show loading state while checking authentication
  if (isLoading) {
    return <LoadingOverlay />;
  }

  // Redirect to admin if already authenticated
  if (isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  // Show the guest page (login, signup, etc.)
  return <>{children}</>;
}
