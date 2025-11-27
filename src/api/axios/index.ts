import axios from 'axios';
import {
  requestInterceptor,
  requestErrorInterceptor,
} from './requestInterceptor';
import {
  responseInterceptor,
  responseErrorInterceptor,
} from './responseInterceptor';

/**
 * Create axios instance with base configuration
 */
export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Attach request interceptors
 */
axiosInstance.interceptors.request.use(
  requestInterceptor,
  requestErrorInterceptor
);

/**
 * Attach response interceptors
 */
axiosInstance.interceptors.response.use(
  responseInterceptor,
  responseErrorInterceptor
);

export default axiosInstance;
