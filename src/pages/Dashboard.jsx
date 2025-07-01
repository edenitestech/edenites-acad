// src/pages/Dashboard.jsx
import { useAuth } from '../contexts/AuthContext';
import styled from 'styled-components';
import { LoadingSpinner } from '../components/UI/LoadingSpinner';

const DashboardContainer = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  animation: fadeIn 0.5s ease-out;

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

const WelcomeMessage = styled.h1`
  color: #2b5876;
  font-size: 2rem;
  margin-bottom: 1.5rem;
  position: relative;
  display: inline-block;

  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 0;
    width: 50px;
    height: 4px;
    background: #48bb99;
    border-radius: 2px;
  }
`;

const DashboardSection = styled.section`
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  margin-top: 2rem;
`;

const Dashboard = () => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner type="page" />;
  }

  return (
    <DashboardContainer>
      <WelcomeMessage>Welcome back, {currentUser?.name || 'User'}!</WelcomeMessage>
      <p>This is your personalized dashboard.</p>
      
      <DashboardSection>
        <h2>Your Courses</h2>
        {/* Add dashboard content here */}
      </DashboardSection>
    </DashboardContainer>
  );
};

export default Dashboard;