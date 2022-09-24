import axios from 'axios';

const CommentsTextBox = ({ singleBlogId, comment, setComment }) => {
  const onFormSubmit = e => {
    e.preventDefault();

    const _id = JSON.parse(localStorage.getItem('_id'));

    axios
      .post('http://localhost:8080/comments', {
        userId: _id,
        postId: singleBlogId,
        commentMessage: comment,
      })
      .then(data => {
        setComment('');
        console.log(data.data);
      })
      .catch(err => console.log(err));
  };

  const onInputChange = e => {
    setComment(e.target.value);
  };

  return (
    <>
      <form onSubmit={onFormSubmit} method={'post'}>
        <input type={'text'} className="border border-black mr-3" onChange={onInputChange} value={comment} />
        <button type="submit" className="bg-blue-500 p-2 text-white font-bold">
          comment
        </button>
      </form>
    </>
  );
};

export default CommentsTextBox;
