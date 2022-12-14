import { useContext, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import AuthContext from '../../../context/auth-context';
import Profile from '../../Profile';

const NavBar = () => {
  const { isAuth, isAuthSubmitHandler } = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      isAuthSubmitHandler(true);
    }
  }, [isAuthSubmitHandler]);

  const logoutHander = e => {
    e.preventDefault();
    isAuthSubmitHandler(false);
    toast.success('logout successfully');
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <nav className="flex justify-around">
      <NavLink to="" className="p-5 text-2xl">
        Blogs
      </NavLink>
      <div className="w-96 flex justify-around">
        <NavLink to="" className="p-5 text-xl">
          Home
        </NavLink>
        <NavLink to="blogs" className="p-5 text-xl">
          Blogs
        </NavLink>
        <NavLink to="about" className="p-5 text-xl">
          About
        </NavLink>
      </div>
      <div className="w-56 flex justify-around items-center">
        {!isAuth ? (
          <>
            <NavLink to="signin" className="p-5 text-xl">
              Sign In
            </NavLink>
          </>
        ) : (
          <>
            <Profile />
            <button className="p-5 text-xl" onClick={logoutHander}>
              logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
