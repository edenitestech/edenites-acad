import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer'; 
import styled from 'styled-components';
import Support from '../SupportWidget/Support'; 

const AppContainer = styled.div`
  font-family: 'Poppins', sans-serif;
  overflow-x: hidden;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const MainContent = styled.main`
  flex: 1;
  
  @media (max-width: 768px) {
    padding-top: 70px;
  }
`;

const Layout = () => {
  const location = useLocation();
  const isDashboardRoute = location.pathname.startsWith('/dashboard');
  
  if (isDashboardRoute) {
    return <Outlet />;
  }

  return (
    <AppContainer>
      <Navbar />
      <MainContent>
        <Outlet />
      </MainContent>
      <Support />
      <Footer />
    </AppContainer>
  );
};
export default Layout;