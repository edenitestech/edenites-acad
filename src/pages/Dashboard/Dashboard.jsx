// src/pages/Dashboard/Dashboard.jsx
import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import styled from 'styled-components';
import api from '../../services/api';
import { DASHBOARD_SUMMARY } from '../../services/endpoints';
import { 
  FaBook, 
  FaCertificate, 
  FaChartLine, 
  FaUserCircle,
  FaCheckCircle,
  FaClock,
  FaCommentAlt
} from 'react-icons/fa';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

// Styled Components
const DashboardContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const Section = styled.section`
  margin-bottom: 3rem;
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const SummaryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const SummaryCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  border-top: 4px solid ${props => props.color || '#3182ce'};
`;

const SummaryTitle = styled.h3`
  font-size: 1rem;
  color: #718096;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const SummaryValue = styled.div`
  font-size: 2rem;
  font-weight: bold;
  color: #2d3748;
`;

const ActivityList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ActivityItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border-radius: 8px;
  transition: all 0.2s;
  
  &:hover {
    background: #f8f9fa;
  }
`;

const ActivityIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${props => props.color || '#48bb99'};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  flex-shrink: 0;
`;

const ActivityContent = styled.div`
  flex: 1;
  
  p {
    margin: 0;
    color: #2d3748;
  }
  
  small {
    color: #718096;
    font-size: 0.85rem;
  }
`;

const LoadingSpinner = styled.div`
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-top: 4px solid #3182ce;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  margin: 2rem auto;
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const Dashboard = () => {
  const { currentUser } = useAuth();
  const [dashboardSummary, setDashboardSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const response = await api.get(DASHBOARD_SUMMARY);
        setDashboardSummary(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };
    
    if (currentUser) fetchDashboardData();
  }, [currentUser]);

  if (loading) {
    return (
      <DashboardContainer>
        <Section>
          <SectionHeader>
            <Skeleton width={200} height={30} />
          </SectionHeader>
          <LoadingSpinner />
        </Section>
      </DashboardContainer>
    );
  }

  if (error) {
    return (
      <DashboardContainer>
        <Section>
          <div style={{ color: '#e53e3e', padding: '1rem', textAlign: 'center' }}>
            {error}
            <button 
              onClick={() => window.location.reload()}
              style={{
                marginTop: '1rem',
                padding: '0.5rem 1rem',
                background: '#3182ce',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Retry
            </button>
          </div>
        </Section>
      </DashboardContainer>
    );
  }

  const getActivityIcon = (type) => {
    switch(type) {
      case 'completed':
        return <FaCheckCircle />;
      case 'started':
        return <FaClock />;
      default:
        return <FaCommentAlt />;
    }
  };

  const getActivityColor = (type) => {
    switch(type) {
      case 'completed':
        return '#48bb99';
      case 'started':
        return '#3182ce';
      default:
        return '#805ad5';
    }
  };

  return (
    <DashboardContainer>
      {dashboardSummary && (
        <>
          <Section>
            <SectionHeader>
              <h2>Learning Summary</h2>
            </SectionHeader>
            
            <SummaryGrid>
              <SummaryCard color="#3182ce">
                <SummaryTitle><FaBook /> Enrolled Courses</SummaryTitle>
                <SummaryValue>{dashboardSummary.enrolled_courses || 0}</SummaryValue>
              </SummaryCard>
              
              <SummaryCard color="#48bb99">
                <SummaryTitle><FaCertificate /> Certificates</SummaryTitle>
                <SummaryValue>{dashboardSummary.certificates || 0}</SummaryValue>
              </SummaryCard>
              
              <SummaryCard color="#805ad5">
                <SummaryTitle><FaChartLine /> Average Progress</SummaryTitle>
                <SummaryValue>{dashboardSummary.average_progress || 0}%</SummaryValue>
              </SummaryCard>
              
              <SummaryCard color="#ed8936">
                <SummaryTitle><FaUserCircle /> Learning Streak</SummaryTitle>
                <SummaryValue>{dashboardSummary.learning_streak || 0} days</SummaryValue>
              </SummaryCard>
            </SummaryGrid>
          </Section>
          
          <Section>
            <SectionHeader>
              <h2>Recent Activity</h2>
            </SectionHeader>
            
            {dashboardSummary.recent_activity?.length > 0 ? (
              <ActivityList>
                {dashboardSummary.recent_activity.map((activity, index) => (
                  <ActivityItem key={index}>
                    <ActivityIcon color={getActivityColor(activity.type)}>
                      {getActivityIcon(activity.type)}
                    </ActivityIcon>
                    <ActivityContent>
                      <p>{activity.description}</p>
                      <small>{activity.timestamp}</small>
                    </ActivityContent>
                  </ActivityItem>
                ))}
              </ActivityList>
            ) : (
              <p style={{ textAlign: 'center', color: '#718096' }}>No recent activity</p>
            )}
          </Section>
        </>
      )}
    </DashboardContainer>
  );
};

export default Dashboard;