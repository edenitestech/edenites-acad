import React, { useState, useEffect } from 'react';
import { CourseCard } from '../components/CourseCard/CourseCard';
import styled from 'styled-components';
import api from '../services/api';
import { COURSES } from '../services/endpoints';


const CoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const response = await api.get(COURSES);
        
        // Handle paginated response structure
        const fetchedCourses = response.data.results || response.data;
        
        if (!Array.isArray(fetchedCourses)) {
          throw new Error('Invalid courses data format');
        }
        
        setCourses(fetchedCourses);
      } catch (err) {
        console.error('Course fetch error:', err);
        setError('Failed to load courses. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) {
    return (
      <Container>
        <Header>
          <Title>All Courses</Title>
          <Description>Loading course catalog...</Description>
        </Header>
        <LoadingContainer>
          <LoadingSpinner />
          <p>Fetching courses...</p>
        </LoadingContainer>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Header>
          <Title>All Courses</Title>
          <Description>We encountered an issue</Description>
        </Header>
        <ErrorMessage>
          <ErrorIcon>⚠️</ErrorIcon>
          <p>{error}</p>
          <RetryButton onClick={() => window.location.reload()}>
            Retry
          </RetryButton>
        </ErrorMessage>
      </Container>
    );
  }

  return (

    <>
      <HeroSection>
          <HeroTitle>All Courses</HeroTitle>
          <HeroDescription>
            Browse our comprehensive catalog of courses designed to boost your skills
          </HeroDescription>
      </HeroSection>
      <Container>

        <Header>
          <Title>All Courses</Title>
          <Description>Browse our comprehensive catalog of courses</Description>
        </Header>
          
        {courses.length === 0 ? (
          <EmptyState>
            <EmptyIcon>📚</EmptyIcon>
            <h3>No courses available yet</h3>
            <p>Check back later for new courses</p>
          </EmptyState>
        ) : (
          <CoursesGrid>
            {courses.map(course => (
              <CourseCard 
                key={course.id} 
                course={{
                  ...course,
                  // Map backend fields to component props
                  category: course.category?.name || 'Uncategorized',
                  rating: course.average_rating || 4.5,
                  reviews: course.review_count || 0,
                  students: course.enrollment_count || 0,
                  // Add any other necessary mappings
                }} 
              />
            ))}
          </CoursesGrid>
        )}
      </Container>
    </>
    
  );
};

// Styled components
const Container = styled.div`
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 1rem;
`;

const HeroSection = styled.section`
  background: linear-gradient(135deg, #3182ce 0%, #2b6cb0 100%);
  color: white;
  padding: 5rem 1rem;
  text-align: center;
  margin-bottom: 3rem;
`;

const HeroTitle = styled.h1`
  font-size: 3rem;
  margin-bottom: 1rem;
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const HeroDescription = styled.p`
  font-size: 1.5rem;
  max-width: 800px;
  margin: 0 auto;
  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
  color: #2d3748;
`;

const Description = styled.p`
  font-size: 1.2rem;
  color: #718096;
  max-width: 700px;
  margin: 0 auto;
`;

const CoursesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 300px;
  gap: 1rem;
  text-align: center;
`;

const LoadingSpinner = styled.div`
  width: 50px;
  height: 50px;
  border: 5px solid #f3f3f3;
  border-top: 5px solid #3182ce;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const ErrorMessage = styled.div`
  text-align: center;
  background: #fff5f5;
  border: 1px solid #fc8181;
  border-radius: 8px;
  padding: 2rem;
  max-width: 600px;
  margin: 0 auto;
`;

const ErrorIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
`;

const RetryButton = styled.button`
  background: #3182ce;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  font-size: 1rem;
  margin-top: 1rem;
  cursor: pointer;
  transition: background 0.3s;
  
  &:hover {
    background: #2b6cb0;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 4rem;
  background: #f8f9fa;
  border-radius: 8px;
  margin: 2rem 0;
`;

const EmptyIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 1rem;
`;

export default CoursesPage;