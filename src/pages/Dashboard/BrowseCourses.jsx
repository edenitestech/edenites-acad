// src/pages/Dashboard/BrowseCourses.jsx
import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import api from '../../services/api';
import { AVAILABLE_COURSES, ENROLLMENTS } from '../../services/endpoints';
import { Link } from 'react-router-dom';
import { FaPlus, FaBook } from 'react-icons/fa';
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
      setEnrolling(prev => ({ ...prev, [courseId]: true }));
      
      // Use the new enrollments endpoint
      await api.post(ENROLLMENTS, { course: courseId });
      
      // Update UI
      setAvailableCourses(prev => 
        prev.map(course => 
          course.id === courseId 
            ? { ...course, isEnrolled: true } 
            : course
        )
      );
      
      toast.success('Successfully enrolled in course!');
    } catch (err) {
      // Error handling
      console.error('Enrollment error:', err);
      setError(err.response?.data?.message || 'Failed to enroll in course');
      toast.error('Enrollment failed. Please try again.');
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
              <CourseCard key={course.id}>
                {/* Placeholder for course image - replace with actual image if available */}
                <CourseImage>
                  <FaBook size={40} color="#4CAF50" />
                </CourseImage>
                
                <CourseContent>
                  <CourseTitle>{course.title}</CourseTitle>
                  <p>Instructor: {course.instructor?.name || 'Unknown'}</p>
                  <p>Price: ₦{course.price?.toLocaleString() || 'Free'}</p>
                  
                  <CourseMeta>
                    <Button 
                      className={course.isEnrolled ? "success" : "primary"}
                      disabled={enrolling[course.id] || course.isEnrolled}
                      onClick={() => !course.isEnrolled && handleEnrollCourse(course.id)}
                    >
                      {enrolling[course.id] ? (
                        'Enrolling...'
                      ) : course.isEnrolled ? (
                        'Enrolled ✓'
                      ) : (
                        <>
                          <FaPlus /> Enroll Now
                        </>
                      )}
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