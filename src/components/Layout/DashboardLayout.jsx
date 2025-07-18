// src/components/Layout/DashboardLayout.jsx
import { Outlet, useLocation, Link } from 'react-router-dom';
import DashboardNavbar from '../Dashboard/DashboardNavbar';
import DashboardFooter from '../Dashboard/DashboardFooter'; 
import styled from 'styled-components';
import { 
  FaChartLine, FaBook, FaShoppingCart, 
  FaCog, FaUserCircle 
} from 'react-icons/fa';
import { useAuth } from '../../contexts/AuthContext';
import { useState, useEffect } from 'react';

// Styled Components
const DashboardContainer = styled.div`
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  background-color: #f5f7fa;
`;

const DashboardContent = styled.div`
  display: flex;
  flex: 1;
`;

const SidebarContainer = styled.aside`
  width: 280px;
  background: linear-gradient(135deg, #2b5876 0%, #4e4376 100%);
  color: white;
  padding: 1.5rem 1rem;
  position: sticky;
  top: 0;
  height: 100vh;
  overflow-y: auto;
  
  @media (max-width: 768px) {
    width: 100%;
    height: auto;
    position: relative;
  }
`;

const MainContent = styled.div`
  flex: 1;
  padding: 2rem;
  overflow-y: auto;
  
  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

// Sidebar components
const NavItem = styled(Link)`
  padding: 0.75rem 1rem;
  border-radius: 6px;
  margin-bottom: 0.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  transition: all 0.2s;
  text-decoration: none;
  color: white;
  
  &:hover {
    background: rgba(255,255,255,0.1);
  }
  
  &.active {
    background: #48bb99;
  }
`;

const UserProfile = styled.div`
  padding: 1.5rem 0;
  border-bottom: 1px solid rgba(255,255,255,0.1);
  text-align: center;
`;

const Avatar = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: #48bb99;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  font-size: 2rem;
  margin: 0 auto 1rem;
`;

const UserName = styled.div`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
`;

const UserEmail = styled.div`
  font-size: 0.9rem;
  color: #a0aec0;
`;

const DashboardLayout = () => {
  const { currentUser, logout } = useAuth();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('dashboard');

  useEffect(() => {
    // Update active tab when location changes
    if (location.pathname.includes('/dashboard/courses')) {
      setActiveTab('my-courses');
    } else if (location.pathname.includes('/dashboard/browse')) {
      setActiveTab('browse');
    } else if (location.pathname.includes('/dashboard/account')) {
      setActiveTab('account');
    } else {
      setActiveTab('dashboard');
    }
  }, [location]);

  const initials = currentUser 
    ? `${currentUser.firstName.charAt(0)}${currentUser.lastName.charAt(0)}`
    : '';

  return (
    <DashboardContainer>
      <DashboardNavbar />
      <DashboardContent>
        <SidebarContainer>
          <UserProfile>
            <Avatar>{initials}</Avatar>
            <UserName>
              {currentUser?.firstName} {currentUser?.lastName}
            </UserName>
            <UserEmail>{currentUser?.email}</UserEmail>
          </UserProfile>
          
          <NavItem 
            to="/dashboard"
            className={activeTab === 'dashboard' ? 'active' : ''}
          >
            <FaChartLine /> Dashboard
          </NavItem>
          <NavItem 
            to="/dashboard/courses"
            className={activeTab === 'my-courses' ? 'active' : ''}
          >
            <FaBook /> My Courses
          </NavItem>
          <NavItem 
            to="/dashboard/browse"
            className={activeTab === 'browse' ? 'active' : ''}
          >
            <FaShoppingCart /> Browse Courses
          </NavItem>
          <NavItem 
            to="/dashboard/account"
            className={activeTab === 'account' ? 'active' : ''}
          >
            <FaCog /> Account Settings
          </NavItem>
          <NavItem as="button" onClick={logout} style={{ background: 'none', border: 'none', width: '100%' }}>
            <FaUserCircle /> Logout
          </NavItem>
        </SidebarContainer>
        
        <MainContent>
          <Outlet />
        </MainContent>
      </DashboardContent>
      <DashboardFooter />
    </DashboardContainer>
  );
};

export default DashboardLayout;