import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { HashLoader } from 'react-spinners';

import axios from 'axios';

import CenterDiv from '../UI/CenterDiv/CenterDiv';
import Hr from '../UI/Hr/Hr';
import CommentsTextBox from '../components/CommentsTextBox';
import AuthContext from '../context/auth-context';
import CommentsContainers from '../components/CommentsContainers';

const SingleBlogPage = () => {
  const [loading, setLoading] = useState(true);
  const [singleBlog, setSingleBlog] = useState({});

  const [comment, setComment] = useState('');

  const { isAuth } = useContext(AuthContext);

  const { _id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:8080/blog/${_id}`)
      .then(data => {
        setSingleBlog(data.data);
        setLoading(false);
      })
      .catch(err => console.error(err));
  }, [_id, comment]);

  const goBackHander = () => {
    navigate(-1);
  };

  return (
    <CenterDiv>
      {loading ? (
        <div className="flex justify-center items-center h-[51rem]">
          <HashLoader size={115} color="#36d7b7" loading={loading} />
        </div>
      ) : (
        <>
          <div className="my-5">
            <button
              onClick={goBackHander}
              className="px-6 py-3 text-white bg-gray-400 font-bold rounded-full transition-all duration-300 ease-in-out hover:bg-gray-500"
            >
              Back
            </button>
          </div>
          <div className="flex justify-center flex-col">
            <div className="flex justify-center flex-col gap-y-6">
              <img src={require(`../assets/uploads/${singleBlog.posts.image}`)} alt="" className="h-[55rem]" />
              <p className="text-center text-6xl">{singleBlog.posts.title}</p>
              <Hr className={'w-full'} />
              <div className="flex justify-between px-8">
                <span className="flex items-center justify-around w-32">
                  <img
                    src={require(`../assets/profile/${singleBlog.posts.userId.profile}`)}
                    alt="sa"
                    className="w-8 rounded-full"
                  />
                  <p className="text-gray-600 font-serif">{singleBlog.posts.userId.username}</p>
                </span>
                <span>
                  <p className="text-gray-600 font-serif">{singleBlog.posts.updatedAt.split('T')[0]}</p>
                </span>
              </div>
              <Hr className={'w-full'} />
              <div className="px-8 py-4 h-96 overflow-scroll border-2 border-black rounded-2xl leading-loose tracking-wide">
                <p dangerouslySetInnerHTML={{ __html: singleBlog.posts.content }}></p>
              </div>
            </div>
          </div>
          <div className="my-5">
            <p className="font-bold text-4xl">comments ({singleBlog.comments.length})</p>
          </div>
          <div className="my-5">
            <Hr />
            <CommentsContainers comments={singleBlog.comments} />
            {isAuth && (
              <CommentsTextBox singleBlogId={singleBlog.posts._id} setComment={setComment} comment={comment} />
            )}
          </div>
        </>
      )}
    </CenterDiv>
  );
};

export default SingleBlogPage;
