import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';

const shimmer = keyframes`
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
`;

export const NavLogo = styled(Link)`
  justify-self: flex-start;
  cursor: pointer;
  display: flex;
  align-items: center;
  margin-left: 4px;
  text-decoration: none;
  height: 100%;
`;

export const LogoImage = styled.img`
  height: 50px;
  width: auto;
  transition: all 0.3s ease;
  border-radius: 50%;

  &:hover {
    transform: scale(1.05);
    opacity: 0.9;
  }

  @media screen and (max-width: 768px) {
    height: 35px;
  }
`;

export const NavLink = styled(Link)`
  color: white;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 1rem;
  height: 100%;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: ${({ theme }) => theme.fonts.primary};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  
  &:hover {
    transform: translateY(-3px);
    text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
  }
  
  @media screen and (max-width: 950px) {
    width: 100%;
    justify-content: center;
    padding: .5rem;
    
    &:hover {
      transform: none;
    }
  }
`;

export const UserGreeting = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: white;
  font-weight: 500;
`;

export const MobileIcon = styled.div`
  display: none;
  
  @media screen and (max-width: 950px) {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-100%, 60%);
    font-size: 1.8rem;
    cursor: pointer;
    color: white;
  }
`;

export const ShimmerOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.2),
    transparent
  );
  animation: ${shimmer} 2s;
`;


export const Nav = styled.nav`
  background: transparent;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  position: fixed;
  top: 0;
  width: 100%;
  transition: all 0.3s ease;
  z-index: 10;
  overflow: hidden;
  font-family: ${({ theme }) => theme.fonts.primary};

  &.scrolled {
    background: white;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    height: 70px;
    
    ${NavLink}, ${UserGreeting} {
      color: #2b5876;
    }
    
    ${MobileIcon} {
      color: #2b5876;
    }
    
    ${ShimmerOverlay} {
      animation: none;
      background: transparent;
    }

    ${LogoImage} {
      height: 35px; // Slightly smaller when scrolled
    }
  }
`;

export const NavContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80px;
  z-index: 1;
  width: 100%;
  padding: 1rem 2rem;
  max-width: 1200px;
`;

export const NavContent = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  flex-grow: 1;
  justify-content: flex-end;

  @media screen and (max-width: 950px) {
    display: none;
  }
`;

export const AuthButtons = styled.div`
  display: flex;
  gap: 1rem;
  margin-left: 1rem;
`;

export const NavMenu = styled.ul`
  display: flex;
  align-items: center;
  list-style: none;
  text-align: center;
  padding: 0;
  margin: 0;
  gap: 1rem;
  
  @media screen and (max-width: 950px) {
    display: none;
  }
`;


//  Mobile view of the Navbar
export const MobileMenu = styled.ul`
  display: none;
  
  @media screen and (max-width: 950px) {
    display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
    flex-direction: column;
    width: 100%;
    height: 90vh;
    position: absolute;
    list-style: none;
    top: 0;
    left: 0;
    opacity: 1;
    transition: all 0.5s ease;
    background: linear-gradient(135deg, #2b5876 0%, #4e4376 100%);
    padding: 1rem;
  }
`;

export const NavItem = styled.li`
  height: auto;
  margin: 0.5rem 0;
`;

export const NavBtnLink = styled.button`
  border-radius: 50px;
  background: linear-gradient(to right, #4CAF50, #2b5876);
  white-space: nowrap;
  padding: 10px 22px;
  color: white;
  font-size: 1rem;
  font-weight: 600;
  outline: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  text-decoration: none;
  display: block;
  text-align: center;
  width: 100%;
  max-width: 150px;
  margin: 0.5rem auto;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  }

  @media screen and (max-width: 950px) {
    max-width: 50%;
    text-align: center;
  }
`;

export const UserMenu = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;


export const CloseIcon = styled.div`
  position: absolute;
  top: 1rem;
  right: 1.5rem;
  font-size: 1.8rem;
  cursor: pointer;
  color: white;
  z-index: 11;
  display: none;
  
  @media screen and (max-width: 950px) {
    display: block;
  }
`;

export const MobileMenuWrapper = styled.div`
  @media screen and (max-width: 950px) {
    position: fixed;
    top: 0;
    right: ${({ isOpen }) => (isOpen ? '0' : '-100%')};
    width: 80%;
    max-width: 300px;
    height: 100vh;
    background: linear-gradient(135deg, #2b5876 0%, #4e4376 100%);
    z-index: 100;
    transition: right 0.3s ease-in-out;
    overflow-y: auto;
    box-shadow: -5px 0 15px rgba(0, 0, 0, 0.2);
  }
`;

export const MobileLogo = styled(Link)`
  display: none;
  
  @media screen and (max-width: 950px) {
    display: flex;
    justify-content: center;
    padding: 1rem 0;
    margin-bottom: 1rem;
  }
`;

export const MobileMenuOverlay = styled.div`
  display: none;
  
  @media screen and (max-width: 950px) {
    display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 99;
  }
`;
