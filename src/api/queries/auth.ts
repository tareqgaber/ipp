import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { axiosInstance } from "../axios";
import { endpoints } from "../endpoints";
import { queryKeys } from "../queryKeys";
import { useAppDispatch } from "../../store/hooks";
import {
  setCredentials,
  updateUser,
  logout as logoutAction,
} from "../../store/slices/authSlice";
import type {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
  ProfileResponse,
  UpdateProfileRequest,
  ChangePasswordRequest,
} from "../types";

/**
 * Login mutation
 */
export const MOCK_LOGIN_RESPONSE: LoginResponse = {
  user: {
    id: "123",
    name: "Mock User",
    email: "mock@bena.com",
    role: "admin",
    createdAt: "2025-01-01T00:00:00.000Z",
    updatedAt: "2025-01-01T00:00:00.000Z",
  },
  accessToken:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9." +
    "eyJ1c2VySWQiOiIxMjMiLCJuYW1lIjoiTW9jayBVc2VyIiwicm9sZSI6ImFkbWluIiwiZXhwIjoxOTAwMDAwMDAwfQ." +
    "MOCK_SIGNATURE",
  refreshToken:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9." +
    "eyJ1c2VySWQiOiIxMjMiLCJ0eXBlIjoicmVmcmVzaCIsImV4cCI6MjAwMDAwMDAwMH0." +
    "REFRESH_SIGNATURE",
};
export const useLogin = () => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (data: LoginRequest): Promise<LoginResponse> => {
      // const response = await axiosInstance.post<LoginResponse>(
      //   endpoints.auth.login,
      //   data
      // );
      console.log(data);
      const response = MOCK_LOGIN_RESPONSE;
      return response;
    },
    onSuccess: (data) => {
      // Store user and tokens in Redux and cookies
      dispatch(
        setCredentials({
          user: data.user,
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
        })
      );

      // Invalidate auth queries
      queryClient.invalidateQueries({ queryKey: queryKeys.auth.all });

      // Navigate to dashboard or home
      navigate("/", { replace: true });
    },
    meta: {
      // Disable default success toast since we're navigating
      disableSuccessToast: false,
    },
  });
};

/**
 * Register mutation
 */
export const useRegister = () => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (data: RegisterRequest): Promise<RegisterResponse> => {
      const response = await axiosInstance.post<RegisterResponse>(
        endpoints.auth.register,
        data
      );
      return response.data;
    },
    onSuccess: (data) => {
      // Store user and tokens in Redux and cookies
      dispatch(
        setCredentials({
          user: data.user,
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
        })
      );

      // Invalidate auth queries
      queryClient.invalidateQueries({ queryKey: queryKeys.auth.all });

      // Navigate to dashboard or home
      navigate("/", { replace: true });
    },
    meta: {
      // Disable default success toast since we're navigating
      disableSuccessToast: true,
    },
  });
};

/**
 * Logout mutation
 */
export const useLogout = () => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (): Promise<void> => {
      // await axiosInstance.post(endpoints.auth.logout);
    },
    onSuccess: () => {
      // Clear auth state and tokens
      dispatch(logoutAction());

      // Clear all queries
      queryClient.clear();

      // Redirect to login
      navigate("/login", { replace: true });
    },
    meta: {
      // Disable default success toast since we're navigating
      disableSuccessToast: true,
    },
  });
};

/**
 * Get user profile query
 */
export const useProfile = (enabled = true) => {
  return useQuery({
    queryKey: queryKeys.auth.profile(),
    queryFn: async (): Promise<ProfileResponse> => {
      const response = await axiosInstance.get<ProfileResponse>(
        endpoints.auth.profile
      );
      return response.data;
    },
    enabled,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

/**
 * Update profile mutation
 */
export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();

  return useMutation({
    mutationFn: async (
      data: UpdateProfileRequest
    ): Promise<ProfileResponse> => {
      const response = await axiosInstance.put<ProfileResponse>(
        endpoints.auth.updateProfile,
        data
      );
      return response.data;
    },
    onSuccess: (data) => {
      // Update user in Redux
      dispatch(updateUser(data.user));

      queryClient.invalidateQueries({ queryKey: queryKeys.auth.profile() });
    },
    meta: {
      successMessage: "Profile updated successfully",
    },
  });
};

/**
 * Change password mutation
 */
export const useChangePassword = () => {
  return useMutation({
    mutationFn: async (data: ChangePasswordRequest): Promise<void> => {
      await axiosInstance.post(endpoints.auth.changePassword, data);
    },
    meta: {
      successMessage: "Password changed successfully",
    },
  });
};
