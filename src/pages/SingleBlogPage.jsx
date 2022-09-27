import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { HashLoader } from 'react-spinners';
import { toast } from 'react-toastify';

import axios from 'axios';

import CenterDiv from '../UI/CenterDiv/CenterDiv';
import Hr from '../UI/Hr/Hr';
import CommentsTextBox from '../components/CommentsTextBox';
import AuthContext from '../context/auth-context';
import CommentsContainers from '../components/CommentsContainers';

const SingleBlogPage = () => {
  const [loading, setLoading] = useState(true);
  const [singleBlog, setSingleBlog] = useState({});
  const [showPicker, setShowPicker] = useState(false);
  const [comment, setComment] = useState('');
  const [fetch, setFetch] = useState(false);
  const [profile, setProfile] = useState({});

  const { isAuth } = useContext(AuthContext);

  const { _id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem('_id');

    if (userId) {
      axios
        .post(`http://localhost:8080/profile/${JSON.parse(userId)}`)
        .then(data => {
          setProfile(data.data);
        })
        .catch(err => {
          toast.error(err.response.data.message);
        });
    }

    axios
      .get(`http://localhost:8080/blog/${_id}`)
      .then(data => {
        setSingleBlog(data.data);
        setLoading(false);
        setFetch(false);
      })
      .catch(err => console.error(err));
  }, [_id, comment, fetch]);

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
          <div className="flex flex-col gap-6 p-3">
            <div>
              <p>
                Posted By <span className="text-gray-800 font-serif">{singleBlog.posts.userId.username} </span>
                on
                <span className="text-gray-600 font-serif"> {singleBlog.posts.updatedAt.split('T')[0]}</span>
              </p>
            </div>
            <div>
              <p className="text-6xl font-serif">{singleBlog.posts.title}</p>
            </div>
            <div>
              <img src={require(`../assets/uploads/${singleBlog.posts.image}`)} alt="" className="w-[35rem] " />
            </div>
            <div>
              <p dangerouslySetInnerHTML={{ __html: singleBlog.posts.content }}></p>
            </div>
            <Hr />
            <div>
              <p className="font-bold text-4xl">Comments ({singleBlog.comments.length})</p>
            </div>
            <CommentsContainers comments={singleBlog.comments} setFetch={setFetch} />
            {isAuth && (
              <CommentsTextBox
                singleBlogId={singleBlog.posts._id}
                setComment={setComment}
                comment={comment}
                showPicker={showPicker}
                setShowPicker={setShowPicker}
                profile={profile}
              />
            )}
          </div>
        </>
      )}
    </CenterDiv>
  );
};

export default SingleBlogPage;
