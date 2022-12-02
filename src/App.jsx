import React, { Suspense } from 'react';

import { Routes, Route } from 'react-router-dom';
import { useContext } from 'react';
import { ClipLoader } from 'react-spinners';

import 'react-toastify/dist/ReactToastify.css';
import 'react-lazy-load-image-component/src/effects/blur.css';

// import HomePage from './pages/HomePage';
// import SigninPage from './pages/SigninPage';
// import SignupPage from './pages/SignupPage';
// import AboutPage from './pages/AboutPage';
import Layout from './components/Layout/Layout';
// import BlogsPosts from './pages/BlogsPosts';
// import SingleBlogPage from './pages/SingleBlogPage';
// import PageNotFound from './components/PageNotFound';
// import BlogRemovePage from './pages/BlogRemovePage';
// import BlogUpdatePage from './pages/BlogUpdatePage';
// import BlogNewPage from './pages/BlogNewPage';
// import ProfilePage from './pages/ProfilePage';

import AuthContext from './context/auth-context';

const AboutPage = React.lazy(() => import('./pages/AboutPage'));
const ProfilePage = React.lazy(() => import('./pages/ProfilePage'));
const BlogNewPage = React.lazy(() => import('./pages/BlogNewPage'));
const BlogUpdatePage = React.lazy(() => import('./pages/BlogUpdatePage'));
const BlogRemovePage = React.lazy(() => import('./pages/BlogRemovePage'));
const SingleBlogPage = React.lazy(() => import('./pages/SingleBlogPage'));
const BlogsPosts = React.lazy(() => import('./pages/BlogsPosts'));
const HomePage = React.lazy(() => import('./pages/HomePage'));
const SigninPage = React.lazy(() => import('./pages/SigninPage'));
const SignupPage = React.lazy(() => import('./pages/SignupPage'));
const PageNotFound = React.lazy(() => import('./components/PageNotFound'));
const ForgotPage = React.lazy(() => import('./pages/ForgotPage'));
const ChangePassword = React.lazy(() => import('./pages/ChangePassword'));

const App = () => {
  const { isAuth } = useContext(AuthContext);

  return (
    <>
      <Suspense
        fallback={
          <div className="flex justify-center items-center h-[51rem]">
            <ClipLoader size={115} color="#000000" />
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="/blogs" element={<BlogsPosts />} />
            <Route path="/blogs/:slug" element={<SingleBlogPage />} />
            <Route path="/about" element={<AboutPage />} />
            {!isAuth ? (
              <>
                <Route path="/signin" element={<SigninPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/forgot" element={<ForgotPage />} />
              </>
            ) : (
              <>
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/profile/newblog/" element={<BlogNewPage />} />
                <Route path="/profile/updateblog/:slug" element={<BlogUpdatePage />} />
                <Route path="/profile/removeblog/:slug" element={<BlogRemovePage />} />
              </>
            )}
            <Route path="*" element={<PageNotFound />} />
          </Route>
          <Route path="/forgot/:token" element={<ChangePassword />} />
        </Routes>
      </Suspense>
    </>
  );
};

export default App;
