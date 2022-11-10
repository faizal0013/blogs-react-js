const fs = require('fs');
const path = require('path');

// collection
const User = require('../models/User');
const Posts = require('../models/Posts');
const Comments = require('../models/Comments');

//helpers
const { UPLOADFILEPATH } = require('../helpers/helpers');

exports.getProfileDetail = async (req, res) => {
  const { _id } = req.params;

  if (!_id) {
    return await res.status(400).json({ message: 'something is wrong' });
  }

  const user = await User.findById(_id).populate('postId');

  await res.status(200).json(user);
};

exports.postNewBlog = async (req, res) => {
  try {
    const { _id } = req.params;

    const { slug, title, content } = req.body;

    if (!title || !content) {
      return await res.status(400).json({ message: 'field is empty' });
    }

    const post = new Posts({
      title: title,
      content,
      slug,
      image: req.file.filename,
      userId: _id,
    });

    const user = await User.findByIdAndUpdate(_id, { $push: { postId: post._id } });

    if (user) {
      await post.save();
      return await res.status(200).json({ message: 'pose is succesfully' });
    }

    await res.status(400).json({ message: 'something is wrong' });
  } catch (error) {
    await res.status(400).json({ message: 'field is empty' });
  }
};

exports.getUpdateDetailById = async (req, res) => {
  const { slug } = req.params;

  const { id, title, content, image } = await Posts.findOne({ slug });

  if (title && content && image) {
    return await res.status(200).json({ id, title, content, image });
  }

  res.status(400).json();
};

exports.putUpdateDetailById = async (req, res) => {
  const { _id } = req.params;

  const { title, oldImage, content, slug } = req.body;

  if (!title || !content) {
    return await res.status(400).json({ message: 'field is empty' });
  }

  if (oldImage) {
    const posts = await Posts.findByIdAndUpdate(_id, {
      $set: {
        title,
        content,
        image: req.file.filename,
        slug,
      },
    });

    fs.unlinkSync(path.join(UPLOADFILEPATH, posts.image));

    return await res.status(201).json({ message: 'update successfully' });
  }

  await Posts.findByIdAndUpdate(_id, {
    $set: {
      title,
      content,
      slug,
    },
  });

  return await res.status(201).json({ message: 'update successfully' });
};

exports.removeBlogById = async (req, res) => {
  const { slug } = req.params;

  try {
    // const deletePostId = await Posts.findByIdAndRemove(slug);

    const postId = await Posts.findOne({ slug });

    const deletePostId = await Posts.findByIdAndRemove(postId._id);

    if (!deletePostId) {
      return await res.status(400).json({ message: 'Somthing is wrong' });
    }

    const user = await User.findByIdAndUpdate(deletePostId.userId, {
      $pull: { postId: deletePostId._id },
    });

    await Comments.deleteMany({
      _id: {
        $in: deletePostId.commentId,
      },
    });

    if (user) {
      fs.unlinkSync(path.join(UPLOADFILEPATH, deletePostId.image));

      return await res.status(200).json({ message: 'blog is remove successful' });
    }
  } catch (error) {
    return await res.status(400).json({ message: 'Somthing is wrong' });
  }
};
