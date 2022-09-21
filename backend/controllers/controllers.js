const fs = require('fs');
const path = require('path');

//helpers
const { UPLOADFILEPATH } = require('../helpers/helpers');

// collection
const Posts = require('../models/Posts');
const User = require('../models/User');

exports.getLetestPostsController = async (req, res) => {
  const posts = (await Posts.find().populate('userId').sort({ createdAt: -1 })).splice(0, 6);

  await res.status(200).json(posts);
};

exports.getAllPostsController = async (req, res) => {
  const posts = await Posts.find().populate('userId').sort({ createdAt: -1 });

  await res.status(200).json(posts);
};

exports.getBlogsById = async (req, res) => {
  const { _id } = req.params;

  const posts = await Posts.findById(_id).populate('userId');

  await res.status(200).json(posts);
};

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

    const { title, descriptions } = req.body;

    if (!title || !descriptions) {
      return await res.status(400).json({ message: 'field is empty' });
    }

    const post = new Posts({
      title: title,
      descriptions,
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
  const { _id } = req.params;

  const { title, descriptions, image } = await Posts.findById(_id);

  if (title && descriptions && image) {
    return await res.status(200).json({ title, descriptions, image });
  }

  res.status(400).json();
};

exports.putUpdateDetailById = async (req, res) => {
  const { _id } = req.params;

  const { title, oldImage, descriptions } = req.body;

  if (!title || !descriptions) {
    return await res.status(400).json({ message: 'field is empty' });
  }

  if (oldImage) {
    const posts = await Posts.findByIdAndUpdate(_id, {
      $set: {
        title,
        descriptions,
        image: req.file.filename,
      },
    });

    fs.unlinkSync(path.join(UPLOADFILEPATH, posts.image));

    return await res.status(201).json({ message: 'update successfully' });
  }

  await Posts.findByIdAndUpdate(_id, {
    $set: {
      title,
      descriptions,
    },
  });

  return await res.status(201).json({ message: 'update successfully' });
};

exports.removeBlogById = async (req, res) => {
  const { _id } = req.params;

  try {
    const deletePostId = await Posts.findByIdAndRemove(_id);

    if (!deletePostId) {
      return await res.status(400).json({ message: 'Somthing is wrong' });
    }

    const user = await User.findByIdAndUpdate(deletePostId.userId, {
      $pull: { postId: deletePostId._id },
    });

    if (user) {
      fs.unlinkSync(path.join(UPLOADFILEPATH, deletePostId.image));

      return await res.status(200).json({ message: 'blog is remove successful' });
    }
  } catch (error) {
    return await res.status(400).json({ message: 'Somthing is wrong' });
  }
};
