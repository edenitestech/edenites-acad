import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import api from '../../services/api';
import { AVAILABLE_COURSES, ENROLLMENTS } from '../../services/endpoints';
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
} from '../../styles/DashboardStyles';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { toast } from 'react-toastify';

const BrowseCourses = () => {
  const { currentUser } = useAuth();
  const [availableCourses, setAvailableCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [enrolling, setEnrolling] = useState({});

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const response = await api.get(AVAILABLE_COURSES);
        
        // Handle different response structures
        let coursesData = response.data;
        if (response.data.results) {
          coursesData = response.data.results;
        } else if (Array.isArray(response.data)) {
          coursesData = response.data;
        } else {
          throw new Error('Invalid course data format');
        }
        
        setAvailableCourses(coursesData);
      } catch (err) {
        console.error('Course fetch error:', err);
        setError(err.response?.data?.message || 'Failed to load courses');
      } finally {
        setLoading(false);
      }
    };
    
    fetchCourses();
  }, []);

  const handleEnrollCourse = async (courseId) => {
    if (!currentUser) {
      toast.error('Please login to enroll in courses');
      return;
    }

    try {
      setEnrolling(prev => ({ ...prev, [courseId]: true }));
      
      // Use the new enrollments endpoint
      await api.post(ENROLLMENTS, { course: courseId });
      
      // Update UI
      setAvailableCourses(prev => 
        prev.map(course => {
          if (course.id === courseId) {
            return { ...course, isEnrolled: true };
          }
          return course;
        })
      );
      
      toast.success('Successfully enrolled in course!');
      
      // Refresh enrolled courses in MyCourses
      if (window.refreshEnrolledCourses) {
        window.refreshEnrolledCourses();
      }
    } catch (err) {
      console.error('Enrollment error:', err);
      const errorMsg = err.response?.data?.message || 'Failed to enroll in course';
      setError(errorMsg);
      toast.error(`Enrollment failed: ${errorMsg}`);
    } finally {
      setEnrolling(prev => ({ ...prev, [courseId]: false }));
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
          </CourseGrid>
        ) : (
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <p>No courses available at the moment.</p>
            <Button 
              className="primary"
              onClick={() => window.location.reload()}
            >
              Refresh
            </Button>
          </div>
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