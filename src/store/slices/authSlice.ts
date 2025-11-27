import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { User } from "../../api/types";
import { tokenManager } from "../../lib/auth/tokenManager";

export type UserRole = "admin" | "investor" | "employee" | "dv_manager" | "department_manager";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

// Check for existing token and user data on initialization
const hasToken = tokenManager.hasValidToken();
const storedUser = tokenManager.getUserData();

const initialState: AuthState = {
  user: storedUser,
  isAuthenticated: hasToken && !!storedUser,
  isLoading: false, // Start as false; loading states managed by async actions
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ user: User; accessToken: string; refreshToken: string }>
    ) => {
      const { user, accessToken, refreshToken } = action.payload;
      
      state.user = user;
      state.isAuthenticated = true;
      state.isLoading = false;
      
      // Store tokens and user data in cookies
      tokenManager.setAccessToken(accessToken);
      tokenManager.setRefreshToken(refreshToken);
      tokenManager.setUserData(user);
    },
    
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.isLoading = false;
      
      // Store user data in cookies
      tokenManager.setUserData(action.payload);
    },
    
    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
    
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.isLoading = false;
      
      // Clear tokens from cookies
      tokenManager.clearTokens();
    },
    
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setCredentials, setUser, updateUser, logout, setLoading } =
  authSlice.actions;

// Selectors
export const selectCurrentUser = (state: { auth: AuthState }) => state.auth.user;
export const selectIsAuthenticated = (state: { auth: AuthState }) => state.auth.isAuthenticated;
export const selectIsLoading = (state: { auth: AuthState }) => state.auth.isLoading;
export const selectUserRole = (state: { auth: AuthState }) => state.auth.user?.role;

// Role checking helper
export const selectHasRole = (state: { auth: AuthState }, roles: UserRole | UserRole[]) => {
  const userRole = state.auth.user?.role;
  if (!userRole) return false;
  
  if (Array.isArray(roles)) {
    return roles.includes(userRole);
  }
  
  return userRole === roles;
};

export default authSlice.reducer;
