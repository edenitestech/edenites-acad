import React from 'react';
import styled from 'styled-components';
import { FaLaptopCode, FaTshirt, FaTools, FaBook } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const OurProducts = () => {
  const navigate = useNavigate();

  const products = [
    {
      icon: <FaLaptopCode />,
      title: 'IT and Software',
      description: 'Master cutting-edge technologies with our expert-led courses in programming and software development.',
      path: '/it-software'
    },
    {
      icon: <FaTshirt />,
      title: 'Fashion Design',
      description: 'Unleash your creativity with comprehensive fashion design courses from basics to advanced techniques.',
      path: '/fashion-design'
    },
    {
      icon: <FaTools />,
      title: 'Leather Crafting',
      description: 'Learn the art of leather crafting with hands-on training from skilled artisans.',
      path: '/leather-crafting'
    },
    {
      icon: <FaBook />,
      title: 'CBT Exams',
      description: 'Prepare for WAEC, NECO, and JAMB with our comprehensive computer-based test preparation courses.',
      path: '/cbt-exams'
    }
  ];

  const handleCardClick = (path) => {
    navigate(path);
  };

  return (
    <Section>
      <WaveTop>
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".1" fill="#2b5876"></path>
          <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".1" fill="#2b5876"></path>
          <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" opacity=".1" fill="#2b5876"></path>
        </svg>
      </WaveTop>
      
      <Container>
        <Title>Our Learning Programs</Title>
        <ProductsGrid>
          {products.map((product, index) => (
            <ProductCard 
              key={index}
              onClick={() => handleCardClick(product.path)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && handleCardClick(product.path)}
            >
              <ProductIcon>{product.icon}</ProductIcon>
              <ProductTitle>{product.title}</ProductTitle>
              <ProductDescription>{product.description}</ProductDescription>
            </ProductCard>
          ))}
        </ProductsGrid>
      </Container>
    </Section>
  );
};

// Styled components
const Section = styled.section`
  padding: 1rem 0 1rem;
  background-color: #f9f9ff;
  position: relative;
`;

const WaveTop = styled.div`
  position: absolute;
  top: -1px;
  left: 0;
  width: 100%;
  overflow: hidden;
  line-height: 0;
  
  svg {
    position: relative;
    display: block;
    width: calc(100% + 1.3px);
    height: 85vh;
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  position: relative;
  z-index: 1;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 2rem;
  color: #2b5876;
  font-size: 2.5rem;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(252px, 1fr));
  gap: 1.4rem;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 500px) {
    grid-template-columns: 1fr;
  }
`;

const ProductCard = styled.div`
  background: white;
  padding: 1rem;
  border-radius: 12px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  text-align: center;
  transition: all 0.3s ease;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
  }
`;

const ProductIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1.5rem;
  color: #4CAF50;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ProductTitle = styled.h3`
  color: #2b5876;
  margin-bottom: 1rem;
  font-size: 1.5rem;
`;

const ProductDescription = styled.p`
  color: #718096;
  line-height: 1.6;
`;

export default OurProducts;