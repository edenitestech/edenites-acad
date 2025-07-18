import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import styled from 'styled-components';
import { LoadingSpinner } from '../components/UI/LoadingSpinner';
import api from '../services/api';
import { ENROLLED_COURSES, AVAILABLE_COURSES, DASHBOARD_SUMMARY } from '../services/endpoints';
import { 
  FaUserCircle, FaShoppingCart, FaTrash, FaPlus, 
  FaChartLine, FaCertificate, FaBook, FaCog 
} from 'react-icons/fa';
import { EditProfileForm } from '../components/Dashboard/EditProfileForm';
import { ChangePasswordForm } from '../components/Dashboard/ChangePasswordForm';
import { Link } from 'react-router-dom';

// Styled components
const NavItem = styled(Link)`
  padding: 0.75rem 1rem;
  border-radius: 6px;
  margin-bottom: 0.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  transition: all 0.2s;
  text-decoration: none;
  color: white;
  
  &:hover {
    background: rgba(255,255,255,0.1);
  }
  
  &.active {
    background: #48bb99;
  }
`;

const Section = styled.section`
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
`;

const SummaryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
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

const CourseGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const CourseCard = styled.div`
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0,0,0,0.05);
  transition: transform 0.2s;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 15px rgba(0,0,0,0.1);
  }
`;

const CourseImage = styled.div`
  height: 160px;
  background: linear-gradient(to right, #48bb99 0%, #2b5876 100%);
  position: relative;
`;

const CourseContent = styled.div`
  padding: 1.25rem;
`;

const CourseTitle = styled.h3`
  margin: 0 0 0.5rem;
  font-size: 1.1rem;
`;

const CourseMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
  
  @media (max-width: 480px) {
    flex-direction: column;
    gap: 0.5rem;
    align-items: stretch;
  }
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-weight: 500;
  transition: all 0.2s;
  
  &.primary {
    background: #48bb99;
    color: white;
    
    &:hover {
      background: #3a9c7d;
    }
  }
  
  &.danger {
    background: #e53e3e;
    color: white;
    
    &:hover {
      background: #c53030;
    }
  }
  
  &.outline {
    background: transparent;
    border: 1px solid #48bb99;
    color: #48bb99;
    
    &:hover {
      background: #f0fff9;
    }
  }
`;

// User profile components
const UserProfile = styled.div`
  padding: 1.5rem 0;
  border-bottom: 1px solid rgba(255,255,255,0.1);
  text-align: center;
`;

const Avatar = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: #48bb99;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  font-size: 2rem;
  margin: 0 auto 1rem;
`;

const UserName = styled.div`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
`;

const UserEmail = styled.div`
  font-size: 0.9rem;
  color: #a0aec0;
`;

const Dashboard = () => {
  const { currentUser, isLoading: authLoading, logout, refreshUser } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [courses, setCourses] = useState([]);
  const [availableCourses, setAvailableCourses] = useState([]);
  const [dashboardSummary, setDashboardSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!currentUser) return;
      
      try {
        setLoading(true);
        setError(null);

        // Fetch dashboard summary
        const summaryResponse = await api.get(DASHBOARD_SUMMARY);
        setDashboardSummary(summaryResponse.data);
        
        // Fetch enrolled courses
        const enrolledResponse = await api.get(ENROLLED_COURSES);
        setCourses(enrolledResponse.data.results || enrolledResponse.data);
        
        // Fetch available courses
        const availableResponse = await api.get(AVAILABLE_COURSES);
        setAvailableCourses(availableResponse.data.results || availableResponse.data);
        
      } catch (err) {
        console.error('Failed to fetch dashboard data:', err);
        setError(err.response?.data?.message || 'Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };
    
    fetchDashboardData();
  }, [currentUser]);

  const handleRemoveCourse = async (courseId) => {
    try {
      await api.delete(`/courses/${courseId}/unenroll/`);
      setCourses(prev => prev.filter(course => course.id !== courseId));
      
      // Update dashboard summary
      setDashboardSummary(prev => ({
        ...prev,
        enrolled_courses: prev.enrolled_courses - 1
      }));
    } catch (err) {
      console.error('Failed to remove course:', err);
      setError(err.response?.data?.message || 'Failed to unenroll from course');
    }
  };

  const handleEnrollCourse = async (courseId) => {
    try {
      await api.post(`/courses/${courseId}/enroll/`);
      
      // Refresh both course lists after enrollment
      const [enrolledResponse, availableResponse] = await Promise.all([
        api.get(ENROLLED_COURSES),
        api.get(AVAILABLE_COURSES)
      ]);
      
      setCourses(enrolledResponse.data.results || enrolledResponse.data);
      setAvailableCourses(availableResponse.data.results || availableResponse.data);
      
      // Update dashboard summary
      setDashboardSummary(prev => ({
        ...prev,
        enrolled_courses: prev.enrolled_courses + 1
      }));
      
    } catch (err) {
      console.error('Failed to enroll:', err);
      setError(err.response?.data?.message || 'Failed to enroll in course');
    }
  };


  // Add this function to handle tab changes
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    // Update URL without reloading
    window.history.pushState({}, '', `/dashboard/${tab === 'dashboard' ? '' : tab}`);
  };

  const handleProfileUpdate = async (updatedData) => {
    try {
      const response = await api.put('/auth/profile/', updatedData);
      refreshUser(response.data);
      return true;
    } catch (err) {
      console.error('Failed to update profile:', err);
      setError(err.response?.data?.message || 'Failed to update profile');
      return false;
    }
  };

  const handlePasswordChange = async (passwords) => {
    try {
      await api.post('/auth/password/change/', passwords);
      return true;
    } catch (err) {
      console.error('Failed to change password:', err);
      setError(err.response?.data?.message || 'Failed to change password');
      return false;
    }
  };

  if (authLoading || loading) {
    return <LoadingSpinner type="page" />;
  }

  return (
    <>
      {/* Sidebar has been moved to DashboardLayout */}
      
      {/* Main Content */}
      <div>
        {activeTab === 'dashboard' && dashboardSummary && (
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
              
              {dashboardSummary.recent_activity && dashboardSummary.recent_activity.length > 0 ? (
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
        
        {activeTab === 'my-courses' && (
          <Section>
            <SectionHeader>
              <h2>My Learning</h2>
            </SectionHeader>
            
            {courses.length > 0 ? (
              <CourseGrid>
                {courses.map(course => (
                  <CourseCard key={course.id}>
                    <CourseImage />
                    <CourseContent>
                      <CourseTitle>{course.title}</CourseTitle>
                      <p>Instructor: {course.instructor}</p>
                      <div>
                        <p>Progress: {course.progress}%</p>
                        <div style={{
                          height: '6px', 
                          background: '#e0e0e0', 
                          borderRadius: '3px',
                          margin: '10px 0'
                        }}>
                          <div style={{
                            width: `${course.progress}%`,
                            height: '100%',
                            background: '#48bb99',
                            borderRadius: '3px'
                          }}></div>
                        </div>
                      </div>
                      <CourseMeta>
                        <Button 
                          className="primary"
                          as={Link}
                          to={`/courses/${course.id}`}
                        >
                          Continue
                        </Button>
                        <Button 
                          className="danger"
                          onClick={() => handleRemoveCourse(course.id)}
                        >
                          <FaTrash /> Remove
                        </Button>
                      </CourseMeta>
                    </CourseContent>
                  </CourseCard>
                ))}
              </CourseGrid>
            ) : (
              <div style={{ textAlign: 'center', padding: '2rem' }}>
                <p>You haven't enrolled in any courses yet.</p>
                <Button 
                  className="primary"
                  onClick={() => setActiveTab('browse')}
                >
                  Browse Courses
                </Button>
              </div>
            )}
          </Section>
        )}
        
        {activeTab === 'browse' && (
          <Section>
            <SectionHeader>
              <h2>Available Courses</h2>
            </SectionHeader>
            
            {availableCourses.length > 0 ? (
              <CourseGrid>
                {availableCourses.map(course => (
                  <CourseCard key={course.id}>
                    <CourseImage />
                    <CourseContent>
                      <CourseTitle>{course.title}</CourseTitle>
                      <p>Instructor: {course.instructor}</p>
                      <p>Price: ${course.price}</p>
                      <CourseMeta>
                        <Button 
                          className="primary"
                          onClick={() => handleEnrollCourse(course.id)}
                        >
                          <FaPlus /> Enroll Now
                        </Button>
                        <Button 
                          className="outline"
                          as={Link}
                          to={`/courses/${course.id}`}
                        >
                          View Details
                        </Button>
                      </CourseMeta>
                    </CourseContent>
                  </CourseCard>
                ))}
              </CourseGrid>
            ) : (
              <p>No available courses at the moment.</p>
            )}
          </Section>
        )}
        
        {activeTab === 'account' && (
          <>
            <Section>
              <SectionHeader>
                <h2>Edit Profile</h2>
              </SectionHeader>
              <EditProfileForm 
                currentUser={currentUser} 
                onUpdate={handleProfileUpdate} 
              />
            </Section>
            
            <Section>
              <SectionHeader>
                <h2>Change Password</h2>
              </SectionHeader>
              <ChangePasswordForm onChange={handlePasswordChange} />
            </Section>
          </>
        )}

        {activeTab === 'account' && (
          <>
            <Section>
              <SectionHeader>
                <h2>Edit Profile</h2>
              </SectionHeader>
              <EditProfileForm 
                currentUser={currentUser} 
                onUpdate={handleProfileUpdate} 
              />
            </Section>
            
            <Section>
              <SectionHeader>
                <h2>Change Password</h2>
              </SectionHeader>
              <ChangePasswordForm onChange={handlePasswordChange} />
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
    </>
  );
};
export default Dashboard;