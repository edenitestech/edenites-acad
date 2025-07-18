import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Logo from '../../assets/images/eden-acada logo.png';
import { useAuth } from '../../contexts/AuthContext';
import { FaUser } from 'react-icons/fa';

const Nav = styled.nav`
  background: white;
  height: 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  z-index: 100;
  position: sticky;
  top: 0;
`;

const NavLogo = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
`;

const LogoImage = styled.img`
  height: 40px;
`;

const UserProfile = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  cursor: pointer;
`;

const AvatarContainer = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${props => props.color || '#48bb99'};
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  color: white;
  font-weight: bold;
`;

const AvatarImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const UserName = styled.span`
  font-weight: 600;
  font-size: 0.9rem;
`;

const UserEmail = styled.span`
  font-size: 0.8rem;
  color: #718096;
`;

const DashboardNavbar = () => {
  const { currentUser } = useAuth();

  const renderAvatar = () => {
    if (currentUser?.profilePicture) {
      return <AvatarImage src={currentUser.profilePicture} alt="Profile" />;
    }
    
    if (currentUser?.initials) {
      return currentUser.initials;
    }
    
    return <FaUser size={16} />;
  };

  return (
    <Nav>
      <NavLogo to="/">
        <LogoImage src={Logo} alt="Edenites Academy Logo" />
      </NavLogo>
      
      <UserProfile>
        <AvatarContainer>
          {renderAvatar()}
        </AvatarContainer>
        <UserInfo>
          <UserName>
            {currentUser?.firstName} {currentUser?.lastName}
          </UserName>
          <UserEmail>{currentUser?.email}</UserEmail>
        </UserInfo>
      </UserProfile>
    </Nav>
  );
};

export default DashboardNavbar;