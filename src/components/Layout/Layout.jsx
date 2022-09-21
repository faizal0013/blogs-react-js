import NavBar from './NavBar/NavBar';
import Hr from '../../UI/Hr/Hr';
import Footer from './Footer/Footer';

const Layout = ({ children }) => {
  return (
    <>
      <NavBar />
      <Hr />
      {children}
      <Hr />
      <Footer />
    </>
  );
};

export default Layout;
