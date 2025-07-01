// src/pages/ITSoftwarePage.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { FaArrowRight, FaDownload } from 'react-icons/fa';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

// Hero images
const heroImages = [
  'https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?ixlib=rb-4.0.3',
  'https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3',
  'https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-4.0.3'
];

// Animation for heading
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// Styled components
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
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
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
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin: 0 auto;

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

const SectionTitle = styled.h2`
  color: #2b5876;
  font-size: 2rem;
  margin-bottom: 1.5rem;
  font-weight: 600;
`;

const SectionSubtitle = styled.p`
  color: #718096;
  margin-bottom: 2rem;
  font-size: 1.1rem;
`;

const CategoriesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
`;

const CategoryCard = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

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
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(43, 88, 118, 0.3);
  }
`;

const CategoryContent = styled.div`
  padding: 1.5rem;
`;

const CategoryTitle = styled.h3`
  color: #2b5876;
  margin-bottom: 1rem;
  font-weight: 600;
`;

const CategoryDescription = styled.p`
  color: #718096;
  margin-bottom: 1.5rem;
  line-height: 1.5;
`;

const ExploreButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: transparent;
  border: none;
  color: #2b5876;
  font-weight: 600;
  cursor: pointer;
  padding: 0;
  transition: color 0.3s ease;

  &:hover {
    color: #1e3c5e;
    text-decoration: underline;
  }
`;

const SkeletonContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
`;

const SkeletonGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const ITSoftwarePage = () => {
  const [currentHeroImage, setCurrentHeroImage] = useState(0);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // All categories data
  const categories = [
    {
      id: 'certifications',
      title: 'Certifications',
      description: 'Professional certification programs to validate your IT skills',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3',
    },
    {
      id: 'development',
      title: 'Development',
      description: 'Master software development across multiple platforms and languages',
      image: 'https://images.unsplash.com/photo-1619410283995-43d9134e7656?ixlib=rb-4.0.3',
    },
    {
      id: 'popular_topics',
      title: 'Popular Topics',
      description: 'Cutting-edge technologies shaping the future of IT',
      image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3',
    },
    {
      id: 'network_security',
      title: 'Network & Security',
      description: 'Secure and optimize network infrastructures',
      image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3',
    },
    {
      id: 'hardware',
      title: 'Hardware',
      description: 'Master computer hardware and embedded systems',
      image: 'https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?ixlib=rb-4.0.3',
    },
    {
      id: 'operating_systems',
      title: 'Operating Systems',
      description: 'Learn system administration across platforms',
      image: 'https://images.unsplash.com/photo-1597852074816-d933c7d2b988?ixlib=rb-4.0.3',
    }
  ];

  // Rotate hero images every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroImage((prev) => (prev + 1) % heroImages.length);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleCategoryClick = (categoryId) => {
    navigate(`/it-software/${categoryId}`);
  };

  if (loading) {
    return (
      <div>
        {/* Hero Skeleton */}
        <div style={{ height: '500px', backgroundColor: '#2b5876' }} />
        
        <SkeletonContainer>
          <Skeleton height={40} width={300} />
          <Skeleton height={25} width={400} style={{ marginTop: '15px' }} />
          
          <SkeletonGrid>
            {[...Array(6)].map((_, i) => (
              <div key={i}>
                <Skeleton height={180} />
                <Skeleton height={30} style={{ marginTop: '15px' }} />
                <Skeleton count={2} style={{ marginTop: '10px' }} />
                <Skeleton height={20} width={120} style={{ marginTop: '15px' }} />
              </div>
            ))}
          </SkeletonGrid>
        </SkeletonContainer>
      </div>
    );
  }

  return (
    <div>
      {/* Hero Section */}
      <HeroSection image={heroImages[currentHeroImage]}>
        <HeroContent>
          <HeroTitle>IT & Software Academy</HeroTitle>
          <HeroSubtitle>
            Master cutting-edge technologies with our professional programs
          </HeroSubtitle>
          <CtaButton onClick={() => navigate('/it-software/courses')}>
            Explore All Courses <FaArrowRight />
          </CtaButton>
        </HeroContent>
      </HeroSection>

      <PageContainer>
        <SectionTitle>Our IT & Software Categories</SectionTitle>
        <SectionSubtitle>
          Browse through our comprehensive course categories
        </SectionSubtitle>

        <CategoriesGrid>
          {categories.map((category) => (
            <CategoryCard 
              key={category.id}
              onClick={() => handleCategoryClick(category.id)}
            >
              <CategoryImage image={category.image} />
              <CategoryContent>
                <CategoryTitle>{category.title}</CategoryTitle>
                <CategoryDescription>{category.description}</CategoryDescription>
                <ExploreButton>
                  Explore Courses <FaArrowRight />
                </ExploreButton>
              </CategoryContent>
            </CategoryCard>
          ))}
        </CategoriesGrid>
      </PageContainer>
    </div>
  );
};

export default ITSoftwarePage;