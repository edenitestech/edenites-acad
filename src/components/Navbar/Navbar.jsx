import React, { useState, useEffect } from 'react';
import { FaUserGraduate, FaBars, FaTimes, FaUserCircle } from 'react-icons/fa';
import { useAuth } from '../../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import Logo from '../../assets/images/eden-acada logo.png';

// Styles
const shimmer = keyframes`
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
`;

const Nav = styled.nav`
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
  z-index: 1000;
  overflow: hidden;
  font-family: ${({ theme }) => theme.fonts.primary};

  &.scrolled {
    background: white;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    height: 70px;
    
    a, .user-greeting {
      color: #2b5876;
    }
    
    .mobile-icon {
      color: #2b5876;
    }
    
    .shimmer-overlay {
      animation: none;
      background: transparent;
    }

    .logo-img {
      height: 35px;
    }
  }
`;

const NavContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80px;
  z-index: 1;
  width: 100%;
  padding: 1rem 2rem;
  max-width: 1200px;
`;

const NavLogo = styled(Link)`
  justify-self: flex-start;
  cursor: pointer;
  display: flex;
  align-items: center;
  margin-left: 4px;
  text-decoration: none;
  height: 100%;
`;

const LogoImage = styled.img`
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

const MobileIcon = styled.div`
  display: none;
  
  @media screen and (max-width: 950px) {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-100%, 60%);
    font-size: 1.8rem;
    cursor: pointer;
    color: #1f2220;
  }
`;

const NavContent = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  flex-grow: 1;
  justify-content: flex-end;

  @media screen and (max-width: 950px) {
    display: none;
  }
`;

const NavMenu = styled.ul`
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

const NavItem = styled.li`
  height: auto;
  margin: 0.5rem 0;
`;

const NavLink = styled(Link)`
  color: #1f2220;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 1rem;
  height: 100%;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: ${({ theme }) => theme.fonts.primary};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  
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

const AuthButtons = styled.div`
  display: flex;
  gap: 1rem;
  margin-left: 1rem;
`;

const NavBtnLink = styled.button`
  border-radius: 50px;
  background: linear-gradient(125deg,rgba(76, 175, 79, 0.84), cornsilk, rgba(43, 88, 118, 0.75));
  white-space: nowrap;
  padding: 10px 22px;
  color: #1f2220;
  font-size: 1rem;
  font-weight: 700;
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

const UserMenu = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const UserGreeting = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: white;
  font-weight: 500;
`;

const MobileMenuWrapper = styled.div`
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

const MobileMenu = styled.ul`
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

const CloseIcon = styled.div`
  position: absolute;
  top: 1rem;
  right: 1.5rem;
  font-size: 1.8rem;
  cursor: pointer;
  color: #1f2220;
  z-index: 11;
  display: none;
  
  @media screen and (max-width: 950px) {
    display: block;
  }
`;

const MobileMenuOverlay = styled.div`
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

const MobileLogo = styled(Link)`
  display: none;
  
  @media screen and (max-width: 950px) {
    display: flex;
    justify-content: center;
    padding: 1rem 0;
    margin-bottom: 1rem;
  }
`;

const ShimmerOverlay = styled.div`
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

// Component
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const closeMobileMenu = () => setIsOpen(false);

  return (
    <Nav className={scrolled ? 'scrolled' : ''}>
      <NavContainer>
        <NavLogo to="/">
          <LogoImage src={Logo} alt="Edenites Academy Logo" className="logo-img" />
        </NavLogo>
        
        <MobileIcon onClick={() => setIsOpen(!isOpen)} className="mobile-icon">
          <FaBars size={24} />
        </MobileIcon>

        <NavContent>
          <NavMenu>
            <NavItem>
              <NavLink to="/">Home</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/courses">Courses</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/about">About</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/contact">Contact</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/faq">FAQs</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/blog">Blog</NavLink>
            </NavItem>
          </NavMenu>
          
          {currentUser ? (
            <UserMenu>
              <UserGreeting className="user-greeting">
                <FaUserCircle size={20} />
                <span>Hi, {currentUser.name}</span>
              </UserGreeting>
              <NavBtnLink onClick={handleLogout}>
                Logout
              </NavBtnLink>
            </UserMenu>
          ) : (
            <AuthButtons>
              <NavBtnLink as={Link} to="/login">Login</NavBtnLink>
              <NavBtnLink as={Link} to="/signup">Sign Up</NavBtnLink>
            </AuthButtons>
          )}
        </NavContent>
      </NavContainer>
      
      <MobileMenuOverlay isOpen={isOpen} onClick={() => setIsOpen(false)} />
      <MobileMenuWrapper isOpen={isOpen}>
        <CloseIcon onClick={() => setIsOpen(false)}>
          <FaTimes size={24} />
        </CloseIcon>
        
        <MobileLogo to="/" onClick={closeMobileMenu}>
          <LogoImage src={Logo} alt="Edenites Academy Logo" />
        </MobileLogo>
        
        <MobileMenu isOpen={isOpen}>
          <NavItem>
            <NavLink to="/" onClick={closeMobileMenu}>Home</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/courses" onClick={closeMobileMenu}>Courses</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/about" onClick={closeMobileMenu}>About</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/contact" onClick={closeMobileMenu}>Contact</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/faq" onClick={closeMobileMenu}>FAQs</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/blog" onClick={closeMobileMenu}>Blog</NavLink>
          </NavItem>
          
          {currentUser ? (
            <>
              <NavItem>
                <NavLink to="/dashboard" onClick={closeMobileMenu}>Dashboard</NavLink>
              </NavItem>
              <NavItem>
                <NavBtnLink onClick={handleLogout}>
                  Logout
                </NavBtnLink>
              </NavItem>
            </>
          ) : (
            <>
              <NavItem>
                <NavBtnLink as={Link} to="/login" onClick={closeMobileMenu}>
                  Login
                </NavBtnLink>
              </NavItem>
              <NavItem>
                <NavBtnLink as={Link} to="/signup" onClick={closeMobileMenu}>
                  Sign Up
                </NavBtnLink>
              </NavItem>
            </>
          )}
        </MobileMenu>
      </MobileMenuWrapper>
      
      <ShimmerOverlay className="shimmer-overlay" />
    </Nav>
  );
};

export default Navbar;