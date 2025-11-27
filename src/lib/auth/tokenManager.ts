import Cookies from "js-cookie";
import type { User } from "../../api/types";

const TOKEN_KEYS = {
  ACCESS_TOKEN: "accessToken",
  REFRESH_TOKEN: "refreshToken",
  USER_DATA: "userData",
} as const;

const COOKIE_OPTIONS = {
  secure: import.meta.env.PROD, // Only secure in production
  sameSite: "strict" as const,
};

/**
 * Token management utilities using cookies
 */
export const tokenManager = {
  /**
   * Store access token in cookies
   */
  setAccessToken: (token: string) => {
    Cookies.set(TOKEN_KEYS.ACCESS_TOKEN, token, {
      ...COOKIE_OPTIONS,
      expires: 1, // 1 day
    });
  },

  /**
   * Store refresh token in cookies
   */
  setRefreshToken: (token: string) => {
    Cookies.set(TOKEN_KEYS.REFRESH_TOKEN, token, {
      ...COOKIE_OPTIONS,
      expires: 7, // 7 days
    });
  },

  /**
   * Get access token from cookies
   */
  getAccessToken: (): string | undefined => {
    return Cookies.get(TOKEN_KEYS.ACCESS_TOKEN);
  },

  /**
   * Get refresh token from cookies
   */
  getRefreshToken: (): string | undefined => {
    return Cookies.get(TOKEN_KEYS.REFRESH_TOKEN);
  },

  /**
   * Remove access token from cookies
   */
  removeAccessToken: () => {
    Cookies.remove(TOKEN_KEYS.ACCESS_TOKEN);
  },

  /**
   * Remove refresh token from cookies
   */
  removeRefreshToken: () => {
    Cookies.remove(TOKEN_KEYS.REFRESH_TOKEN);
  },

  /**
   * Store user data in cookies
   */
  setUserData: (user: User) => {
    Cookies.set(TOKEN_KEYS.USER_DATA, JSON.stringify(user), {
      ...COOKIE_OPTIONS,
      expires: 1, // 1 day
    });
  },

  /**
   * Get user data from cookies
   */
  getUserData: (): User | null => {
    const userData = Cookies.get(TOKEN_KEYS.USER_DATA);
    if (!userData) return null;
    
    try {
      return JSON.parse(userData) as User;
    } catch {
      return null;
    }
  },

  /**
   * Remove user data from cookies
   */
  removeUserData: () => {
    Cookies.remove(TOKEN_KEYS.USER_DATA);
  },

  /**
   * Clear all tokens and user data from cookies
   */
  clearTokens: () => {
    Cookies.remove(TOKEN_KEYS.ACCESS_TOKEN);
    Cookies.remove(TOKEN_KEYS.REFRESH_TOKEN);
    Cookies.remove(TOKEN_KEYS.USER_DATA);
  },

  /**
   * Check if user has valid access token
   */
  hasValidToken: (): boolean => {
    return !!Cookies.get(TOKEN_KEYS.ACCESS_TOKEN);
  },
};
