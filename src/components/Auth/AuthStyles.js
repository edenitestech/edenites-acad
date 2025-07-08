import styled from 'styled-components';

// Main container styles
export const AuthContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #48bb99 0%, #03314f 100%);
  padding: 1rem;
`;

// Form card styles
export const AuthCard = styled.div`
  width: 100%;
  max-width: 480px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  font-family: ${({ theme }) => theme.fonts.secondary};
`;


// Header section
export const AuthHeader = styled.div`
  background: #2b5876;
  color: white;
  padding: 1rem;
  text-align: center;
  font-family: ${({ theme }) => theme.fonts.primary};
  
  h2 {
    margin: 0;
    font-size: 1.8rem;
    font-weight: ${({ theme }) => theme.fontWeights.semiBold};
  }
  
  p {
    margin: 0.5rem 0 0;
    opacity: 0.9;
    font-size: 0.95rem;
  }
`;

// Form styles
export const AuthForm = styled.form`
  padding: 1rem;
  padding-right: 3rem;
  display: flex;
  flex-direction: column;
  gap: .3rem;
`;

// Input styles
export const AuthInput = styled.input`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #e0e4e8;
  border-radius: 25px;
  font-size: 1rem;
  transition: all 0.3s ease;
  margin-bottom: 2px;
  
  &:focus {
    outline: none;
    border-color: #4CAF50;
    box-shadow: 0 0 0 3px rgba(76, 175, 80, 0.2);
  }
  
  &::placeholder {
    color: #a0aec0;
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