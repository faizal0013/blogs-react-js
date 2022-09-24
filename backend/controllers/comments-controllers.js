const Comments = require('../models/Comments');
const Posts = require('../models/Posts');

exports.addComments = async (req, res) => {
  const { userId, postId, commentMessage } = req.body;

  const comments = new Comments({
    userId,
    postId,
    commentMessage,
  });

  await comments.save();

  const { _id } = comments;

  const isPosts = await Posts.findByIdAndUpdate(postId, {
    $push: {
      commentId: _id,
    },
  });

  if (isPosts) {
    return await res.status(200).json({ message: 'done' });
  }

  await res.status(400).json({ message: 'Somthing is wrong' });
};

exports.getCommentsOnBlogById = async (req, res) => {
  try {
    const { _id } = req.params;

    const posts = await Posts.findById(_id);

    const comments = await Comments.find({ _id: posts.commentId }).populate('userId');

    await res.status(200).json(comments);
  } catch (error) {
    await res.status(400).json({ message: 'Somthing is wrong' });
  }
};
