import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero/Hero';
import FeaturedCourses from '../components/FeaturedCourses/FeaturedCourses';
import OurProducts from '../components/Products/OurProducts';
import FAQPreview from '../components/FAQS/FAQPreview';
import BlogPreview from '../components/Blog/BlogPreview';
import ContactPreview from '../components/Contact/ContactPreview';
import Testimonials from '../components/Testimonials/Testimonials';
import Newsletter from '../components/Newsletter/Newsletter';

const CTASection = () => (
  <CTAContainer>
    <CTAInner>
      <CTATitle>Take the next step toward your personal and professional goals</CTATitle>
      <CTASubtitle>Join Edenites Academy today to unlock your full potential</CTASubtitle>
      <CTAButton to="/signup">Join for Free</CTAButton>
    </CTAInner>
  </CTAContainer>
);

const HomePage = () => (
  <>
    <Hero />
    <OurProducts />
    <FeaturedCourses />
    <BlogPreview />
    <ContactPreview />
    <Newsletter />
    <Testimonials />
    <CTASection />
    <FAQPreview />
  </>
);

// Styled components (only CTA-related styles remain here)
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

export default HomePage;