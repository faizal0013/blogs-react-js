// collection
const Comments = require('../models/Comments');
const Posts = require('../models/Posts');

exports.getLetestPostsController = async (req, res) => {
  const posts = (await Posts.find().populate('userId').sort({ createdAt: -1 })).splice(0, 6);

  await res.status(200).json(posts);
};

exports.getAllPostsController = async (req, res) => {
  const posts = await Posts.find().populate('userId').sort({ createdAt: -1 });

  await res.status(200).json(posts);
};

exports.getBlogsById = async (req, res) => {
  try {
    const { _id } = req.params;

    const posts = await Posts.findById(_id).populate('userId');

    const comments = await Comments.find({ _id: posts.commentId }).populate('userId');

    await res.status(200).json({ posts, comments });
  } catch (error) {
    await res.status(400).json({ message: 'Somthing is wrong' });
  }
};
