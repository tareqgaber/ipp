import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { selectIsLoading, selectCurrentUser, setLoading, setUser, logout } from "../store/slices/authSlice";
import { tokenManager } from "../lib/auth/tokenManager";

/**
 * Component to initialize authentication state on app load
 * Restores user session from cookies
 */
export function AuthInitializer({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectIsLoading);
  const user = useAppSelector(selectCurrentUser);

  useEffect(() => {
    const initAuth = () => {
      const hasToken = tokenManager.hasValidToken();
      const userData = tokenManager.getUserData();
      
      if (hasToken && userData && !user) {
        // Token and user data exist in cookies - restore session
        console.log("Restoring session from cookies:", userData);
        dispatch(setUser(userData));
      } else if (!hasToken || !userData) {
        // No token or user data found, ensure auth state is cleared
        dispatch(logout());
      } else {
        // User already loaded, just set loading to false
        dispatch(setLoading(false));
      }
    };

    initAuth();
  }, [dispatch, user]);

  // Show loading screen while initializing
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
