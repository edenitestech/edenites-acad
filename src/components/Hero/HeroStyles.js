// src/components/Hero/styles.js
import styled from 'styled-components';
import { keyframes } from 'styled-components';

const shimmer = keyframes`
  0% { background-position: -1000px 0; }
  100% { background-position: 1000px 0; }
`;

export const HeroContainer = styled.section`
  background: linear-gradient(to right, #2b5876, #4e4376);
  height: 100vh;
  min-height: 600px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
  margin-top: -60px;
  padding-top: 80px;
  
  @media (max-width: 768px) {
    padding-top: 70px;
    margin-top: -70px;
    height: auto;
    min-height: 100vh;
  }
`;

export const HeroContent = styled.div`
  z-index: 3;
  max-width: 1200px;
  width: 90%; 
  position: relative;
  padding: 8px 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  
  @media (max-width: 768px) {
    padding: 8px 16px;
    width: 95%;
  }
`;

export const HeroSearchWrapper = styled.div`
  display: flex;
  width: 100%;
  max-width: 600px;
  margin-bottom: 3rem;
  position: relative;
  
  @media (max-width: 768px) {
    max-width: 90%;
    margin-bottom: 2rem;
  }
`;

export const HeroInput = styled.input`
  width: 100%;
  padding: 18px 24px;
  border-radius: 50px;
  border: none;
  font-size: 1rem;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  
  @media (max-width: 768px) {
    padding: 14px 20px;
    font-size: 0.9rem;
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 5px 25px rgba(0, 0, 0, 0.2);
  }
`;

export const HeroBg = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  opacity: 0.2;
`;

export const VideoBg = styled.video`
  width: 100%;
  height: 100%;
  -o-object-fit: cover;
  object-fit: cover;
`;

export const HeroH1 = styled.h1`
  color: white;
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 800;
  margin-bottom: 1.5rem;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);

  @media screen and (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

export const Highlight = styled.span`
  color: #4CAF50;
  position: relative;
  display: inline-block;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 5px;
    left: 0;
    width: 100%;
    height: 10px;
    background: rgba(246, 211, 101, 0.3);
    z-index: -1;
    border-radius: 4px;
  }
`;

export const HeroP = styled.p`
  color: white;
  font-size: 1.5rem;
  max-width: 600px;
  margin-bottom: 2.5rem;
  text-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);

  @media screen and (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

export const HeroButton = styled.button`
  position: absolute;
  right: 5px;
  top: 5px;
  bottom: 5px;
  width: 50px;
  background: linear-gradient(to right, #4CAF50 0%, #fda085 100%);
  border: none;
  border-radius: 50px;
  color: white;

  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  }
`;

export const HeroStats = styled.div`
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 1.5rem 2rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
    width: 90%;
  }
`;

export const StatItem = styled.div`
  display: flex;
  align-items: center;
  color: white;
  gap: 1rem;
  padding: 0 1rem;
`;

export const StatNumber = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
`;

export const StatLabel = styled.div`
  font-size: 0.9rem;
  opacity: 0.9;
`;

export const StatDivider = styled.div`
  width: 1px;
  height: 40px;
  background: rgba(255, 255, 255, 0.3);
  
  @media (max-width: 768px) {
    width: 80%;
    height: 1px;
  }
`;

export const HeroShimmer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    to right,
    transparent 0%,
    rgba(255, 255, 255, 0.1) 50%,
    transparent 100%
  );
  animation: ${shimmer} 3s linear;
`;