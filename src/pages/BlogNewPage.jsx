import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { toast } from 'react-toastify';

import axios from 'axios';

import CenterDiv from '../UI/CenterDiv/CenterDiv';

const BlogNewPage = () => {
  const [title, setTitle] = useState('');
  const [descriptions, setDescriptions] = useState('');
  const [fileName, setFileName] = useState('');

  const { _id } = useParams();

  const navigate = useNavigate();

  const newPostHandler = e => {
    e.preventDefault();

    const formData = new FormData();

    formData.append('title', title);
    formData.append('image', fileName);
    formData.append('descriptions', descriptions);

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

  const onChangeDescriptions = e => {
    setDescriptions(e.target.value);
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
        <CenterDiv className={'text-center'}>
          <div className="w-[40rem] mx-auto p-6 shadow-2xl border rounded-2xl">
            <h1 className="text-5xl font-serif my-5">Add New Blog</h1>
            <form className="flex flex-col gap-3" onSubmit={newPostHandler} encType="multipart/form-data">
              <div>
                <label htmlFor="title">Title</label>
              </div>
              <div>
                <input id="title" className="border border-black p-2" value={title} onChange={onChangeTitle} />
              </div>
              <div>
                <label htmlFor="file">Image</label>
              </div>
              <div>
                <input type="file" id="file" onChange={onChangeFile} />
              </div>
              <div>
                <label htmlFor="descriptions">Descriptions</label>
              </div>
              <div>
                <textarea
                  id="descriptions"
                  cols="30"
                  rows="10"
                  className="border border-black p-2"
                  value={descriptions}
                  onChange={onChangeDescriptions}
                ></textarea>
              </div>
              <div>
                <button
                  type="submit"
                  className="p-3 font-bold text-white rounded-2xl bg-blue-500 shadow-lg shadow-blue-500/50"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </CenterDiv>
      </CenterDiv>
    </>
  );
};

export default BlogNewPage;
