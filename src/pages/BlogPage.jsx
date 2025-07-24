import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import Wave from '../components/Wave/Wave';

const BlogSection = styled.section`
  position: relative;
  padding: 4rem 0;
  background-color: #f9f9ff;
  min-height: 100vh;
`;

const BlogContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  position: relative;
  z-index: 2;
`;

// Updated BlogHero styled component
const BlogHero = styled.div`
  background: linear-gradient(rgba(43, 88, 118, 0.8), rgba(76, 175, 80, 0.8)), 
              url('https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80');
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
  
  @media (max-width: 768px) {
    height: 300px;
  }
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
`;

const BlogTitle = styled.h2`
  text-align: center;
  color: #2d3748;
  margin-bottom: 2rem;
  font-size: 2.5rem;
`;

const BlogGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const BlogCard = styled.div`
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  }
`;

const BlogImage = styled.div`
  height: 200px;
  position: relative;
  overflow: hidden;
`;

const BlogContent = styled.div`
  padding: 1.5rem;
`;

const BlogCategory = styled.span`
  display: inline-block;
  background: #e0e8f0;
  color: #2b5876;
  padding: 0.25rem 0.75rem;
  border-radius: 50px;
  font-size: 0.75rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
`;

const BlogDate = styled.p`
  color: #6b7280;
  font-size: 0.85rem;
  margin-bottom: 0.5rem;
`;

const BlogPostTitle = styled.h3`
  color: #2b5876;
  margin-bottom: 1rem;
  font-size: 1.25rem;
`;

const BlogExcerpt = styled.p`
  color: #4a5568;
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

const ReadMore = styled(Link)`
  color: #4CAF50;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;

  &:hover {
    color: #3d8b40;
    text-decoration: underline;
  }

  &::after {
    content: '→';
    margin-left: 0.5rem;
    transition: transform 0.3s ease;
  }

  &:hover::after {
    transform: translateX(5px);
  }
`;

const BlogPage = () => {
  const [loading, setLoading] = useState(true);
  const [blogPosts, setBlogPosts] = useState([]);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setBlogPosts([
        {
          id: 1,
          title: "How to Prepare for JAMB Exams",
          excerpt: "Learn the best strategies to prepare for your JAMB exams and achieve excellent results.",
          date: "June 15, 2025",
          image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
          category: "CBT Exams"
        },
        {
          id: 2,
          title: "Getting Started with Fashion Design",
          excerpt: "Beginner's guide to starting your journey in fashion design with Edenites Academy.",
          date: "May 28, 2025",
          image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
          category: "Fashion Design"
        },
        {
          id: 3,
          title: "The Future of IT in Nigeria",
          excerpt: "Exploring the growing IT sector in Nigeria and career opportunities available.",
          date: "May 10, 2025",
          image: "https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
          category: "IT & Software"
        },
        {
          id: 4,
          title: "Mastering Leather Crafting Techniques",
          excerpt: "Advanced techniques for professional leather crafting and product design.",
          date: "April 22, 2025",
          image: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
          category: "Leather Crafting"
        },
        {
          id: 5,
          title: "WAEC Exam Preparation Strategies",
          excerpt: "Effective study techniques and resources for excelling in WAEC examinations.",
          date: "April 15, 2025",
          image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
          category: "CBT Exams"
        },
        {
          id: 6,
          title: "Web Development Roadmap 2025",
          excerpt: "Comprehensive guide to becoming a professional web developer in 2025.",
          date: "March 30, 2025",
          image: "https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
          category: "IT & Software"
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <BlogSection>
      <Wave position="top" color="#2b5876" opacity="0.1" flip={false} />
      
      <BlogContainer>
        <BlogHero>
          <HeroTitle>Edenites Academy Blog</HeroTitle>
          <HeroSubtitle>
            Gain expert tips and knowledge to boost your skills in IT, Fashion Design, 
            Leather Crafting, and Exam Preparation
          </HeroSubtitle>
        </BlogHero>
        
        <BlogTitle>Recent Posts</BlogTitle>
        
        {loading ? (
          <BlogGrid>
            {[...Array(6)].map((_, i) => (
              <BlogCard key={i}>
                <BlogImage>
                  <Skeleton height="100%" width="100%" />
                </BlogImage>
                <BlogContent>
                  <Skeleton width="40%" height={20} style={{ marginBottom: '0.75rem' }} />
                  <Skeleton width="30%" height={16} style={{ marginBottom: '0.5rem' }} />
                  <Skeleton height={24} width="80%" style={{ margin: '1rem 0' }} />
                  <Skeleton count={3} />
                  <Skeleton width="30%" height={16} style={{ marginTop: '1.5rem' }} />
                </BlogContent>
              </BlogCard>
            ))}
          </BlogGrid>
        ) : (
          <BlogGrid>
            {blogPosts.map(post => (
              <BlogCard key={post.id}>
                <BlogImage>
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    style={{ 
                      width: '100%', 
                      height: '100%', 
                      objectFit: 'cover' 
                    }} 
                  />
                </BlogImage>
                <BlogContent>
                  <BlogCategory>{post.category}</BlogCategory>
                  <BlogDate>{post.date}</BlogDate>
                  <BlogPostTitle>{post.title}</BlogPostTitle>
                  <BlogExcerpt>{post.excerpt}</BlogExcerpt>
                  <ReadMore to={`/blog/${post.id}`}>Read More</ReadMore>
                </BlogContent>
              </BlogCard>
            ))}
          </BlogGrid>
        )}
      </BlogContainer>
      
      <Wave position="bottom" color="#2b5876" opacity="0.1" flip={true} />
    </BlogSection>
  );
};

export default BlogPage;