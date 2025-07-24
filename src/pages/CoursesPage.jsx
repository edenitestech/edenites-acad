import React, { useState, useEffect } from 'react';
import CourseCard from '../components/CourseCard/CourseCard';
import styled from 'styled-components';
import api from '../services/api';
import { COURSES } from '../services/endpoints';
import Wave from '../components/Wave/Wave';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ENROLLMENTS } from '../services/endpoints';

const CoursesSection = styled.section`
  position: relative;
  padding: 4rem 0;
  background-color: #f9f9ff;
  min-height: 100vh;
`;

const CoursesContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  position: relative;
  z-index: 2;
`;

const CoursesHero = styled.div`
  background: linear-gradient(rgba(43, 88, 118, 0.85), rgba(43, 88, 118, 0.85)),
              url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80');
  background-size: cover;
  background-position: center;
  height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: white;
  border-radius: 12px;
  margin-bottom: 3rem;
  padding: 2rem;
`;

const HeroTitle = styled.h1`
  font-size: 3rem;
  margin-bottom: 1rem;
  color: white;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.2rem;
  max-width: 700px;
  margin-bottom: 2rem;
  line-height: 1.6;
`;

const CoursesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  }
`;

const SectionTitle = styled.h2`
  text-align: center;
  color: #2d3748;
  margin-bottom: 2rem;
  font-size: 2rem;
  position: relative;
  padding-bottom: 1rem;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 3px;
    background: linear-gradient(to right, #4CAF50, #2b5876);
    border-radius: 3px;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 4rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  margin: 2rem 0;
`;

const EmptyIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 1rem;
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

// Skeleton Components
const SkeletonHero = styled.div`
  height: 400px;
  border-radius: 12px;
  margin-bottom: 3rem;
`;

const SkeletonCourseGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const CoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [enrolling, setEnrolling] = useState({});

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const response = await api.get(COURSES);
        
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

  const handleEnrollCourse = async (courseId) => {
    if (!currentUser) {
      navigate('/login');
      return;
    }

    try {
      setEnrolling(prev => ({ ...prev, [courseId]: true }));
      await api.post(ENROLLMENTS, { course: courseId });
      
      // Update the course in state
      setCourses(prevCourses => 
        prevCourses.map(course => 
          course.id === courseId 
            ? { ...course, isEnrolled: true } 
            : course
        )
      );

      toast.success('Successfully enrolled in course!');
      
      // Refresh enrolled courses in MyCourses
      if (window.refreshEnrolledCourses) {
        window.refreshEnrolledCourses();
      }
    } catch (err) {
      console.error('Enrollment error:', err);
      toast.error('Failed to enroll. Please try again.');
    } finally {
      setEnrolling(prev => ({ ...prev, [courseId]: false }));
    }
  };

  if (loading) {
    return (
      <CoursesSection>
        <Wave position="top" color="#2b5876" opacity="0.1" flip={false} />
        <CoursesContainer>
          <SkeletonHero>
            <Skeleton height="100%" width="100%" />
          </SkeletonHero>
          
          <SectionTitle>
            <Skeleton width={200} height={40} />
          </SectionTitle>
          
          <SkeletonCourseGrid>
            {[...Array(6)].map((_, i) => (
              <CourseCard 
                key={i}
                course={{
                  id: i,
                  title: '',
                  description: '',
                  category: '',
                  rating: 0,
                  reviews: 0,
                  students: 0,
                  price: 0
                }}
                isLoading={true}
              />
            ))}
          </SkeletonCourseGrid>
        </CoursesContainer>
        <Wave position="bottom" color="#2b5876" opacity="0.1" flip={true} />
      </CoursesSection>
    );
  }

  if (error) {
    return (
      <CoursesSection>
        <Wave position="top" color="#2b5876" opacity="0.1" flip={false} />
        <CoursesContainer>
          <CoursesHero>
            <HeroTitle>All Courses</HeroTitle>
            <HeroSubtitle>
              We encountered an issue loading our course catalog
            </HeroSubtitle>
          </CoursesHero>
          
          <ErrorMessage>
            <ErrorIcon>⚠️</ErrorIcon>
            <p>{error}</p>
            <RetryButton onClick={() => window.location.reload()}>
              Retry
            </RetryButton>
          </ErrorMessage>
        </CoursesContainer>
        <Wave position="bottom" color="#2b5876" opacity="0.1" flip={true} />
      </CoursesSection>
    );
  }

  return (
    <CoursesSection>
      <Wave position="top" color="#2b5876" opacity="0.1" flip={false} />
      
      <CoursesContainer>
        <CoursesHero>
          <HeroTitle>All Courses</HeroTitle>
          <HeroSubtitle>
            Browse our comprehensive catalog of courses designed to boost your skills in 
            IT, Fashion Design, Leather Crafting, and Exam Preparation
          </HeroSubtitle>
        </CoursesHero>
        
        <SectionTitle>Our Course Catalog</SectionTitle>
        
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
                  category: course.category?.name || 'Uncategorized',
                  rating: course.average_rating || 4.5,
                  reviews: course.review_count || 0,
                  students: course.enrollment_count || 0,
                }}
                onEnroll={handleEnrollCourse}
                isLoading={enrolling[course.id] || false}
                isEnrolled={course.isEnrolled || false}
              />
            ))}
          </CoursesGrid>
        )}
      </CoursesContainer>
      
      <Wave position="bottom" color="#2b5876" opacity="0.1" flip={true} />
    </CoursesSection>
  );
};
export default CoursesPage;