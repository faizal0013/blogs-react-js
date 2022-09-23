import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { toast } from 'react-toastify';

import axios from 'axios';

import RichEditer from '../components/RichEditer/RichEditer';
import CenterDiv from '../UI/CenterDiv/CenterDiv';
import InputFile from '../UI/InputFile/InputFile';

const BlogNewPage = () => {
  const [title, setTitle] = useState('');
  const [fileName, setFileName] = useState('');
  const [content, setContent] = useState('');

  const { _id } = useParams();

  const navigate = useNavigate();

  const newPostHandler = e => {
    e.preventDefault();

    const formData = new FormData();

    formData.append('title', title);
    formData.append('image', fileName);
    formData.append('content', content);

    axios
      .post(`http://localhost:8080/profile/newblog/${_id}`, formData)
      .then(data => {
        navigate(-1);
        toast.success(data.data.message);
      })
      .catch(err => toast.error(err.response.data.message));
  };

  const goBackHander = () => {
    navigate(-1);
  };

  const onChangeTitle = e => {
    setTitle(e.target.value);
  };

  const onChangeFile = e => {
    setFileName(e.target.files[0]);
  };

  return (
    <>
      <CenterDiv>
        <button
          onClick={goBackHander}
          className="px-6 py-3 text-white bg-gray-400 font-bold rounded-full my-3 transition-all duration-300 ease-in-out hover:bg-gray-500"
        >
          Back
        </button>
        <CenterDiv>
          <p className="text-5xl font-serif my-5 text-center">Add New Blog</p>
          <form className="flex flex-col gap-5 p-6" onSubmit={newPostHandler} encType={'multipart/form-data'}>
            <div>
              <label htmlFor="title" className="mr-6">
                Title:
              </label>
              <input id="title" className="border border-black p-2" value={title} onChange={onChangeTitle} />
            </div>
            <div>
              <label htmlFor="file" className="mr-6">
                Image:
              </label>
              <InputFile onChangeFile={onChangeFile} />
            </div>
            <div>
              <label htmlFor="content">content</label>
            </div>
            <div>
              <RichEditer setContent={setContent} content={content} />
            </div>
            <div>
              <button
                type={'submit'}
                className="p-3 font-bold text-white rounded-2xl bg-blue-500 shadow-lg shadow-blue-500/50"
              >
                Submit
              </button>
            </div>
          </form>
        </CenterDiv>
      </CenterDiv>
    </>
  );
};

export default BlogNewPage;
