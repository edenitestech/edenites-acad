// src/components/Layout/DashboardLayout.jsx
import { Outlet, useLocation, Link } from 'react-router-dom';
import DashboardNavbar from '../Dashboard/DashboardNavbar';
import DashboardFooter from '../Dashboard/DashboardFooter'; 
import styled from 'styled-components';
import { 
  FaChartLine, FaBook, FaCog, FaSearch, FaSignOutAlt 
} from 'react-icons/fa';
import { useAuth } from '../../contexts/AuthContext';
import { useState, useEffect } from 'react';

// Styled Components
const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
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
  top: 70px; // Adjusted to account for navbar height
  height: calc(100vh - 70px);
  overflow-y: auto;
  
  @media (max-width: 768px) {
    width: 100%;
    height: auto;
    position: relative;
    top: 0;
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
  font-weight: 600;
  color: white;
  margin-bottom: 0.25rem;
  font-size: 1.1rem;
`;

const UserEmail = styled.div`
  font-size: 0.85rem;
  color: #a0aec0;
`;

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
  
  @media (max-width: 768px) {
    justify-content: center;
    padding: 0.75rem 0;
    
    span {
      display: none;
    }
  }
`;

const LogoutButton = styled.button`
  width: 100%;
  padding: 0.75rem 1rem;
  border-radius: 6px;
  margin-bottom: 0.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  transition: all 0.2s;
  background: none;
  border: none;
  color: white;
  text-align: left;
  
  &:hover {
    background: rgba(255,255,255,0.1);
  }
  
  @media (max-width: 768px) {
    justify-content: center;
    padding: 0.75rem 0;
    
    span {
      display: none;
    }
  }
`;

const DashboardLayout = () => {
  const { currentUser, logout } = useAuth();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('dashboard');

  useEffect(() => {
    const path = location.pathname;
    if (path.includes('/dashboard/courses')) {
      setActiveTab('my-courses');
    } else if (path.includes('/dashboard/browse')) {
      setActiveTab('browse');
    } else if (path.includes('/dashboard/account')) {
      setActiveTab('account');
    } else {
      setActiveTab('dashboard');
    }
  }, [location]);

  const initials = currentUser 
    ? `${currentUser.firstName?.charAt(0) || ''}${currentUser.lastName?.charAt(0) || ''}`
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
            <FaChartLine /> <span>Dashboard</span>
          </NavItem>
          
          <NavItem 
            to="/dashboard/courses"
            className={activeTab === 'my-courses' ? 'active' : ''}
          >
            <FaBook /> <span>My Courses</span>
          </NavItem>
          
          <NavItem 
            to="/dashboard/browse"
            className={activeTab === 'browse' ? 'active' : ''}
          >
            <FaSearch /> <span>Browse Courses</span>
          </NavItem>
          
          <NavItem 
            to="/dashboard/account"
            className={activeTab === 'account' ? 'active' : ''}
          >
            <FaCog /> <span>Account Settings</span>
          </NavItem>
          
          <LogoutButton onClick={logout}>
            <FaSignOutAlt /> <span>Logout</span>
          </LogoutButton>
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