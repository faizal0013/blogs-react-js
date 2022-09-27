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
    axios
      .delete(`http://localhost:8080/comments/${_id}`)
      .then(data => {
        toast.success(data.data.message);
        setFetch(true);
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="relative">
      <BsThreeDotsVertical className="cursor-pointer" onClick={onThreeDotsClick} />
      {option && (
        <div className="absolute bottom-4 left-2 border px-3 py-2 flex gap-1 flex-col">
          <button>Edit</button>
          <div className="border-b"></div>
          <button onClick={onDeleteComment}>remove</button>
        </div>
      )}
    </div>
  );
};

export default CommentsOptions;
