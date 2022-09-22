import { Link } from 'react-router-dom';

import { TbMessages } from 'react-icons/tb';

const LetestPostArea = ({ posts }) => {
  return (
    <>
      {posts.map(post => (
        <Link
          to={`/blogs/${post._id}`}
          key={post._id}
          className="border-2 shadow-lg transition-all ease-in-out duration-500 hover:scale-105 hover:-translate-y-2"
        >
          <img src={require(`../assets/uploads/${post.image}`)} className="h-80 w-full" alt="" />
          <div className="my-10 mx-8 flex flex-col gap-y-4">
            <div className="flex items-center gap-x-8 justify-between">
              <span className="flex items-center justify-around w-32">
                <img src={require(`../assets/profile/${post.userId.profile}`)} alt="" className="w-8 rounded-full" />
                <p className="text-gray-600 font-serif">{post.userId.username}</p>
              </span>
              <p className="text-gray-600 font-serif">-</p>
              <p className="text-gray-600 font-serif">{post.updatedAt.split('T')[0]}</p>
              <p className="text-gray-600 font-serif">-</p>
              <span className="flex items-center justify-around w-12">
                <TbMessages className="text-gray-600 font-serif" />
                {/* <p className="text-gray-600 font-serif">{post.totleComment}</p> */}
                <p className="text-gray-600 font-serif">5</p>
              </span>
            </div>
            <p className="font-semibold text-center tracking-wider text-lg">{post.title}</p>
          </div>
        </Link>
      ))}
    </>
  );
};

export default LetestPostArea;
