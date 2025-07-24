import { FaStar, FaUserAlt, FaPlayCircle, FaCheck } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { useAuth } from '../../contexts/AuthContext'; 

// Styled components
const shimmer = keyframes`
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
`;

export const CourseCardContainer = styled.div`
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  position: relative;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
  }
`;

export const CourseImage = styled.div`
  height: 180px;
  background: linear-gradient(to right, #2b5876 0%, #4e4376 100%);
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const PlayButton = styled.div`
  color: white;
  opacity: 0.8;
  transition: all 0.3s ease;

  &:hover {
    cursor: pointer;
  }
  
  ${CourseCardContainer}:hover & {
    transform: scale(1.1);
    opacity: 1;
  }
`;

export const CourseBadge = styled.span`
  position: absolute;
  top: 15px;
  right: 15px;
  background: #f6d365;
  color: #2d3748;
  padding: 5px 10px;
  border-radius: 20px;
  font-size: 0.7rem;
  font-weight: 600;
`;

export const EnrolledBadge = styled.span`
  position: absolute;
  top: 15px;
  left: 15px;
  background: #48bb78;
  color: white;
  padding: 5px 10px;
  border-radius: 20px;
  font-size: 0.7rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 5px;
`;

export const CourseContent = styled.div`
  padding: 1.5rem;
`;

export const CourseCategory = styled.span`
  color: #6e8efb;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

export const CourseTitle = styled.h3`
  font-size: 1.2rem;
  margin: 0.5rem 0;
  color: #2d3748;
`;

export const CourseDescription = styled.p`
  color: #718096;
  font-size: 0.9rem;
  margin-bottom: 1rem;
  line-height: 1.5;
`;

export const CourseMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #edf2f7;
`;

export const CourseRating = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  color: #2d3748;
  font-weight: 600;
  font-size: 0.9rem;
`;

export const CourseReviews = styled.span`
  color: #718096;
  font-weight: normal;
  font-size: 0.8rem;
`;

export const CourseStudents = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  color: #718096;
  font-size: 0.8rem;
`;

export const CourseFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const CoursePrice = styled.span`
  font-size: 1.2rem;
  font-weight: 700;
  color: #2d3748;
`;

export const CourseOriginalPrice = styled.span`
  font-size: 0.9rem;
  text-decoration: line-through;
  color: #718096;
`;

export const CourseButton = styled.button`
  background: ${props => 
    props.$isEnrolled ? '#48bb78' : 
    props.$isLoading ? '#a0aec0' : 
    'linear-gradient(to right, #4CAF50 0%, #2b5876 100%)'};
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 50px;
  font-weight: 600;
  transition: all 0.3s ease;
  text-decoration: none;
  font-size: 0.9rem;
  cursor: ${props => props.$isLoading ? 'not-allowed' : 'pointer'};
  display: flex;
  align-items: center;
  gap: 5px;
  
  &:hover {
    transform: ${props => props.$isLoading ? 'none' : 'translateY(-2px)'};
    box-shadow: ${props => props.$isLoading ? 'none' : '0 5px 15px rgba(43, 88, 118, 0.3)'};
  }
`;

export const CourseShimmer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.2),
    transparent
  );
  animation: ${shimmer} 2s linear;
  opacity: 0;
  
  ${CourseCardContainer}:hover & {
    opacity: 1;
  }
`;

const CourseCard = ({ 
  course, 
  onEnroll, 
  isLoading = false, 
  isEnrolled = false 
  }) => {
  const [localLoading, setLocalLoading] = useState(false);
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const handleEnroll = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isLoading || isEnrolled) return;
    
    // If user is not logged in, redirect to login
    if (!currentUser) {
      navigate('/login', { state: { from: `/courses/${course.id}` } });
      return;
    }

    setLocalLoading(true);
    
    try {
      // Call the onEnroll prop if provided
      if (onEnroll) {
        await onEnroll(course.id);
      } else {
        // Default enrollment logic if no onEnroll prop provided
        // Here you would typically call your API
        console.log('Enrolling in course:', course.id);
        // Example API call:
        // const response = await api.enrollCourse(course.id);
        // Handle response...
        
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    } catch (error) {
      console.error('Enrollment failed:', error);
      // You might want to show an error message to the user here
    } finally {
      setLocalLoading(false);
    }
  };


  return (
    <CourseCardContainer data-aos="fade-up">
      <CourseImage>
        <PlayButton>
          <FaPlayCircle size={40} />
        </PlayButton>
        {course.isBestseller && <CourseBadge>Bestseller</CourseBadge>}
        {isEnrolled && (
          <EnrolledBadge>
            <FaCheck /> Enrolled
          </EnrolledBadge>
        )}
      </CourseImage>
      
      <CourseContent>
        <CourseCategory>{course.category || 'Uncategorized'}</CourseCategory>
        <CourseTitle>{course.title}</CourseTitle>
        <CourseDescription>{course.description}</CourseDescription>
        
        <CourseMeta>
          <CourseRating>
            <FaStar color="#f6b01e" />
            <span>{course.rating || 0}</span>
            <CourseReviews>({course.reviews || 0} reviews)</CourseReviews>
          </CourseRating>
          
          <CourseStudents>
            <FaUserAlt size={12} />
            <span>{course.students || 0} students</span>
          </CourseStudents>
        </CourseMeta>
        
        <CourseFooter>
          <div>
            {course.originalPrice ? (
              <>
                <CourseOriginalPrice> ₦ {course.originalPrice}</CourseOriginalPrice>
                <CoursePrice> ₦{course.price} </CoursePrice>
              </>
            ) : (
              <CoursePrice>{course.price > 0 ? `₦${course.price}` : 'Free'}</CoursePrice>
            )}
          </div>
          <CourseButton
          onClick={handleEnroll}
          $isLoading={isLoading || localLoading}
          $isEnrolled={isEnrolled}
          disabled={isLoading || isEnrolled || localLoading}
        >
          {isLoading || localLoading ? (
            'Processing...'
          ) : isEnrolled ? (
            <>
              <FaCheck /> Enrolled
            </>
          ) : (
            'Enroll Now'
          )}
        </CourseButton>
        </CourseFooter>
      </CourseContent>
      
      <CourseShimmer />
    </CourseCardContainer>
  );
};

CourseCard.propTypes = {
  course: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    category: PropTypes.string,
    rating: PropTypes.number,
    reviews: PropTypes.number,
    students: PropTypes.number,
    price: PropTypes.number,
    originalPrice: PropTypes.number,
    isBestseller: PropTypes.bool,
  }).isRequired,
  onEnroll: PropTypes.func,
  isLoading: PropTypes.bool,
  isEnrolled: PropTypes.bool,
};

CourseCard.defaultProps = {
  onEnroll: () => {},
  isLoading: false,
  isEnrolled: false,
};

export default CourseCard;