const { Schema, model } = require('mongoose');

const PostsSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    title: {
      type: Schema.Types.String,
      required: true,
    },
    descriptions: {
      type: Schema.Types.String,
      required: true,
    },
    image: {
      type: Schema.Types.String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = model('Posts', PostsSchema);