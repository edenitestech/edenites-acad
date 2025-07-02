import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Wave from '../Wave/Wave';

const BlogPreviewSection = styled.section`
  position: relative;
  padding: 4rem 0;
  background-color: #f9f9ff;
  overflow: hidden;
`;

const PreviewContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  align-items: center;
  gap: 3rem;
  position: relative;
  z-index: 2;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const ImageContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PreviewImage = styled.div`
  width: 100%;
  max-width: 500px;
  height: 350px;
  background: url('https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80');
  background-size: cover;
  background-position: center;
  border-radius: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
  padding: 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(43, 88, 118, 0.7);
    border-radius: 12px;
  }

  span {
    position: relative;
    z-index: 1;
  }
`;

const TextContent = styled.div`
  flex: 1;
  padding: 1rem;
`;

const PreviewTitle = styled.h2`
  font-size: 2.2rem;
  color: #2d3748;
  margin-bottom: 1.5rem;
  line-height: 1.3;
`;

const PreviewDescription = styled.p`
  font-size: 1.1rem;
  color: #4a5568;
  line-height: 1.7;
  margin-bottom: 2rem;
`;

const BlogButton = styled(Link)`
  display: inline-block;
  background: #4CAF50;
  color: white;
  text-decoration: none;
  padding: 1rem 2rem;
  border-radius: 6px;
  font-weight: 600;
  font-size: 1.1rem;
  transition: all 0.3s ease;
  border: none;
  cursor: pointer;
  
  &:hover {
    background: #3d8b40;
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }
`;

const BlogPreview = () => {
  return (
    <BlogPreviewSection id="blog-preview">
      <Wave position="top" color="#2b5876" opacity="0.1" flip={false} />
      
      <PreviewContent>
        <ImageContainer>
          <PreviewImage>
            <span>Learn From Our Blog</span>
          </PreviewImage>
        </ImageContainer>
        
        <TextContent>
          <PreviewTitle>Gain Expert Knowledge</PreviewTitle>
          <PreviewDescription>
            Explore our blog for insightful articles on IT & Software, Fashion Design, 
            Leather Crafting, and Exam Preparation. Get tips, strategies, and industry 
            insights to boost your skills and career.
          </PreviewDescription>
          <BlogButton to="/blog">
            Explore Our Blog
          </BlogButton>
        </TextContent>
      </PreviewContent>
      
      <Wave position="bottom" color="#2b5876" opacity="0.1" flip={true} />
    </BlogPreviewSection>
  );
};

export default BlogPreview;