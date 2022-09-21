import { useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import axios from 'axios';

import Input from '../UI/Input/Input';

const SignupFormContainer = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [conformPassword, setConformPassword] = useState('');

  //   v5 Redirects -> v6 useNavigate
  const navigate = useNavigate();

  const onSubmitForm = e => {
    e.preventDefault();

    axios
      .post('http://localhost:8080/signup', {
        fullName,
        emailId: email,
        username,
        password,
        conformPassword,
      })
      .then(data => {
        // navigate to / -> signin
        navigate('/signin');
        toast.success(data.data.message);
      })
      .catch(err => {
        setPassword('');
        setConformPassword('');
        toast.error(err.response.data.message);
      });
  };

  const onInputFullNameChange = e => {
    setFullName(e.target.value);
  };

  const onInputEmailChange = e => {
    setEmail(e.target.value);
  };

  const onInputUsernameChange = e => {
    setUsername(e.target.value);
  };

  const onInputPasswordChange = e => {
    setPassword(e.target.value);
  };

  const onInputConformPasswordChange = e => {
    setConformPassword(e.target.value);
  };

  return (
    <>
      <form onSubmit={onSubmitForm} method="post">
        <div className="flex flex-col gap-y-7">
          <Input type="text" onChange={onInputFullNameChange} value={fullName} placeholder="full name" />
          <Input type="email" onChange={onInputEmailChange} value={email} placeholder="email" />
          <Input type="text" onChange={onInputUsernameChange} value={username} placeholder="username" />
          <Input type="password" onChange={onInputPasswordChange} value={password} placeholder="password" />
          <Input
            type="password"
            onChange={onInputConformPasswordChange}
            value={conformPassword}
            placeholder="conform password"
          />
          <button type="submit" className="p-2 shadow-lg shadow-indigo-500/50 bg-indigo-500 font-bold text-white">
            Sign Up
          </button>
        </div>
      </form>
    </>
  );
};

export default SignupFormContainer;
