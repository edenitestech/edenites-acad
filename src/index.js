// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthProvider } from './contexts/AuthContext';
import { CustomThemeProvider } from './ThemeProvider';
import { GlobalStyles } from './GlobalStyles';
import { ErrorBoundary } from './components/ErrorBoundary'; // Import ErrorBoundary

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ErrorBoundary> {/* Wrap entire app with ErrorBoundary */}
      <AuthProvider>
        <CustomThemeProvider>
          <GlobalStyles />
          <App />
        </CustomThemeProvider>
      </AuthProvider>
    </ErrorBoundary>
  </React.StrictMode>
);