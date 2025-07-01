// ========== WAECPrepPage.jsx ==========
import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const Hero = styled.section`
  padding: 2rem 1rem;
  margin-bottom: 1rem;
  text-align: center;

  h1 {
    font-size: 3rem;
    color: var(--head-color);
    margin-bottom: 1rem;
    font-style: italic;

    @media (max-width: 768px) {
      font-size: 2rem;
    }

    @media (max-width: 480px) {
      font-size: 1.4rem;
    }
  }

  p {
    font-size: 1.2rem;
    color: var(--font-secondary);
    max-width: 700px;
    margin: 0 auto;

    @media (max-width: 480px) {
      font-size: 0.85rem;
    }
  }
`;

const SearchBar = styled.input`
  width: 100%;
  max-width: 500px;
  margin: 2rem auto;
  display: block;
  padding: 0.8rem 1rem;
  font-size: 1rem;
  border: 1px solid var(--head-color);
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
  border: 1px solid var(--head-color);
  padding: 0.6rem 1.2rem;
  border-radius: 4px;
  font-weight: 600;
  transition: 0.3s;
  cursor: pointer;
  margin-top: 1rem;

  &:hover {
    background: var(--head-color);
    color: var(--font-color);
    box-shadow: inset 0 -3.25em 0 0 var(--head-color);
  }
`;

const WAECPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
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

  const filteredSubjects = subjects.filter(subject =>
    subject.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    subject.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container
    data-aos="zoom-in-left" 
    data-aos-anchor-placement="top-center"
    data-aos-duration="800"
      >
      <Hero>
        <h1>WAEC Prep Page</h1>
        <p>Get ready for WAEC with our comprehensive subject resources and practice questions.</p>
      </Hero>

      <SearchBar
        type="text"
        placeholder="Search by subject or category (e.g., science, arts)..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />

      <Grid>
        {filteredSubjects.map((subject, index) => (
          <Card key={index}>
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
