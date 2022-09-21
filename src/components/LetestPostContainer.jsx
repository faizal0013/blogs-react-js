import { Link } from 'react-router-dom';

import LetestPostArea from './LetestPostArea';

const LetestPostContainer = ({ posts }) => {
  return (
    <>
      <p className="text-2xl mt-10">Latest Posts</p>
      <div className="grid grid-cols-3 gap-14 my-8">
        <LetestPostArea posts={posts} />
      </div>
      <div className="text-center my-12">
        <Link
          to="blogs"
          className="py-3 px-4 bg-blue-400 font-bold text-white text-lg transition ease-in-out duration-500 hover:bg-blue-500"
        >
          read more
        </Link>
      </div>
    </>
  );
};

export default LetestPostContainer;
