import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube } from 'react-icons/fa';
import { MdEmail, MdPhone, MdLocationOn } from 'react-icons/md';
import logo from '../../assets/images/logo.png';
import * as S from './FooterStyles';

export const Footer = () => {
  return (
    <S.FooterContainer>
      <S.FooterWave>
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" fill="#2b5876"></path>
          <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" fill="#2b5876"></path>
          <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" fill="#2b5876"></path>
        </svg>
      </S.FooterWave>
      
      <S.FooterContent>
        <S.FooterMain>
          <S.FooterBrand>
            <S.FooterLogo>
              {logo ? (
                <S.FooterLogoImg src={logo} alt="Edenites Academy Logo" />
              ) : (
                <S.FooterIcon>EA</S.FooterIcon>
              )}
              <span>Edenites Academy</span>
            </S.FooterLogo>
            <S.FooterText>
              Empowering learners with expert-led courses in IT & Software, Fashion Design, 
              Leather Crafting, and CBT Exam preparation.
            </S.FooterText>
            <S.FooterSocials>
              <S.SocialLink href="#" aria-label="Facebook"><FaFacebook /></S.SocialLink>
              <S.SocialLink href="#" aria-label="Twitter"><FaTwitter /></S.SocialLink>
              <S.SocialLink href="#" aria-label="Instagram"><FaInstagram /></S.SocialLink>
              <S.SocialLink href="#" aria-label="LinkedIn"><FaLinkedin /></S.SocialLink>
              <S.SocialLink href="#" aria-label="YouTube"><FaYoutube /></S.SocialLink>
            </S.FooterSocials>
          </S.FooterBrand>

          <S.FooterSections>
            <S.FooterSection>
              <S.FooterTitle>Quick Links</S.FooterTitle>
              <S.FooterList>
                <S.FooterListItem><Link to="/">Home</Link></S.FooterListItem>
                <S.FooterListItem><Link to="/courses">Courses</Link></S.FooterListItem>
                <S.FooterListItem><Link to="/categories">Categories</Link></S.FooterListItem>
                <S.FooterListItem><Link to="/about">About Us</Link></S.FooterListItem>
                <S.FooterListItem><Link to="/contact">Contact</Link></S.FooterListItem>
              </S.FooterList>
            </S.FooterSection>

            <S.FooterSection>
              <S.FooterTitle>Programs</S.FooterTitle>
              <S.FooterList>
                <S.FooterListItem><Link to="/it-software">IT & Software</Link></S.FooterListItem>
                <S.FooterListItem><Link to="/fashion-design">Fashion Design</Link></S.FooterListItem>
                <S.FooterListItem><Link to="/leather-crafting">Leather Crafting</Link></S.FooterListItem>
                <S.FooterListItem><Link to="/cbt-exams">CBT Exams</Link></S.FooterListItem>
              </S.FooterList>
            </S.FooterSection>

            <S.FooterSection>
              <S.FooterTitle>Certifications</S.FooterTitle>
              <S.FooterList>
                <S.FooterListItem><Link to="/aws-certifications">AWS Certifications</Link></S.FooterListItem>
                <S.FooterListItem><Link to="/microsoft-certifications">Microsoft Certifications</Link></S.FooterListItem>
                <S.FooterListItem><Link to="/data-science">Data Science</Link></S.FooterListItem>
              </S.FooterList>
            </S.FooterSection>

            <S.FooterSection>
              <S.FooterTitle>Contact Us</S.FooterTitle>
              <S.FooterList>
                <S.FooterListItem>
                  <MdLocationOn />
                  <span>123 Education St, Learning City</span>
                </S.FooterListItem>
                <S.FooterListItem>
                  <MdPhone />
                  <span>+1 (555) 123-4567</span>
                </S.FooterListItem>
                <S.FooterListItem>
                  <MdEmail />
                  <span>info@edenites.com</span>
                </S.FooterListItem>
              </S.FooterList>
            </S.FooterSection>
          </S.FooterSections>
        </S.FooterMain>

        <S.FooterBottom>
          <S.FooterCopyright>
            &copy; {new Date().getFullYear()} Edenites Academy. All rights reserved.
          </S.FooterCopyright>
          <S.FooterLegal>
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms of Service</Link>
            <Link to="/cookies">Cookie Policy</Link>
          </S.FooterLegal>
        </S.FooterBottom>
      </S.FooterContent>
    </S.FooterContainer>
  );
};