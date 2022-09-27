const Comments = require('../models/Comments');
const Posts = require('../models/Posts');

exports.addComments = async (req, res) => {
  const { userId, postId, commentMessage } = req.body;

  if (!commentMessage) {
    return await res.status(400).json({ message: 'field is empty' });
  }

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
    return await res.status(200).json({ message: 'comment is added' });
  }

  await res.status(400).json({ message: 'Somthing is wrong' });
};

exports.removeCommentById = async (req, res) => {
  const { _id } = req.params;

  const comment = await Comments.findByIdAndRemove(_id);

  if (!comment) {
    return await res.status(400).json({ message: 'Somthing is wrong' });
  }

  await Posts.findByIdAndUpdate(comment.postId, {
    $pull: { commentId: comment._id },
  });

  return await res.status(200).json({ message: 'comment is remove' });
};
