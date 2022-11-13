const Posts = require('../models/Posts');
const Tags = require('../models/Tags');

exports.getAllTags = async (req, res) => {
  try {
    const tags = await Tags.find();

    await res.status(200).json(tags);
  } catch (error) {
    await res.status(400).json({ message: 'Somthing is wrong' });
  }
};

exports.getFilterTag = async (req, res) => {
  try {
    const { tag } = req.query;

    const filter = tag !== 'all' ? { tag_name: tag } : {};

    const filterTag = await Tags.find(filter);

    if (!filter) {
      const posts = await Posts.find({ tags_id: { $in: filterTag } }).populate('userId');
      return await res.status(200).json(posts);
    }

    const posts = await Posts.find({ tags_id: { $in: filterTag } })
      .populate('userId')
      .limit(6);

    await res.status(200).json(posts);
  } catch (error) {
    await res.status(400).json({ message: 'Somthing is wrong' });
  }
};
