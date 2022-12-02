import { Outlet } from 'react-router-dom';

import NavBar from './NavBar/NavBar';
import Hr from '../../UI/Hr/Hr';
import Footer from './Footer/Footer';

const Layout = () => {
  return (
    <>
      <NavBar />
      <Hr />
      <Outlet />
      <Hr />
      <Footer />
    </>
  );
};

export default Layout;
