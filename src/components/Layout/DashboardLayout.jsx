// src/components/Layout/DashboardLayout.jsx
import { Outlet, useLocation, Link } from 'react-router-dom';
import styled from 'styled-components';
import { 
  FaChartLine, 
  FaBook, 
  FaSearch, 
  FaCog, 
  FaUserCircle,
  FaSignOutAlt
} from 'react-icons/fa';
import { useAuth } from '../../contexts/AuthContext';
import { useState, useEffect } from 'react';

// Styled Components
const DashboardContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: #f5f7fa;
`;

const Sidebar = styled.aside`
  width: 280px;
  background: linear-gradient(135deg, #2b5876 0%, #4e4376 100%);
  color: white;
  padding: 1.5rem 1rem;
  position: sticky;
  top: 0;
  height: 100vh;
  overflow-y: auto;
  
  @media (max-width: 768px) {
    width: 80px;
    padding: 1rem 0.5rem;
  }
`;

const MainContent = styled.main`
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
  
  @media (max-width: 768px) {
    width: 50px;
    height: 50px;
    font-size: 1.25rem;
  }
`;

const UserName = styled.div`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const UserEmail = styled.div`
  font-size: 0.9rem;
  color: #a0aec0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  
  @media (max-width: 768px) {
    display: none;
  }
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
      <Sidebar>
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
      </Sidebar>
      
      <MainContent>
        <Outlet />
      </MainContent>
    </DashboardContainer>
  );
};

export default DashboardLayout;