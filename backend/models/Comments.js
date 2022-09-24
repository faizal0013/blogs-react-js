const { Schema, model } = require('mongoose');

const Comments = Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  postId: {
    type: Schema.Types.ObjectId,
    ref: 'Posts',
    required: true,
  },
  commentMessage: {
    type: Schema.Types.String,
    required: true,
  },
});

module.exports = model('Comments', Comments);
