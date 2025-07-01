import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const PreloaderContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to right, #2b5876, #4e4376);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  animation: ${fadeIn} 0.5s ease;
`;

const Logo = styled.div`
  font-size: 2.5rem;
  color: white;
  font-weight: bold;
  margin-bottom: 2rem;
`;

const Loader = styled.div`
  width: 80px;
  height: 4px;
  background: rgba(255, 255, 255, 0.2);
  position: relative;
  overflow: hidden;
  border-radius: 2px;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 40%;
    background: white;
    animation: loading 1.5s infinite ease-in-out;
    border-radius: 2px;
  }

  @keyframes loading {
    0% { left: -40%; }
    100% { left: 140%; }
  }
`;

export const Preloader = () => (
  <PreloaderContainer>
    <Logo>Edenites Academy</Logo>
    <Loader />
  </PreloaderContainer>
);