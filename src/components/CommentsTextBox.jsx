import { BiSmile } from 'react-icons/bi';

import axios from 'axios';

import TextareaAutosize from 'react-textarea-autosize';

import Picker from 'emoji-picker-react';
import { toast } from 'react-toastify';

const CommentsTextBox = ({ singleBlogId, comment, setComment, showPicker, setShowPicker }) => {
  const onFormSubmit = e => {
    e.preventDefault();

    const _id = JSON.parse(localStorage.getItem('_id'));

    axios
      .post('http://localhost:8080/comments', {
        userId: _id,
        postId: singleBlogId,
        commentMessage: comment,
      })
      .then(data => {
        setComment('');
        toast.success(data.data.message);
      })
      .catch(err => toast.error(err.response.data.message));
  };

  const onInputChange = e => {
    setComment(e.target.value);
  };

  const onClickEmoji = () => {
    setShowPicker(val => !val);
  };

  const onEmojiClick = (event, emojiObject) => {
    setComment(prevInput => prevInput + emojiObject.emoji);
  };

  return (
    <>
      <form onSubmit={onFormSubmit} method={'post'}>
        <TextareaAutosize onChange={onInputChange} className="border mr-2 h-[26px]" value={comment} cols={68} />
        <BiSmile onClick={onClickEmoji} size={25} className="inline-block cursor-pointer mr-2" />
        <button type="submit" className="bg-blue-500 p-2 text-white font-bold">
          comment
        </button>
        {showPicker && <Picker pickerStyle={{ position: 'absolute', width: '38%' }} onEmojiClick={onEmojiClick} />}
      </form>
    </>
  );
};

export default CommentsTextBox;
