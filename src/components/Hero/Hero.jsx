// src/components/Hero/index.js
import { FaChalkboardTeacher, FaSearch } from 'react-icons/fa';
import * as S from './HeroStyles';

export const Hero = () => {
  return (
    <S.HeroContainer>
      <S.HeroBg>
        {/* <S.VideoBg autoPlay loop muted playsInline>
          <source src="https://assets.mixkit.co/videos/preview/mixkit-tree-with-yellow-flowers-1173-large.mp4" type="video/mp4" />
          Your browser does not support HTML5 video.
        </S.VideoBg> */}
        <S.VideoBg autoPlay loop muted playsInline>
          <source src="/videos/hero-background.mp4" type="video/mp4" />
          Your browser does not support HTML5 video.
        </S.VideoBg>
      </S.HeroBg>
      
      <S.HeroContent>
        <S.HeroH1 data-aos="fade-up">
          Learn Without <S.Highlight>Limits</S.Highlight>
        </S.HeroH1>
        <S.HeroP data-aos="fade-up" data-aos-delay="200">
          Access 5,000+ courses from industry experts
        </S.HeroP>
        
        <S.HeroSearchWrapper data-aos="fade-up" data-aos-delay="400">
          <S.HeroInput type="text" placeholder="What do you want to learn today?" />
          <S.HeroButton>
            <FaSearch />
          </S.HeroButton>
        </S.HeroSearchWrapper>
        
        <S.HeroStats data-aos="fade-up" data-aos-delay="600">
          <S.StatItem>
            <FaChalkboardTeacher size={24} />
            <div>
              <S.StatNumber>500+</S.StatNumber>
              <S.StatLabel>Expert Instructors</S.StatLabel>
            </div>
          </S.StatItem>
          <S.StatDivider />
          <S.StatItem>
            <FaChalkboardTeacher size={24} />
            <div>
              <S.StatNumber>5,000+</S.StatNumber>
              <S.StatLabel>Courses</S.StatLabel>
            </div>
          </S.StatItem>
          <S.StatDivider />
          <S.StatItem>
            <FaChalkboardTeacher size={24} />
            <div>
              <S.StatNumber>1M+</S.StatNumber>
              <S.StatLabel>Students</S.StatLabel>
            </div>
          </S.StatItem>
        </S.HeroStats>
      </S.HeroContent>
      
      <S.HeroShimmer />
    </S.HeroContainer>
  );
};