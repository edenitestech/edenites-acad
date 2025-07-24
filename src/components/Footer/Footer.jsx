import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube } from 'react-icons/fa';
import { MdEmail, MdPhone, MdLocationOn } from 'react-icons/md';
import { FaPaperPlane } from 'react-icons/fa';
import logo from '../../assets/images/eden-acada logo.png';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import styled from 'styled-components';

// Styled components
const FooterContainer = styled.footer`
  background: linear-gradient(to left, #4CAF50 0%, #2b5876 100%);
  color: white;
  position: relative;
  padding-top: 80px;
`;

const FooterWave = styled.div`
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
    height: 80px;
  }
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem 2rem;
`;

const FooterMain = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;
  margin-bottom: 3rem;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 2fr;
  }
`;

const FooterBrand = styled.div`
  max-width: 300px;
`;

const FooterLogo = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 1rem;
  gap: 0.5rem;
`;

const FooterLogoImg = styled.img`
  width: 45px;
  height: 45px;
  border-radius: 50%;
  object-fit: cover;

  &:hover {
    cursor: pointer;
    transform: scale(1.1);
    transition: .3s ease-in-out;
  }
`;

const FooterText = styled.p`
  opacity: 0.8;
  margin-bottom: 1.5rem;
  line-height: 1.6;
  font-size: 0.95rem;
`;

const FooterSocials = styled.div`
  display: flex;
  gap: 1rem;
`;

const SocialLink = styled.a`
  color: white;
  background-color: rgba(255, 255, 255, 0.1);
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: white;
    color: #2b5876;
    transform: translateY(-3px);
  }
`;

const FooterSections = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  width: 100%;

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const FooterSection = styled.div`
  margin-bottom: 1rem;
`;

const FooterTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  position: relative;
  padding-bottom: 0.5rem;
  
  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    width: 45px;
    height: 2px;
    background: white;
  }
`;

const FooterList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const FooterListItem = styled.li`
  margin-bottom: 0.8rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  a {
    color: rgba(255, 255, 255, 0.7);
    text-decoration: none;
    font-size: 0.9rem;
    transition: all 0.3s ease;
    
    &:hover {
      color: white;
      padding-left: 5px;
    }
  }
  
  svg {
    min-width: 20px;
  }
`;

const FooterBottom = styled.div`
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
  }
`;

const FooterCopyright = styled.p`
  font-size: 0.85rem;
  opacity: 0.8;
`;

const FooterLegal = styled.div`
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
  justify-content: center;
  
  a {
    color: rgba(255, 255, 255, 0.6);
    font-size: 0.85rem;
    text-decoration: none;
    transition: color 0.3s ease;
    
    &:hover {
      color: white;
    }
  }
`;

// Newsletter Styles
const NewsletterSection = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 1.5rem;
  margin-top: 1rem;
`;

const NewsletterTitle = styled.h4`
  font-size: 1.2rem;
  margin-bottom: 1rem;
  color: white;
`;

const NewsletterText = styled.p`
  font-size: 0.9rem;
  margin-bottom: 1.5rem;
  opacity: 0.8;
`;

const NewsletterForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const NewsletterInput = styled.input`
  padding: 0.75rem 1rem;
  border: none;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.9);
  font-size: 1rem;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(76, 175, 80, 0.5);
  }
`;

const NewsletterButton = styled.button`
  background: white;
  color: #2b5876;
  border: none;
  padding: 0.75rem;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  
  &:hover {
    background: #f0f0f0;
    transform: translateY(-2px);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  }
`;

// Skeleton components
const SkeletonFooter = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  
  @media (min-width: 768px) {
    grid-template-columns: 1fr 2fr;
  }
`;

const SkeletonSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Footer = () => {
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      // Simulate API call
      setTimeout(() => {
        setSubscribed(true);
        setEmail('');
        setTimeout(() => setSubscribed(false), 3000);
      }, 500);
    }
  };

  if (loading) {
    return (
      <FooterContainer>
        <FooterWave>
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" fill="#2b5876"></path>
            <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" fill="#2b5876"></path>
            <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" fill="#2b5876"></path>
          </svg>
        </FooterWave>
        
        <FooterContent>
          <SkeletonFooter>
            <SkeletonSection>
              <Skeleton width={150} height={30} />
              <Skeleton width={200} height={100} />
              <Skeleton width={200} height={40} />
            </SkeletonSection>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
              {[...Array(3)].map((_, i) => (
                <SkeletonSection key={i}>
                  <Skeleton width={120} height={30} />
                  <Skeleton count={5} height={20} />
                </SkeletonSection>
              ))}
              
              <SkeletonSection>
                <Skeleton width={120} height={30} />
                <Skeleton height={20} />
                <Skeleton height={40} />
                <Skeleton width={100} height={40} />
              </SkeletonSection>
            </div>
          </SkeletonFooter>
          
          <FooterBottom>
            <Skeleton width={250} />
            <div style={{ display: 'flex', gap: '1rem' }}>
              <Skeleton width={80} />
              <Skeleton width={80} />
              <Skeleton width={80} />
            </div>
          </FooterBottom>
        </FooterContent>
      </FooterContainer>
    );
  }

  return (
    <FooterContainer>
      <FooterWave>
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" fill="#2b5876"></path>
          <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" fill="#2b5876"></path>
          <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" fill="#2b5876"></path>
        </svg>
      </FooterWave>
      
      <FooterContent>
        <FooterMain>
          <FooterBrand>
            <FooterLogo>
              {logo ? (
                <FooterLogoImg src={logo} alt="Edenites Academy Logo" />
              ) : (
                <div style={{ 
                  width: '45px', 
                  height: '45px', 
                  background: 'white', 
                  borderRadius: '50%', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  color: '#2b5876',
                  fontWeight: 'bold'
                }}>
                  EA
                </div>
              )}
              <span>Edenites Academy</span>
            </FooterLogo>
            <FooterText>
              Empowering learners with expert-led courses in IT & Software, Fashion Design, 
              Leather Crafting, and CBT Exam preparation.
            </FooterText>
            
            <FooterSocials>
              <SocialLink href="#" aria-label="Facebook"><FaFacebook /></SocialLink>
              <SocialLink href="#" aria-label="Twitter"><FaTwitter /></SocialLink>
              <SocialLink href="#" aria-label="Instagram"><FaInstagram /></SocialLink>
              <SocialLink href="#" aria-label="LinkedIn"><FaLinkedin /></SocialLink>
              <SocialLink href="#" aria-label="YouTube"><FaYoutube /></SocialLink>
            </FooterSocials>
            
            <div style={{ marginTop: '1.5rem' }}>
              <FooterListItem>
                <MdLocationOn />
                <span>21 Afikpo Road, Abakaliki</span>
              </FooterListItem>
              <FooterListItem>
                <MdPhone />
                <span>+2348158550401</span>
              </FooterListItem>
              <FooterListItem>
                <MdEmail />
                <span>edenitenigerialtd@gmail.com</span>
              </FooterListItem>
            </div>
          </FooterBrand>

          <FooterSections>
            <FooterSection>
              <FooterTitle>Quick Links</FooterTitle>
              <FooterList>
                <FooterListItem><Link to="/">Home</Link></FooterListItem>
                <FooterListItem><Link to="/courses">Courses</Link></FooterListItem>
                <FooterListItem><Link to="/about">About Us</Link></FooterListItem>
                <FooterListItem><Link to="/contact">Contact</Link></FooterListItem>
                <FooterListItem><Link to="/faq">FAQs</Link></FooterListItem>
                <FooterListItem><Link to="/blog">Blog</Link></FooterListItem>
              </FooterList>
            </FooterSection>

            <FooterSection>
              <FooterTitle>Programs</FooterTitle>
              <FooterList>
                <FooterListItem><Link to="/it-software">IT & Software</Link></FooterListItem>
                <FooterListItem><Link to="/fashion-design">Fashion Design</Link></FooterListItem>
                <FooterListItem><Link to="/leather-crafting">Leather Crafting</Link></FooterListItem>
                <FooterListItem><Link to="/cbt-exams">CBT Exams</Link></FooterListItem>
                <FooterListItem><Link to="/certifications">Certifications</Link></FooterListItem>
              </FooterList>
            </FooterSection>

            <FooterSection>
              <FooterTitle>Newsletter</FooterTitle>
              <NewsletterSection>
                <NewsletterTitle>Stay Updated</NewsletterTitle>
                <NewsletterText>
                  Subscribe to our newsletter for course updates, discounts, and learning tips.
                </NewsletterText>
                
                {subscribed ? (
                  <div style={{ 
                    background: 'rgba(76, 175, 80, 0.2)', 
                    padding: '1rem', 
                    borderRadius: '8px',
                    textAlign: 'center'
                  }}>
                    Thank you for subscribing!
                  </div>
                ) : (
                  <NewsletterForm onSubmit={handleSubscribe}>
                    <NewsletterInput
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    <NewsletterButton type="submit">
                      <FaPaperPlane /> Subscribe
                    </NewsletterButton>
                  </NewsletterForm>
                )}
              </NewsletterSection>
            </FooterSection>
          </FooterSections>
        </FooterMain>

        <FooterBottom>
          <FooterCopyright>
            &copy; {new Date().getFullYear()} Edenites Academy. All rights reserved.
          </FooterCopyright>
          <FooterLegal>
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms of Service</Link>
            <Link to="/cookies">Cookie Policy</Link>
          </FooterLegal>
        </FooterBottom>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;