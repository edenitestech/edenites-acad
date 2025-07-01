import { FaUserGraduate, FaBars, FaTimes, FaUserCircle } from 'react-icons/fa';
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import * as S from './NavbarStyles';
import Logo from '../../assets/images/eden-acada logo.png';

export const Navbar = () => {
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
    <S.Nav className={scrolled ? 'scrolled' : ''}>
       <S.NavContainer>
        <S.NavLogo to="/">
          <S.LogoImage src={Logo} alt="Edenites Academy Logo" />
        </S.NavLogo>
        
        <S.MobileIcon onClick={() => setIsOpen(!isOpen)}>
          <FaBars size={24} />
        </S.MobileIcon>

        <S.NavContent>
          <S.NavMenu>
            <S.NavItem>
              <S.NavLink to="/">Home</S.NavLink>
            </S.NavItem>
            <S.NavItem>
              <S.NavLink to="/courses">Courses</S.NavLink>
            </S.NavItem>
            <S.NavItem>
              <S.NavLink to="/about">About</S.NavLink>
            </S.NavItem>
            <S.NavItem>
              <S.NavLink to="/contact">Contact</S.NavLink>
            </S.NavItem>
          </S.NavMenu>
          
          {currentUser ? (
            <S.UserMenu>
              <S.UserGreeting>
                <FaUserCircle size={20} />
                <span>Hi, {currentUser.name}</span>
              </S.UserGreeting>
              <S.NavBtnLink onClick={handleLogout}>
                Logout
              </S.NavBtnLink>
            </S.UserMenu>
          ) : (
            <S.AuthButtons>
              <S.NavBtnLink as={Link} to="/login">Login</S.NavBtnLink>
              <S.NavBtnLink as={Link} to="/signup">Sign Up</S.NavBtnLink>
            </S.AuthButtons>
          )}
        </S.NavContent>
      </S.NavContainer>
      
      <S.MobileMenuOverlay isOpen={isOpen} onClick={() => setIsOpen(false)} />
      <S.MobileMenuWrapper isOpen={isOpen}>
        <S.CloseIcon onClick={() => setIsOpen(false)}>
          <FaTimes size={24} />
        </S.CloseIcon>
        
        <S.MobileLogo to="/" onClick={closeMobileMenu}>
          <S.LogoImage src={Logo} alt="Edenites Academy Logo" />
        </S.MobileLogo>
        
        <S.MobileMenu isOpen={isOpen}>
          <S.NavItem>
            <S.NavLink to="/" onClick={closeMobileMenu}>Home</S.NavLink>
          </S.NavItem>
          <S.NavItem>
            <S.NavLink to="/courses" onClick={closeMobileMenu}>Courses</S.NavLink>
          </S.NavItem>
          <S.NavItem>
            <S.NavLink to="/about" onClick={closeMobileMenu}>About</S.NavLink>
          </S.NavItem>
          <S.NavItem>
            <S.NavLink to="/contact" onClick={closeMobileMenu}>Contact</S.NavLink>
          </S.NavItem>
          
          {currentUser ? (
            <>
              <S.NavItem>
                <S.NavLink to="/dashboard" onClick={closeMobileMenu}>Dashboard</S.NavLink>
              </S.NavItem>
              <S.NavItem>
                <S.NavBtnLink onClick={handleLogout}>
                  Logout
                </S.NavBtnLink>
              </S.NavItem>
            </>
          ) : (
            <>
              <S.NavItem>
                <S.NavBtnLink as={Link} to="/login" onClick={closeMobileMenu}>
                  Login
                </S.NavBtnLink>
              </S.NavItem>
              <S.NavItem>
                <S.NavBtnLink as={Link} to="/signup" onClick={closeMobileMenu}>
                  Sign Up
                </S.NavBtnLink>
              </S.NavItem>
            </>
          )}
        </S.MobileMenu>
      </S.MobileMenuWrapper>
      
      <S.ShimmerOverlay />
    </S.Nav>
  );
};