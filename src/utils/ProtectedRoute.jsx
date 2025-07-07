// src/utils/ProtectedRoute.jsx
import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { LoadingSpinner } from '../components/UI/LoadingSpinner';

const ProtectedRoute = ({ children }) => {
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

  if (isLoading || showLoader) {
    return <LoadingSpinner type="page" />;
  }

  return currentUser ? children : null;
};

export default ProtectedRoute;