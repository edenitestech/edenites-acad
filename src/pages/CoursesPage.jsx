import React from 'react';
import { CourseCard } from '../components/CourseCard/CourseCard';
import styled from 'styled-components';

// Sample courses data - in a real app, you'd fetch this from an API
const courses = [
  // ... your course data from HomePage.jsx
];

const CoursesPage = () => {
  return (
    <Container>
      <Header>
        <Title>All Courses</Title>
        <Description>Browse our comprehensive catalog of courses</Description>
      </Header>
      
      <CoursesGrid>
        {courses.map(course => (
          <CourseCard key={course.id} course={course} />
        ))}
      </CoursesGrid>
    </Container>
  );
};

const Container = styled.div`
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 1rem;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
`;

const Description = styled.p`
  font-size: 1.2rem;
  color: #718096;
`;

const CoursesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  }
`;

export default CoursesPage;