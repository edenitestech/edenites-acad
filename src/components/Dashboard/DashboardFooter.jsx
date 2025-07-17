import styled from 'styled-components';

const FooterContainer = styled.footer`
  background: #2d3748;
  color: white;
  padding: 1.5rem;
  text-align: center;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const FooterText = styled.p`
  margin: 0;
  font-size: 0.9rem;
  color: #a0aec0;
`;

const DashboardFooter = () => (
  <FooterContainer>
    <FooterContent>
      <FooterText>© {new Date().getFullYear()} Edenites Academy. All rights reserved.</FooterText>
    </FooterContent>
  </FooterContainer>
);
export default DashboardFooter;