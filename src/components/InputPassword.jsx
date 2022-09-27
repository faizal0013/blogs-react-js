import { useState } from 'react';

import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

const InputPassword = props => {
  const [visible, setVisible] = useState(false);

  const onEyeBtnClick = () => {
    setVisible(visible => !visible);
  };

  return (
    <div className="flex items-center relative">
      <input
        {...props}
        type={visible ? 'text' : 'password'}
        className="border-b border-black p-2 focus:outline-none"
        required
      />

      <div className="absolute right-0 cursor-pointer" onClick={onEyeBtnClick}>
        {visible ? <AiOutlineEye size={20} /> : <AiOutlineEyeInvisible size={20} />}
      </div>
    </div>
  );
};

export default InputPassword;
