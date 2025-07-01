// src/layouts/AuthLayout.jsx
import styled from 'styled-components';
import { Navbar } from '../components/Navbar';
import { LoadingSpinner } from '../components/UI/LoadingSpinner';

const AuthLayoutContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: linear-gradient(135deg, #f5f7fa 0%, #e4e8eb 100%);
`;

const AuthMain = styled.main`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  position: relative;
`;

const BackgroundPattern = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: radial-gradient(rgba(43, 88, 118, 0.1) 1px, transparent 1px);
  background-size: 20px 20px;
  z-index: 0;
`;

const AuthContent = styled.div`
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 500px;
`;

export const AuthLayout = ({ children, loading = false }) => (
  <AuthLayoutContainer>
    <Navbar authVersion />
    <AuthMain>
      <BackgroundPattern />
      <AuthContent>
        {loading ? <LoadingSpinner type="page" /> : children}
      </AuthContent>
    </AuthMain>
  </AuthLayoutContainer>
);