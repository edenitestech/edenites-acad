// src/components/ExploreDropdown/ExploreDropdown.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronRight, FaChevronDown } from 'react-icons/fa';

const ExploreDropdownContainer = styled.div`
  position: relative;
  display: inline-block;
  ${({ $mobile }) => $mobile && `
    width: 100%;
    margin-bottom: 1rem;
  `}
`;

const ExploreButton = styled.button`
  background: none;
  border: none;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  font-weight: 600;
  color: ${({ scrolled }) => scrolled ? '#2b5876' : '#3182ce'};
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.3rem;
  transition: all 0.2s ease;
  position: relative;
  
  &:hover {
    color: #3182ce;
  }
  
  &:after {
    content: '';
    position: absolute;
    width: ${({ $isActive }) => ($isActive ? '100%' : '0')};
    height: 2px;
    bottom: 0;
    left: 0;
    background-color: #3182ce;
    transition: width 0.3s ease;
  }
  
  &:hover:after {
    width: 100%;
  }
  
  ${({ $mobile }) => $mobile && `
    width: 100%;
    justify-content: space-between;
    padding: 0.75rem 0;
    font-size: 1.1rem;
    color: #2b5876;
  `}
`;

const DropdownContent = styled(motion.div)`
  position: absolute;
  top: 100%;
  left: 0;
  background: white;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
  border-radius: 12px;
  padding: 1.5rem;
  z-index: 1000;
  width: 900px;
  max-width: 95vw;
  overflow: hidden;
  max-height: ${({ $mobile }) => $mobile ? '70vh' : 'none'};
  overflow-y: ${({ $mobile }) => $mobile ? 'auto' : 'visible'};

  ${({ $mobile }) => $mobile && `
    position: static;
    width: 100%;
    box-shadow: none;
    padding: 1rem 0 0 0.5rem;
    background: transparent;
  `}
`;

const DropdownGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  
  ${({ $mobile }) => $mobile && `
    grid-template-columns: 1fr;
    gap: 1rem;
  `}
`;

const DropdownSection = styled.div`
  h4 {
    color: #2b5876;
    margin-bottom: 1rem;
    font-size: 1.1rem;
    font-weight: 700;
    padding-bottom: 0.5rem;
    border-bottom: 2px solid #4CAF50;
  }
`;

const DropdownLink = styled(Link)`
  display: block;
  padding: 0.5rem 0;
  color: #4a5568;
  text-decoration: none;
  transition: all 0.2s ease;
  font-size: 0.95rem;
  position: relative;
  
  &:hover {
    color: #3182ce;
    padding-left: 0.8rem;
    
    &:before {
      content: "→";
      position: absolute;
      left: 0;
      color: #4CAF50;
    }
  }
`;

const SubmenuTrigger = styled.div`
  position: relative;
  cursor: pointer;
  color: #4a5568;
  padding: 0.5rem 0;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: space-between;
  
  span {
    display: flex;
    align-items: center;
    gap: 0.3rem;
  }
`;

const Submenu = styled(motion.div)`
  padding: 0.5rem 0 0.5rem 1.2rem;
  border-left: 2px solid #4CAF50;
  margin: 0.5rem 0;
  
  a {
    padding: 0.4rem 0;
    font-size: 0.9rem;
    display: block;
    
    &:hover {
      &:before {
        content: "•";
        position: absolute;
        left: 0.5rem;
        color: #4CAF50;
      }
    }
  }
`;

const ExploreDropdown = ({ mobile, scrolled }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    setActiveSubmenu(null);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && !event.target.closest('.explore-dropdown')) {
        setIsOpen(false);
        setActiveSubmenu(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const toggleSubmenu = (menu) => {
    setActiveSubmenu(activeSubmenu === menu ? null : menu);
  };

  // Animation variants
  const dropdownVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 10 }
  };

  const submenuVariants = {
    hidden: { height: 0, opacity: 0 },
    visible: { height: "auto", opacity: 1 },
    exit: { height: 0, opacity: 0 }
  };

  return (
    <ExploreDropdownContainer 
      className="explore-dropdown" 
      $mobile={mobile}
      onMouseEnter={!mobile ? () => setIsOpen(true) : undefined}
      onMouseLeave={!mobile ? () => {
        setIsOpen(false);
        setActiveSubmenu(null);
      } : undefined}
    >
      <ExploreButton 
        onClick={toggleDropdown}
        aria-expanded={isOpen}
        scrolled={scrolled}
        $isActive={isOpen}
        $mobile={mobile}
      >
        Explore 
        {isOpen ? <FaChevronDown size={12} /> : <FaChevronRight size={12} />}
      </ExploreButton>
      
      <AnimatePresence>
        {isOpen && (
          <DropdownContent
            variants={dropdownVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.2 }}
            $mobile={mobile}
          >
            <DropdownGrid $mobile={mobile}>
              {/* IT & Software Section */}
              <DropdownSection>
                <h4>IT & Software</h4>
                <SubmenuTrigger
                  onMouseEnter={() => !mobile && toggleSubmenu('certifications')}
                  onClick={() => toggleSubmenu('certifications')}
                >
                  <span>Certifications</span>
                  {activeSubmenu === 'certifications' ? <FaChevronDown size={10} /> : <FaChevronRight size={10} />}
                </SubmenuTrigger>
                <AnimatePresence>
                  {activeSubmenu === 'certifications' && (
                    <Submenu
                      variants={submenuVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      transition={{ duration: 0.2 }}
                    >
                      <DropdownLink to="/courses/it/aws" onClick={() => setIsOpen(false)}>AWS Certifications</DropdownLink>
                      <DropdownLink to="/courses/it/comptia" onClick={() => setIsOpen(false)}>CompTIA</DropdownLink>
                      <DropdownLink to="/courses/it/cisco" onClick={() => setIsOpen(false)}>Cisco (CCNA)</DropdownLink>
                      <DropdownLink to="/courses/it/microsoft" onClick={() => setIsOpen(false)}>Microsoft</DropdownLink>
                    </Submenu>
                  )}
                </AnimatePresence>
                
                <SubmenuTrigger
                  onMouseEnter={() => !mobile && toggleSubmenu('development')}
                  onClick={() => toggleSubmenu('development')}
                >
                  <span>Development</span>
                  {activeSubmenu === 'development' ? <FaChevronDown size={10} /> : <FaChevronRight size={10} />}
                </SubmenuTrigger>
                <AnimatePresence>
                  {activeSubmenu === 'development' && (
                    <Submenu
                      variants={submenuVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      transition={{ duration: 0.2 }}
                    >
                      <DropdownLink to="/courses/it/web" onClick={() => setIsOpen(false)}>Web Development</DropdownLink>
                      <DropdownLink to="/courses/it/mobile" onClick={() => setIsOpen(false)}>Mobile Development</DropdownLink>
                      <DropdownLink to="/courses/it/game" onClick={() => setIsOpen(false)}>Game Development</DropdownLink>
                      <DropdownLink to="/courses/it/database" onClick={() => setIsOpen(false)}>Database Design</DropdownLink>
                    </Submenu>
                  )}
                </AnimatePresence>
                
                <DropdownLink to="/courses/it/network" onClick={() => setIsOpen(false)}>Network & Security</DropdownLink>
                <DropdownLink to="/courses/it/hardware" onClick={() => setIsOpen(false)}>Hardware</DropdownLink>
                <DropdownLink to="/courses/it/os" onClick={() => setIsOpen(false)}>Operating Systems</DropdownLink>
              </DropdownSection>

              {/* Fashion Design Section */}
              <DropdownSection>
                <h4>Fashion Design</h4>
                <SubmenuTrigger
                  onMouseEnter={() => !mobile && toggleSubmenu('fashion-core')}
                  onClick={() => toggleSubmenu('fashion-core')}
                >
                  <span>Core Skills</span>
                  {activeSubmenu === 'fashion-core' ? <FaChevronDown size={10} /> : <FaChevronRight size={10} />}
                </SubmenuTrigger>
                <AnimatePresence>
                  {activeSubmenu === 'fashion-core' && (
                    <Submenu
                      variants={submenuVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      transition={{ duration: 0.2 }}
                    >
                      <DropdownLink to="/courses/fashion/pattern-making" onClick={() => setIsOpen(false)}>Pattern Making</DropdownLink>
                      <DropdownLink to="/courses/fashion/sewing" onClick={() => setIsOpen(false)}>Sewing Techniques</DropdownLink>
                      <DropdownLink to="/courses/fashion/textiles" onClick={() => setIsOpen(false)}>Textiles & Fabrics</DropdownLink>
                    </Submenu>
                  )}
                </AnimatePresence>
                
                <DropdownLink to="/courses/fashion/business" onClick={() => setIsOpen(false)}>Fashion Business</DropdownLink>
                <DropdownLink to="/courses/fashion/sustainability" onClick={() => setIsOpen(false)}>Sustainable Fashion</DropdownLink>
              </DropdownSection>

              {/* Leather Crafting Section */}
              <DropdownSection>
                <h4>Leather Crafting</h4>
                <SubmenuTrigger
                  onMouseEnter={() => !mobile && toggleSubmenu('leather-core')}
                  onClick={() => toggleSubmenu('leather-core')}
                >
                  <span>Core Products</span>
                  {activeSubmenu === 'leather-core' ? <FaChevronDown size={10} /> : <FaChevronRight size={10} />}
                </SubmenuTrigger>
                <AnimatePresence>
                  {activeSubmenu === 'leather-core' && (
                    <Submenu
                      variants={submenuVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      transition={{ duration: 0.2 }}
                    >
                      <DropdownLink to="/courses/leather/shoes" onClick={() => setIsOpen(false)}>Shoe Making</DropdownLink>
                      <DropdownLink to="/courses/leather/sandals" onClick={() => setIsOpen(false)}>Sandals</DropdownLink>
                      <DropdownLink to="/courses/leather/bags" onClick={() => setIsOpen(false)}>Bags & Accessories</DropdownLink>
                    </Submenu>
                  )}
                </AnimatePresence>
                
                <DropdownLink to="/courses/leather/tooling" onClick={() => setIsOpen(false)}>Leather Tooling</DropdownLink>
                <DropdownLink to="/courses/leather/stitching" onClick={() => setIsOpen(false)}>Stitching Methods</DropdownLink>
                <DropdownLink to="/courses/leather/finishing" onClick={() => setIsOpen(false)}>Finishing Techniques</DropdownLink>
              </DropdownSection>

              {/* Education & Exams Section */}
              <DropdownSection>
                <h4>Education & Exams</h4>
                <SubmenuTrigger
                  onMouseEnter={() => !mobile && toggleSubmenu('exams')}
                  onClick={() => toggleSubmenu('exams')}
                >
                  <span>Exam Preparation</span>
                  {activeSubmenu === 'exams' ? <FaChevronDown size={10} /> : <FaChevronRight size={10} />}
                </SubmenuTrigger>
                <AnimatePresence>
                  {activeSubmenu === 'exams' && (
                    <Submenu
                      variants={submenuVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      transition={{ duration: 0.2 }}
                    >
                      <DropdownLink to="/exams/jamb" onClick={() => setIsOpen(false)}>JAMB Prep</DropdownLink>
                      <DropdownLink to="/exams/waec" onClick={() => setIsOpen(false)}>WAEC Prep</DropdownLink>
                      <DropdownLink to="/exams/neco" onClick={() => setIsOpen(false)}>NECO Prep</DropdownLink>
                      <DropdownLink to="/exams/toefl" onClick={() => setIsOpen(false)}>TOEFL/IELTS</DropdownLink>
                    </Submenu>
                  )}
                </AnimatePresence>
                
                <DropdownLink to="/courses/academics/math" onClick={() => setIsOpen(false)}>Mathematics</DropdownLink>
                <DropdownLink to="/courses/academics/science" onClick={() => setIsOpen(false)}>Sciences</DropdownLink>
                <DropdownLink to="/courses/academics/humanities" onClick={() => setIsOpen(false)}>Humanities</DropdownLink>
              </DropdownSection>
            </DropdownGrid>
          </DropdownContent>
        )}
      </AnimatePresence>
    </ExploreDropdownContainer>
  );
};

export default ExploreDropdown;