// src/components/CourseCard/styles.js
import styled from 'styled-components';
import { keyframes } from 'styled-components';

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
    
    &::before {
      opacity: 1;
    }
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
  background: linear-gradient(to right, #4CAF50 0%, #2b5876 100%);
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 50px;
  font-weight: 600;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(43, 88, 118, 0.3);
    cursor: pointer;
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
const CourseSection = styled.section`
  padding: 4rem 2rem;
  background: #f9f9ff;
`;

const SectionTitle = styled.h2`
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 3rem;
  color: #2d3748;
`;

export const CoursesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;