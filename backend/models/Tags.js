const { Schema, model } = require('mongoose');

const TagsSchema = new Schema({
  tag_name: {
    type: Schema.Types.String,
    required: true,
    ref: 'Posts',
  },
});

module.exports = model('Tags', TagsSchema);
