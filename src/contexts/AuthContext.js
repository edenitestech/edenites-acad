// src/contexts/AuthContext.js
import { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  
  // To Update the Token Verification
  useEffect(() => {
    const verifyAuth = async () => {
      try {
        // Check both storage locations
        const access = localStorage.getItem('access') || sessionStorage.getItem('access');
        const refresh = localStorage.getItem('refresh') || sessionStorage.getItem('refresh');
        
        if (refresh) {
          const { data } = await api.get(`${process.env.REACT_APP_API_BASE_URL}/auth/profile`);
          setCurrentUser(data);
        }
      } catch (error) {
        // Clear both storage locations on error
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
      const { data } = await api.post(`${process.env.REACT_APP_API_BASE_URL}auth/login`,  {
      email: credentials.email,
      password: credentials.password
    });

    // Use localStorage if "Remember Me" is checked
    if (credentials.rememberMe) {
      localStorage.setItem('access', data.access);
      localStorage.setItem('refresh', data.refresh);
    } else {
      // Use sessionStorage for temporary session
      sessionStorage.setItem('access', data.access);
      sessionStorage.setItem('refresh', data.refresh);
    }
      // Fetch user profile after login
      const profile = await api.get(`${process.env.REACT_APP_API_BASE_URL}/auth/profile`);
      setCurrentUser(profile.data);
      return { success: true, user: profile.data };
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Login failed' 
      };
    }
  };


  const signup = async (userData) => {
    console.log(userData);
    try {
      const { data } = await api.post('/auth/register', userData);
      // Use localStorage by default for signups (or make configurable)
      localStorage.setItem('access', data.access);
      localStorage.setItem('refresh', data.refresh);
      
      // Fetch user profile after signup
      const profile = await api.get('/auth/profile')
      setCurrentUser(profile.data);
      
      return { success: true, user: profile.data };
    } catch (error) {
      // Improved error handling
      let message = 'Registration failed';
      if (error.response?.data) {
        if (error.response.data.detail) {
          message = error.response.data.detail;
        } else {
          // Handle field-specific errors
          const firstErrorKey = Object.keys(error.response.data)[0];
          message = error.response.data[firstErrorKey][0];
        }
      }
      return {
        success: false,
        message
      };
    }
  };


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