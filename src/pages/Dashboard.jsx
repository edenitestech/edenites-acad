// src/pages/Dashboard.jsx
import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import styled from 'styled-components';
import { LoadingSpinner } from '../components/UI/LoadingSpinner';
import api from '../services/api';
import { FaUserCircle, FaShoppingCart, FaTrash, FaPlus } from 'react-icons/fa';

const DashboardContainer = styled.div`
  display: grid;
  grid-template-columns: 280px 1fr;
  min-height: 100vh;
  background-color: #f5f7fa;
`;

const Sidebar = styled.aside`
  background: linear-gradient(135deg, #2b5876 0%, #4e4376 100%);
  color: white;
  padding: 2rem 1rem;
`;

const MainContent = styled.main`
  padding: 2rem;
  overflow-y: auto;
`;

const UserProfile = styled.div`
  text-align: center;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid rgba(255,255,255,0.1);
  margin-bottom: 1.5rem;
`;

const Avatar = styled.div`
  margin: 0 auto 1rem;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: #48bb99;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
`;

const UserName = styled.h2`
  font-size: 1.5rem;
  margin: 0.5rem 0;
`;

const UserEmail = styled.p`
  color: #a0aec0;
  margin: 0;
`;

const NavItem = styled.div`
  padding: 0.75rem 1rem;
  border-radius: 6px;
  margin-bottom: 0.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  transition: all 0.2s;
  
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
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const CourseGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
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
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 500;
  
  &.primary {
    background: #48bb99;
    color: white;
  }
  
  &.danger {
    background: #e53e3e;
    color: white;
  }
`;

const Dashboard = () => {
  const { currentUser, isLoading: authLoading, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('my-courses');
  const [courses, setCourses] = useState([]);
  const [availableCourses, setAvailableCourses] = useState([]);
  const [loadingCourses, setLoadingCourses] = useState(true); 

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        // In a real app, you'd fetch from your backend API
        // For now, we'll use mock data
        setCourses([
          {
            id: 1,
            title: 'Introduction to Web Development',
            progress: 65,
            instructor: 'John Smith',
            price: 49.99
          },
          {
            id: 2,
            title: 'Advanced JavaScript Concepts',
            progress: 30,
            instructor: 'Sarah Johnson',
            price: 59.99
          },
          {
            id: 3,
            title: 'React Masterclass',
            progress: 0,
            instructor: 'Mike Chen',
            price: 79.99
          }
        ]);
        
        setAvailableCourses([
          {
            id: 4,
            title: 'Python for Data Science',
            instructor: 'Alex Rodriguez',
            price: 89.99
          },
          {
            id: 5,
            title: 'UI/UX Design Principles',
            instructor: 'Emily Wilson',
            price: 69.99
          },
          {
            id: 6,
            title: 'Mobile App Development',
            instructor: 'David Kim',
            price: 99.99
          }
        ]);
      } catch (error) {
        console.error("Failed to fetch courses:", error);
      } finally {
         setLoadingCourses(false);
      }
    };
    
    if (currentUser) {
      fetchCourses();
    }
  }, [currentUser]);

  const handleRemoveCourse = (courseId) => {
    setCourses(courses.filter(course => course.id !== courseId));
  };

  const handleEnrollCourse = (course) => {
    setCourses([...courses, { ...course, progress: 0 }]);
    setAvailableCourses(availableCourses.filter(c => c.id !== course.id));
  };

  if (authLoading || loadingCourses) {
    return <LoadingSpinner type="page" />;
  }

  return (
    <DashboardContainer>
      <Sidebar>
        <UserProfile>
          <Avatar>
            <FaUserCircle />
          </Avatar>
          <UserName>
            {currentUser?.firstName} {currentUser?.lastName}
          </UserName>
          <UserEmail>{currentUser.email}</UserEmail>
        </UserProfile>
        
        <NavItem 
          className={activeTab === 'my-courses' ? 'active' : ''}
          onClick={() => setActiveTab('my-courses')}
        >
          <FaUserCircle /> My Courses
        </NavItem>
        <NavItem 
          className={activeTab === 'browse' ? 'active' : ''}
          onClick={() => setActiveTab('browse')}
        >
          <FaShoppingCart /> Browse Courses
        </NavItem>
        <NavItem onClick={logout}>
          <FaUserCircle /> Logout
        </NavItem>
      </Sidebar>
      
      <MainContent>
        {activeTab === 'my-courses' ? (
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
                          onClick={() => console.log('Continue learning')}
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
              <p>You haven't enrolled in any courses yet.</p>
            )}
          </Section>
        ) : (
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
                          onClick={() => handleEnrollCourse(course)}
                        >
                          <FaPlus /> Enroll Now
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
        
        <Section>
          <SectionHeader>
            <h2>Account Settings</h2>
          </SectionHeader>
          <div>
            <Button onClick={() => console.log('Edit profile')}>
              Edit Profile
            </Button>
            <Button onClick={() => console.log('Change password')}>
              Change Password
            </Button>
            <Button className="danger" onClick={logout}>
              Logout
            </Button>
          </div>
        </Section>
      </MainContent>
    </DashboardContainer>
  );
};

export default Dashboard;