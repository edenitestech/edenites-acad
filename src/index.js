import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from 'styled-components';
import theme from './theme';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </AuthProvider>
  </React.StrictMode>
);

// Some images used for the Hero section before
// const images = [
//     "https://images.unsplash.com/photo-1584697964358-3e14ca57658b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", // CBT Exams
//     "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", // IT & Software
//     "https://images.unsplash.com/photo-1604671805441-1c7f8a7e8a2e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", // Leather Crafting
//     "https://images.unsplash.com/photo-1539109136881-3be0616ac5b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", // Fashion Design
//     "https://images.unsplash.com/photo-1543269865-cbf427effbad?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",  // Self Development
//     "https://img.freepik.com/free-photo/front-view-male-holding-smartphone-taking-test_23-2150162580.jpg",
//     "https://img.freepik.com/free-photo/it-engineer-checking-servers-datacenter_23-2149373931.jpg",
//     "https://img.freepik.com/free-photo/fashion-designer-working-studio_23-2149091149.jpg",
//     "https://img.freepik.com/free-photo/craftsman-working-leather-purse_23-2148669725.jpg"
//   ];