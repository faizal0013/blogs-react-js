import { useState } from 'react';

import { BsThreeDotsVertical } from 'react-icons/bs';
import { toast } from 'react-toastify';

import axios from 'axios';

const CommentsOptions = ({ _id, setFetch }) => {
  const [option, setOption] = useState(false);

  const onThreeDotsClick = () => {
    setOption(option => !option);
  };

  const onDeleteComment = () => {
    const token = localStorage.getItem('token');

    axios
      .delete(`http://localhost:8080/comments/${_id}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then(data => {
        toast.success(data.data.message);
        setFetch(true);
      })
      .catch(err => toast.error(err.response.data.message));
  };

  return (
    <div className="relative">
      <BsThreeDotsVertical className="cursor-pointer" onClick={onThreeDotsClick} />
      {option && (
        <div className="absolute bottom-4 left-2 border px-3 py-2 flex gap-1 flex-col bg-white">
          <button>edit</button>
          <div className="border-b"></div>
          <button onClick={onDeleteComment}>remove</button>
        </div>
      )}
    </div>
  );
};

export default CommentsOptions;
