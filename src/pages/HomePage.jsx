import styled from 'styled-components';
import { Link } from 'react-router-dom';

import Hero from '../components/Hero/Hero';
import { CourseCard } from '../components/CourseCard/CourseCard';
import OurProducts from '../components/Products/OurProducts';
import FAQPreview from '../components/FAQS/FAQPreview';
import BlogPreview from '../components/Blog/BlogPreview';
import ContactPreview from '../components/Contact/ContactPreview';
import Testimonials from '../components/Testimonials/Testimonials';

const courses = [
  {
    id: 1,
    category: 'IT Certification',
    title: 'AWS Certified Solutions Architect',
    description: 'Master AWS cloud architecture and prepare for the certification exam.',
    rating: 4.8,
    reviews: 1200,
    students: 5432,
    price: 89.99,
    originalPrice: 129.99,
    isBestseller: true
  },
  {
    id: 2,
    category: 'Exam Preparation',
    title: 'JAMB Complete Prep',
    description: 'Comprehensive preparation for JAMB exams with past questions and solutions.',
    rating: 4.9,
    reviews: 850,
    students: 3200,
    price: 49.99,
    isBestseller: true
  },
  {
    id: 3,
    category: 'Fashion Design',
    title: 'Fashion Pattern Making',
    description: 'Learn professional pattern making techniques for fashion design.',
    rating: 4.7,
    reviews: 450,
    students: 2100,
    price: 59.99,
    originalPrice: 79.99
  }
];

const CTASection = () => (
  <CTAContainer>
    <CTAInner>
      <CTATitle>Take the next step toward your personal and professional goals</CTATitle>
      <CTASubtitle>Join Edenites Academy today to unlock your full potential</CTASubtitle>
      <CTAButton to="/signup">Join for Free</CTAButton>
    </CTAInner>
  </CTAContainer>
);

const CTAContainer = styled.section`
  padding: 5rem 2rem;
  background: linear-gradient(135deg, #0a7c5f 0%, #03314f 100%);
  color: white;
  text-align: center;
`;

const CTAInner = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const CTATitle = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const CTASubtitle = styled.p`
  font-size: 1.2rem;
  margin-bottom: 2rem;
  opacity: 0.9;
`;

const CTAButton = styled(Link)`
  display: inline-block;
  padding: 1rem 2.5rem;
  background: white;
  color: #0a7c5f;
  border-radius: 50px;
  font-weight: bold;
  font-size: 1.1rem;
  text-decoration: none;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(0,0,0,0.2);
  }
`;

const HomePage = () => (
  <>
    <Hero />
    <OurProducts />
    <CourseSection>
      <SectionTitle>Featured Courses</SectionTitle>
      <CoursesGrid>
        {courses.map(course => (
          <CourseCard key={course.id} course={course} />
        ))}
      </CoursesGrid>
    </CourseSection>
    <BlogPreview />
    <ContactPreview />
    <Testimonials />
    <CTASection />
    <FAQPreview />
  </>
);

const CourseSection = styled.section`
  padding: 4rem 2rem;
  background: #f9f9ff;
`;

const SectionTitle = styled.h2`
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 2rem;
  color: #2d3748;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const CoursesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  }
`;

export default HomePage;