// src/services/api.js
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "/api";
const API_TIMEOUT = 15000; // 15 seconds timeout

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for auth tokens
api.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem('access') || sessionStorage.getItem('access');
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

// Response interceptor to handle token refresh
api.interceptors.response.use(response => response, async error => {
  const originalRequest = error.config;
  
  // Handle 401 errors only
  if (error.response?.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true;
    
    try {
      const refreshToken = localStorage.getItem('refresh') || sessionStorage.getItem('refresh');
      if (!refreshToken) {
        throw new Error('No refresh token available');
      }
      
      // Refresh token request
      const { data } = await axios.post(
        `${API_BASE_URL}/auth/token/refresh/`,
        { refresh: refreshToken },
        { timeout: API_TIMEOUT }
      );
      
      // Store new access token
      const storage = localStorage.getItem('refresh') ? localStorage : sessionStorage;
      storage.setItem('access', data.access);
      
      // Retry original request with new token
      originalRequest.headers.Authorization = `Bearer ${data.access}`;
      return api(originalRequest);
    } catch (refreshError) {
      console.error('Token refresh failed', refreshError);
      
      // Clear tokens and redirect to login
      localStorage.removeItem('access');
      localStorage.removeItem('refresh');
      sessionStorage.removeItem('access');
      sessionStorage.removeItem('refresh');
      
      // Redirect to login with redirect path
      const currentPath = window.location.pathname;
      window.location.href = `/login?next=${encodeURIComponent(currentPath)}`;
      
      return Promise.reject(refreshError);
    }
  }
  
  return Promise.reject(error);
});

export default api;