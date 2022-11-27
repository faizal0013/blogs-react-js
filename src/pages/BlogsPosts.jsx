import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { TbMessages } from 'react-icons/tb';
import { ClipLoader } from 'react-spinners';

import { LazyLoadImage } from 'react-lazy-load-image-component';

import axios from 'axios';

import CenterDiv from '../UI/CenterDiv/CenterDiv';

const BlogsPosts = () => {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:8080/blogs')
      .then(data => {
        setPosts(data.data);
        setLoading(false);
      })
      .catch();
  }, []);

  const postsItem = posts.map(post => (
    <Link
      to={`/blogs/${post.slug}`}
      key={post._id}
      className="border-2 shadow-lg transition-all ease-in-out duration-500 hover:scale-105 hover:-translate-y-2"
    >
      <LazyLoadImage
        effect="blur"
        src={`http://localhost:8080/static/uploads/${post.image}`}
        alt="imgaes"
        className="h-80 w-[40rem]"
      />
      <div className="my-10 mx-8 flex flex-col gap-y-4">
        <div className="flex items-center gap-x-8 justify-between">
          <span className="flex items-center justify-around w-32">
            <LazyLoadImage
              effect="blur"
              src={`http://localhost:8080/static/profiles/${post.userId.profile}`}
              alt="sa"
              className="w-8 rounded-full"
            />
            <p className="text-gray-600 font-serif">{post.userId.username}</p>
          </span>
          <p className="text-gray-600 font-serif">-</p>
          <p className="text-gray-600 font-serif">{post.updatedAt.split('T')[0]}</p>
          <p className="text-gray-600 font-serif">-</p>
          <span className="flex items-center justify-around w-12">
            <TbMessages className="text-gray-600 font-serif" />
            <p className="text-gray-600 font-serif">{post.commentId.length}</p>
          </span>
        </div>
        <p className="font-semibold text-center tracking-wider text-lg">{post.title}</p>
      </div>
    </Link>
  ));

  return (
    <>
      <CenterDiv>
        {loading ? (
          <div className="flex justify-center items-center h-[51rem]">
            <ClipLoader size={115} color="#000000" loading={loading} />
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-14 my-8">{postsItem}</div>
        )}
      </CenterDiv>
    </>
  );
};

export default BlogsPosts;
