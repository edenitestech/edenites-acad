// src/pages/LeatherCraftingPage.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

// Hero images (leather crafting themed)
const heroImages = [
  'https://images.unsplash.com/photo-1600334129128-685c5582fd35?ixlib=rb-4.0.3',
  'https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-4.0.3',
  'https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-4.0.3'
];

// Category images
const categoryImages = {
  coreProducts: 'https://images.unsplash.com/photo-1601918774946-25832a4be0d6?ixlib=rb-4.0.3',
  techniques: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?ixlib=rb-4.0.3',
  gettingStarted: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZmFzaGlvbiUyMGRlc2lnbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60'
};

// Animations
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

const slideIn = keyframes`
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
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
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
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

const BrandsSection = styled.div`
  margin-top: 3rem;
  background: #f8f9fa;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
`;

const BrandsTitle = styled.h2`
  color: #2b5876;
  text-align: center;
  margin-bottom: 1.5rem;
  font-weight: 600;
`;

const BrandsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 1rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  }
`;

const BrandItem = styled.div`
  background: white;
  padding: 1rem;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease;
  font-weight: 500;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
  }
`;

const NewBadge = styled.span`
  background: #4CAF50;
  color: white;
  padding: 0.2rem 0.5rem;
  border-radius: 20px;
  font-size: 0.7rem;
  margin-left: 0.5rem;
  display: inline-block;
  font-weight: 500;
`;

// Skeleton components
const SkeletonContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
`;

const SkeletonCategory = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  margin-bottom: 2rem;
`;

const SkeletonBrandsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
`;

const LeatherCraftingPage = () => {
  const [openCategories, setOpenCategories] = useState({
    coreProducts: false,
    techniques: false,
    gettingStarted: false
  });

  const [currentHeroImage, setCurrentHeroImage] = useState(0);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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

  const toggleCategory = (category) => {
    setOpenCategories(prev => ({
      ...Object.keys(prev).reduce((acc, key) => {
        acc[key] = false; // Close all other categories
        return acc;
      }, {}),
      [category]: !prev[category] // Toggle current category
    }));
  };

  const handleTopicClick = (topic) => {
    const path = `/leather-crafting/${topic.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
    navigate(path);
  };

  const brands = [
    { name: 'Legitizer Cares', new: false },
    { name: 'Fiebings', new: false },
    { name: 'Barge', new: false },
    { name: 'Bee Natural', new: false },
    { name: 'Bickmore', new: false },
    { name: 'CRAFTPLUS', new: true },
    { name: 'PRO THREAD', new: true },
    { name: 'BURNER', new: true },
    { name: 'Awood', new: false },
    { name: 'Other Master', new: false }
  ];

  if (loading) {
    return (
      <div>
        {/* Hero Skeleton */}
        <div style={{ height: '500px', backgroundColor: '#2b5876' }} />
        
        <SkeletonContainer>
          {/* Categories Skeleton */}
          <Skeleton height={40} width={300} style={{ marginBottom: '20px' }} />
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            {[...Array(3)].map((_, i) => (
              <SkeletonCategory key={i}>
                <Skeleton height={180} />
                <div style={{ padding: '1.5rem' }}>
                  <Skeleton height={30} width="70%" style={{ marginBottom: '15px' }} />
                  <Skeleton count={5} height={20} style={{ marginBottom: '10px' }} />
                </div>
              </SkeletonCategory>
            ))}
          </div>
          
          {/* Brands Skeleton */}
          <Skeleton height={40} width={350} style={{ margin: '40px 0 20px' }} />
          <SkeletonBrandsGrid>
            {[...Array(10)].map((_, i) => (
              <Skeleton height={60} key={i} />
            ))}
          </SkeletonBrandsGrid>
        </SkeletonContainer>
      </div>
    );
  }

  return (
    <div>
      {/* Hero Section */}
      <HeroSection image={heroImages[currentHeroImage]}>
        <HeroContent>
          <HeroTitle>Leather Crafting</HeroTitle>
          <HeroSubtitle>
            Master traditional leatherworking techniques with our professional certification programs
          </HeroSubtitle>
          <CtaButton>Explore Our Courses</CtaButton>
        </HeroContent>
      </HeroSection>

      <PageContainer>
        <CategoriesContainer>
          <CategorySection>
            <CategoryImage image={categoryImages.coreProducts} />
            <CategoryHeader 
              onClick={() => toggleCategory('coreProducts')}
              isOpen={openCategories.coreProducts}
            >
              <CategoryTitle>Core Products</CategoryTitle>
              {openCategories.coreProducts ? <FaChevronUp /> : <FaChevronDown />}
            </CategoryHeader>
            <CategoryContent isOpen={openCategories.coreProducts}>
              <TopicList>
                <TopicItem onClick={() => handleTopicClick('Shoe Making')}>Shoe Making</TopicItem>
                <TopicItem onClick={() => handleTopicClick('Sandals')}>Sandals</TopicItem>
                <TopicItem onClick={() => handleTopicClick('Bags & Accessories')}>Bags & Accessories</TopicItem>
                <TopicItem onClick={() => handleTopicClick('Belts')}>Belts</TopicItem>
                <TopicItem onClick={() => handleTopicClick('Wallets')}>Wallets</TopicItem>
              </TopicList>
            </CategoryContent>
          </CategorySection>

          <CategorySection>
            <CategoryImage image={categoryImages.techniques} />
            <CategoryHeader 
              onClick={() => toggleCategory('techniques')}
              isOpen={openCategories.techniques}
            >
              <CategoryTitle>Techniques</CategoryTitle>
              {openCategories.techniques ? <FaChevronUp /> : <FaChevronDown />}
            </CategoryHeader>
            <CategoryContent isOpen={openCategories.techniques}>
              <TopicList>
                <TopicItem onClick={() => handleTopicClick('Leather Tooling')}>Leather Tooling</TopicItem>
                <TopicItem onClick={() => handleTopicClick('Stitching Methods')}>Stitching Methods</TopicItem>
                <TopicItem onClick={() => handleTopicClick('Finishing Techniques')}>Finishing Techniques</TopicItem>
                <TopicItem onClick={() => handleTopicClick('Leather Carving')}>Leather Carving</TopicItem>
                <TopicItem onClick={() => handleTopicClick('Leather Stamping')}>Leather Stamping</TopicItem>
              </TopicList>
            </CategoryContent>
          </CategorySection>

          <CategorySection>
            <CategoryImage image={categoryImages.gettingStarted} />
            <CategoryHeader 
              onClick={() => toggleCategory('gettingStarted')}
              isOpen={openCategories.gettingStarted}
            >
              <CategoryTitle>Getting Started</CategoryTitle>
              {openCategories.gettingStarted ? <FaChevronUp /> : <FaChevronDown />}
            </CategoryHeader>
            <CategoryContent isOpen={openCategories.gettingStarted}>
              <TopicList>
                <TopicItem onClick={() => handleTopicClick('Leather Working Tools')}>Leather Working Tools</TopicItem>
                <TopicItem onClick={() => handleTopicClick('Sewing Leather')}>Sewing Leather</TopicItem>
                <TopicItem onClick={() => handleTopicClick('Dyeing & Finishing')}>Dyeing & Finishing</TopicItem>
                <TopicItem onClick={() => handleTopicClick('Belt Making')}>Belt Making</TopicItem>
                <TopicItem onClick={() => handleTopicClick('Pattern Making')}>Pattern Making</TopicItem>
              </TopicList>
            </CategoryContent>
          </CategorySection>
        </CategoriesContainer>

        {/* Brands Section */}
        <BrandsSection>
          <BrandsTitle>Featured Brands & Supplies</BrandsTitle>
          <BrandsGrid>
            {brands.map((brand, index) => (
              <BrandItem key={index}>
                {brand.name}
                {brand.new && <NewBadge>NEW</NewBadge>}
              </BrandItem>
            ))}
          </BrandsGrid>
        </BrandsSection>
      </PageContainer>
    </div>
  );
};

export default LeatherCraftingPage;