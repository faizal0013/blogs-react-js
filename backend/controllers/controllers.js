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
    const { slug } = req.params;

    const posts = await Posts.findOne({ slug }).populate('userId');

    const tags = (await posts.populate('tags_id')).tags_id;

    const comments = await Comments.find({ _id: posts.commentId }).populate('userId');

    await res.status(200).json({ posts, comments, tags });
  } catch (error) {
    await res.status(400).json({ message: 'Somthing is wrong' });
  }
};
