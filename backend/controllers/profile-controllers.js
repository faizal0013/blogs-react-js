const fs = require('fs');
const path = require('path');

const slugify = require('slugify');

// collection
const User = require('../models/User');
const Posts = require('../models/Posts');
const Comments = require('../models/Comments');

//helpers
const { UPLOADFILEPATH } = require('../helpers/helpers');
const tagsId = require('../helpers/tags_id');

exports.getProfileDetail = async (req, res) => {
  try {
    const { userId: _id } = req;

    if (!_id) {
      return await res.status(400).json({ message: 'something is wrong' });
    }

    const user = await User.findById(_id).populate('postId');

    if (!user) {
      return res.status(404).json({ message: 'invalid user' });
    }

    await res.status(200).json(user);
  } catch (error) {
    await res.status(400).json({ message: 'something is wrong' });
  }
};

exports.postNewBlog = async (req, res) => {
  try {
    const { userId: _id } = req;

    const { title, content, tags } = req.body;

    if (!title || !content) {
      return await res.status(400).json({ message: 'field is empty' });
    }

    const tags_id = await tagsId(tags ? tags : []);

    const post = new Posts({
      title: title,
      content,
      slug: slugify(title),
      image: req.file.filename,
      userId: _id,
      tags_id,
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

  const { id, title, content, image, tags_id } = await Posts.findOne({ slug }).populate('tags_id');

  if (title && content && image) {
    return await res.status(200).json({ id, title, content, image, tags_id });
  }

  res.status(400).json();
};

exports.putUpdateDetailById = async (req, res) => {
  const { _id } = req.params;

  const { title, oldImage, content, tags } = req.body;

  const tags_id = await tagsId(tags ? tags : []);

  if (!title || !content) {
    return await res.status(400).json({ message: 'field is empty' });
  }

  if (oldImage) {
    const posts = await Posts.findByIdAndUpdate(_id, {
      $set: {
        title,
        content,
        image: req.file.filename,
        slug: slugify(title),
        tags_id,
      },
    });

    fs.unlinkSync(path.join(UPLOADFILEPATH, posts.image));

    return await res.status(201).json({ message: 'update successfully' });
  }

  await Posts.findByIdAndUpdate(_id, {
    $set: {
      title,
      content,
      slug: slugify(title),
      tags_id,
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
