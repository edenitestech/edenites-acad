// src/pages/Dashboard/Dashboard.jsx
import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import styled from 'styled-components';
import api from '../../services/api';
import { DASHBOARD_SUMMARY } from '../../services/endpoints';
import { 
  Section,
  SectionHeader,
  Button,
  CourseGrid,
  CourseCard,
  CourseImage,
  CourseContent,
  CourseTitle,
  CourseMeta,
  SkeletonCard,
  SkeletonCourseGrid,
  SkeletonCourseCard,
  LoadingSpinnerContainer
} from '../../styles/DashboardStyles';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { FaBook, FaCertificate, FaChartLine, FaUserCircle } from 'react-icons/fa';

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

const Dashboard = () => {
  const { currentUser } = useAuth();
  const [dashboardSummary, setDashboardSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
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
      <div>
        <Section>
          <SectionHeader>
            <Skeleton width={200} height={30} />
          </SectionHeader>
          
          <SummaryGrid>
            {[...Array(4)].map((_, i) => (
              <SummaryCard key={i}>
                <SummaryTitle>
                  <Skeleton width={120} />
                </SummaryTitle>
                <SummaryValue>
                  <Skeleton width={80} height={40} />
                </SummaryValue>
              </SummaryCard>
            ))}
          </SummaryGrid>
        </Section>
        
        <Section>
          <SectionHeader>
            <Skeleton width={150} height={30} />
            <Skeleton width={100} height={36} />
          </SectionHeader>
          
          {[...Array(3)].map((_, i) => (
            <div key={i} style={{ 
              padding: '1rem', 
              borderBottom: '1px solid #e2e8f0',
              display: 'flex',
              alignItems: 'center',
              gap: '1rem'
            }}>
              <Skeleton circle width={40} height={40} />
              <div style={{ flex: 1 }}>
                <Skeleton width="80%" />
                <Skeleton width="60%" height={12} />
              </div>
            </div>
          ))}
        </Section>
      </div>
    );
  }

  return (
    <div>
      {dashboardSummary && (
        <>
          <Section>
            <SectionHeader>
              <h2>Learning Summary</h2>
            </SectionHeader>
            
            <SummaryGrid>
              <SummaryCard>
                <SummaryTitle><FaBook /> Enrolled Courses</SummaryTitle>
                <SummaryValue>{dashboardSummary.enrolled_courses}</SummaryValue>
              </SummaryCard>
              
              <SummaryCard>
                <SummaryTitle><FaCertificate /> Certificates</SummaryTitle>
                <SummaryValue>{dashboardSummary.certificates}</SummaryValue>
              </SummaryCard>
              
              <SummaryCard>
                <SummaryTitle><FaChartLine /> Average Progress</SummaryTitle>
                <SummaryValue>{dashboardSummary.average_progress}%</SummaryValue>
              </SummaryCard>
              
              <SummaryCard>
                <SummaryTitle><FaUserCircle /> Learning Streak</SummaryTitle>
                <SummaryValue>{dashboardSummary.learning_streak} days</SummaryValue>
              </SummaryCard>
            </SummaryGrid>
          </Section>
          
          <Section>
            <SectionHeader>
              <h2>Recent Activity</h2>
              <Button className="outline">View All</Button>
            </SectionHeader>
            
            {dashboardSummary.recent_activity?.length > 0 ? (
              <div>
                {dashboardSummary.recent_activity.map((activity, index) => (
                  <div key={index} style={{ 
                    padding: '1rem', 
                    borderBottom: '1px solid #e2e8f0',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem'
                  }}>
                    <div style={{ 
                      width: '40px', 
                      height: '40px', 
                      borderRadius: '50%', 
                      background: '#48bb99',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white'
                    }}>
                      {activity.icon}
                    </div>
                    <div>
                      <p style={{ margin: 0 }}>{activity.description}</p>
                      <small style={{ color: '#718096' }}>{activity.timestamp}</small>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p>No recent activity</p>
            )}
          </Section>
        </>
      )}
      
      {error && (
        <Section>
          <div style={{ color: '#e53e3e', padding: '1rem' }}>
            {error}
          </div>
        </Section>
      )}
    </div>
  );
};

export default Dashboard;