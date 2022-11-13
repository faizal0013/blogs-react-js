import { LazyLoadImage } from 'react-lazy-load-image-component';
import CommentsOptions from './CommentsOptions';

const CommentsContainers = ({ comments, setFetch }) => {
  const userId = localStorage.getItem('_id');

  const comment = comments.map(comment => (
    <div key={comment._id}>
      <div className="inline-block mr-5">
        <LazyLoadImage
          effect="blur"
          src={`/assets/profile/${comment.userId.profile}`}
          alt={comment.userId.profile}
          className="rounded-full w-14"
        />
      </div>
      <div className="border px-12 py-5 w-[45rem] rounded-2xl shadow-lg my-7 inline-block">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-6">
            <p className="text-gray-600 font-serif">{comment.userId.username}</p>
            <p className="text-gray-600 font-serif text-left"> {comment.updatedAt.split('T')[0]}</p>
          </div>
          {JSON.parse(userId) === comment.userId._id && <CommentsOptions _id={comment._id} setFetch={setFetch} />}
        </div>
        <p className="text-xl">{comment.commentMessage}</p>
      </div>
    </div>
  ));

  return <div>{comment}</div>;
};

export default CommentsContainers;
