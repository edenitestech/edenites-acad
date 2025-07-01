import { Hero } from '../components/Hero/Hero';
import { CourseCard } from '../components/CourseCard/CourseCard';
import OurProducts from '../components/Products/OurProducts';
import styled from 'styled-components';
import FAQs from '../components/FAQS/FAQs';
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
    <FAQs />
    <Testimonials/>
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