import { Routes, Route } from 'react-router-dom';
import { useContext } from 'react';

import 'react-toastify/dist/ReactToastify.css';

import HomePage from './pages/HomePage';
import SigninPage from './pages/SigninPage';
import SignupPage from './pages/SignupPage';
import AboutPage from './pages/AboutPage';
import Layout from './components/Layout/Layout';
import BlogsPosts from './pages/BlogsPosts';
import SingleBlogPage from './pages/SingleBlogPage';
import PageNotFound from './components/PageNotFound';
import BlogRemovePage from './pages/BlogRemovePage';
import BlogUpdatePage from './pages/BlogUpdatePage';
import BlogNewPage from './pages/BlogNewPage';
import ProfilePage from './pages/ProfilePage';
import AuthContext from './context/auth-context';

const App = () => {
  const { isAuth } = useContext(AuthContext);

  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/blogs" element={<BlogsPosts />} />
          <Route path="/blogs/:_id" element={<SingleBlogPage />} />
          <Route path="/about" element={<AboutPage />} />
          {!isAuth ? (
            <>
              <Route path="/signin" element={<SigninPage />} />
              <Route path="/signup" element={<SignupPage />} />
            </>
          ) : (
            <>
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/profile/newblog/:_id" element={<BlogNewPage />} />
              <Route path="/profile/updateblog/:_id" element={<BlogUpdatePage />} />
              <Route path="/profile/removeblog/:_id" element={<BlogRemovePage />} />
            </>
          )}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Layout>
    </>
  );
};

export default App;
