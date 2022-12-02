import { useState } from 'react';

import { toast } from 'react-toastify';

import { useNavigate } from 'react-router-dom';

import axios from 'axios';

import Input from '../UI/Input/Input';

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState('');

  const navigate = useNavigate();

  const onInputEmailChange = e => {
    setEmail(e.target.value);
  };

  const onSubmitForm = e => {
    e.preventDefault();
    axios
      .post('http://localhost:8080/forgot/', {
        email,
      })

      .then(data => {
        toast.success(data.data.message);
        navigate('/signin');
      })
      .catch(err => toast.error(err.response.data.message));
  };

  return (
    <>
      <form method="post" onSubmit={onSubmitForm}>
        <div className="flex flex-col gap-y-6">
          <Input type={'email'} value={email} placeholder="Enter email address" onChange={onInputEmailChange} />
          <div className="flex flex-col gap-y-6">
            <button type={'submit'} className="p-2 shadow-lg shadow-indigo-500/50 bg-indigo-500 font-bold text-white">
              submit
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default ForgotPasswordForm;
