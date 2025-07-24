import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import api from '../../services/api';
import { ENROLLED_COURSES, UNENROLL_COURSE } from '../../services/endpoints';
import { Link } from 'react-router-dom';
import { FaTrash, FaBook } from 'react-icons/fa';
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

const MyCourses = () => {
  const { currentUser } = useAuth();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [removing, setRemoving] = useState({});
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const response = await api.get(ENROLLED_COURSES);
        setCourses(response.data.results || response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load courses');
      } finally {
        setLoading(false);
      }
    };
    
    fetchCourses();
  }, [refreshTrigger]);

  // Create a global function to refresh courses
  useEffect(() => {
    window.refreshEnrolledCourses = () => {
      setRefreshTrigger(prev => prev + 1);
    };
    
    return () => {
      delete window.refreshEnrolledCourses;
    };
  }, []);

  const handleRemoveCourse = async (courseId) => {
    try {
      setRemoving(prev => ({ ...prev, [courseId]: true }));
      
      // Use the UNENROLL_COURSE endpoint from services
      await api.delete(UNENROLL_COURSE(courseId));
      
      // Update UI
      setCourses(prev => prev.filter(course => course.id !== courseId));
      
      toast.success('Course removed successfully!');
    } catch (err) {
      console.error('Unenrollment error:', err);
      setError(err.response?.data?.message || 'Failed to remove course');
      toast.error('Failed to remove course. Please try again.');
    } finally {
      setRemoving(prev => ({ ...prev, [courseId]: false }));
    }
  };

  if (loading) {
    return (
      <Section>
        <SectionHeader>
          <Skeleton width={150} height={30} />
        </SectionHeader>
        
        <SkeletonCourseGrid>
          {[...Array(3)].map((_, i) => (
            <SkeletonCourseCard key={i}>
              <Skeleton height={160} style={{ marginBottom: '1rem' }} />
              <Skeleton height={24} width="80%" />
              <Skeleton height={16} width="60%" style={{ margin: '10px 0' }} />
              <Skeleton height={6} width="100%" style={{ margin: '10px 0' }} />
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
          <h2>My Learning</h2>
        </SectionHeader>
        
        {courses.length > 0 ? (
          <CourseGrid>
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
              >
                <CourseImage>
                  <FaBook size={40} color="#3182ce" />
                </CourseImage>
                
                <CourseContent>
                  <CourseTitle>{course.title}</CourseTitle>
                  <p>Instructor: {course.instructor?.name || 'Unknown'}</p>
                  
                  <div>
                    <p>Progress: {course.progress || 0}%</p>
                    <div style={{
                      height: '6px', 
                      background: '#e0e0e0', 
                      borderRadius: '3px',
                      margin: '10px 0'
                    }}>
                      <div style={{
                        width: `${course.progress || 0}%`,
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
                      disabled={removing[course.id]}
                      onClick={() => handleRemoveCourse(course.id)}
                    >
                      {removing[course.id] ? (
                        'Removing...'
                      ) : (
                        <>
                          <FaTrash /> Remove
                        </>
                      )}
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
              as={Link}
              to="/dashboard/browse"
            >
              Browse Courses
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
export default MyCourses;