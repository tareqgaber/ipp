import { Navigate, useParams } from "react-router";
import type { ReactNode } from "react";
import { useAuth } from "../hooks/useAuth";
import { LoadingOverlay } from "../components/LoadingSpinner";

interface SiteRouteProps {
  children: ReactNode;
  adminPath: string; // The admin equivalent path pattern (e.g., "/admin/opportunities/:id")
}

/**
 * Route wrapper for site pages that have admin equivalents
 * Redirects authenticated users to the admin version of the page
 */
export function SiteRoute({ children, adminPath }: SiteRouteProps) {
  const { isAuthenticated, isLoading } = useAuth();
  const params = useParams();

  // Show loading state while checking authentication
  if (isLoading) {
    return <LoadingOverlay />;
  }

  // Redirect authenticated users to admin version
  if (isAuthenticated) {
    // Replace URL parameters with actual values
    let resolvedPath = adminPath;
    Object.entries(params).forEach(([key, value]) => {
      resolvedPath = resolvedPath.replace(`:${key}`, value || "");
    });
    
    return <Navigate to={resolvedPath} replace />;
  }

  // Show the site page for non-authenticated users
  return <>{children}</>;
}
