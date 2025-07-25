// src/pages/WAECPage.jsx
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

// Hero images
const heroImages = [
  'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3',
  'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3',
  'https://images.unsplash.com/photo-1544717305-2782549b5136?ixlib=rb-4.0.3'
];


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
`;

const HeroContent = styled.div`
  text-align: center;
  z-index: 2;
  max-width: 800px;
  padding: 0 2rem;
`;

const HeroTitle = styled.h1`
  color: white;
  font-size: 3rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  margin-bottom: 1rem;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const HeroSubtitle = styled.p`
  color: white;
  font-size: 1.2rem;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const SearchBar = styled.input`
  width: 100%;
  max-width: 500px;
  margin: 2rem auto;
  display: block;
  padding: 0.8rem 1rem;
  font-size: 1rem;
  border: 1px solid green;
  border-radius: 4px;
  outline: none;

  &:focus {
    border-color: var(--primary-green);
    box-shadow: 0 0 5px rgba(0, 128, 0, 0.3);
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
`;

const Card = styled.div`
  position: relative;
  background: #fffdf5;
  padding: 2rem;
  color: var(--head-color);
  border-radius: 8px;
  border: 1px solid #e0e0d1;
  transition: 0.3s;
  text-align: left;
  box-shadow: inset 0 0 5px #e0e0d1, 0 5px 15px rgba(0, 0, 0, 0.05);

  &:hover {
    transform: translateY(-5px);
    border-color: var(--primary-green);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 100px;
    height: 50px;
    background: radial-gradient(circle at top right, #fffdf5 30%, #e0e0d1 70%);
    border-bottom-left-radius: 50px;
    box-shadow: -3px 3px 6px rgba(0, 0, 0, 0.1);
    transform: rotate(0deg);
    z-index: 1;
  }
`;

const StartButton = styled(Link)`
  display: inline-block;
  background: var(--font-color);
  color: var(--head-color);
  border: 1px solid green;
  padding: 0.6rem 1.2rem;
  border-radius: 4px;
  font-weight: 600;
  transition: 0.3s;
  cursor: pointer;
  margin-top: 1rem;
  text-decoration: none; /* ADDED THIS LINE */

  &:hover {
    background: #c2c2b6ff;
    color: var(--font-color);
    box-shadow: inset 0 -3.25em 0 0 var(--head-color);
  }
`;

const WAECPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentHeroImage, setCurrentHeroImage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [subjects] = useState([
    { name: 'English Language', topics: 35, category: 'core' },
    { name: 'Mathematics', topics: 31, category: 'core' },
    { name: 'Civic Education', topics: 20, category: 'core' },
    { name: 'Yoruba', topics: 18, category: 'language' },
    { name: 'Igbo', topics: 18, category: 'language' },
    { name: 'Hausa', topics: 18, category: 'language' },

    { name: 'Physics', topics: 29, category: 'science' },
    { name: 'Chemistry', topics: 27, category: 'science' },
    { name: 'Biology', topics: 37, category: 'science' },
    { name: 'Agricultural Science', topics: 25, category: 'science' },
    { name: 'Further Mathematics', topics: 30, category: 'science' },
    { name: 'Technical Drawing', topics: 22, category: 'science' },
    { name: 'Computer Studies', topics: 20, category: 'science' },
    { name: 'Health Education', topics: 18, category: 'science' },

    { name: 'Literature in English', topics: 23, category: 'arts' },
    { name: 'Government', topics: 26, category: 'arts' },
    { name: 'History', topics: 19, category: 'arts' },
    { name: 'CRS', topics: 21, category: 'arts' },
    { name: 'IRS', topics: 21, category: 'arts' },
    { name: 'Economics', topics: 26, category: 'arts' },
    { name: 'Social Studies', topics: 17, category: 'arts' },
    { name: 'French', topics: 15, category: 'arts' },
    { name: 'Visual Arts', topics: 16, category: 'arts' },
    { name: 'Music', topics: 14, category: 'arts' },

    { name: 'Financial Accounting', topics: 24, category: 'commercial' },
    { name: 'Commerce', topics: 22, category: 'commercial' },
    { name: 'Business Management', topics: 20, category: 'commercial' },
    { name: 'Office Practice', topics: 18, category: 'commercial' },
    { name: 'Marketing', topics: 17, category: 'commercial' },

    { name: 'Food and Nutrition', topics: 19, category: 'vocational' },
    { name: 'Home Management', topics: 18, category: 'vocational' },
    { name: 'Clothing and Textiles', topics: 16, category: 'vocational' },
    { name: 'Animal Husbandry', topics: 20, category: 'vocational' },
    { name: 'Fisheries', topics: 16, category: 'vocational' },
    { name: 'Catering Craft Practice', topics: 21, category: 'vocational' },
    { name: 'Data Processing', topics: 19, category: 'vocational' },
    { name: 'Tourism', topics: 15, category: 'vocational' },
    { name: 'Photography', topics: 14, category: 'vocational' },
    { name: 'Garment Making', topics: 17, category: 'vocational' },
    { name: 'Dyeing and Bleaching', topics: 13, category: 'vocational' }
  ]);

  useEffect(() => {
    // Rotate hero images
    const interval = setInterval(() => {
      setCurrentHeroImage((prev) => (prev + 1) % heroImages.length);
    }, 8000);
    
    // Simulate loading
    const timer = setTimeout(() => setLoading(false), 1500);
    
    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, []);

  const filteredSubjects = subjects.filter(subject =>
    subject.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    subject.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <Container>
        {/* Hero Skeleton */}
        <div style={{ height: '400px', backgroundColor: '#2b5876', marginBottom: '3rem' }} />
        
        {/* Search Skeleton */}
        <Skeleton height="50px" width="500px" style={{ margin: '2rem auto', maxWidth: '100%' }} />
        
        {/* Grid Skeleton */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem', margin: '2rem 0' }}>
          {[...Array(6)].map((_, i) => (
            <div key={i} style={{ background: 'white', padding: '2rem', borderRadius: '8px' }}>
              <Skeleton height={30} width="70%" style={{ marginBottom: '1rem' }} />
              <Skeleton height={20} width="40%" style={{ marginBottom: '0.5rem' }} />
              <Skeleton height={20} width="60%" style={{ marginBottom: '1.5rem' }} />
              <Skeleton height={40} width="120px" />
            </div>
          ))}
        </div>
      </Container>
    );
  }

  return (
    // FIXED DATA-AOS ATTRIBUTE
    <Container>
      <HeroSection image={heroImages[currentHeroImage]}>
        <HeroContent>
          <HeroTitle data-aos="fade-up" data-aos-delay="100">WAEC Preparation</HeroTitle>
          <HeroSubtitle data-aos="fade-up" data-aos-delay="200">
            Get ready for WAEC with our comprehensive subject resources and practice questions.
          </HeroSubtitle>
        </HeroContent>
      </HeroSection>

      <SearchBar
        type="text"
        placeholder="Search by subject or category (e.g., science, arts)..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />

      <Grid>
        {filteredSubjects.map((subject, index) => (
          <Card key={index} data-aos="fade-up"
            data-aos-delay={100 * (index % 3)}>
            <h2>{subject.name}</h2>
            <p>Topics: {subject.topics}</p>
            <p>Category: <strong>{subject.category}</strong></p>
            <StartButton to={`/subjects/${subject.name.toLowerCase().replace(/\s+/g, '-')}`}>
              Start Learning
            </StartButton>
          </Card>
        ))}
      </Grid>
    </Container>
  );
};

export default WAECPage;