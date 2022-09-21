import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { HashLoader } from 'react-spinners';

import axios from 'axios';

import CenterDiv from '../UI/CenterDiv/CenterDiv';

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
      .catch(err => console.log(err));

    // navigate(-1);
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
      formData.append('descriptions', post.descriptions);
    } else {
      formData.append('title', post.title);
      formData.append('image', post.image);
      formData.append('descriptions', post.descriptions);
    }

    axios
      .put(`http://localhost:8080/profile/updateblog/${_id}`, formData)
      .then(data => {
        console.log(data.data);
        navigate(-1);
      })
      .catch(err => console.log(err));
  };

  const onChangeTitle = e => {
    const title = e.target.value;

    setPost({ ...post, title });
  };

  const onChangeDescriptions = e => {
    const descriptions = e.target.value;
    setPost({ ...post, descriptions });
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
            <CenterDiv className={'text-center'}>
              <div className="w-[40rem] mx-auto p-6 shadow-2xl border rounded-2xl">
                <h1 className="text-5xl font-serif my-5">Update Blog</h1>
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
                    <label htmlFor="title">Title</label>
                  </div>
                  <div>
                    <input id="title" className="border border-black p-2" value={post.title} onChange={onChangeTitle} />
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
                      value={post.descriptions}
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
      )}
    </>
  );
};

export default BlogUpdatePage;
