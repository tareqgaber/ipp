import type { AxiosResponse, AxiosError } from "axios";
import { axiosInstance } from "./index";
import { tokenManager } from "../../lib/auth/tokenManager";
import { store } from "../../store";
import { logout as logoutAction } from "../../store/slices/authSlice";

/**
 * Response interceptor to handle successful responses
 */
export const responseInterceptor = (response: AxiosResponse) => {
  return response;
};

/**
 * Response error interceptor to handle errors, token refresh, and redirects
 */
export const responseErrorInterceptor = async (error: AxiosError) => {
  const originalRequest = error.config as any;

  // Handle 401 Unauthorized - Token Refresh Logic
  if (error.response?.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true;

    try {
      const refreshToken = tokenManager.getRefreshToken();

      if (!refreshToken) {
        // No refresh token, redirect to login
        handleAuthError();
        return Promise.reject(error);
      }

      // Call refresh token endpoint
      const response = await axiosInstance.post("/auth/refresh", {
        refreshToken,
      });

      const { accessToken, refreshToken: newRefreshToken } = response.data;
      
      // Update tokens in cookies
      tokenManager.setAccessToken(accessToken);
      if (newRefreshToken) {
        tokenManager.setRefreshToken(newRefreshToken);
      }

      // Retry original request with new token
      originalRequest.headers.Authorization = `Bearer ${accessToken}`;
      return axiosInstance(originalRequest);
    } catch (refreshError) {
      // Refresh failed, clear tokens and redirect
      handleAuthError();
      return Promise.reject(refreshError);
    }
  }

  // Handle 403 Forbidden
  if (error.response?.status === 403) {
    console.error("Forbidden: Insufficient permissions");
    // Optionally redirect to unauthorized page
  }

  // Handle 404 Not Found
  if (error.response?.status === 404) {
    console.error("Resource not found");
  }

  // Handle 500 Server Error
  if (error.response?.status === 500) {
    console.error("Server error occurred");
  }

  return Promise.reject(error);
};

/**
 * Handle authentication errors - clear tokens and redirect to login
 */
const handleAuthError = () => {
  // Clear tokens from cookies
  tokenManager.clearTokens();
  
  // Dispatch logout action to Redux
  store.dispatch(logoutAction());

  // Redirect to login (adjust path as needed)
  if (typeof window !== "undefined") {
    window.location.href = "/login";
  }
};
