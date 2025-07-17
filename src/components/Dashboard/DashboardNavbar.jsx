import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Logo from '../../assets/images/eden-acada logo.png';

const Nav = styled.nav`
  background: white;
  height: 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  z-index: 100;
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
`;

const Avatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #48bb99;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
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
  // In a real app, you'd get this from context
  const currentUser = {
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com"
  };

  const initials = `${currentUser.firstName.charAt(0)}${currentUser.lastName.charAt(0)}`;
  
  return (
    <Nav>
      <NavLogo to="/dashboard">
        <LogoImage src={Logo} alt="Edenites Academy Logo" />
      </NavLogo>
      
      <UserProfile>
        <Avatar>{initials}</Avatar>
        <UserInfo>
          <UserName>{currentUser.firstName} {currentUser.lastName}</UserName>
          <UserEmail>{currentUser.email}</UserEmail>
        </UserInfo>
      </UserProfile>
    </Nav>
  );
};
export default DashboardNavbar;