import React, { useState } from 'react';
import styled from 'styled-components';
import Wave from '../Wave/Wave';

// Main container with proper wave integration
const FAQSection = styled.section`
  position: relative;
  padding: 1rem 0 1rem;
  background-color: #f9f9ff;
  overflow: hidden;
`;

// Content container with proper spacing
const FAQContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 0 2rem;
  position: relative;
  z-index: 2;
`;

const FAQTitle = styled.h1`
  text-align: center;
  color: #2d3748;
  margin-bottom: 2rem;
  font-size: 2.5rem;
  position: relative;
`;

const FAQItem = styled.div`
  margin-bottom: 1.5rem;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  color: #2b5876;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
  background: white;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }
`;

const FAQQuestion = styled.button`
  width: 100%;
  padding: 1.5rem;
  text-align: left;
  background: #f8f9fa;
  border: none;
  outline: none;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.1rem;
  font-weight: 600;
  color: #2b5876;
  transition: all 0.3s ease;

  &:hover {
    background: #e0e8f0;
  }
`;

const FAQAnswer = styled.div`
  padding: ${({ isOpen }) => isOpen ? '1.5rem' : '0 1.5rem'};
  background: white;
  border-top: ${({ isOpen }) => isOpen ? '1px solid #e0e0e0' : 'none'};
  color: rgb(91, 121, 114);
  line-height: 1.6;
  max-height: ${({ isOpen }) => isOpen ? '500px' : '0'};
  overflow: hidden;
  transition: all 0.3s ease;
`;

const Icon = styled.span`
  font-size: 1.2rem;
  transition: transform 0.3s ease;
  transform: ${({ isOpen }) => (isOpen ? 'rotate(180deg)' : 'rotate(0)')};
  color: #4a5568;
`;

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "What is Edenites Academy?",
      answer: "Edenites Academy is a premier e-learning platform offering specialized courses in IT and Software, Leather Crafting, Fashion Design, and STEM subjects (covering JAMB, NECO, WAEC curricula). We provide quality education through interactive lessons, practical demonstrations, and comprehensive study materials."
    },
    {
      question: "How much does Edenites Academy cost?",
      answer: "We offer flexible learning options: Basic access is free with limited content. Our premium plans include Monthly (₦7,500/$5.98), Quarterly (₦16,500/$15.98), Bi-Annual (₦42,500/$32.98), and Annual (₦50,000/$49.98) subscriptions. Some specialized courses in leather crafting and fashion design may have additional material fees."
    },
    {
      question: "What is included in an Edenites Academy subscription?",
      answer: "Your subscription gives you unlimited access to: video lessons, downloadable course materials, practical project guides, live Q&A sessions, practice exams (for STEM subjects), pattern templates (for fashion design), and community forums. Premium members also get personalized feedback on projects."
    },
    {
      question: "Where can I access Edenites Academy courses?",
      answer: "You can learn on any device - smartphone, tablet, computer, or smart TV. Our platform is optimized for all screen sizes. For practical courses like leather crafting, we recommend using a tablet or computer for better visibility of detailed techniques."
    },
    {
      question: "How do I cancel my subscription?",
      answer: "You can cancel anytime in your account settings with just two clicks. We don't believe in making cancellation difficult - we'd rather earn your continued membership through quality content."
    },
    {
      question: "What IT and Software courses do you offer?",
      answer: "Our IT curriculum includes: Web Development (HTML, CSS, JavaScript, React), Python Programming, Database Management, UI/UX Design, Mobile App Development, and introductory courses in Artificial Intelligence and Cybersecurity."
    },
    {
      question: "Can I get certified in leather crafting or fashion design?",
      answer: "Yes! We offer certification programs for both disciplines. Our leather crafting certification covers tool handling, pattern making, stitching techniques, and business aspects. Fashion design certification includes pattern drafting, garment construction, textile knowledge, and fashion entrepreneurship."
    },
    {
      question: "How does your STEM program help with JAMB/WAEC/NECO exams?",
      answer: "Our STEM program provides: Comprehensive topic coverage, past question analysis, exam strategies, interactive quizzes with instant feedback, personalized performance tracking, and live revision classes before major exams. We align our content with the latest exam syllabi."
    },
    {
      question: "Do you provide materials for practical courses?",
      answer: "While we provide digital resources and supply lists, physical materials are not included. However, we've partnered with suppliers to offer discounted starter kits for leather crafting and fashion design students, available through our marketplace."
    },
    {
      question: "Is there community support for learners?",
      answer: "Absolutely! Each course has its own discussion forum. We also host weekly live sessions where students can ask questions. Our leather crafting and fashion design communities are particularly active, with members sharing projects and tips regularly."
    },
    {
      question: "What makes Edenites Academy different from other e-learning platforms?",
      answer: "Our unique blend of technical (IT/STEM) and creative (fashion/leather) courses sets us apart. We emphasize practical, project-based learning across all disciplines. Our instructors are industry practitioners, not just academics. Plus, our African-centric approach makes our content particularly relevant for local exams and markets."
    }
  ];

  return (
    <FAQSection id="faq">
      <Wave position="top" color="#2b5876" opacity="0.1" flip={false} />
      
      <FAQContent>
        <FAQTitle>Frequently Asked Questions</FAQTitle>
        {faqs.map((faq, index) => (
          <FAQItem key={index}>
            <FAQQuestion onClick={() => toggleFAQ(index)}>
              {faq.question}
              <Icon isOpen={activeIndex === index}>▼</Icon>
            </FAQQuestion>
            <FAQAnswer isOpen={activeIndex === index}>
              {faq.answer}
            </FAQAnswer>
          </FAQItem>
        ))}
      </FAQContent>
      
      <Wave position="bottom" color="#2b5876" opacity="0.1" flip={true} />
    </FAQSection>
  );
};

export default FAQ;


