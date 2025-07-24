// src/App.js
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { ChakraProvider } from '@chakra-ui/react';
import theme from './theme';
import { Preloader } from './components/UI/Preloader';
import Layout from './components/Layout/Layout';
import DashboardLayout from './components/Layout/DashboardLayout';
import HomePage from './pages/HomePage';
import FAQPage from './pages/FAQPage';
import BlogPage from './pages/BlogPage';
import CourseDetailsPage from './pages/CourseDetailsPage';
import CoursesPage from './pages/CoursesPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import Dashboard from './pages/Dashboard/Dashboard';
import MyCourses from './pages/Dashboard/MyCourses';
import BrowseCourses from './pages/Dashboard/BrowseCourses';
import AccountSettings from './pages/Dashboard/AccountSettings';
import CBTExamsPage from './pages/CBTExamsPage';
import JAMBPage from './pages/JAMBPage';
import WAECPage from './pages/WAECPage';
import NECOPage from './pages/NECOPage';
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
    <ChakraProvider theme={theme}>
      <Router>
        <Routes>
          {/* Public routes outside any layout */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
          {/* Public routes with main Layout */}
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/cbt-exams" element={<CBTExamsPage />} />
            <Route path="/courses" element={<CoursesPage />} />
            <Route path="/courses/:courseId" element={<CourseDetailsPage />} />
            <Route path="/exams/jamb" element={<JAMBPage />} />
            <Route path="/exams/waec" element={<WAECPage />} />
            <Route path="/exams/neco" element={<NECOPage />} />
            <Route path="/leather-crafting" element={<LeatherCraftingPage />} />
            <Route path="/fashion-design" element={<FashionDesignPage />} />
            <Route path="/it-software" element={<ITSoftwarePage />} />
          </Route>

          {/* Dashboard routes with DashboardLayout */}
          <Route element={<ProtectedRoute />}>
            <Route element={<DashboardLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/dashboard/courses" element={<MyCourses />} />
              <Route path="/dashboard/browse" element={<BrowseCourses />} />
              <Route path="/dashboard/account" element={<AccountSettings />} />
            </Route>
          </Route>

          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;