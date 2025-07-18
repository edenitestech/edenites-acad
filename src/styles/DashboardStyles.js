// src/styles/dashboardStyles.js
import styled from 'styled-components';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

// Layout components
export const Section = styled.section`
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

export const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

// Course components
export const CourseGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
`;

export const CourseCard = styled.div`
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0,0,0,0.05);
  transition: transform 0.2s;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 15px rgba(0,0,0,0.1);
  }
`;

export const CourseImage = styled.div`
  height: 160px;
  background: linear-gradient(to right, #48bb99 0%, #2b5876 100%);
  position: relative;
`;

export const CourseContent = styled.div`
  padding: 1.25rem;
`;

export const CourseTitle = styled.h3`
  margin: 0 0 0.5rem;
  font-size: 1.1rem;
`;

export const CourseMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
`;

// Buttons
export const Button = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-weight: 500;
  transition: all 0.2s;
  
  &.primary {
    background: #48bb99;
    color: white;
    
    &:hover {
      background: #3a9c7d;
    }
  }
  
  &.danger {
    background: #e53e3e;
    color: white;
    
    &:hover {
      background: #c53030;
    }
  }
  
  &.outline {
    background: transparent;
    border: 1px solid #48bb99;
    color: #48bb99;
    
    &:hover {
      background: #f0fff9;
    }
  }
`;

// Skeleton components
export const SkeletonCard = styled(Skeleton)`
  margin-bottom: 1rem;
`;

export const SkeletonCourseGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
`;

export const SkeletonCourseCard = styled.div`
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0,0,0,0.05);
  padding: 1.25rem;
`;

export const LoadingSpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 300px;
`;