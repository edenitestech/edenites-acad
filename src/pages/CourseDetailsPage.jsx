import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import api from '../services/api';
import { COURSE_DETAIL, ENROLL_COURSE } from '../services/endpoints';

const CourseDetailsPage = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isEnrolling, setIsEnrolling] = useState(false);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        setLoading(true);
        const response = await api.get(COURSE_DETAIL(courseId));
        
        // Map API response to match your component's expected structure
        const courseData = {
          id: response.data.id,
          category: response.data.category?.name || 'General',
          title: response.data.title,
          description: response.data.description,
          rating: response.data.average_rating || 0,
          reviews: response.data.review_count || 0,
          students: response.data.enrollment_count || 0,
          price: response.data.price,
          originalPrice: response.data.original_price || null,
          content: response.data.modules || ['Course content not available'],
          instructor: {
            name: response.data.instructor?.name || 'Unknown Instructor',
            bio: response.data.instructor?.bio || 'No bio available'
          },
          // Add any other necessary mappings
        };
        
        setCourse(courseData);
      } catch (err) {
        console.error('Failed to fetch course:', err);
        setError(err.response?.data?.message || 'Failed to load course details');
        
        // Redirect to courses page if course not found
        if (err.response?.status === 404) {
          navigate('/courses');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCourseDetails();
  }, [courseId, navigate]);

  const handleEnroll = async () => {
    try {
      setIsEnrolling(true);
      
      // Call the enrollment endpoint
      await api.post(ENROLL_COURSE(courseId));
      
      // Redirect to dashboard or show success message
      alert(`Successfully enrolled in "${course.title}"!`);
      navigate('/dashboard/courses');
    } catch (err) {
      console.error('Enrollment failed:', err);
      alert(err.response?.data?.message || 'Enrollment failed. Please try again.');
    } finally {
      setIsEnrolling(false);
    }
  };

  if (loading) {
    return (
      <Container>
        <LoadingSpinner />
        <LoadingText>Loading course details...</LoadingText>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <ErrorMessage>
          <ErrorIcon>⚠️</ErrorIcon>
          <h3>{error}</h3>
          <BackButton onClick={() => navigate('/courses')}>
            Back to Courses
          </BackButton>
        </ErrorMessage>
      </Container>
    );
  }

  if (!course) {
    return (
      <Container>
        <ErrorMessage>
          <ErrorIcon>❌</ErrorIcon>
          <h3>Course not found</h3>
          <BackButton onClick={() => navigate('/courses')}>
            Browse Available Courses
          </BackButton>
        </ErrorMessage>
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <Category>{course.category}</Category>
        <Title>{course.title}</Title>
      </Header>
      
      <Content>
        <InfoSection>
          <Description>{course.description}</Description>
          
          <Details>
            <DetailItem>
              <Label>Rating:</Label> {course.rating.toFixed(1)} ({course.reviews} reviews)
            </DetailItem>
            <DetailItem>
              <Label>Students:</Label> {course.students.toLocaleString()}
            </DetailItem>
            <DetailItem>
              <Label>Instructor:</Label> {course.instructor.name}
            </DetailItem>
            {course.instructor.bio && (
              <DetailItem>
                <Label>About Instructor:</Label> {course.instructor.bio}
              </DetailItem>
            )}
          </Details>
          
          <Curriculum>
            <h3>Curriculum</h3>
            <ul>
              {course.content.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </Curriculum>
        </InfoSection>
        
        <EnrollSection>
          <Pricing>
            {course.originalPrice ? (
              <>
                <OriginalPrice>₦{course.originalPrice.toLocaleString()}</OriginalPrice>
                <DiscountedPrice>₦{course.price.toLocaleString()}</DiscountedPrice>
              </>
            ) : (
              <Price>₦{course.price.toLocaleString()}</Price>
            )}
          </Pricing>
          
          <EnrollButton onClick={handleEnroll} disabled={isEnrolling}>
            {isEnrolling ? 'Processing...' : 'Enroll Now'}
          </EnrollButton>
        </EnrollSection>
      </Content>
    </Container>
  );
};


// Styled components
const Container = styled.div`
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 1rem;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

const Category = styled.div`
  font-size: 1.2rem;
  color: #3182ce;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin: 0;
`;

const Content = styled.div`
  display: flex;
  gap: 2rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const InfoSection = styled.div`
  flex: 3;
`;

const EnrollSection = styled.div`
  flex: 1;
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 8px;
  height: fit-content;
`;

const Description = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

const Details = styled.div`
  margin-bottom: 2rem;
`;

const DetailItem = styled.div`
  margin-bottom: 0.5rem;
`;

const Label = styled.span`
  font-weight: 600;
`;

const Curriculum = styled.div`
  h3 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }
  
  ul {
    list-style: none;
    padding: 0;
    
    li {
      padding: 0.75rem 0;
      border-bottom: 1px solid #e2e8f0;
      
      &:last-child {
        border-bottom: none;
      }
    }
  }
`;

const Pricing = styled.div`
  margin-bottom: 1.5rem;
  text-align: center;
`;

const OriginalPrice = styled.div`
  text-decoration: line-through;
  color: #718096;
`;

const DiscountedPrice = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: #2d3748;
`;

const Price = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: #2d3748;
`;

const EnrollButton = styled.button`
  display: block;
  width: 100%;
  padding: 15px;
  background: #3182ce;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s;
  
  &:hover {
    background: #2b6cb0;
  }
  
  &:disabled {
    background: #a0aec0;
    cursor: not-allowed;
  }
`;

// Additional styled components for loading and error states
const LoadingSpinner = styled.div`
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  border-top: 4px solid #3182ce;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  margin: 2rem auto;
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const LoadingText = styled.p`
  text-align: center;
  color: #4a5568;
`;

const ErrorMessage = styled.div`
  text-align: center;
  padding: 2rem;
  max-width: 600px;
  margin: 0 auto;
`;

const ErrorIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
`;

const BackButton = styled.button`
  background: #3182ce;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  margin-top: 1rem;
  cursor: pointer;
  transition: background 0.3s;
  
  &:hover {
    background: #2b6cb0;
  }
`;


export default CourseDetailsPage;