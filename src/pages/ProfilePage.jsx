import { useEffect, useState } from 'react';
import { HashLoader } from 'react-spinners';
import { Link, useNavigate } from 'react-router-dom';
import { MdOutlineDeleteSweep } from 'react-icons/md';
import { RiEdit2Line } from 'react-icons/ri';
import { toast } from 'react-toastify';

import { LazyLoadImage } from 'react-lazy-load-image-component';

import axios from 'axios';

import CenterDiv from '../UI/CenterDiv/CenterDiv';
import Hr from '../UI/Hr/Hr';

const ProfilePage = () => {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    const _id = localStorage.getItem('_id');

    const timeOut = setTimeout(() => {
      axios
        .post(`http://localhost:8080/profile/${JSON.parse(_id)}`)
        .then(data => {
          setLoading(false);
          setProfile(data.data);
        })
        .catch(err => {
          toast.error(err.response.data.message);
          navigate(-1);
        });
    }, 1000);

    return () => {
      clearTimeout(timeOut);
    };
  }, [navigate]);

  const capitalizeFirstLetter = str => str.charAt(0).toUpperCase() + str.slice(1);

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center h-[51rem]">
          <HashLoader size={115} color="#36d7b7" loading={loading} />
        </div>
      ) : (
        <CenterDiv>
          {
            <>
              <div className="flex justify-around w-[50rem] mx-auto items-center">
                <LazyLoadImage
                  effect="blur"
                  src={`/assets/profile/${profile.profile}`}
                  className="rounded-full"
                  alt={profile.profile}
                />
                <div className="flex gap-6 flex-col">
                  <div>
                    <span>Full Name</span> <p className="text-4xl">{capitalizeFirstLetter(profile.fullName)}</p>
                  </div>
                  <div>
                    <span>username</span> <p className="text-4xl">{profile.username}</p>
                  </div>
                </div>
              </div>
              <CenterDiv className={'text-right'}>
                <Link
                  to={`/profile/newblog/`}
                  className="p-3 bg-cyan-500 shadow-lg shadow-cyan-500/50 text-white font-bold rounded-lg "
                >
                  New Blog
                </Link>
              </CenterDiv>
              <Hr className={'my-3'} />
              {profile.postId.length ? (
                <CenterDiv className="grid grid-cols-3 gap-8 my-20">
                  {profile.postId.map(post => (
                    <div
                      key={post._id}
                      className="shadow-lg px-7 border py-3 transition-all ease-in-out duration-500 hover:scale-105 hover:-translate-y-2"
                    >
                      <div className="my-4 flex gap-5 justify-end">
                        <Link
                          to={`/profile/updateblog/${post.slug}`}
                          className={'transition-all ease-in-out duration-500 hover:scale-125'}
                        >
                          <RiEdit2Line size={25} color={'red'} />
                        </Link>
                        <Link
                          to={`/profile/removeblog/${post.slug}`}
                          className={'transition-all ease-in-out duration-500 hover:scale-125'}
                        >
                          <MdOutlineDeleteSweep size={25} color={'red'} />
                        </Link>
                      </div>
                      <Link to={`/blogs/${post.slug}`} className="flex flex-col gap-1">
                        <LazyLoadImage effect="blur" src={`/assets/uploads/${post.image}`} alt={post.image} />
                        <p className="my-2 text-xl">{post.title}</p>
                        <p className="text-gray-600 font-serif">{post.updatedAt.split('T')[0]}</p>
                        <p className="mt-2">content...</p>
                      </Link>
                    </div>
                  ))}
                </CenterDiv>
              ) : (
                <CenterDiv>
                  <p className="text-center font-bold text-6xl my-56">No Blogs</p>
                </CenterDiv>
              )}
            </>
          }
        </CenterDiv>
      )}
    </>
  );
};

export default ProfilePage;
