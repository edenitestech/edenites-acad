import React, { useState } from 'react';
import styled from 'styled-components';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import Wave from '../components/Wave/Wave';

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
  display: flex;
  gap: 3rem;
  position: relative;
  z-index: 2;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const ContactInfo = styled.div`
  flex: 1;
  padding: 2rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
`;

const ContactForm = styled.div`
  flex: 1;
  padding: 2rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
`;

const ContactTitle = styled.h1`
  color: #2d3748;
  margin-bottom: 2rem;
  font-size: 2.5rem;
  text-align: center;
`;

const InfoTitle = styled.h3`
  color: #2b5876;
  margin-bottom: 1.5rem;
`;

const InfoItem = styled.div`
  margin-bottom: 1.5rem;
`;

const InfoLabel = styled.p`
  font-weight: 600;
  color: #4a5568;
  margin-bottom: 0.5rem;
`;

const InfoText = styled.p`
  color: #6b7280;
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
  padding: 0.75rem;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  font-size: 1rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #4CAF50;
    box-shadow: 0 0 0 3px rgba(76, 175, 80, 0.1);
  }
`;

const FormTextarea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  font-size: 1rem;
  min-height: 120px;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #4CAF50;
    box-shadow: 0 0 0 3px rgba(76, 175, 80, 0.1);
  }
`;

const SubmitButton = styled.button`
  background: #4CAF50;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
  width: 100%;
  
  &:hover {
    background: #3d8b40;
  }
`;

const PrivacyPolicy = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const Checkbox = styled.input`
  margin-right: 0.5rem;
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
  };

  // Simulate loading
  setTimeout(() => setLoading(false), 800);

  return (
    <ContactSection>
      <Wave position="top" color="#2b5876" opacity="0.1" flip={false} />
      
      <ContactTitle>Contact Us</ContactTitle>
      
      <ContactContainer>
        {loading ? (
          // Skeleton loading for contact info
          <ContactInfo>
            <Skeleton height={40} width="60%" style={{ marginBottom: '2rem' }} />
            {[...Array(3)].map((_, i) => (
              <div key={i} style={{ marginBottom: '1.5rem' }}>
                <Skeleton height={20} width="40%" style={{ marginBottom: '0.5rem' }} />
                <Skeleton height={16} width="80%" />
              </div>
            ))}
          </ContactInfo>
        ) : (
          <ContactInfo>
            <InfoTitle>Get In Touch</InfoTitle>
            
            <InfoItem>
              <InfoLabel>Email</InfoLabel>
              <InfoText>hello@edenites.com</InfoText>
            </InfoItem>
            
            <InfoItem>
              <InfoLabel>Phone</InfoLabel>
              <InfoText>NG: +234 806 670 8343</InfoText>
              <InfoText>US: +1 252 404 2733</InfoText>
            </InfoItem>
            
            <InfoItem>
              <InfoLabel>Address</InfoLabel>
              <InfoText>123 Education St, Learning City</InfoText>
            </InfoItem>
          </ContactInfo>
        )}
        
        {loading ? (
          // Skeleton loading for contact form
          <ContactForm>
            {[...Array(5)].map((_, i) => (
              <div key={i} style={{ marginBottom: '1.5rem' }}>
                <Skeleton height={20} width="30%" style={{ marginBottom: '0.5rem' }} />
                <Skeleton height={40} />
              </div>
            ))}
            <Skeleton height={40} width="100%" />
          </ContactForm>
        ) : (
          <ContactForm>
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
                  placeholder="Enter your subject"
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
                  placeholder="Enter your message here"
                  maxLength="300"
                  required
                />
                <p style={{ textAlign: 'right', color: '#6b7280', fontSize: '0.8rem' }}>
                  {formData.message.length}/300
                </p>
              </FormGroup>
              
              <PrivacyPolicy>
                <Checkbox 
                  type="checkbox" 
                  name="agree" 
                  checked={formData.agree}
                  onChange={handleChange}
                  required
                />
                <span>I agree to our <strong>Privacy Policy</strong> terms</span>
              </PrivacyPolicy>
              
              <SubmitButton type="submit">
                Submit Form →
              </SubmitButton>
            </form>
          </ContactForm>
        )}
      </ContactContainer>
      
      <Wave position="bottom" color="#2b5876" opacity="0.1" flip={true} />
    </ContactSection>
  );
};

export default ContactPage;