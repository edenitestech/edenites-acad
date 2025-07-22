import React, { useState, useEffect } from 'react';
import { FaBars, FaTimes, FaUserCircle } from 'react-icons/fa';
import { Tooltip } from '@chakra-ui/react';
import { useAuth } from '../../contexts/AuthContext';
import ExploreDropdown from '../ExploreDropdown/ExploreDropdown';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Logo from '../../assets/images/eden-acada logo.png';

const Nav = styled.nav`
  background: ${({ scrolled }) => (scrolled ? 'white' : 'transparent')};
  height: 80px;
  margin-bottom: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  position: fixed;
  top: 0;
  width: 100%;
  transition: all 0.3s ease;
  z-index: 1000;
  box-shadow: ${({ scrolled }) => (scrolled ? '0 2px 10px rgba(0,0,0,0.1)' : 'none')};
`;

const NavContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80px;
  z-index: 1;
  width: 100%;
  padding: 0 2rem;
  max-width: 1200px;
  
  @media screen and (max-width: 950px) {
    position: relative;
  }
`;

const NavLogo = styled(Link)`
  justify-self: flex-start;
  cursor: pointer;
  display: flex;
  align-items: center;
  text-decoration: none;
`;



const LogoImage = styled.img`
  height: ${({ scrolled }) => (scrolled ? '40px' : '50px')};
  transition: all 0.3s ease;
`;

const MobileIcon = styled.div`
  display: none;
  
  @media screen and (max-width: 950px) {
    display: block;
    font-size: 1.8rem;
    cursor: pointer;
    color: ${({ scrolled }) => (scrolled ? '#2b5876' : '#3182ce')};
    position: absolute;
    right: 2rem;
    top: 50%;
    transform: translateY(-50%);
  }
`;

const NavMenu = styled.ul`
  display: flex;
  align-items: center;
  list-style: none;
  text-align: center;
  padding: 0;
  margin: 0;
  gap: 1.5rem;
  
  @media screen and (max-width: 950px) {
    display: none;
  }
`;

const NavLink = styled(Link)`
  color: ${({ scrolled }) => (scrolled ? '#2b5876' : '#3182ce')};
  text-decoration: none;
  font-weight: 600;
  padding: 0.5rem 1rem;
  transition: all 0.2s ease;
  position: relative;
  
  &:hover {
    color: #3182ce;
  }
  
  &:after {
    content: '';
    position: absolute;
    width: ${({ $isActive }) => ($isActive ? '100%' : '0')};
    height: 2px;
    bottom: 0;
    left: 0;
    background-color: #3182ce;
    transition: width 0.3s ease;
  }
  
  &:hover:after {
    width: 100%;
  }
`;

const AuthButtons = styled.div`
  display: flex;
  gap: 1rem;
  
  @media screen and (max-width: 950px) {
    display: none;
  }
`;

const NavButton = styled.button`
  background: ${({ scrolled }) => (scrolled ? '#3182ce' : 'white')};
  color: ${({ scrolled }) => (scrolled ? 'white' : '#3182ce')};
  border: none;
  border-radius: 50px;
  padding: 0.5rem 1.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: #2b6cb0;
    color: white;
    transform: translateY(-2px);
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  }
`;

const MobileMenu = styled.div`
  display: none;
  
  @media screen and (max-width: 950px) {
    display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
    flex-direction: column;
    position: fixed;
    top: 80px;
    right: 0;
    width: 70%;
    height: calc(100vh - 80px);
    background: white;
    padding: 2rem;
    box-shadow: -5px 5px 10px rgba(0,0,0,0.1);
    gap: 1rem;
    z-index: 999;
    transform: ${({ isOpen }) => isOpen ? 'translateX(0)' : 'translateX(100%)'};
    transition: transform 0.3s ease;
  }
`;

const MobileAuthButtons = styled.div`
  display: none;
  
  @media screen and (max-width: 950px) {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-top: 1rem;
  }
`;

const UserProfile = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 8px;
  transition: all 0.2s ease;
  
  &:hover {
    background: rgba(49, 130, 206, 0.1);
  }
  
  .user-info {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  
  .user-name {
    font-weight: 600;
    color: ${({ scrolled }) => (scrolled ? '#2b5876' : '#3182ce')};
  }
  
  .dashboard-text {
    font-size: 0.7rem;
    color: ${({ scrolled }) => (scrolled ? '#4a5568' : '#63b3ed')};
    white-space: nowrap;
  }
`;

const WelcomeText = styled.span`
  font-size: 0.75rem;
  padding-left: 1rem;
  color: #3182ce;
`;

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Nav scrolled={scrolled}>
      <NavContainer>
        <NavLogo to="/">
          <LogoImage src={Logo} alt="Edenites Academy Logo" scrolled={scrolled} />
        </NavLogo>
        

        <MobileIcon onClick={() => setIsOpen(!isOpen)} scrolled={scrolled}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </MobileIcon>


        <NavMenu>
          <li>
            <ExploreDropdown scrolled={scrolled} />
          </li>
          <li>
            <NavLink to="/courses" scrolled={scrolled} $isActive={location.pathname.startsWith('/courses')}>
              Courses
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" scrolled={scrolled} $isActive={location.pathname === '/about'}>
              About
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact" scrolled={scrolled} $isActive={location.pathname.startsWith('/contact')}>
              Contact
            </NavLink>
          </li>
          <li>
            <NavLink to="/faq" scrolled={scrolled} $isActive={location.pathname === '/faq'}>
              FAQs
            </NavLink>
          </li>
          <li>
            <NavLink to="/blog" scrolled={scrolled} $isActive={location.pathname.startsWith('/blog')}>
              Blog
            </NavLink>
          </li>
        </NavMenu>

        {currentUser ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <Tooltip 
              label="Go to your dashboard" 
              placement="bottom" 
              hasArrow 
              bg="blue.500"
              openDelay={500}
            >
              <UserProfile 
                as={Link} 
                to="/dashboard" 
                scrolled={scrolled}
              >
                <FaUserCircle size={24} />
                <div className="user-info">
                  <span className="user-name">
                    {currentUser.firstName || currentUser.fullname?.split(' ')[0] || 'User'}
                  </span>
                  <span className="dashboard-text">Dashboard</span>
                </div>
              </UserProfile>
            </Tooltip>
            
            <AuthButtons>
              <NavButton onClick={handleLogout} scrolled={scrolled}>Logout</NavButton>
            </AuthButtons>
          </div>
        ) : (
          <AuthButtons>
            <NavButton as={Link} to="/login" scrolled={scrolled}>Login</NavButton>
            <NavButton as={Link} to="/signup" scrolled={scrolled}>Sign Up</NavButton>
          </AuthButtons>
        )}
      </NavContainer>

      <MobileMenu isOpen={isOpen}>
        <li> <ExploreDropdown mobile scrolled={scrolled} /></li>
        <NavLink to="/courses" onClick={() => setIsOpen(false)} scrolled={true}>Courses</NavLink>
        <NavLink to="/about" onClick={() => setIsOpen(false)} scrolled={true}>About</NavLink>
        <NavLink to="/contact" onClick={() => setIsOpen(false)} scrolled={true}>Contact</NavLink>
        <NavLink to="/faq" onClick={() => setIsOpen(false)} scrolled={true}>FAQs</NavLink>
        <NavLink to="/blog" onClick={() => setIsOpen(false)} scrolled={true}>Blog</NavLink>
        
        {currentUser ? (
          <>
            <NavLink to="/dashboard" onClick={() => setIsOpen(false)} scrolled={true}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <FaUserCircle style={{ marginRight: '10px' }} />
                Dashboard
              </div>
            </NavLink>
            <WelcomeText>
              Welcome back, {currentUser.firstName || currentUser.fullname?.split(' ')[0] || 'User'}!
            </WelcomeText>
            <MobileAuthButtons>
              <NavButton onClick={handleLogout} scrolled={true}>Logout</NavButton>
            </MobileAuthButtons>
          </>
        ) : (
          <MobileAuthButtons>
            <NavButton as={Link} to="/login" onClick={() => setIsOpen(false)} scrolled={true}>Login</NavButton>
            <NavButton as={Link} to="/signup" onClick={() => setIsOpen(false)} scrolled={true}>Sign Up</NavButton>
          </MobileAuthButtons>
        )}
      </MobileMenu>
    </Nav>
  );
};
export default Navbar;



