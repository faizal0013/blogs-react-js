import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { toast } from 'react-toastify';

import { TagsInput } from 'react-tag-input-component';

import axios from 'axios';

import imageCompression from 'browser-image-compression';

import RichEditer from '../components/RichEditer/RichEditer';
import CenterDiv from '../UI/CenterDiv/CenterDiv';
import InputFile from '../UI/InputFile/InputFile';

const BlogNewPage = () => {
  const [title, setTitle] = useState('');
  const [imageFile, setImageFile] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState([]);

  const navigate = useNavigate();

  const newPostHandler = async e => {
    e.preventDefault();

    const _id = JSON.parse(localStorage.getItem('_id'));

    // * imageCompression options
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 2000,
      useWebWorker: true,
    };

    if (!title || !imageFile || !content) {
      return toast.error('field is empty');
    }

    const formData = new FormData();

    formData.append('title', title);
    formData.append('content', content);

    tags.forEach(tag => formData.append('tags[]', tag.toLowerCase()));

    if (imageFile) {
      const compressionImage = await imageCompression(imageFile, options);
      formData.append('image', compressionImage);
    }

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

  const onChangeImageFile = e => {
    setImageFile(e.target.files[0]);
  };

  const onChangeTags = tags => {
    setTags(tags);
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
              <InputFile onChangeImageFile={onChangeImageFile} />
            </div>
            <div>
              <label htmlFor="content">content</label>
            </div>
            <div>
              <RichEditer setContent={setContent} content={content} />
            </div>
            <TagsInput placeHolder="enter tages" onChange={onChangeTags} value={tags} name="tags" />
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
