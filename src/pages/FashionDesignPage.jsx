// src/pages/FashionDesignPage.jsx

import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

// Hero images
const heroImages = [
  'https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3',
  'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?ixlib=rb-4.0.3',
  'https://images.unsplash.com/photo-1469334031218-e382a71b716b?ixlib=rb-4.0.3'
];

// Category images
const categoryImages = {
  coreSkills: 'https://images.unsplash.com/photo-1551232864-3f0890e580d9?ixlib=rb-4.0.3',
  specializations: 'https://images.unsplash.com/photo-1554412933-514a83d2f3c8?ixlib=rb-4.0.3',
  fashionBusiness: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3',
  textileTechnology: 'https://images.unsplash.com/photo-1516762689617-e1cffcef479d?ixlib=rb-4.0.3',
  fashionIllustration: 'https://images.unsplash.com/photo-1517842645767-c639042777db?ixlib=rb-4.0.3',
  patternMaking: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?ixlib=rb-4.0.3'
};

// Animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const slideIn = keyframes`
  from { transform: translateY(20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`;

// Styled Components
const HeroSection = styled.div`
  height: 500px;
  background-size: cover;
  background-position: center;
  background-image: url(${props => props.image});
  transition: background-image 1s ease-in-out;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  margin-bottom: 3rem;

  &::after {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    background: linear-gradient(to right, rgba(43, 88, 118, 0.8), rgba(78, 67, 118, 0.8));
  }

  @media (max-width: 768px) {
    height: 300px;
  }
`;

const HeroContent = styled.div`
  text-align: center;
  z-index: 2;
  max-width: 800px;
  padding: 0 2rem;
`;

const HeroTitle = styled.h1`
  color: white;
  font-size: 3.5rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  margin-bottom: 1rem;
  animation: ${fadeIn} 1.5s ease-out;
  font-weight: 600;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const HeroSubtitle = styled.p`
  color: white;
  font-size: 1.5rem;
  margin-bottom: 2rem;
  animation: ${fadeIn} 1.5s ease-out 0.2s;
  animation-fill-mode: both;

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const CtaButton = styled.button`
  background: #4CAF50;
  color: white;
  border: none;
  padding: 1rem 2rem;
  font-size: 1.1rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;
  animation: ${fadeIn} 1.5s ease-out 0.4s;
  animation-fill-mode: both;

  &:hover {
    background: #3d8b40;
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  }
`;

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem 3rem;
`;

const CategoriesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
`;

const CategorySection = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  position: relative;
  min-height: 400px;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
  }
`;

const CategoryImage = styled.div`
  height: 180px;
  background-image: url(${props => props.image});
  background-size: cover;
  background-position: center;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    background: rgba(43, 88, 118, 0.3);
  }
`;

const CategoryHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  padding: 1.5rem;
  padding-bottom: ${({ isOpen }) => (isOpen ? '1rem' : '1.5rem')};
  background: white;
  position: relative;
  z-index: 2;
`;

const CategoryTitle = styled.h2`
  color: #2b5876;
  font-size: 1.5rem;
  margin: 0;
  font-weight: 600;
`;

const CategoryContent = styled.div`
  display: ${props => props.isOpen ? 'block' : 'none'};
  animation: ${props => props.isOpen ? slideIn : 'none'} 0.5s ease forwards;
  padding: 0 1.5rem 1.5rem;
`;

const TopicList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const TopicItem = styled.li`
  padding: 0.75rem 0;
  border-bottom: 1px solid #edf2f7;
  color: #4a5568;
  cursor: pointer;
  transition: all 0.2s ease;
  font-weight: 500;

  &:hover {
    color: #2b5876;
    background-color: rgba(43, 88, 118, 0.05);
    padding-left: 5px;
  }

  &:last-child {
    border-bottom: none;
  }
`;

const FashionDesignPage = () => {
  const [openCategories, setOpenCategories] = useState({
    coreSkills: false,
    specializations: false,
    fashionBusiness: false,
    textileTechnology: false,
    fashionIllustration: false,
    patternMaking: false
  });

  const [currentHeroImage, setCurrentHeroImage] = useState(0);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroImage(prev => (prev + 1) % heroImages.length);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const toggleCategory = (category) => {
    setOpenCategories(prev =>
      Object.fromEntries(
        Object.entries(prev).map(([key]) => [key, key === category ? !prev[category] : false])
      )
    );
  };

  const handleTopicClick = (topic) => {
    const path = `/fashion-design/${topic.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
    navigate(path);
  };

  if (loading) {
    return (
      <div>
        <div style={{ height: '500px', backgroundColor: '#2b5876' }} />
        <PageContainer>
          <Skeleton height={40} width={300} style={{ marginBottom: '20px' }} />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            {[...Array(6)].map((_, i) => (
              <div key={i} style={{ background: '#fff', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', overflow: 'hidden', marginBottom: '2rem' }}>
                <Skeleton height={180} />
                <div style={{ padding: '1.5rem' }}>
                  <Skeleton height={30} width="70%" style={{ marginBottom: '15px' }} />
                  <Skeleton count={5} height={20} style={{ marginBottom: '10px' }} />
                </div>
              </div>
            ))}
          </div>
        </PageContainer>
      </div>
    );
  }

  return (
    <div>
      <HeroSection image={heroImages[currentHeroImage]}>
        <HeroContent>
          <HeroTitle>Fashion Design Academy</HeroTitle>
          <HeroSubtitle>
            Master the art of fashion with our hands-on certification program.
          </HeroSubtitle>
          <CtaButton>Explore Our Courses</CtaButton>
        </HeroContent>
      </HeroSection>

      <PageContainer>
        <CategoriesContainer>
          {Object.keys(categoryImages).map(key => (
            <CategorySection key={key}>
              <CategoryImage image={categoryImages[key]} />
              <CategoryHeader onClick={() => toggleCategory(key)} isOpen={openCategories[key]}>
                <CategoryTitle>{formatCategoryTitle(key)}</CategoryTitle>
                {openCategories[key] ? <FaChevronUp /> : <FaChevronDown />}
              </CategoryHeader>
              <CategoryContent isOpen={openCategories[key]}>
                <TopicList>
                  {getTopics(key).map((topic, index) => (
                    <TopicItem key={index} onClick={() => handleTopicClick(topic)}>
                      {topic}
                    </TopicItem>
                  ))}
                </TopicList>
              </CategoryContent>
            </CategorySection>
          ))}
        </CategoriesContainer>
      </PageContainer>
    </div>
  );
};

const formatCategoryTitle = (key) => {
  return key
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, str => str.toUpperCase());
};

const getTopics = (category) => {
  const topics = {
    coreSkills: ['Sketching and Illustration', 'Fabric Selection', 'Color Theory', 'Sewing Techniques', 'Draping'],
    specializations: ['Haute Couture', 'Ready-to-Wear', 'Bridal Wear', 'Childrenswear', 'Sustainable Fashion'],
    fashionBusiness: ['Brand Development', 'Fashion Marketing', 'Retail Management', 'E-commerce Strategies', 'Fashion Show Production'],
    textileTechnology: ['Fabric Construction', 'Dyeing Techniques', 'Digital Textile Printing', 'Smart Textiles', 'Sustainable Materials'],
    fashionIllustration: ['Technical Drawing', 'Digital Illustration', 'Fashion Croquis', 'Rendering Techniques', 'Portfolio Development'],
    patternMaking: ['Flat Pattern Making', 'Draping on Dress Form', 'Grading Techniques', 'Digital Pattern Making', 'Fit Adjustments']
  };
  return topics[category] || [];
};

export default FashionDesignPage;
