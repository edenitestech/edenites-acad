import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthProvider } from './contexts/AuthContext';
import { CustomThemeProvider } from './ThemeProvider';
import { GlobalStyles } from './GlobalStyles';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <CustomThemeProvider>
        <GlobalStyles />
        <App />
      </CustomThemeProvider>
    </AuthProvider>
  </React.StrictMode>
);