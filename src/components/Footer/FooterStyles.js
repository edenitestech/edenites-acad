import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const FooterContainer = styled.footer`
  background: linear-gradient(to right, #4CAF50 0%, #2b5876 100%);
  color: white;
  position: relative;
  padding-top: 80px;
`;

export const FooterWave = styled.div`
  position: absolute;
  top: -1px;
  left: 0;
  width: 100%;
  overflow: hidden;
  line-height: 0;
  
  svg {
    position: relative;
    display: block;
    width: calc(100% + 1.3px);
    height: 80px;
  }
`;

export const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem 2rem;
`;

export const FooterMain = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;
  margin-bottom: 3rem;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 2fr;
  }
`;

export const FooterBrand = styled.div`
  max-width: 300px;
`;

export const FooterLogo = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 1rem;
  gap: 0.5rem;
`;

export const FooterLogoImg = styled.img`
  width: 45px;
  height: 45px;
  border-radius: 50%;
  object-fit: cover;

  &:hover {
    cursor: pointer;
    transform: scale(1.1);
    transition: .3s ease-in-out;
  }
`;

export const FooterIcon = styled.div`
  // Keep this as fallback or remove it
  width: 40px;
  height: 40px;
  background: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #2b5876;
  font-weight: bold;
`;

export const FooterText = styled.p`
  opacity: 0.8;
  margin-bottom: 1.5rem;
  line-height: 1.6;
  font-size: 0.95rem;
`;

export const FooterSocials = styled.div`
  display: flex;
  gap: 1rem;
`;

export const SocialLink = styled.a`
  color: white;
  background-color: rgba(255, 255, 255, 0.1);
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: white;
    color: #2b5876;
    transform: translateY(-3px);
  }
`;

export const FooterSections = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 2rem;
`;

export const FooterSection = styled.div`
  margin-bottom: 1rem;
`;

export const FooterTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  position: relative;
  padding-bottom: 0.5rem;
  
  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    width: 45px;
    height: 2px;
    background: #03314f;
  }
`;

export const FooterList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const FooterListItem = styled.li`
  margin-bottom: 0.8rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  a {
    color: rgba(255, 255, 255, 0.7);
    text-decoration: none;
    font-size: 0.9rem;
    transition: all 0.3s ease;
    
    &:hover {
      color: white;
      padding-left: 5px;
    }
  }
  
  svg {
    min-width: 20px;
  }
`;

export const FooterBottom = styled.div`
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
  }
`;

export const FooterCopyright = styled.p`
  font-size: 0.85rem;
  opacity: 0.8;
`;

export const FooterLegal = styled.div`
  display: flex;
  gap: 1.5rem;
  
  a {
    color: rgba(255, 255, 255, 0.6);
    font-size: 0.85rem;
    text-decoration: none;
    transition: color 0.3s ease;
    
    &:hover {
      color: white;
    }
  }
`;

// A gradient background-color I used for the Footer section before
// background: linear-gradient(to right, #2b5876, #4e4376);