import { useCallback } from "react";
import { useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  logout as logoutAction,
  selectCurrentUser,
  selectIsAuthenticated,
  selectIsLoading,
  selectUserRole,
  type UserRole,
} from "../store/slices/authSlice";

/**
 * Hook to manage authentication state and actions
 */
export const useAuth = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  
  const user = useAppSelector(selectCurrentUser);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const isLoading = useAppSelector(selectIsLoading);
  const role = useAppSelector(selectUserRole);

  const logout = useCallback(() => {
    dispatch(logoutAction());
    navigate("/login", { replace: true });
  }, [dispatch, navigate]);

  const hasRole = useCallback(
    (roles: UserRole | UserRole[]) => {
      if (!role) return false;
      
      if (Array.isArray(roles)) {
        return roles.includes(role);
      }
      
      return role === roles;
    },
    [role]
  );

  const isAdmin = role === "admin";
  const isInvestor = role === "investor";
  const isEmployee = role === "employee";
  const isDVManager = role === "dv_manager";
  const isDepartmentManager = role === "department_manager";

  return {
    user,
    isAuthenticated,
    isLoading,
    role,
    logout,
    hasRole,
    // Role checks
    isAdmin,
    isInvestor,
    isEmployee,
    isDVManager,
    isDepartmentManager,
  };
};
