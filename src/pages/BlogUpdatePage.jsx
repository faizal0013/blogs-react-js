import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { HashLoader } from 'react-spinners';
import { toast } from 'react-toastify';

import axios from 'axios';

import CenterDiv from '../UI/CenterDiv/CenterDiv';
import RichEditer from '../components/RichEditer/RichEditer';

const BlogUpdatePage = () => {
  const [post, setPost] = useState({});
  const [fileName, setFileName] = useState('');
  const [loading, setLoading] = useState(true);

  const { _id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:8080/profile/updateblog/${_id}`)
      .then(data => {
        setPost(data.data);
        setLoading(false);
      })
      .catch(err => {
        toast.error(err.response.data.message);
        navigate(-1);
      });
  }, [navigate, _id]);

  const goBackHander = () => {
    navigate(-1);
  };

  const onSubmitUpdateBlog = e => {
    e.preventDefault();

    const formData = new FormData();

    if (fileName) {
      formData.append('title', post.title);
      formData.append('oldImage', post.image);
      formData.append('image', fileName);
      formData.append('content', post.content);
    } else {
      formData.append('title', post.title);
      formData.append('image', post.image);
      formData.append('content', post.content);
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

  const onChangeFile = e => {
    setFileName(e.target.files[0]);
  };

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center h-[51rem]">
          <HashLoader size={115} color="#36d7b7" loading={loading} />
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
                encType="multipart/form-data"
              >
                <div className="w-11/12 mx-auto">
                  <img src={require(`../assets/uploads/${post.image}`)} alt="" />
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
                  <input type="file" id="file" onChange={onChangeFile} />
                </div>
                <div>
                  <label htmlFor="content" className="mr-6">
                    content
                  </label>
                </div>
                <div>
                  <RichEditer content={post.content} setContent={setContent} />
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
            </CenterDiv>
          </CenterDiv>
        </>
      )}
    </>
  );
};

export default BlogUpdatePage;
