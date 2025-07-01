import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { LoadingSpinner } from '../components/UI/LoadingSpinner';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const TransitionContainer = styled.div`
  animation: ${fadeIn} 0.3s ease-out;
`;

const PageTransition = ({ children }) => {
  const [displayChildren, setDisplayChildren] = useState(children);
  const [transitionStage, setTransitionStage] = useState('fadeIn');
  const location = useLocation();

  useEffect(() => {
    setTransitionStage('fadeOut');
    const timer = setTimeout(() => {
      setDisplayChildren(children);
      setTransitionStage('fadeIn');
    }, 300);
    return () => clearTimeout(timer);
  }, [children, location.key]);

  return (
    <>
      {transitionStage === 'fadeOut' ? (
        <LoadingSpinner type="page" /> // Use skeleton loader for page transitions
      ) : (
        <TransitionContainer>{displayChildren}</TransitionContainer>
      )}
    </>
  );
};

export default PageTransition;