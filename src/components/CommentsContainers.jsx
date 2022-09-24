const CommentsContainers = ({ comments }) => {
  const comment = comments.map(comment => (
    <>
      <div key={comment._id}>
        <div className="inline-block mr-5">
          <img src={require(`../assets/profile/${comment.userId.profile}`)} alt="" className="rounded-full w-14" />
        </div>
        <div className="border px-12 py-5 w-[45rem] rounded-2xl shadow-lg my-7 inline-block">
          <div className="flex items-center gap-6">
            <p className="text-gray-600 font-serif">{comment.userId.username}</p>
            <p className="text-gray-600 font-serif text-left"> {comment.updatedAt.split('T')[0]}</p>
          </div>
          <p className="mt-5">{comment.commentMessage}</p>
        </div>
      </div>
    </>
  ));

  return <div>{comment}</div>;
};

export default CommentsContainers;
