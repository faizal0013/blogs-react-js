const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
  postId: {
    type: [Schema.Types.ObjectId],
    ref: 'Posts',
  },
  fullName: {
    type: Schema.Types.String,
    required: true,
  },
  emailId: {
    type: Schema.Types.String,
    required: true,
  },
  username: {
    type: Schema.Types.String,
    required: true,
  },
  hashPassword: {
    type: Schema.Types.String,
    required: true,
  },
  profile: {
    type: Schema.Types.String,
    default: 'default-profile.png',
    required: true,
  },
});

module.exports = model('User', UserSchema);
