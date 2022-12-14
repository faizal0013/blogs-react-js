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
    content: {
      type: Schema.Types.String,
      required: true,
    },
    image: {
      type: Schema.Types.String,
      required: true,
    },
    slug: {
      type: Schema.Types.String,
      required: true,
    },
    tags_id: {
      type: [Schema.Types.ObjectId],
      ref: 'Tags',
    },
    commentId: {
      type: [Schema.Types.ObjectId],
      ref: 'Comments',
    },
  },
  { timestamps: true }
);

module.exports = model('Posts', PostsSchema);
