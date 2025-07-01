// src/components/LoadingSpinner.jsx
import styled, { keyframes } from 'styled-components';

// Animations
const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
`;

const wobble = keyframes`
  0%, 100% { transform: translateX(0%); }
  15% { transform: translateX(-25%) rotate(-5deg); }
  30% { transform: translateX(20%) rotate(3deg); }
  45% { transform: translateX(-15%) rotate(-3deg); }
  60% { transform: translateX(10%) rotate(2deg); }
  75% { transform: translateX(-5%) rotate(-1deg); }
`;

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

// Base spinner
const BaseSpinner = styled.div`
  display: inline-block;
  width: ${props => props.size || '50px'};
  height: ${props => props.size || '50px'};
  border: ${props => props.thickness || '4px'} solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  border-top-color: ${props => props.color || '#2b5876'};
  animation: ${spin} 1s ease-in-out infinite;
`;

// Page transition spinner with skeleton
const PageTransitionSpinner = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.9);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: ${fadeIn} 0.3s ease-out;
`;

const SkeletonCard = styled.div`
  width: 80%;
  max-width: 500px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  padding: 2rem;
  margin-top: 2rem;
  opacity: 0.8;
  animation: ${pulse} 1.5s ease-in-out infinite;
`;

const SkeletonLine = styled.div`
  height: 12px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  border-radius: 4px;
  margin-bottom: 1rem;
  animation: ${pulse} 1.5s ease-in-out infinite;
  width: ${props => props.width || '100%'};
`;

export const LoadingSpinner = ({ type = 'default', size, color, thickness }) => {
  switch (type) {
    case 'page':
      return (
        <PageTransitionSpinner>
          <BaseSpinner size="80px" color="#2b5876" thickness="6px" />
          <SkeletonCard>
            <SkeletonLine width="60%" />
            <SkeletonLine />
            <SkeletonLine width="80%" />
            <SkeletonLine width="70%" />
            <SkeletonLine width="50%" />
          </SkeletonCard>
        </PageTransitionSpinner>
      );
    case 'button':
      return <BaseSpinner size="20px" color="white" thickness="2px" />;
    case 'section':
      return (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '2rem' }}>
          <BaseSpinner size="40px" color="#48bb99" thickness="3px" />
        </div>
      );
    case 'wobble':
      return (
        <div style={{ animation: `${wobble} 1s infinite`, textAlign: 'center' }}>
          <BaseSpinner size={size} color={color} thickness={thickness} />
        </div>
      );
    default:
      return <BaseSpinner size={size} color={color} thickness={thickness} />;
  }
};