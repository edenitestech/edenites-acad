// src/components/UI/ButtonSpinner.jsx
import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

export const Spinner = styled.div`
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top: 2px solid white;
  width: 16px;
  height: 16px;
  animation: ${spin} 0.8s linear infinite;
  display: inline-block;
  margin-right: 8px;
`;

export const ButtonSpinner = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    <Spinner />
    <span>Processing...</span>
  </div>
);