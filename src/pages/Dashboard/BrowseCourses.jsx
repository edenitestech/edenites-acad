// src/pages/Dashboard/BrowseCourses.jsx
import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import api from '../../services/api';
import { AVAILABLE_COURSES } from '../../services/endpoints';
import { Link } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';
import {
  Section,
  SectionHeader,
  CourseGrid,
  CourseCard,
  CourseImage,
  CourseContent,
  CourseTitle,
  CourseMeta,
  Button,
  SkeletonCourseGrid,
  SkeletonCourseCard,
  LoadingSpinnerContainer
} from '../../styles/DashboardStyles';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const BrowseCourses = () => {
  const [availableCourses, setAvailableCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await api.get(AVAILABLE_COURSES);
        setAvailableCourses(response.data.results || response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load courses');
      } finally {
        setLoading(false);
      }
    };
    
    fetchCourses();
  }, []);

  const handleEnrollCourse = async (courseId) => {
    try {
      await api.post(`/courses/${courseId}/enroll/`);
      // You might want to add a success message or refresh the list
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to enroll in course');
    }
  };

  if (loading) {
    return (
      <Section>
        <SectionHeader>
          <Skeleton width={200} height={30} />
        </SectionHeader>
        
        <SkeletonCourseGrid>
          {[...Array(4)].map((_, i) => (
            <SkeletonCourseCard key={i}>
              <Skeleton height={160} style={{ marginBottom: '1rem' }} />
              <Skeleton height={24} width="80%" />
              <Skeleton height={16} width="60%" style={{ margin: '10px 0' }} />
              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
                <Skeleton width={100} height={36} />
                <Skeleton width={100} height={36} />
              </div>
            </SkeletonCourseCard>
          ))}
        </SkeletonCourseGrid>
      </Section>
    );
  }

  return (
    <div>
      <Section>
        <SectionHeader>
          <h2>Available Courses</h2>
        </SectionHeader>
        
        {availableCourses.length > 0 ? (
          <CourseGrid>
            {availableCourses.map(course => (
              <CourseCard key={course.id}
                course={{
                ...course,
                instructor: course.instructor?.name || 'Unknown Instructor'
              }}
              onEnroll={handleEnrollCourse}/>
                /*
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
              */
            ))}
          </CourseGrid>
        ) : (
          <p>No available courses at the moment.</p>
        )}
      </Section>
      
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

export default BrowseCourses;