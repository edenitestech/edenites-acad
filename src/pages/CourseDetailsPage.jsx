import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

const CourseDetailsPage = () => {
  const { courseId } = useParams();
  const [isEnrolling, setIsEnrolling] = useState(false);
  
  // In a real app, you would fetch course details from an API
  const course = {
    id: 1,
    category: 'IT Certification',
    title: 'AWS Certified Solutions Architect',
    description: 'Master AWS cloud architecture and prepare for the certification exam.',
    rating: 4.8,
    reviews: 1200,
    students: 5432,
    price: 89.99,
    originalPrice: 129.99,
    content: [
      'Module 1: Introduction to Cloud Computing',
      'Module 2: AWS Fundamentals',
      'Module 3: Designing Highly Available Systems',
      'Module 4: Deployment Strategies',
      'Module 5: Security Best Practices',
      'Module 6: Exam Preparation'
    ],
    instructor: {
      name: 'Jane Smith',
      bio: 'AWS Solutions Architect with 10+ years of experience'
    }
  };

  const handleEnroll = () => {
    setIsEnrolling(true);
    // Simulate enrollment process
    setTimeout(() => {
      alert(`Successfully enrolled in "${course.title}"!`);
      setIsEnrolling(false);
    }, 1500);
  };

  return (
    <Container>
      <Header>
        <Category>{course.category}</Category>
        <Title>{course.title}</Title>
      </Header>
      
      <Content>
        <InfoSection>
          <Description>{course.description}</Description>
          
          <Details>
            <DetailItem>
              <Label>Rating:</Label> {course.rating} ({course.reviews} reviews)
            </DetailItem>
            <DetailItem>
              <Label>Students:</Label> {course.students}
            </DetailItem>
            <DetailItem>
              <Label>Instructor:</Label> {course.instructor.name}
            </DetailItem>
          </Details>
          
          <Curriculum>
            <h3>Curriculum</h3>
            <ul>
              {course.content.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </Curriculum>
        </InfoSection>
        
        <EnrollSection>
          <Pricing>
            {course.originalPrice ? (
              <>
                <OriginalPrice>${course.originalPrice}</OriginalPrice>
                <DiscountedPrice>${course.price}</DiscountedPrice>
              </>
            ) : (
              <Price>${course.price}</Price>
            )}
          </Pricing>
          
          <EnrollButton onClick={handleEnroll} disabled={isEnrolling}>
            {isEnrolling ? 'Processing...' : 'Enroll Now'}
          </EnrollButton>
        </EnrollSection>
      </Content>
    </Container>
  );
};

// Styled components
const Container = styled.div`
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 1rem;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

const Category = styled.div`
  font-size: 1.2rem;
  color: #3182ce;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin: 0;
`;

const Content = styled.div`
  display: flex;
  gap: 2rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const InfoSection = styled.div`
  flex: 3;
`;

const EnrollSection = styled.div`
  flex: 1;
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 8px;
  height: fit-content;
`;

const Description = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

const Details = styled.div`
  margin-bottom: 2rem;
`;

const DetailItem = styled.div`
  margin-bottom: 0.5rem;
`;

const Label = styled.span`
  font-weight: 600;
`;

const Curriculum = styled.div`
  h3 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }
  
  ul {
    list-style: none;
    padding: 0;
    
    li {
      padding: 0.75rem 0;
      border-bottom: 1px solid #e2e8f0;
      
      &:last-child {
        border-bottom: none;
      }
    }
  }
`;

const Pricing = styled.div`
  margin-bottom: 1.5rem;
  text-align: center;
`;

const OriginalPrice = styled.div`
  text-decoration: line-through;
  color: #718096;
`;

const DiscountedPrice = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: #2d3748;
`;

const Price = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: #2d3748;
`;

const EnrollButton = styled.button`
  display: block;
  width: 100%;
  padding: 15px;
  background: #3182ce;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s;
  
  &:hover {
    background: #2b6cb0;
  }
  
  &:disabled {
    background: #a0aec0;
    cursor: not-allowed;
  }
`;

export default CourseDetailsPage;