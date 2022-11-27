import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { toast } from 'react-toastify';

import axios from 'axios';

import Input from '../UI/Input/Input';
import AuthContext from '../context/auth-context';
import InputPassword from './InputPassword';

const SignInFormContainer = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { isAuth, isAuthSubmitHandler } = useContext(AuthContext);

  //   v5 Redirects -> v6 useNavigate
  const navigate = useNavigate();

  useEffect(() => {
    return () => {
      if (isAuth) {
        navigate('/profile');
      }
    };
  }, [isAuth, navigate]);

  const onSubmitForm = e => {
    e.preventDefault();

    axios
      .post('http://localhost:8080/signin', {
        username,
        password,
      })
      .then(data => {
        const { token } = data.data;

        localStorage.setItem('token', JSON.stringify(token));

        isAuthSubmitHandler(true);
        toast.success(data.data.message);
        // navigate to / -> index | home
        navigate('/');
      })
      .catch(err => {
        setPassword('');
        toast.error(err.response.data.message);
      });
  };

  const onInputUsernameChange = e => {
    setUsername(e.target.value);
  };

  const onInputPasswordChange = e => {
    setPassword(e.target.value);
  };

  return (
    <>
      <form onSubmit={onSubmitForm} method="post">
        <div className="flex flex-col gap-y-6">
          <Input type={'text'} onChange={onInputUsernameChange} value={username} placeholder="username" />
          <InputPassword onChange={onInputPasswordChange} value={password} placeholder="password" />
          <div className="flex flex-col gap-y-6">
            <button type={'submit'} className="p-2 shadow-lg shadow-indigo-500/50 bg-indigo-500 font-bold text-white">
              Login
            </button>
            <Link to="{#}" className="text-blue-700 underline text-right">
              Forgot password?
            </Link>
          </div>
        </div>
      </form>
    </>
  );
};

export default SignInFormContainer;
