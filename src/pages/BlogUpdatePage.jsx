import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { ClipLoader } from 'react-spinners';
import { toast } from 'react-toastify';

import axios from 'axios';

import imageCompression from 'browser-image-compression';

import { LazyLoadImage } from 'react-lazy-load-image-component';
import { TagsInput } from 'react-tag-input-component';

import CenterDiv from '../UI/CenterDiv/CenterDiv';
import RichEditer from '../components/RichEditer/RichEditer';
import InputFile from '../UI/InputFile/InputFile';

const BlogUpdatePage = () => {
  const [post, setPost] = useState({});
  const [imageFile, setImageFile] = useState('');
  const [loading, setLoading] = useState(true);
  const [tags, setTags] = useState([]);

  const { slug } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:8080/profile/updateblog/${slug}`)
      .then(data => {
        setPost(data.data);
        setTags(data.data.tags_id.map(tag => tag.tag_name));
        setLoading(false);
      })
      .catch(err => {
        toast.error(err.response.data.message);
        navigate(-1);
      });
  }, [navigate, slug]);

  const goBackHander = () => {
    navigate(-1);
  };

  const onSubmitUpdateBlog = async e => {
    const _id = post.id;

    e.preventDefault();

    const formData = new FormData();

    if (imageFile) {
      // * imageCompression options
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 2000,
        useWebWorker: true,
      };

      const compressionImage = await imageCompression(imageFile, options);

      formData.append('title', post.title);
      formData.append('oldImage', post.image);
      formData.append('image', compressionImage);
      formData.append('content', post.content);
      tags.forEach(tag => formData.append('tags[]', tag.toLowerCase()));
    } else {
      formData.append('title', post.title);
      formData.append('image', post.image);
      formData.append('content', post.content);
      tags.forEach(tag => formData.append('tags[]', tag.toLowerCase()));
    }

    axios
      .put(`http://localhost:8080/profile/updateblog/${_id}`, formData)
      .then(data => {
        toast.success(data.data.message);
        navigate(-1);
      })
      .catch(err => toast.error(err.response.data.message));
  };

  const onChangeTitle = e => {
    const title = e.target.value;

    setPost({ ...post, title });
  };

  const setContent = newContent => {
    setPost({ ...post, content: newContent });
  };

  const onChangeImageFile = e => {
    setImageFile(e.target.files[0]);
  };

  const onChangeTags = tags => {
    setTags(tags);
  };

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center h-[51rem]">
          <ClipLoader size={115} color="#000000" loading={loading} />
        </div>
      ) : (
        <>
          <CenterDiv>
            <button
              onClick={goBackHander}
              className="px-6 py-3 text-white bg-gray-400 font-bold rounded-full my-3 transition-all duration-300 ease-in-out hover:bg-gray-500"
            >
              Back
            </button>
            <CenterDiv>
              <p className="text-5xl font-serif my-5 text-center">Update Blog</p>
              <form
                className="flex flex-col gap-3"
                method="put"
                onSubmit={onSubmitUpdateBlog}
                encType={'multipart/form-data'}
              >
                <div className="w-11/12 mx-auto">
                  <LazyLoadImage effect="blur" src={`/assets/uploads/${post.image}`} alt={post.image} />
                </div>
                <div>
                  <label htmlFor="title" className="mr-6">
                    Title
                  </label>
                  <input id="title" className="border border-black p-2" value={post.title} onChange={onChangeTitle} />
                </div>
                <div>
                  <label htmlFor="file" className="mr-6">
                    Image
                  </label>
                  <InputFile onChangeImageFile={onChangeImageFile} />
                </div>
                <div>
                  <label htmlFor="content" className="mr-6">
                    content
                  </label>
                </div>
                <div>
                  <RichEditer content={post.content} setContent={setContent} />
                </div>
                <TagsInput onChange={onChangeTags} value={tags} name="tags" />
                <div>
                  <button
                    type={'submit'}
                    className="p-3 font-bold text-white rounded-2xl bg-blue-500 shadow-lg shadow-blue-500/50"
                  >
                    Update
                  </button>
                </div>
              </form>
            </CenterDiv>
          </CenterDiv>
        </>
      )}
    </>
  );
};

export default BlogUpdatePage;
