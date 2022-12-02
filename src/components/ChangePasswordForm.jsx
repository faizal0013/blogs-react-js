import { useState } from 'react';

import axios from 'axios';

import { toast } from 'react-toastify';

import InputPassword from './InputPassword';

const ChangePasswordForm = ({ token }) => {
  const [password, setPassword] = useState('');
  const [conformPassword, setConformPassword] = useState('');

  const onSubmitForm = e => {
    e.preventDefault();

    if (password !== conformPassword) {
      return toast.error('password is not match');
    }

    axios
      .put(`http://localhost:8080/forgot/${token}`, {
        password,
      })
      .then(data => {
        toast.success(data.data.message);
      })
      .catch(err => toast.error(err.response.data.message));
  };

  const onInputPasswordChange = e => {
    setPassword(e.target.value);
  };

  const onInputConformPasswordChange = e => {
    setConformPassword(e.target.value);
  };

  return (
    <>
      <form method="put" onSubmit={onSubmitForm}>
        <div className="flex flex-col gap-y-6">
          <InputPassword onChange={onInputPasswordChange} value={password} placeholder="password" />
          <InputPassword
            onChange={onInputConformPasswordChange}
            value={conformPassword}
            placeholder="conform password"
          />
          <div className="flex flex-col gap-y-6">
            <button type={'submit'} className="p-2 shadow-lg shadow-indigo-500/50 bg-indigo-500 font-bold text-white">
              change password
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default ChangePasswordForm;
