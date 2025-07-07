// src/App.js
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'; // Capital "N" in Navigate
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Preloader } from './components/UI/Preloader';
import Layout from './components/Layout/Layout';
import HomePage from './pages/HomePage';
import FAQPage from './pages/FAQPage';
import BlogPage from './pages/BlogPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import Dashboard from './pages/Dashboard';
import CBTExamsPage from './pages/CBTExamsPage';
import JAMBPage from './pages/JAMBPage';
import WAECPage from './pages/WAECPage';
import ITSoftwarePage from './pages/ITSoftwarePage';
import FashionDesignPage from './pages/FashionDesignPage';
import LeatherCraftingPage from './pages/LeatherCraftingPage';
import ProtectedRoute from './utils/ProtectedRoute';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });

    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Preloader />;
  }

  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/blog" element={<BlogPage />} />
           <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/cbt-exams" element={<CBTExamsPage />} />
          <Route path="/exams/jamb" element={<JAMBPage />} />
          <Route path="/exams/waec" element={<WAECPage />} />
          <Route path="/leather-crafting" element={<LeatherCraftingPage />} />
          <Route path="/fashion-design" element={<FashionDesignPage />} />
          <Route path="/it-software" element={<ITSoftwarePage />} />
          
          {/* Protected routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/auth/dashboard/" element={<Dashboard />} />
          </Route>
          
          {/* Single catch-all route at the end */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;