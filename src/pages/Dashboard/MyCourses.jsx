// src/pages/Dashboard/MyCourses.jsx
import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import api from '../../services/api';
import { ENROLLED_COURSES } from '../../services/endpoints';
import { Link } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';
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

const MyCourses = () => {
  const { currentUser } = useAuth();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await api.get(ENROLLED_COURSES);
        setCourses(response.data.results || response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load courses');
      } finally {
        setLoading(false);
      }
    };
    
    fetchCourses();
  }, []);

  const handleRemoveCourse = async (courseId) => {
    try {
      await api.delete(`/courses/${courseId}/unenroll/`);
      setCourses(prev => prev.filter(course => course.id !== courseId));
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to unenroll from course');
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