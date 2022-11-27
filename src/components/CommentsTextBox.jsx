import { BiSmile } from 'react-icons/bi';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import axios from 'axios';

import TextareaAutosize from 'react-textarea-autosize';

import Picker from 'emoji-picker-react';
import { toast } from 'react-toastify';

const CommentsTextBox = ({ singleBlogId, comment, setComment, showPicker, setShowPicker, profile }) => {
  const onFormSubmit = e => {
    e.preventDefault();

    const token = localStorage.getItem('token');

    axios
      .post(
        'http://localhost:8080/comments',
        {
          postId: singleBlogId,
          commentMessage: comment,
        },
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(token)}`,
          },
        }
      )
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
        <div className="inline-block mr-5">
          <LazyLoadImage
            effect="blur"
            src={`http://localhost:8080/static/profiles/${profile.profile}`}
            alt={profile.profile}
            className="rounded-full w-14"
          />
        </div>
        <div className="border px-12 py-5 w-[45rem] rounded-2xl shadow-lg my-7 inline-block">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-6">
              <p className="text-gray-600 font-serif">{profile.username}</p>
            </div>
          </div>
          <div className="mt-3">
            <TextareaAutosize onChange={onInputChange} className="border mr-2 h-[26px]" value={comment} cols={52} />
            <BiSmile onClick={onClickEmoji} size={25} className="inline-block cursor-pointer mr-2" />
          </div>
          {showPicker && <Picker pickerStyle={{ position: 'absolute', width: '30%' }} onEmojiClick={onEmojiClick} />}
          <div className="flex justify-end mt-3 w-[36rem]">
            <button type="submit" className="bg-blue-500 p-2 text-white font-bold">
              comment
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default CommentsTextBox;
