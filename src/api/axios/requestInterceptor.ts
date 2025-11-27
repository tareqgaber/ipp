import type { InternalAxiosRequestConfig } from 'axios';
import { tokenManager } from '../../lib/auth/tokenManager';

/**
 * Request interceptor to attach tokens, language, and custom headers
 */
export const requestInterceptor = (config: InternalAxiosRequestConfig) => {
  // Get token from cookies
  const token = tokenManager.getAccessToken();
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  // Add language header (i18next or localStorage)
  const language = localStorage.getItem('language') || 'en';
  config.headers['Accept-Language'] = language;

  // Add any other custom headers
  config.headers['Content-Type'] = config.headers['Content-Type'] || 'application/json';

  return config;
};

/**
 * Request error interceptor
 */
export const requestErrorInterceptor = (error: any) => {
  return Promise.reject(error);
};
