import type { ReactNode } from "react";
import { useAuth } from "../hooks/useAuth";

interface ConditionalRouteProps {
  authenticatedElement: ReactNode;
  unauthenticatedElement: ReactNode;
}

export function ConditionalRoute({
  authenticatedElement,
  unauthenticatedElement,
}: ConditionalRouteProps) {
  const { isAuthenticated, isLoading } = useAuth();

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  return <>{isAuthenticated ? authenticatedElement : unauthenticatedElement}</>;
}
