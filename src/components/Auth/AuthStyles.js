import styled from 'styled-components';

export const AuthContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f0f2f5;
  padding: 1rem;
`;

export const AuthWrapper = styled.div`
  display: flex;
  width: 100%;
  max-width: 1200px;
  min-height: 80vh;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  overflow: hidden;
  background: white;
`;

export const AuthPromo = styled.div`
  flex: 1;
  background: linear-gradient(125deg, #03314f 74%, #0c9e46 26%);
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  text-align: center;

  @media (max-width: 768px) {
    display: none;
  }
`;

// Form card styles
export const AuthCard = styled.div`
  flex: 1;
  max-width: 600px;
  padding: 1rem 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

// Header section
export const AuthHeader = styled.div`
  text-align: center;
  margin-bottom: 1rem;
  
  h2 {
    color: #2d3748;
    font-size: 2.3rem;
    margin-bottom: 0.5rem;
  }
  
  p {
    color: #718096;
  }
`;

// Form styles
export const AuthForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: .5rem;
`;

// Input styles
export const AuthInput = styled.input`
  width: 100%;
  padding: 14px 16px;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  font-size: 1rem;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #48bb78;
    box-shadow: 0 0 0 3px rgba(72, 187, 120, 0.2);
  }
  
  &::placeholder {
    color: #a0aec0;
  }
`;

// NameFields for signup
export const NameFields = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: .5rem;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;


export const PasswordInputGroup = styled.div`
  position: relative;
  width: 100%;
`;

export const PasswordToggle = styled.span`
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  color: #4a5568;
  font-size: 1rem;
`;

// Button styles
export const AuthButton = styled.button`
  width: 60%;
  padding: 14px;
  background: #4CAF50;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin: 0 auto;
  
  &:hover {
    background: #3d8b40;
    transform: translateY(-1px);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

// Footer styles
export const AuthFooter = styled.div`
  padding: .4rem 2.5rem;
  border-top: 1px solid #edf2f7;
  text-align: center;
  font-size: 0.95rem;
  color: #4a5568;
  
  a {
    color: #2b5876;
    font-weight: 600;
    text-decoration: none;
    margin-left: 0.5rem;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

// Error message styles
export const AuthError = styled.div`
  color: #e53e3e;
  background: #fff5f5;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  font-size: 0.9rem;
  border: 1px solid #fed7d7;
`;

// Password requirements styles
export const PasswordRequirements = styled.div`
  margin: 0.5rem 0;
  font-size: 0.85rem;
  display: grid;
  margin-left: 1rem;
  grid-template-columns: 1fr 1fr;
  gap: 0.3rem .2rem;
`;

export const RequirementItem = styled.div`
  display: flex;
  align-items: center;
  color: ${({ valid }) => valid ? '#38a169' : '#a0aec0'};
  
  svg {
    margin-right: 0.5rem;
    font-size: 0.8rem;
  }
`;

// Remember me checkbox
export const RememberMe = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.9rem;
  color: #4a5568;
  
  input {
    margin-right: 0.5rem;
  }
`;

// Forgot password link
export const ForgotPassword = styled.div`
  text-align: right;
  font-size: 0.9rem;
  
  a {
    color: #2b5876;
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;