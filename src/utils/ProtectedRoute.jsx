
// src/utils/ProtectedRoute.js
import { useEffect, useState } from 'react';
import { Navigate, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {  } from 'react-router-dom';
import { LoadingSpinner } from '../components/UI/LoadingSpinner';

const ProtectedRoute = () => {
  const { currentUser, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    if (!isLoading && !currentUser) {
      navigate('/login', { state: { from: location } });
    }
  }, [currentUser, isLoading, navigate, location]);

  useEffect(() => {
    const timer = setTimeout(() => setShowLoader(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingSpinner type="page" />;
  }

  return currentUser ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;

