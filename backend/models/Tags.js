const { Schema, model } = require('mongoose');

const TagsSchema = new Schema({
  tag_name: {
    type: Schema.Types.String,
    ref: 'Posts',
  },
});

module.exports = model('Tags', TagsSchema);
