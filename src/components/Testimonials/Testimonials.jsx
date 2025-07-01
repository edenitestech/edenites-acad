import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { FaChevronLeft, FaChevronRight, FaStar } from 'react-icons/fa';
// import Wave from '../Wave/Wave';

// Academic-themed background image from Unsplash API
const academicBackground =
  'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3';


const TestimonialsContainer = styled.section`
  padding: 2rem 0;
  background: linear-gradient(rgba(255, 255, 255, 0.85), rgba(248, 249, 250, 0.9)),
    url(${academicBackground}) center/cover no-repeat fixed;
  background-attachment: fixed;
  position: relative;
  overflow: hidden;
  color: #333;

  /* Fallback for mobile devices */
  @media (max-width: 950px) {
    background-attachment: scroll;
  }
`;

// const TestimonialsContainer = styled.section`
//   padding: 2rem 0;
//   position: relative;
//   background: ${({ theme }) => theme.colors.white};


//   /* Fallback for mobile devices */
//   @media (max-width: 950px) {
//     background-attachment: scroll;
//   }
// `;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
  position: relative;
  z-index: 2;
`;

const Title = styled.h2`
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 3rem;
  color: ${({ theme }) => theme.colors.primary};
  font-family: ${({ theme }) => theme.fonts.primary};
  font-weight: ${({ theme }) => theme.fontWeights.semiBold};

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const TestimonialsGrid = styled.div`
  display: flex;
  transition: transform 0.5s ease, opacity 0.5s ease;
  transform: translateX(${props => -props.currentIndex * props.cardWidth}%);
  opacity: ${props => (props.isAnimating ? 0.7 : 1)};
  touch-action: pan-y;
`;

const TestimonialCard = styled.div`
  width: calc(100% / ${props => props.cardsPerView} - 2rem);
  background: ${({ theme }) => theme.colors.white};
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  margin: 0 1rem;
  flex-shrink: 0;
  transition: all 0.3s ease;
  border: 1px solid ${({ theme }) => theme.colors.primary}20;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
    cursor: pointer;
  }

  @media (max-width: 768px) {
    width: calc(100% / ${props => props.tabletCardsPerView} - 2rem);
  }

  @media (max-width: 480px) {
    width: calc(100% / ${props => props.mobileCardsPerView} - 2rem);
  }
`;

const TestimonialHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const Avatar = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid ${({ theme }) => theme.colors.secondary};
`;

const UserInfo = styled.div`
  h4 {
    font-size: 1.1rem;
    margin-bottom: 0.25rem;
    color: ${({ theme }) => theme.colors.primary};
    font-family: ${({ theme }) => theme.fonts.primary};
  }

  p {
    color: #666;
    font-size: 0.85rem;
    font-family: ${({ theme }) => theme.fonts.secondary};
  }
`;

const Quote = styled.p`
  font-style: italic;
  color: #555;
  line-height: 1.6;
  font-size: 0.95rem;
  margin-bottom: 1.5rem;
  font-family: ${({ theme }) => theme.fonts.secondary};
`;

const Rating = styled.div`
  color: #ffc107;
  font-size: 1rem;
  display: flex;
  gap: 0.2rem;
`;

const NavButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  transition: all 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.secondary};
  }

  &:first-of-type {
    left: 0;
  }

  &:last-of-type {
    right: 0;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const DotsContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
  gap: 0.5rem;
`;

const Dot = styled.button`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${props => (props.active ? props.theme.colors.primary : '#ccc')};
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.secondary};
  }
`;


// Testimonials data with online images
const testimonials = [
  {
    id: 1,
    name: 'Henry Ifeanyi',
    role: 'Software Developer',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    quote:
      'Edenites Academy transformed my career. The AWS certification course helped me land my dream job at Amazon!',
    rating: 5
  },
  {
    id: 2,
    name: 'Chinaza Miracle O',
    role: 'Fashion Designer',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    quote:
      'The leather crafting courses are exceptional. I started my own business after completing just two courses!',
    rating: 5
  },
  {
    id: 3,
    name: 'Clara Ede-Nwegede',
    role: 'Data Analyst',
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
    quote:
      'The data science curriculum is comprehensive and practical. I applied what I learned immediately at work.',
    rating: 4
  },
  {
    id: 4,
    name: 'Emeka Okoro',
    role: 'JAMB Candidate',
    avatar: 'https://randomuser.me/api/portraits/men/75.jpg',
    quote:
      'The JAMB prep materials were spot on! I scored 320 thanks to the practice questions and time management tips.',
    rating: 5
  },
  {
    id: 5,
    name: 'Amina Mohammed',
    role: 'Fashion Entrepreneur',
    avatar: 'https://randomuser.me/api/portraits/women/63.jpg',
    quote:
      'The business modules in the fashion design course helped me structure my startup properly. Highly recommended!',
    rating: 5
  },
  {
    id: 6,
    name: 'Oluwaseun Adebayo',
    role: 'IT Consultant',
    avatar: 'https://randomuser.me/api/portraits/men/81.jpg',
    quote:
      'The Microsoft certification track gave me the credibility I needed to attract high-paying clients.',
    rating: 4
  }
];

// ───────────────────────────────────────────────────────────────────────────────
// Main Component
const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(3);
  const [cardWidth, setCardWidth] = useState(100 / 3);
  const [isAnimating, setIsAnimating] = useState(false);
  const gridRef = useRef(null);

  // Handle responsive layout
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setCardsPerView(3);
        setCardWidth(100 / 3);
      } else if (window.innerWidth >= 768) {
        setCardsPerView(2);
        setCardWidth(100 / 2);
      } else {
        setCardsPerView(1);
        setCardWidth(100);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Auto-slide every 5 seconds
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => {
        if (prev + cardsPerView >= testimonials.length) {
          return 0;
        }
        return prev + cardsPerView;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [cardsPerView, testimonials.length]);

  const triggerSlide = newIndex => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex(newIndex);
      setIsAnimating(false);
    }, 300);
  };

  const handlePrev = () => {
    triggerSlide(Math.max(currentIndex - cardsPerView, 0));
  };

  const handleNext = () => {
    const totalPages = Math.ceil(testimonials.length / cardsPerView);
    triggerSlide(
      Math.min(currentIndex + cardsPerView, (totalPages - 1) * cardsPerView)
    );
  };

  return (
    <TestimonialsContainer>
      <Container>
        {/* <Wave position="top" color="#2b5876" opacity="0.05" flip={false} /> */}
        <Title>What Our Students Say</Title>

        <NavButton onClick={handlePrev} disabled={currentIndex === 0}>
          <FaChevronLeft />
        </NavButton>

        <TestimonialsGrid
          ref={gridRef}
          currentIndex={currentIndex}
          cardWidth={cardWidth}
          isAnimating={isAnimating}
        >
          {testimonials.map(testimonial => (
            <TestimonialCard
              key={testimonial.id}
              cardsPerView={cardsPerView}
              tabletCardsPerView={2}
              mobileCardsPerView={1}
            >
              <TestimonialHeader>
                <Avatar
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  loading="lazy"
                  onError={e => {
                    e.target.src = 'https://via.placeholder.com/50';
                    e.target.onerror = null;
                  }}
                  draggable="false"
                />
                <UserInfo>
                  <h4>{testimonial.name}</h4>
                  <p>{testimonial.role}</p>
                </UserInfo>
              </TestimonialHeader>
              <Quote>"{testimonial.quote}"</Quote>
              <Rating>
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i}>★</span>
                ))}
              </Rating>
            </TestimonialCard>
          ))}
        </TestimonialsGrid>

        <DotsContainer>
          {Array.from({ length: Math.ceil(testimonials.length / cardsPerView) }).map(
            (_, index) => (
              <Dot
                key={index}
                active={currentIndex / cardsPerView === index}
                onClick={() => triggerSlide(index * cardsPerView)}
              />
            )
          )}
        </DotsContainer>

        <NavButton
          onClick={handleNext}
          disabled={currentIndex + cardsPerView >= testimonials.length}
        >
          <FaChevronRight />
        </NavButton>
        {/* <Wave position="bottom" color="#2b5876" opacity="0.05" flip={true} /> */}
      </Container>
    </TestimonialsContainer>
  );
};

export default Testimonials;
