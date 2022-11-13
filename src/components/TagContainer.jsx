import { useEffect, useState } from 'react';

import { LazyLoadImage } from 'react-lazy-load-image-component';

import { TbMessages } from 'react-icons/tb';

import axios from 'axios';

import useQuery from '../hooks/useQuery';
import { PulseLoader } from 'react-spinners';
import { Link } from 'react-router-dom';

const TagContainer = () => {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  const query = useQuery();

  const tag = query.get('tag') || 'all';

  useEffect(() => {
    axios.get(`http://localhost:8080/filter_tag/?tag=${tag}`).then(data => {
      setPosts(data.data);
      setLoading(false);
    });
  }, [tag]);

  return (
    <>
      {loading ? (
        <div className="text-center mt-8">
          <PulseLoader size={20} color="#36d7b7" loading={loading} />
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-14 my-8">
          {posts.map(post => (
            <Link
              to={`/blogs/${post.slug}`}
              key={post._id}
              className="border-2 shadow-lg transition-all ease-in-out duration-500 hover:scale-105 hover:-translate-y-2"
            >
              <LazyLoadImage
                effect="blur"
                src={require(`../assets/uploads/${post.image}`)}
                className="h-80 w-full"
                alt=""
              />
              <div className="my-10 mx-8 flex flex-col gap-y-4">
                <div className="flex items-center gap-x-8 justify-between">
                  <span className="flex items-center justify-around w-32">
                    <LazyLoadImage
                      effect="blur"
                      src={require(`../assets/profile/${post.userId.profile}`)}
                      alt=""
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
          ))}
        </div>
      )}
    </>
  );
};

export default TagContainer;
