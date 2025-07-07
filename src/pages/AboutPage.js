import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import Wave from '../components/Wave/Wave';

const AboutSection = styled.section`
  position: relative;
  padding: 4rem 0;
  background-color: #f9f9ff;
  min-height: 100vh;
`;

const AboutContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  position: relative;
  z-index: 2;
`;

const AboutHero = styled.div`
  background: linear-gradient(rgba(43, 88, 118, 0.85), rgba(76, 175, 80, 0.85)),
              url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80');
  background-size: cover;
  background-position: center;
  height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: white;
  border-radius: 12px;
  margin-bottom: 3rem;
  padding: 2rem;
`;

const HeroTitle = styled.h1`
  font-size: 3rem;
  margin-bottom: 1rem;
  color: white;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.2rem;
  max-width: 700px;
  margin-bottom: 2rem;
  line-height: 1.6;
`;

const SectionTitle = styled.h2`
  text-align: center;
  color: #2d3748;
  margin-bottom: 2rem;
  font-size: 2rem;
  position: relative;
  padding-bottom: 1rem;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 3px;
    background: linear-gradient(to right, #4CAF50, #2b5876);
    border-radius: 3px;
  }
`;

const Section = styled.div`
  margin-bottom: 4rem;
  background: white;
  padding: 2.5rem;
  border-radius: 12px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
`;

const SectionContent = styled.div`
  line-height: 1.8;
  color: #4a5568;
  max-width: 900px;
  margin: 0 auto;
`;

const FocusAreas = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const FocusCard = styled.div`
  background: #f8f9fa;
  border-radius: 8px;
  padding: 1.5rem;
  text-align: center;
  transition: all 0.3s ease;
  border-top: 3px solid ${props => props.color || '#4CAF50'};

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }
`;

const FocusIcon = styled.div`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: ${props => props.color || '#4CAF50'};
`;

const FocusTitle = styled.h3`
  color: #2b5876;
  margin-bottom: 1rem;
`;

const FocusDescription = styled.p`
  color: #4a5568;
  font-size: 0.9rem;
`;

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
`;

const StatCard = styled.div`
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  text-align: center;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
`;

const StatNumber = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  color: #2b5876;
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.p`
  color: #4a5568;
  font-size: 1rem;
`;

// Skeleton Components
const SkeletonSection = styled.div`
  background: white;
  padding: 2.5rem;
  border-radius: 12px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  margin-bottom: 2rem;
`;

const SkeletonFocusGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const AboutPage = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  const focusAreas = [
    {
      id: 1,
      title: "IT & Software",
      description: "Cutting-edge courses in web development, programming, cybersecurity, and emerging technologies.",
      icon: "💻",
      color: "#2b5876"
    },
    {
      id: 2,
      title: "Fashion Design",
      description: "Comprehensive training in garment construction, pattern making, textile knowledge, and fashion entrepreneurship.",
      icon: "👗",
      color: "#e91e63"
    },
    {
      id: 3,
      title: "Leather Crafting",
      description: "Master the art of leather working from basic techniques to professional product design and business skills.",
      icon: "👜",
      color: "#795548"
    },
    {
      id: 4,
      title: "CBT Exams",
      description: "Specialized preparation for JAMB, WAEC, NECO and other computer-based examinations with adaptive learning.",
      icon: "📝",
      color: "#4CAF50"
    }
  ];

  const stats = [
    { number: "10,000+", label: "Students Enrolled" },
    { number: "150+", label: "Expert Instructors" },
    { number: "300+", label: "Courses Available" },
    { number: "95%", label: "Pass Rate" }
  ];

  return (
    <AboutSection>
      <Wave position="top" color="#2b5876" opacity="0.1" flip={false} />
      
      <AboutContainer>
        {loading ? (
          // Skeleton for hero section
          <div style={{ marginBottom: '3rem' }}>
            <Skeleton height={400} borderRadius="12px" />
          </div>
        ) : (
          <AboutHero>
            <HeroTitle>About Edenites Academy</HeroTitle>
            <HeroSubtitle>
              Pioneering a new era of accessible, practical education in technology, 
              creative arts, and academic excellence since 2023
            </HeroSubtitle>
          </AboutHero>
        )}
        
        {loading ? (
          <SkeletonSection>
            <Skeleton height={40} width="40%" style={{ margin: '0 auto 2rem' }} />
            <Skeleton count={5} />
          </SkeletonSection>
        ) : (
          <Section>
            <SectionTitle>Our Mission</SectionTitle>
            <SectionContent>
              <p>
                At Edenites Academy, we're dedicated to democratizing quality education by breaking 
                down barriers to learning. Our mission is to empower individuals across Africa and beyond 
                with practical skills that transform careers and ignite entrepreneurial ventures.
              </p>
              <p>
                We believe education should be accessible, engaging, and directly applicable to real-world 
                challenges. By combining cutting-edge technology with expert instruction, we're creating a 
                learning ecosystem that adapts to individual needs while maintaining academic rigor.
              </p>
            </SectionContent>
          </Section>
        )}
        
        {loading ? (
          <SkeletonSection>
            <Skeleton height={40} width="40%" style={{ margin: '0 auto 2rem' }} />
            <SkeletonFocusGrid>
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} height={200} />
              ))}
            </SkeletonFocusGrid>
          </SkeletonSection>
        ) : (
          <Section>
            <SectionTitle>Our Focus Areas</SectionTitle>
            <FocusAreas>
              {focusAreas.map(area => (
                <FocusCard key={area.id} color={area.color}>
                  <FocusIcon color={area.color}>{area.icon}</FocusIcon>
                  <FocusTitle>{area.title}</FocusTitle>
                  <FocusDescription>{area.description}</FocusDescription>
                </FocusCard>
              ))}
            </FocusAreas>
          </Section>
        )}
        
        {loading ? (
          <SkeletonSection>
            <Skeleton height={40} width="40%" style={{ margin: '0 auto 2rem' }} />
            <Skeleton count={4} />
          </SkeletonSection>
        ) : (
          <Section>
            <SectionTitle>Our Vision</SectionTitle>
            <SectionContent>
              <p>
                We envision an Africa where quality education is not a privilege but a fundamental right 
                accessible to all. Edenites Academy aims to become the continent's premier digital learning 
                platform, recognized for:
              </p>
              <ul>
                <li>Bridging the skills gap in emerging industries</li>
                <li>Preserving and modernizing traditional crafts</li>
                <li>Revolutionizing exam preparation through adaptive learning</li>
                <li>Creating a community of lifelong learners</li>
                <li>Fostering innovation through cross-disciplinary education</li>
              </ul>
              <p>
                By 2030, we aim to empower 1 million learners with skills that transform their economic 
                prospects while preserving cultural heritage through digital preservation.
              </p>
            </SectionContent>
          </Section>
        )}
        
        {loading ? (
          <SkeletonSection>
            <Skeleton height={40} width="40%" style={{ margin: '0 auto 2rem' }} />
            <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} height={120} width="200px" />
              ))}
            </div>
          </SkeletonSection>
        ) : (
          <Section>
            <SectionTitle>By The Numbers</SectionTitle>
            <StatsContainer>
              {stats.map((stat, index) => (
                <StatCard key={index}>
                  <StatNumber>{stat.number}</StatNumber>
                  <StatLabel>{stat.label}</StatLabel>
                </StatCard>
              ))}
            </StatsContainer>
          </Section>
        )}
        
        {loading ? (
          <SkeletonSection>
            <Skeleton height={40} width="40%" style={{ margin: '0 auto 2rem' }} />
            <Skeleton count={5} />
          </SkeletonSection>
        ) : (
          <Section>
            <SectionTitle>Our Educational Philosophy</SectionTitle>
            <SectionContent>
              <p>
                At Edenites, we embrace a 3E approach to learning:
              </p>
              <p>
                <strong>Engage:</strong> We create immersive learning experiences through interactive content, 
                practical demonstrations, and community interaction.
              </p>
              <p>
                <strong>Empower:</strong> Our courses focus on developing practical skills that students can 
                immediately apply in professional contexts or entrepreneurial ventures.
              </p>
              <p>
                <strong>Elevate:</strong> We provide pathways for continuous growth, from foundational skills 
                to advanced specializations and professional certifications.
              </p>
              <p>
                This philosophy is applied across all our programs, whether teaching Python programming, 
                leather stitching techniques, fashion pattern drafting, or exam preparation strategies.
              </p>
            </SectionContent>
          </Section>
        )}
      </AboutContainer>
      
      <Wave position="bottom" color="#2b5876" opacity="0.1" flip={true} />
    </AboutSection>
  );
};

export default AboutPage;