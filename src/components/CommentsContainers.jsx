const CommentsContainers = ({ comments }) => {
  console.log(comments);

  const comment = comments.map(comment => (
    <div key={comment._id} className="border px-12 py-5 w-[45rem] rounded-2xl shadow-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-8">
          <img src={require(`../assets/profile/${comment.userId.profile}`)} alt="" className="rounded-full w-14" />
          <p className="text-gray-600 font-serif">{comment.userId.username}</p>
        </div>
        <p className="text-gray-600 font-serif text-left"> {comment.updatedAt.split('T')[0]}</p>
      </div>
      <div className="w-[80%] mx-auto my-1">
        <p>{comment.commentMessage}</p>
      </div>
    </div>
  ));

  return <div>{comment}</div>;
};

export default CommentsContainers;
