import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [authError, setAuthError] = useState(null);

  // Fetch user data from API
  const fetchUserData = useCallback(async () => {
    try {
      const { data } = await api.get('/auth/dashboard/');
      return {
        id: data.user.id,
        email: data.user.email,
        firstName: data.user.first_name,
        lastName: data.user.last_name,
        fullName: `${data.user.first_name} ${data.user.last_name}`,
        isInstructor: data.user.is_instructor,
        role: data.role,
        enrolledCourses: data.enrollments || [],
        progressSummary: data.progress_summary || {},
        notifications: data.notifications || [],
        inbox: data.inbox || []
      };
    } catch (error) {
      console.error("Failed to fetch user data:", error);
      setAuthError('Failed to load user data');
      throw error;
    }
  }, []);

  // Verify authentication on app load
  const verifyAuth = useCallback(async () => {
    try {
      const refreshToken = localStorage.getItem('refresh') || sessionStorage.getItem('refresh');
      if (!refreshToken) {
        setIsLoading(false);
        return;
      }

      const userData = await fetchUserData();
      setCurrentUser(userData);
      setAuthError(null);
    } catch (error) {
      console.error("Session verification failed:", error);
      setAuthError('Session verification failed');
      logout();
    } finally {
      setIsLoading(false);
    }
  }, [fetchUserData]);

  // Login function
  const login = async (credentials) => {
    try {
      setIsLoading(true);
      setAuthError(null);
      
      // Authenticate and get tokens
      const { data } = await api.post('/auth/login/', {
        email: credentials.email,
        password: credentials.password
      });

      // Store tokens based on "Remember Me"
      const storage = credentials.rememberMe ? localStorage : sessionStorage;
      storage.setItem('access', data.access);
      storage.setItem('refresh', data.refresh);

      // Fetch complete user data
      const userData = await fetchUserData();
      setCurrentUser(userData);
      
      return { success: true, user: userData };
    } catch (error) {
      let message = 'Login failed. Please check your credentials.';
      if (error.response?.data?.detail) {
        message = error.response.data.detail;
      } else if (error.response?.data?.non_field_errors) {
        message = error.response.data.non_field_errors[0];
      }
      setAuthError(message);
      return { success: false, message };
    } finally {
      setIsLoading(false);
    }
  };

  // Signup function
  const signup = async (userData) => {
    try {
      setIsLoading(true);
      setAuthError(null);
      
      // Register the user
      const { data } = await api.post('/auth/register/', {
        fullname: `${userData.firstName} ${userData.lastName}`,
        email: userData.email,
        password: userData.password,
        confirmPassword: userData.confirmPassword,
        is_instructor: false
      });

      // Store tokens
      const storage = userData.rememberMe ? localStorage : sessionStorage;
      storage.setItem('access', data.access);
      storage.setItem('refresh', data.refresh);

      // Fetch complete user data
      const user = await fetchUserData();
      setCurrentUser(user);
      
      return { success: true, user };
    } catch (error) {
      let message = 'Registration failed. Please try again.';
      
      if (error.response?.data) {
        // Handle backend validation errors
        if (error.response.data.email) {
          message = `Email: ${error.response.data.email[0]}`;
        } else if (error.response.data.password) {
          message = `Password: ${error.response.data.password[0]}`;
        } else if (error.response.data.non_field_errors) {
          message = error.response.data.non_field_errors[0];
        } else if (error.response.data.detail) {
          message = error.response.data.detail;
        }
      }
      
      setAuthError(message);
      return { success: false, message };
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = useCallback(() => {
    // Clear all storage locations
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    sessionStorage.removeItem('access');
    sessionStorage.removeItem('refresh');
    
    // Clear current user
    setCurrentUser(null);
    setAuthError(null);
    
    // Call logout API
    api.post('/auth/logout/').catch(console.error);
  }, []);

  // Refresh user data
  const refreshUser = useCallback(async () => {
    try {
      const userData = await fetchUserData();
      setCurrentUser(userData);
      return userData;
    } catch (error) {
      console.error("Failed to refresh user data:", error);
      setAuthError('Failed to refresh user data');
      throw error;
    }
  }, [fetchUserData]);

  // Verify auth on mount
  useEffect(() => {
    verifyAuth();
  }, [verifyAuth]);

  return (
    <AuthContext.Provider value={{ 
      currentUser, 
      isLoading,
      authError,
      login, 
      signup, 
      logout,
      refreshUser
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}