// src/contexts/AuthContext.js
import { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const refresh = localStorage.getItem('refresh') || sessionStorage.getItem('refresh');
        if (refresh) {
          // Get user profile
          const { data } = await api.get('/auth/profile/');
          setCurrentUser(data);
        }
      } catch (error) {
        console.error("Session verification failed:", error);
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
      const { data } = await api.post('/auth/login/', {
        email: credentials.email,
        password: credentials.password
      });

      if (credentials.rememberMe) {
        localStorage.setItem('access', data.access);
        localStorage.setItem('refresh', data.refresh);
      } else {
        sessionStorage.setItem('access', data.access);
        sessionStorage.setItem('refresh', data.refresh);
      }
      
      const profile = await api.get('/auth/profile/');
      setCurrentUser(profile.data);
      return { success: true, user: profile.data };
    } catch (error) {
      let message = 'Login failed';
      if (error.response?.data?.detail) {
        message = error.response.data.detail;
      }
      return { success: false, message };
    }
  };

  // Signup function
  const signup = async (userData) => {
    try {
      const { data } = await api.post('/auth/register/', userData);
      localStorage.setItem('access', data.access);
      localStorage.setItem('refresh', data.refresh);
      
      // Set user data immediately
      const user = {
        email: userData.email,
        fullname: userData.fullname,
        is_instructor: false
      };
      setCurrentUser(user);
      
      return { success: true, user };
    } catch (error) {
      let message = 'Registration failed';
      if (error.response?.data) {
        if (error.response.data.detail) {
          message = error.response.data.detail;
        } else {
          const firstErrorKey = Object.keys(error.response.data)[0];
          message = error.response.data[firstErrorKey][0];
        }
      }
      return { success: false, message };
    }
  };

  // Login functions
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