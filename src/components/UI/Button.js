// src/components/UI/Button.js
import styled from 'styled-components';

export const Button = styled.button`
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  border: none;
  background: ${({ primary, danger }) => 
    primary ? '#48bb99' : 
    danger ? '#e53e3e' : '#f0f0f0'};
  color: ${({ primary, danger }) => 
    primary || danger ? 'white' : '#333'};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover {
    background: ${({ primary, danger }) => 
      primary ? '#3a9a7d' : 
      danger ? '#c53030' : '#e0e0e0'};
    transform: translateY(-2px);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;