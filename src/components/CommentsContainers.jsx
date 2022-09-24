const CommentsContainers = ({ comments }) => {
  const comment = comments.map(comment => (
    <div key={comment._id}>
      <p>{comment.commentMessage}</p>
    </div>
  ));

  console.log('as');

  return <div>{comment}</div>;
};

export default CommentsContainers;
