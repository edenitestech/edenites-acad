// src/contexts/AuthContext.js
import { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch user data from the dashboard endpoint
  const fetchUserData = async () => {
    try {
      const { data } = await api.get('/auth/dashboard/');
      return {
        id: data.user.id,
        email: data.user.email,
        fullname: `${data.user.first_name} ${data.user.last_name}`,
        firstName: data.user.first_name,
        lastName: data.user.last_name, 
        is_instructor: data.user.is_instructor
        // Add other user properties you need
      };
    } catch (error) {
      console.error("Failed to fetch user data:", error);
      throw error;
    }
  };

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const refresh = localStorage.getItem('refresh') || sessionStorage.getItem('refresh');
        if (refresh) {
          const userData = await fetchUserData();
          setCurrentUser(userData);
        }
      } catch (error) {
        console.error("Session verification failed:", error);
        // Clear tokens on error
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');
        sessionStorage.removeItem('access');
        sessionStorage.removeItem('refresh');
      } finally {
        setIsLoading(false);
      }
    };
    verifyAuth();
  }, []);

  // Login Function
  const login = async (credentials) => {
    try {
      // Step 1: Authenticate and get tokens
      const { data } = await api.post('/auth/login/', {
        email: credentials.email,
        password: credentials.password
      });

      // Step 2: Store tokens based on "Remember Me"
      if (credentials.rememberMe) {
        localStorage.setItem('access', data.access);
        localStorage.setItem('refresh', data.refresh);
      } else {
        sessionStorage.setItem('access', data.access);
        sessionStorage.setItem('refresh', data.refresh);
      }

      // Step 3: Fetch complete user data
      const userData = await fetchUserData();
      setCurrentUser(userData);
      
      return { success: true, user: userData };
    } catch (error) {
      let message = 'Login failed. Please check your credentials.';
      if (error.response?.data?.detail) {
        message = error.response.data.detail;
      }
      return { success: false, message };
    }
  };

  // Signup function
  const signup = async (userData) => {
    try {
      // Step 1: Register the user
      const { data } = await api.post('/auth/register/', userData);
      
      // Step 2: Store tokens based on Remember me choice
      if (userData.rememberMe) {
        localStorage.setItem('access', data.access);
        localStorage.setItem('refresh', data.refresh);
      } else {
        sessionStorage.setItem('access', data.access);
        sessionStorage.setItem('refresh', data.refresh);
      }

      // Step 3: Fetch complete user data
      const user = await fetchUserData();
      setCurrentUser(user);
      return { success: true, user };
      
    } catch (error) {
      let message = 'Registration failed. Please try again.';
      
      // Handle different error formats
      if (error.response?.data) {
        if (error.response.data.detail) {
          message = error.response.data.detail;
        } else if (error.response.data.email) {
          message = `Email error: ${error.response.data.email[0]}`;
        } else if (error.response.data.password) {
          message = `Password error: ${error.response.data.password[0]}`;
        } else {
          const firstErrorKey = Object.keys(error.response.data)[0];
          message = error.response.data[firstErrorKey][0];
        }
      }
      
      return { success: false, message };
    }
  };

  // Logout function
  const logout = () => {
    // Clear all storage locations
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    sessionStorage.removeItem('access');
    sessionStorage.removeItem('refresh');
    setCurrentUser(null);
    return true;
  };

  return (
    <AuthContext.Provider value={{ 
      currentUser, 
      isLoading,
      login, 
      signup, 
      logout 
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