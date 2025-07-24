import { useState, useEffect } from 'react';
import styled from 'styled-components';
import CourseCard from '../CourseCard/CourseCard';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

// Mock data - to be replaced with backend data
const mockCourses = [
  {
    id: 1,
    category: 'IT Certification',
    title: 'AWS Certified Solutions Architect',
    description: 'Master AWS cloud architecture and prepare for the certification exam.',
    rating: 4.8,
    reviews: 1200,
    students: 5432,
    price: 89.99,
    originalPrice: 129.99,
    isBestseller: true
  },
  {
    id: 2,
    category: 'Exam Preparation',
    title: 'JAMB Complete Prep',
    description: 'Comprehensive preparation for JAMB exams with past questions and solutions.',
    rating: 4.9,
    reviews: 850,
    students: 3200,
    price: 49.99,
    isBestseller: true
  },
  {
    id: 3,
    category: 'Fashion Design',
    title: 'Fashion Pattern Making',
    description: 'Learn professional pattern making techniques for fashion design.',
    rating: 4.7,
    reviews: 450,
    students: 2100,
    price: 59.99,
    originalPrice: 79.99
  }
];

const FeaturedCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeaturedCourses = async () => {
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // TODO: Replace with actual API call when endpoint is available
        // const response = await api.get('/api/courses/featured/');
        // setCourses(response.data);
        
        setCourses(mockCourses);
      } catch (err) {
        setError('Failed to load featured courses');
        console.error('Error loading featured courses:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedCourses();
  }, []);

  return (
    <CourseSection>
      <SectionTitle>Featured Courses</SectionTitle>
      
      {loading ? (
        <SkeletonGrid>
          {[...Array(3)].map((_, i) => (
            <SkeletonCard key={i}>
              <Skeleton height={180} />
              <SkeletonContainer>
                <Skeleton height={24} width="80%" />
                <Skeleton height={20} width="60%" style={{ margin: '10px 0' }} />
                <Skeleton height={16} width="90%" count={2} />
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
                  <Skeleton height={36} width={100} />
                  <Skeleton height={36} width={100} />
                </div>
              </SkeletonContainer>
            </SkeletonCard>
          ))}
        </SkeletonGrid>
      ) : error ? (
        <ErrorContainer>
          <p>{error}</p>
          <RetryButton onClick={() => window.location.reload()}>Retry</RetryButton>
        </ErrorContainer>
      ) : (
        <CoursesGrid>
          {courses.map(course => (
            <CourseCard key={course.id} course={course} />
          ))}
        </CoursesGrid>
      )}
    </CourseSection>
  );
};

// Styled components
const CourseSection = styled.section`
  padding: 4rem 2rem;
  background: #f9f9ff;
`;

const SectionTitle = styled.h2`
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 2rem;
  color: #2d3748;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const CoursesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  }
`;

const SkeletonGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  }
`;

const SkeletonCard = styled.div`
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
`;

const SkeletonContainer = styled.div`
  padding: 1.5rem;
`;

const ErrorContainer = styled.div`
  text-align: center;
  padding: 2rem;
  background: #fff5f5;
  border: 1px solid #fc8181;
  border-radius: 8px;
  max-width: 600px;
  margin: 0 auto;
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

export default FeaturedCourses;