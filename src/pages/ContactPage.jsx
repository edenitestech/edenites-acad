// src/components/pages/ContactPage.jsx
import React, { useState } from 'react';
import styled from 'styled-components';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaPaperPlane } from 'react-icons/fa';
import Wave from '../components/Wave/Wave';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const ContactSection = styled.section`
  position: relative;
  padding: 4rem 0;
  background-color: #f9f9ff;
  min-height: 100vh;
`;

const ContactContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  position: relative;
  z-index: 2;
`;

// Update the HeroSection styled component in ContactPage.jsx
const ContactHero = styled.div`
  background: linear-gradient(135deg, rgba(43, 88, 118, 0.8), rgba(76, 175, 80, 0.8)),
              url('https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80');
  background-size: cover;
  background-position: center;
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: white;
  border-radius: 12px;
  margin-bottom: 3rem;
  padding: 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  
  @media (max-width: 768px) {
    height: 250px;
    background-position: 70% center;
  }
`;

const HeroTitle = styled.h1`
  font-size: 3rem;
  margin-bottom: 1rem;
  font-weight: bold;
  color: #0f08a3ff;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.2rem;
  max-width: 700px;
  margin: 0 auto;
  line-height: 1.6;
  font-weight: bold;
`;

const ContactContent = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 3rem;
  margin-top: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ContactInfoCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 2.5rem;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
  border-top: 4px solid #2b5876;
`;

const ContactFormCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 2.5rem;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
  border-top: 4px solid #4CAF50;
`;

const SectionTitle = styled.h2`
  color: #2d3748;
  margin-bottom: 2rem;
  font-size: 2rem;
  position: relative;
  padding-bottom: 1rem;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 60px;
    height: 3px;
    background: ${props => props.color === 'blue' ? '#2b5876' : '#4CAF50'};
    border-radius: 3px;
  }
`;

const InfoItem = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 2rem;
`;

const InfoIcon = styled.div`
  background: ${props => props.color === 'blue' ? 'rgba(43, 88, 118, 0.1)' : 'rgba(76, 175, 80, 0.1)'};
  color: ${props => props.color === 'blue' ? '#2b5876' : '#4CAF50'};
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1.5rem;
  flex-shrink: 0;
  font-size: 1.2rem;
`;

const InfoContent = styled.div``;

const InfoLabel = styled.p`
  font-weight: 600;
  color: #4a5568;
  margin-bottom: 0.5rem;
`;

const InfoText = styled.p`
  color: #6b7280;
  line-height: 1.6;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const FormLabel = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #4a5568;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: #f9f9ff;

  &:focus {
    outline: none;
    border-color: #4CAF50;
    box-shadow: 0 0 0 3px rgba(76, 175, 80, 0.1);
  }
`;

const FormTextarea = styled.textarea`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  min-height: 150px;
  transition: all 0.3s ease;
  background: #f9f9ff;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: #4CAF50;
    box-shadow: 0 0 0 3px rgba(76, 175, 80, 0.1);
  }
`;

const SubmitButton = styled.button`
  background: linear-gradient(to right, #2b5876, #4CAF50);
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  font-size: 1rem;
  transition: all 0.3s ease;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  box-shadow: 0 4px 15px rgba(43, 88, 118, 0.2);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(43, 88, 118, 0.3);
  }
`;

const PrivacyPolicy = styled.div`
  display: flex;
  align-items: center;
  margin: 1.5rem 0;
`;

const Checkbox = styled.input`
  margin-right: 0.75rem;
  accent-color: #4CAF50;
`;

const PrivacyText = styled.span`
  font-size: 0.9rem;
  color: #6b7280;

  strong {
    color: #2b5876;
    cursor: pointer;
    transition: color 0.2s;

    &:hover {
      color: #4CAF50;
    }
  }
`;

const CharacterCount = styled.p`
  text-align: right;
  color: ${props => props.count > 290 ? '#e53e3e' : '#6b7280'};
  font-size: 0.8rem;
  margin-top: 0.25rem;
`;

const SkeletonHero = styled.div`
  height: 300px;
  border-radius: 12px;
  margin-bottom: 3rem;
  width: 100%;
`;

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    phone: '',
    message: '',
    agree: false
  });

  const [loading, setLoading] = useState(true);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    // Add your form submission logic here
  };

  // Simulate loading
  setTimeout(() => setLoading(false), 800);

  return (
    <ContactSection>
      <Wave position="top" color="#2b5876" opacity="0.1" flip={false} />

      <ContactContainer>
        {loading ? (
          <>
            <SkeletonHero>
              <Skeleton height="100%" width="100%" />
            </SkeletonHero>
            
            <ContactContent>
              <ContactInfoCard>
                <Skeleton height={40} width="60%" style={{ marginBottom: '2rem' }} />
                {[...Array(3)].map((_, i) => (
                  <div key={i} style={{ display: 'flex', marginBottom: '1.5rem' }}>
                    <Skeleton circle height={50} width={50} style={{ marginRight: '1rem' }} />
                    <div style={{ flex: 1 }}>
                      <Skeleton height={20} width="40%" style={{ marginBottom: '0.5rem' }} />
                      <Skeleton height={16} width="80%" count={2} />
                    </div>
                  </div>
                ))}
              </ContactInfoCard>

              <ContactFormCard>
                <Skeleton height={40} width="60%" style={{ marginBottom: '2rem' }} />
                {[...Array(5)].map((_, i) => (
                  <div key={i} style={{ marginBottom: '1.5rem' }}>
                    <Skeleton height={20} width="30%" style={{ marginBottom: '0.5rem' }} />
                    <Skeleton height={40} />
                  </div>
                ))}
                <Skeleton height={50} width="100%" />
              </ContactFormCard>
            </ContactContent>
          </>
        ) : (
          <>
            <ContactHero>
              <HeroTitle>Contact Us</HeroTitle>
              <HeroSubtitle>
                Have questions or need assistance? Reach out to our team - we're here to help!
              </HeroSubtitle>
            </ContactHero>
            
            <ContactContent>
              <ContactInfoCard>
                <SectionTitle color="blue">Get In Touch</SectionTitle>
                
                <InfoItem>
                  <InfoIcon color="blue">
                    <FaEnvelope />
                  </InfoIcon>
                  <InfoContent>
                    <InfoLabel>Email</InfoLabel>
                    <InfoText>hello@edenites.com</InfoText>
                    <InfoText>support@edenites.com</InfoText>
                  </InfoContent>
                </InfoItem>
                
                <InfoItem>
                  <InfoIcon color="blue">
                    <FaPhone />
                  </InfoIcon>
                  <InfoContent>
                    <InfoLabel>Phone</InfoLabel>
                    <InfoText>NG: +234 806 670 8343</InfoText>
                    <InfoText>US: +1 252 404 2733</InfoText>
                  </InfoContent>
                </InfoItem>
                
                <InfoItem>
                  <InfoIcon color="blue">
                    <FaMapMarkerAlt />
                  </InfoIcon>
                  <InfoContent>
                    <InfoLabel>Address</InfoLabel>
                    <InfoText>123 Education Street</InfoText>
                    <InfoText>Learning City, Nigeria</InfoText>
                  </InfoContent>
                </InfoItem>
              </ContactInfoCard>

              <ContactFormCard>
                <SectionTitle color="green">Send Us a Message</SectionTitle>
                <form onSubmit={handleSubmit}>
                  <FormGroup>
                    <FormLabel>Full Name</FormLabel>
                    <FormInput 
                      type="text" 
                      name="name" 
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      required
                    />
                  </FormGroup>
                  
                  <FormGroup>
                    <FormLabel>Email Address</FormLabel>
                    <FormInput 
                      type="email" 
                      name="email" 
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email address"
                      required
                    />
                  </FormGroup>
                  
                  <FormGroup>
                    <FormLabel>Subject</FormLabel>
                    <FormInput 
                      type="text" 
                      name="subject" 
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="What's this about?"
                      required
                    />
                  </FormGroup>
                  
                  <FormGroup>
                    <FormLabel>Phone Number</FormLabel>
                    <FormInput 
                      type="tel" 
                      name="phone" 
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+234 (000) 000-0000"
                    />
                  </FormGroup>
                  
                  <FormGroup>
                    <FormLabel>Message</FormLabel>
                    <FormTextarea 
                      name="message" 
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="How can we help you?"
                      maxLength="300"
                      required
                    />
                    <CharacterCount count={formData.message.length}>
                      {formData.message.length}/300 characters
                    </CharacterCount>
                  </FormGroup>
                  
                  <PrivacyPolicy>
                    <Checkbox 
                      type="checkbox" 
                      name="agree" 
                      checked={formData.agree}
                      onChange={handleChange}
                      required
                    />
                    <PrivacyText>
                      I agree to the <strong>Terms of Service</strong> and <strong>Privacy Policy</strong>
                    </PrivacyText>
                  </PrivacyPolicy>
                  
                  <SubmitButton type="submit">
                    <FaPaperPlane /> Send Message
                  </SubmitButton>
                </form>
              </ContactFormCard>
            </ContactContent>
          </>
        )}
      </ContactContainer>
      
      <Wave position="bottom" color="#2b5876" opacity="0.1" flip={true} />
    </ContactSection>
  );
};

export default ContactPage;
