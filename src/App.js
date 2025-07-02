import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Preloader } from './components/UI/Preloader';

// Layout
import Layout from './components/Layout/Layout';

// Pages
import HomePage from './pages/HomePage';
import FAQPage from './pages/FAQPage';
import BlogPage from './pages/BlogPage';
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

    // Simulate loading assets
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000); // 3 seconds for the preloader

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
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
          <Route path="*" element={<navigate to="/" replace />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;